from django.apps import AppConfig
from django.conf import settings
import os
import pickle
import json


class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"

    MODEL_FILE = os.path.join(settings.MODELS, "apartments_price_predictor_model.pickle")
    DATA_COLUMNS_FILE = os.path.join(settings.MODELS, "columns.json")

    with open(MODEL_FILE, "rb") as file:
        model = pickle.load(file)
 
    with open(DATA_COLUMNS_FILE, 'r') as file:
        data_columns = json.load(file)['data_columns']

    voivodeships = [i[12:] for i in data_columns[4:18]]
    voivodeships.append('inne')
    building_styles = [i[9:] for i in data_columns[18:22]]
    building_styles.append('inne')
    kitchens = [i[8:] for i in data_columns[22:25]]
    kitchens.append('inne')
    parkings = [i[8:] for i in data_columns[25:29]]
    parkings.append('inne')
    conditions = [i[5:] for i in data_columns[29:35]]
    conditions.append('inne')
    materials = [i[9:] for i in data_columns[35:37]]
    materials.append('inne')
