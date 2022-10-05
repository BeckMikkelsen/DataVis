from datetime import datetime
import pandas as pd
import numpy as np
from shapely.geometry import Point, Polygon, MultiPolygon
import matplotlib.pyplot as plt

# Load data
bikedata = pd.read_csv('data/datastubs/testbikedata.csv')
taxidata = pd.read_csv('data/datastubs/testtaxidata.csv')
zonedata = pd.read_csv('data/zones/relevant_zones/relevant_zones.csv') #len of zonedata is 113
zonedata = zonedata[['LocationID']]

# Bike trip matrix
bike_trip_avg = np.zeros((113,113))

for i in range (0,len(zonedata)):
    for j in range (0,len(zonedata)):
        df = bikedata.loc[(bikedata['start zone loc id'] == zonedata.at[i, 'LocationID']) & (bikedata['end zone loc id'] == zonedata.at[j, 'LocationID'])]
        if len(df) !=0:
            bike_trip_avg[i,j] = df['tripduration'].mean()


# Taxi trip matrix
taxi_trip_avg = np.zeros((113,113))

for i in range (0,len(zonedata)):
    for j in range (0,len(zonedata)):
        df = taxidata.loc[(taxidata['PULocationID'] == zonedata.at[i, 'LocationID']) & (taxidata['DOLocationID'] == zonedata.at[j, 'LocationID'])]
        if len(df) !=0:
            taxi_trip_avg[i,j] = df['tripduration'].mean()

    print(taxi_trip_avg[i])