from http.client import ImproperConnectionState
from tkinter.ttk import Separator
import pandas as pd
import numpy as np
from shapely.geometry import Point, Polygon, MultiPolygon
import matplotlib.pyplot as plt

#bikedata
bikedata = pd.read_csv('data/citibike/JC-202101-citibike-tripdata.csv')
bikestart_lat_lng = bikedata[["start station latitude", "start station longitude"]]
p = Point(bikestart_lat_lng.at[99,'start station latitude'], bikestart_lat_lng.at[99,'start station longitude'])
#print(bikestart_lat_lng.head())

#zone data
zonedata = pd.read_csv('data/zones/taxi_zones.csv')
zonearea_lat_lng = zonedata["the_geom"]
zone_areas = []

# Look through all zones and convert to polygons
for i in range(0,len(zonearea_lat_lng)):
# Removes bloat at start and end
    zone_cords_string = zonearea_lat_lng.iloc[i].removeprefix("MULTIPOLYGON (((").removesuffix(")))")
    # Not a multipolygon
    if "((" not in zone_cords_string:
        #splits the string into a list at ',' and appends to list
        zone_cords = (zone_cords_string.split(','))
        # Strips of ' ' at start and replaces ' ' with ',' between numbers. Eval turns into tuples of floats
        zone_areas.append(Polygon([eval(j.strip().replace(' ', ',')) for j in zone_cords]))
        
    
    # A multipolygon. Make multiple polygons
    else:
        zone_cords = (zone_cords_string.split(')), (('))
        for (k,polygon) in enumerate(zone_cords):
            zone_cords[k] = (zone_cords[k].split(','))
            zone_cords[k] = (Polygon([eval(j.strip().replace(' ', ',')) for j in (zone_cords[k])]))
        zone_areas.append(MultiPolygon(zone_cords))

# Look through all startpoints and print if they are within one of the zones VIRKER IKK?
for i in range(0, 10):#len(bikestart_lat_lng)):
    p = Point(bikestart_lat_lng.at[i,'start station latitude'], bikestart_lat_lng.at[i,'start station longitude'])
    for (j,geom) in enumerate(zone_areas):
        if type(geom) == MultiPolygon:
            for k in geom.geoms:
                if p.within(k):
                    print("indenfor")
        else:
            if p.within(geom):
                print("indenfor")

# Plot hmmm
for (i,geom) in enumerate(zone_areas):
    if type(geom) == MultiPolygon:
        for j in zone_areas[i]:
            plt.plot(*j.exterior.xy)
    else:
        plt.plot(*geom.exterior.xy)

#for i in range(0, len(bikestart_lat_lng)):
#    p = Point(bikestart_lat_lng.at[i,'start station latitude'], bikestart_lat_lng.at[i,'start station longitude'])
#    plt.plot(p)
plt.show()