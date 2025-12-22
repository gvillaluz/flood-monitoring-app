import asyncio
import httpx
import app.utils.time_utils as time_utils
from app.schemas.internal.rainfall import RainfallModel
from app.schemas.internal.water_level import WaterLevelModel
from app.crud import water_level, rainfall
from app.schemas.pagasa.rainfall_response import PagasaRainfall
from app.schemas.pagasa.water_response import PagasaWaterLevel
        
class PagasaService:
    def __init__(self):
        self.water_level_url = 'https://pasig-marikina-tullahanffws.pagasa.dost.gov.ph/water/detail_list.do'
        self.rainfall_url = 'https://pasig-marikina-tullahanffws.pagasa.dost.gov.ph/rainfall/detail_list.do'
        self.water_code = 11104201
        self.rain_code = 11102102
        self.client = httpx.AsyncClient()
        
    async def fetch_all_data(self, db):
        try:
            water_resp, rainfall_resp = await asyncio.gather(
                self.client.post(self.water_level_url, data={
                    "obscd": self.water_code,
                    "ymdhm": time_utils.generate_formatted_date()
                }),
                self.client.post(self.rainfall_url, data={
                    "obscd": self.rain_code,
                    "ymdhm": time_utils.generate_formatted_date()
                })
            )
            
            water_resp_obj = PagasaWaterLevel(**water_resp.json()[0])
            rainfall_resp_obj = PagasaRainfall(**rainfall_resp.json()[0])
            
            water_obj = WaterLevelModel(
                station_name = water_resp_obj.obsnm,
                timestamp = water_resp_obj.timestr,
                water_level = water_resp_obj.wl,
                water_level_10m = water_resp_obj.wl10m,
                water_level_change = water_resp_obj.wlchange
            )
            
            rainfall_obj = RainfallModel(
                station_name = rainfall_resp_obj.obsnm,
                timestamp = rainfall_resp_obj.timestr,
                rainfall = rainfall_resp_obj.rf,
                rainfall_day = rainfall_resp_obj.rfday
            )
            
            water_level.create_water_level(db, water_obj)
            rainfall.create_rainfall(db, rainfall_obj)
            
            return {
                "water": water_obj,
                "rainfall": rainfall_obj
            }
            
        except Exception as e:
            print("Pagasa Service: ", e)
            raise e
        
    async def close(self):
        await self.client.aclose()