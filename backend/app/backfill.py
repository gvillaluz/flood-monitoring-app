import asyncio
import httpx
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

# Import your existing app components
from db.session import SessionLocal
from crud.flood_records import create_flood_records
from schemas.internal.flood_record import FloodRecordModel
from schemas.pagasa.rainfall_response import PagasaRainfall
from schemas.pagasa.water_response import PagasaWaterLevel

# --- Configuration ---
HOURS_TO_BACKFILL = 10  # 10 hours * 6 records/hr = ~60 records (Enough for your 54 requirement)
WATER_LEVEL_URL = 'https://pasig-marikina-tullahanffws.pagasa.dost.gov.ph/water/detail_list.do'
RAINFALL_URL = 'https://pasig-marikina-tullahanffws.pagasa.dost.gov.ph/rainfall/detail_list.do'

# Station Codes
WATER_CODE = 11104201
RAIN_MT_ORO = 11102102
RAIN_SM = 11103101

async def backfill_data():
    print("🚀 Starting Backfill Process...")
    
    db = SessionLocal()
    client = httpx.AsyncClient()
    
    # 1. Determine Start Time (10 hours ago)
    now = datetime.now(ZoneInfo("Asia/Manila"))
    start_time = now - timedelta(hours=HOURS_TO_BACKFILL)
    
    # Round down to nearest 10 minutes (e.g., 8:14 -> 8:10)
    start_time = start_time.replace(minute=(start_time.minute // 10) * 10, second=0, microsecond=0)
    
    current_iter_time = start_time
    
    # 2. Loop until Now
    while current_iter_time < now:
        # Format time to match PAGASA requirement: YYYYMMDDHHMM
        ymdhm = current_iter_time.strftime("%Y%m%d%H%M")
        
        try:
            # Parallel Fetch to speed things up
            w_resp, r_oro_resp, r_sm_resp = await asyncio.gather(
                client.post(WATER_LEVEL_URL, data={"obscd": WATER_CODE, "ymdhm": ymdhm}),
                client.post(RAINFALL_URL, data={"obscd": RAIN_MT_ORO, "ymdhm": ymdhm}),
                client.post(RAINFALL_URL, data={"obscd": RAIN_SM, "ymdhm": ymdhm})
            )
            
            # Check for empty responses (API returns empty list [] if no data)
            if not w_resp.json() or not r_oro_resp.json() or not r_sm_resp.json():
                print(f"⚠️  No data found for {ymdhm} - Skipping.")
            else:
                # Parse using your existing schemas
                wl_obj = PagasaWaterLevel(**w_resp.json()[0])
                rf_oro_obj = PagasaRainfall(**r_oro_resp.json()[0])
                rf_sm_obj = PagasaRainfall(**r_sm_resp.json()[0])
                
                # Create DB Model
                flood_obj = FloodRecordModel(
                    timestr=wl_obj.timestr,
                    wl=wl_obj.wl,
                    wlchange=wl_obj.wlchange,
                    rf_mt_oro=rf_oro_obj.rf,
                    rf_mt_sm=rf_sm_obj.rf
                )
                
                # Save to DB (using your existing CRUD)
                try:
                    create_flood_records(db, flood_obj)
                    print(f"✅ Saved record: {wl_obj.timestr}")
                except Exception as db_err:
                    print(f"❌ DB Error for {ymdhm}: {db_err}")
                    db.rollback()

        except Exception as e:
            print(f"❌ Network Error for {ymdhm}: {e}")

        # 3. Move to next 10-minute interval
        current_iter_time += timedelta(minutes=10)
        
        # Slight delay to prevent rate-limiting
        await asyncio.sleep(0.2)

    await client.aclose()
    db.close()
    print("\n🏁 Backfill Complete. Restart your main server to test prediction.")

if __name__ == "__main__":
    asyncio.run(backfill_data())