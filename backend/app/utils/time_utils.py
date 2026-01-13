from datetime import datetime
from zoneinfo import ZoneInfo

def generate_formatted_date():
    now = datetime.now(ZoneInfo("Asia/Manila")) 
    
    current_min = now.minute 
    min_in_tens = (current_min // 10) * 10 
    
    formatted_minute = f"{min_in_tens:02d}" 
    
    prefix = now.strftime("%Y%m%d%H") 
    
    return prefix + formatted_minute

def parse_time(timestr: str) -> datetime:
    return datetime.strptime(timestr, "%m/%d/%Y %H:%M")