from django.urls import path
from .views import (GetEstimatedPrice, GetVoivodeships, GetBuildingStyles, GetKitchens, GetParkings,
    GetConditions, GetMaterials, GetFloors)

urlpatterns = [
    path('predict_apartment_price/', GetEstimatedPrice.as_view()),
    path('get_voivodeships_names/', GetVoivodeships.as_view()),
    path('get_building_styles/', GetBuildingStyles.as_view()),
    path('get_kitchens/', GetKitchens.as_view()),
    path('get_parkings/', GetParkings.as_view()),
    path('get_conditions/', GetConditions.as_view()),
    path('get_materials/', GetMaterials.as_view()),
    path('get_floors/', GetFloors.as_view()),
]
