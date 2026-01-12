from sqlalchemy.orm import Session
from app.models.evacuation_model import Evacuation
from app.models.hotlines_model import Hotlines

def init_db_data(db: Session):
    """
    Seeds the database with Evacuation Centers and Hotlines 
    if the tables are empty.
    """
    try:
        # ==========================================
        # 1. SEED EVACUATION CENTERS
        # ==========================================
        if not db.query(Evacuation).first():
            print("🌱 Seeding Evacuation Centers...")
            centers = [
                Evacuation(center_name='Fortune Elementary School', amenity='Public School', latitude=14.6593, longitude=121.126),
                Evacuation(center_name='Fortune High School', amenity='Public School', latitude=14.6595, longitude=121.127),
                Evacuation(center_name='San Roque National High School', amenity='Public School', latitude=14.623, longitude=121.097),
                Evacuation(center_name='San Roque Elementary School', amenity='Public School', latitude=14.623, longitude=121.097),
                Evacuation(center_name='Marikina Heights National High School', amenity='Public School', latitude=14.648, longitude=121.12),
                Evacuation(center_name='Barangka National High School', amenity='Public School', latitude=14.6336, longitude=121.081),
                Evacuation(center_name='Barangka Elementary School', amenity='Public School', latitude=14.6336, longitude=121.081),
                Evacuation(center_name='Kalumpang National High School', amenity='Public School', latitude=14.622, longitude=121.09),
                Evacuation(center_name='Kalumpang Elementary School', amenity='Public School', latitude=14.6222, longitude=121.089),
                Evacuation(center_name='SSS National High School', amenity='Public School', latitude=14.6398, longitude=121.121),
                Evacuation(center_name='SSS Village Elementary School', amenity='Public School', latitude=14.64, longitude=121.122),
                Evacuation(center_name='Marikina High School', amenity='Public School', latitude=14.6465, longitude=121.104),
                Evacuation(center_name='Marikina Elementary School', amenity='Public School', latitude=14.6305, longitude=121.098),
                Evacuation(center_name='Parang Elementary School', amenity='Public School', latitude=14.6567, longitude=121.111),
                Evacuation(center_name='Santo Niño National High School', amenity='Public School', latitude=14.6388, longitude=121.096),
                Evacuation(center_name='Hermogenes Bautista Elementary School', amenity='Public School', latitude=14.6576, longitude=121.104),
                Evacuation(center_name='Parang High School', amenity='Public School', latitude=14.6639, longitude=121.112),
                Evacuation(center_name='Industrial Valley Elementary School', amenity='Public School', latitude=14.6217, longitude=121.08),
                Evacuation(center_name='Leodegario Victorino Elementary School', amenity='Public School', latitude=14.6357, longitude=121.09),
                Evacuation(center_name='Tañong High School', amenity='Public School', latitude=14.6343, longitude=121.086),
                Evacuation(center_name='Nangka Elementary School', amenity='Public School', latitude=14.6727, longitude=121.109),
                Evacuation(center_name='Malanday National High School', amenity='Public School', latitude=14.6473, longitude=121.09),
                Evacuation(center_name='Malanday Elementary School', amenity='Public School', latitude=14.6507, longitude=121.094),
                Evacuation(center_name='Concepcion Integrated School', amenity='Public School', latitude=14.6497, longitude=121.102),
                Evacuation(center_name='Kapitan Moy Elementary School', amenity='Public School', latitude=14.6486, longitude=121.119),
                Evacuation(center_name='Nangka High School', amenity='Public School', latitude=14.6711, longitude=121.102),
                Evacuation(center_name='Santa Elena High School', amenity='Public School', latitude=14.632, longitude=121.097),
                Evacuation(center_name='Concepcion Elementary School', amenity='Public School', latitude=14.6477, longitude=121.103),
                Evacuation(center_name='Santo Niño Elementary School', amenity='Public School', latitude=14.6388, longitude=121.096),
                Evacuation(center_name='Saint Mary Elementary School', amenity='Public School', latitude=14.6688, longitude=121.114),
                Evacuation(center_name='Jesus Dela Peña National High School', amenity='Public School', latitude=14.6354, longitude=121.09),
                Evacuation(center_name='National TVET Trainers Academy', amenity='Public School', latitude=14.6317, longitude=121.099),
                Evacuation(center_name='Marikina Science High School', amenity='Public School', latitude=14.632, longitude=121.099),
                Evacuation(center_name='Valeriano E. Fugoso Memorial Elementary School', amenity='Public School', latitude=14.6665, longitude=121.119),
                Evacuation(center_name='Valeriano E. Fugoso Memorial High School', amenity='Public School', latitude=14.6658, longitude=121.118),
                Evacuation(center_name='Concepcion Dos Barangay Hall', amenity='Barangay Hall', latitude=14.6384, longitude=121.112),
                Evacuation(center_name='Jesus dela Peña Barangay Hall', amenity='Barangay Hall', latitude=14.6371, longitude=121.091),
                Evacuation(center_name='Fortune Barangay Hall', amenity='Barangay Hall', latitude=14.6635, longitude=121.127),
                Evacuation(center_name='Calumpang Barangay Hall', amenity='Barangay Hall', latitude=14.624, longitude=121.093),
                Evacuation(center_name='Concepcion Uno Barangay Hall', amenity='Barangay Hall', latitude=14.6532, longitude=121.104),
                Evacuation(center_name='Tañong Barangay Hall', amenity='Barangay Hall', latitude=14.6345, longitude=121.086),
                Evacuation(center_name='Santo Niño Barangay Hall', amenity='Barangay Hall', latitude=14.6366, longitude=121.097),
                Evacuation(center_name='Industrial Valley Complex Barangay Hall', amenity='Barangay Hall', latitude=14.6272, longitude=121.08),
                Evacuation(center_name='Sta. Elena Barangay Hall', amenity='Barangay Hall', latitude=14.6331, longitude=121.097),
                Evacuation(center_name='Barangka Barangay Hall', amenity='Barangay Hall', latitude=14.6329, longitude=121.082),
                Evacuation(center_name='San Roque Barangay Hall', amenity='Barangay Hall', latitude=14.6292, longitude=121.098),
                Evacuation(center_name='San Roque Barangay Multipurpose Hall', amenity='Barangay Hall', latitude=14.6257, longitude=121.103)
            ]
            db.bulk_save_objects(centers)
            db.commit()
            print("✅ Evacuation Centers seeded successfully.")
        else:
            print("⏩ Evacuation Centers already exist. Skipping.")

        # ==========================================
        # 2. SEED EMERGENCY HOTLINES
        # ==========================================
        if not db.query(Hotlines).first():
            print("🌱 Seeding Emergency Hotlines...")
            hotlines = [
                Hotlines(hotline_name='National Emergency Hotline', hotline_number='911'),
                Hotlines(hotline_name='NDRRMC', hotline_number='(02) 8911-1406'),
                Hotlines(hotline_name='DSWD (Disaster Response Unit)', hotline_number='(02) 8911-1406'),
                Hotlines(hotline_name='Red Cross', hotline_number='143'),
                Hotlines(hotline_name='Philippine National Police (PNP)', hotline_number='117'),
                Hotlines(hotline_name='Bureau of Fire Protection (BFP)', hotline_number='(02) 8426-0219'),
                Hotlines(hotline_name='MMDA', hotline_number='136'),
                Hotlines(hotline_name='PAGASA', hotline_number='(02) 8284-0800')
            ]
            db.bulk_save_objects(hotlines)
            db.commit()
            print("✅ Emergency Hotlines seeded successfully.")
        else:
            print("⏩ Hotlines already exist. Skipping.")

    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()