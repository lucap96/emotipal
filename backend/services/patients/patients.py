import logging

from core.supabase          import get_supabase_client
from utils.utils            import convert_keys_to_snake_case, convert_keys_to_camel_case

async def get_patients() -> dict:
    try:
        data = get_supabase_client().table("patients").select("*").execute()
        patients = convert_keys_to_camel_case(data.data)
        return {"patients": patients, "count": data.count}
    except Exception as e:
        logging.error(e)
        return {"patients": [], "count": 0}

async def insert_patient(patient) -> dict:
    try:
        patient = convert_keys_to_snake_case(patient)
        print(patient)
        new_partient = get_supabase_client().table("patients").insert(patient).execute()
        patient = convert_keys_to_camel_case(new_partient.data)
        return patient
    except Exception as e:
        logging.error(e)
        return {}