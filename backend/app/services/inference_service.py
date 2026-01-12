import os
import joblib
import tensorflow
import pandas as pd
from sqlalchemy.orm import Session

from app.schemas.internal.flood_record import FloodRecordModel
from app.crud.flood_records import get_records_for_prediction, update_record

class InferenceService():
    def __init__(self):
        current_dir = os.path.dirname(os.path.abspath(__file__))
        
        model_path = os.path.join(current_dir, "../artifacts/flood_model_1hr.h5")
        scaler_x_path = os.path.join(current_dir, "../artifacts/scaler_X_1hr.joblib")
        scaler_y_path = os.path.join(current_dir, "../artifacts/scaler_y_1hr.joblib")
        
        self.model = tensorflow.keras.models.load_model(model_path, compile=False)
        self.scaler_X = joblib.load(scaler_x_path)
        self.scaler_y = joblib.load(scaler_y_path)        
    
    def fetch_and_predict(self, db: Session):
        try:
            flood_data = get_records_for_prediction(db)
            
            if len(flood_data) < 54:
                print(f"Not enough data. Need 60, got {len(flood_data)}")
                return None
            
            data_dicts = [{k: v for k, v in vars(r).items() if k != '_sa_instance_state'} for r in flood_data]
            df = pd.DataFrame(data_dicts)
    
            df['rain_oro_3hr_sum'] = df['rain_mt_oro'].rolling(window=18).sum()
            df['rain_sm_3hr_sum'] = df['rain_mt_sm'].rolling(window=18).sum()
            df['wl_lag_1hr'] = df['wl'].shift(6)
            df['wl_lag_3hr'] = df['wl'].shift(18)
            
            df_clean = df.dropna().reset_index(drop=True)
            if len(df_clean) < 36: return None
            
            features = [
                "wl", "wlchange", "rain_mt_oro", "rain_mt_sm",
                "rain_oro_3hr_sum", "rain_sm_3hr_sum", "wl_lag_1hr", "wl_lag_3hr"
            ]
            
            input_window = df_clean.tail(36)
            
            X_raw = input_window[features].values
            
            X_scaled = self.scaler_X.transform(X_raw)
            
            X_input = X_scaled.reshape(1, 36, len(features))
            
            y_pred_scaled = self.model.predict(X_input, verbose=0)
            
            prediction_real = self.scaler_y.inverse_transform(y_pred_scaled)
            
            return float(prediction_real[0][0])
            
        except Exception as e:
            print(e)
            
    def update_flood_records(self, db: Session, record: FloodRecordModel, prediction):
        record.predicted_wl = prediction
            
        if prediction >= 18.00:
            record.prediction_status = "Danger"
        elif prediction >= 16.0:
            record.prediction_status = "Warning"
        else:
            record.prediction_status = "Safe"
            
        updated_record = update_record(db, record)
        
        return updated_record