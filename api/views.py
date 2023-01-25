import numpy as np
from .apps import ApiConfig
from rest_framework.views import APIView, status
from rest_framework.response import Response


# Create your views here.
class GetEstimatedPrice(APIView):
    def post(self, request):
        try:
            voivodeship = request.data['voivodeship']
            area = float(request.data['area'])
            rooms_nr = int(request.data['rooms_nr'])
            floor = int(request.data['floor'])
            building_style = request.data['building_style']
            building_floors = int(request.data['building_floors'])
            kitchen = request.data['kitchen']
            parking = request.data['parking']
            condition = request.data['condition']
            material = request.data['material']
            bathroom = request.data['bathroom']
        except:
            return Response({"message": "Wrong data format!"}, status=status.HTTP_400_BAD_REQUEST)

        if not area:
            return Response({"message": "Area must be entered!"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            voivodeship_index = ApiConfig.data_columns.index(
                'voivodeship_' + voivodeship.lower())
        except:
            voivodeship_index = -1
        try:
            zabudowa_index = ApiConfig.data_columns.index(
                'zabudowa_' + building_style.lower())
        except:
            zabudowa_index = -1
        try:
            kuchnia_index = ApiConfig.data_columns.index('kuchnia_' + kitchen.lower())
        except:
            kuchnia_index = -1
        try:
            parking_index = ApiConfig.data_columns.index('parking_' + parking.lower())
        except:
            parking_index = -1
        try:
            stan_index = ApiConfig.data_columns.index('stan_' + condition.lower())
        except:
            stan_index = -1
        try:
            material_index = ApiConfig.data_columns.index('material_' + material.lower())
        except:
            material_index = -1
        try:
            bathroom_index = ApiConfig.data_columns.index('bathroom_' + bathroom.lower())
        except:
            bathroom_index = -1

        x = np.zeros(len(ApiConfig.data_columns))
        x[0] = area
        x[1] = rooms_nr
        x[2] = floor
        x[3] = building_floors

        if voivodeship_index >= 0:
            x[voivodeship_index] = 1
        if zabudowa_index >= 0:
            x[zabudowa_index] = 1
        if kuchnia_index >= 0:
            x[kuchnia_index] = 1
        if parking_index >= 0:
            x[parking_index] = 1
        if stan_index >= 0:
            x[stan_index] = 1
        if material_index >= 0:
            x[material_index] = 1
        if bathroom_index >= 0:
            x[bathroom_index] = 1

        try:
            response_dict = {"price": round(ApiConfig.model.predict([x])[0] * area, 2)}
            return Response(response_dict, status=status.HTTP_200_OK)
        except:
            return Response({"message": "Wrong data entered!"}, status=status.HTTP_400_BAD_REQUEST)


class GetVoivodeships(APIView):
    def get(self, request):
        return Response(ApiConfig.voivodeships, status=status.HTTP_200_OK)

        
class GetBuildingStyles(APIView):
    def get(self, request):
        return Response(ApiConfig.building_styles, status=status.HTTP_200_OK)


class GetKitchens(APIView):
    def get(self, request):
        return Response(ApiConfig.kitchens, status=status.HTTP_200_OK)


class GetParkings(APIView):
    def get(self, request):
        return Response(ApiConfig.parkings, status=status.HTTP_200_OK)


class GetConditions(APIView):
    def get(self, request):
        return Response(ApiConfig.conditions, status=status.HTTP_200_OK)


class GetMaterials(APIView):
    def get(self, request):
        return Response(ApiConfig.materials, status=status.HTTP_200_OK)


class GetFloors(APIView):
    def get(self, request):
        floors = [str(i) for i in range(31)]
        return Response(floors, status=status.HTTP_200_OK)


    