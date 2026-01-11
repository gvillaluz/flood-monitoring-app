import asyncio
import httpx
import app.utils.time_utils as time_utils
from app.schemas.internal.rainfall import RainfallModel
from app.schemas.internal.water_level import WaterLevelModel
from app.crud import flood_records
from app.schemas.pagasa.rainfall_response import PagasaRainfall
from app.schemas.pagasa.water_response import PagasaWaterLevel
from app.schemas.internal.flood_record import FloodRecordModel
        
class PagasaService:
    def __init__(self):
        self.water_level_url = 'https://pasig-marikina-tullahanffws.pagasa.dost.gov.ph/water/detail_list.do'
        self.rainfall_url = 'https://pasig-marikina-tullahanffws.pagasa.dost.gov.ph/rainfall/detail_list.do'
        self.water_code = 11104201
        self.rain_mt_oro = 11102102
        self.rain_sm = 11103101
        self.client = httpx.AsyncClient()
        
    async def fetch_all_data(self, db):
        try:
            water_resp, rf_oro, rf_sm = await asyncio.gather(
                self.client.post(self.water_level_url, data={
                    "obscd": self.water_code,
                    "ymdhm": time_utils.generate_formatted_date()
                }),
                self.client.post(self.rainfall_url, data={
                    "obscd": self.rain_mt_oro,
                    "ymdhm": time_utils.generate_formatted_date()
                }),
                self.client.post(self.rainfall_url, data={
                    "obscd": self.rain_sm,
                    "ymdhm": time_utils.generate_formatted_date()
                })
            )
            
            wl_obj = PagasaWaterLevel(**water_resp.json()[0])
            rf_oro_obj = PagasaRainfall(**rf_oro.json()[0])
            rf_sm_obj = PagasaRainfall(**rf_sm.json()[0])
            
            flood_obj = FloodRecordModel(
                timestr=wl_obj.timestr,
                wl=wl_obj.wl,
                wlchange=wl_obj.wlchange,
                rf_mt_oro=rf_oro_obj.rf,
                rf_mt_sm=rf_sm_obj.rf
            )
            
            flood_records.create_flood_records(db, flood_obj)
            
            # water_obj = WaterLevelModel(
            #     station_name = water_resp_obj.obsnm,
            #     timestamp = water_resp_obj.timestr,
            #     water_level = water_resp_obj.wl,
            #     water_level_10m = water_resp_obj.wl10m,
            #     water_level_change = water_resp_obj.wlchange
            # )
            
            # rainfall_obj = RainfallModel(
            #     station_name = rainfall_resp_obj.obsnm,
            #     timestamp = rainfall_resp_obj.timestr,
            #     rainfall = rainfall_resp_obj.rf,
            #     rainfall_day = rainfall_resp_obj.rfday
            # )
            
            # water_level.create_water_level(db, water_obj)
            # rainfall.create_rainfall(db, rainfall_obj)
            
            return {
                "water": flood_obj
            }
            
        except Exception as e:
            print("Pagasa Service: ", e)
            raise e
        
    async def close(self):
        await self.client.aclose()