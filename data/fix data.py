from ast import For
import pandas as pd
import numpy as np
from shapely.geometry import Point, Polygon, MultiPolygon
import matplotlib.pyplot as plt
from datetime import datetime


def create_full_bike_data():
    bikedata = pd.DataFrame([])
    for i in range(1,13):
        if i < 10:
            df = pd.read_csv(f'data/citibike/20210{i}-citibike-tripdata.csv', low_memory=False)
        else:
            df = pd.read_csv(f'data/citibike/2021{i}-citibike-tripdata.csv', low_memory=False)
        
        df=df[['started_at','ended_at','start_lat','start_lng','end_lat','end_lng']]
        bikedata = pd.concat([bikedata, df])
    bikedata.reset_index()
    bikedata.to_csv('data/fullbikedata.csv',index=False)


create_full_bike_data()

print(len(pd.read_csv('data/fullbikedata.csv', low_memory=False)))


