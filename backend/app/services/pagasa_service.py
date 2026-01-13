import asyncio
import httpx
import app.utils.time_utils as time_utils
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
        request_time = time_utils.generate_formatted_date()
        
        try:
            water_resp, rf_oro, rf_sm = await asyncio.gather(
                self.client.post(self.water_level_url, data={
                    "obscd": self.water_code,
                    "ymdhm": request_time
                }),
                self.client.post(self.rainfall_url, data={
                    "obscd": self.rain_mt_oro,
                    "ymdhm": request_time
                }),
                self.client.post(self.rainfall_url, data={
                    "obscd": self.rain_sm,
                    "ymdhm": request_time
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
            print("New flood record saved.")
            
            return flood_obj
            
        except Exception as e:
            print("Pagasa Service: ", e)
            raise e
        
    async def close(self):
        await self.client.aclose()