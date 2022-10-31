from ast import For
import pandas as pd
import numpy as np
from shapely.geometry import Point, Polygon, MultiPolygon
import matplotlib.pyplot as plt
from datetime import datetime


def create_full_bike_data():

    for i in range(1,13):
        if i < 10:
            pd.read_csv(f'data/citibike/20210{i}-citibike-tripdata.csv', usecols=['started_at','ended_at','start_lat','start_lng','end_lat','end_lng']).to_csv('data/fullbikedata.csv',mode='a',index=False, header=False)
        else:
            pd.read_csv(f'data/citibike/2021{i}-citibike-tripdata.csv',usecols=['started_at','ended_at','start_lat','start_lng','end_lat','end_lng']).to_csv('data/fullbikedata.csv',mode='a',index=False, header=False)
        


def fix_jan():
    df = pd.read_csv(f'data/citibike/202101-citibike-tripdata.csv', )

    df.to_csv('data/citibike/202101-citibike-tripdata.csv')



def create_summer_bike_data():
    for i in range(6,9):
        if i < 10:
            pd.read_csv(f'data/citibike/20210{i}-citibike-tripdata.csv', usecols=['started_at','ended_at','start_lat','start_lng','end_lat','end_lng']).to_csv('data/summer_bike_data.csv',mode='a',index=False, header=False)
        else:
            pd.read_csv(f'data/citibike/2021{i}-citibike-tripdata.csv',usecols=['started_at','ended_at','start_lat','start_lng','end_lat','end_lng']).to_csv('data/summer_bike_data.csv',mode='a',index=False, header=False)
        



def create_summer_taxi_data():
    for chunk in pd.read_csv('data/taxi/2021_Yellow_Taxi_Trip_Data.csv',chunksize=500000, usecols=['tpep_pickup_datetime','tpep_dropoff_datetime','passenger_count','trip_distance','PULocationID','DOLocationID']):
        bongo =(chunk[chunk['tpep_pickup_datetime'].str.startswith('08')])
        #mongo =(chunk[chunk['tpep_dropoff_datetime'].str.startswith('06')])
        if len(bongo):
            bongo.to_csv('data/taxi/summertaxi.csv',mode='a', index=False,header=False)


#create_summer_taxi_data()

