from datetime import datetime
import pandas as pd
import numpy as np
from shapely.geometry import Point, Polygon, MultiPolygon
import matplotlib.pyplot as plt

# Load data
bikedata = pd.read_csv('data/datastubs/testbikedata.csv')
taxidata = pd.read_csv('data/datastubs/testtaxidata.csv')
zonedata = pd.read_csv('data/zones/relevant_zones/relevant_zones.csv') 

zonedata = zonedata.sort_values(by=['LocationID']).reset_index()
# Bike trip matrix
bike_trip_avg = np.zeros(len(zonedata),len(zonedata))

for i in range (0,len(zonedata)):
    for j in range (0,len(zonedata)):
        df = bikedata.loc[(bikedata['start zone loc id'] == zonedata.at[i, 'LocationID']) & (bikedata['end zone loc id'] == zonedata.at[j, 'LocationID'])]
        if len(df) !=0:
            bike_trip_avg[i,j] = df['tripduration'].mean()

df_bike = pd.DataFrame(bike_trip_avg)
json_bike = df_bike.to_json()
with open("bike_json.json", "w") as outfile:
    outfile.write(json_bike)

taxi_trip_avg = np.zeros(len(zonedata),len(zonedata))

for i in range (0,len(zonedata)):
    for j in range (0,len(zonedata)):
        df = taxidata.loc[(taxidata['PULocationID'] == zonedata.at[i, 'LocationID']) & (taxidata['DOLocationID'] == zonedata.at[j, 'LocationID'])]
        if len(df) !=0:
            taxi_trip_avg[i,j] = df['tripduration'].mean()


df_taxi = pd.DataFrame(taxi_trip_avg)
json_taxi = df_taxi.to_json()
with open("taxi_json.json", "w") as outfile:
    outfile.write(json_taxi)