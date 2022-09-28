import pandas as pd
import numpy as np
from shapely.geometry import Point, Polygon, MultiPolygon

#bikedata
bikedata = pd.read_csv('data/citibike/JC-202101-citibike-tripdata.csv', nrows=50)
bikestart_lat_lng = bikedata[["start station latitude", "start station longitude"]]
p = Point(bikestart_lat_lng.at[0,'start station latitude'], bikestart_lat_lng.at[0,'start station longitude'])

#print(bikestart_lat_lng.head())

#zone data
zonedata = pd.read_csv('data/zones/taxi_zones.csv')
zonearea_lat_lng = zonedata["the_geom"]
poly = Polygon(zonearea_lat_lng)
print(poly.explode())

#print(zonearea_lat_lng.head())
