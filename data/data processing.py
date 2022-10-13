import pandas as pd
import numpy as np
from shapely.geometry import Point, Polygon, MultiPolygon
import matplotlib.pyplot as plt
from datetime import datetime
nrows = 50000

#bikedata
bikedata = pd.read_csv('data/citibike/202101-citibike-tripdata.csv',nrows=nrows)

#zone data
zonedataraw = pd.read_csv('data/zones/taxi_zones.csv',)
bikezones =[4, 7, 8, 12, 13, 17, 24, 25, 33, 34, 36, 37, 40, 41, 42, 43, 45, 47, 48, 49, 50, 52, 54, 59, 60, 61, 62, 65, 66, 68, 69, 74, 75, 79, 80, 87, 88, 90, 97, 100, 106, 107, 112, 113, 114, 116, 119, 120, 125, 126, 137, 140, 141, 142, 143, 144, 145, 146, 147, 148, 151, 152, 158, 159, 161, 162, 163, 164, 166, 167, 168, 169, 170, 177, 179, 181, 186, 188, 189, 190, 193, 194, 195, 198, 202, 209, 211, 217, 223, 224, 225, 226, 228, 229, 230, 231, 232, 233, 234, 236, 237, 238, 239, 243, 244, 246, 247, 249, 255, 256, 261, 262, 263]
zonedata = zonedataraw.loc[zonedataraw['LocationID'].isin(bikezones)].reset_index()
zonedata.to_csv('data/zones/relevant_zones/relevant_zones.csv', index=False)

zonearea_lat_lng = zonedata["the_geom"]
zone_areas = []

#taxi data
taxidataraw = pd.read_csv('data/taxi/2021_Yellow_Taxi_Trip_Data.csv',nrows=nrows)
taxidata = taxidataraw.loc[(taxidataraw['PULocationID'].isin(bikezones)) & (taxidataraw['DOLocationID'].isin(bikezones))].reset_index()

def taxitrip_duration(taxidata):
    dur_arr =[]
    for i in range(0,len(taxidata)):
        start = datetime.strptime(taxidata.at[i,'tpep_pickup_datetime'], '%m/%d/%Y %I:%M:%S %p')
        end = datetime.strptime(taxidata.at[i,'tpep_dropoff_datetime'], '%m/%d/%Y %I:%M:%S %p')
        dur_arr.append((end-start).total_seconds())
    return dur_arr

taxidata.insert(0, "tripduration", taxitrip_duration(taxidata=taxidata), True)

#create a small sample of taxi data
taxidata.to_csv('data/datastubs/testtaxidata.csv', index=False)




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


# please update doc
def get_zone_from_lat_lng(bikedata):
    #array of zone for bikes
    bikestartzonearr =[]
    bikeendzonearr =[]
    taxidurationarr = []
    for i in range(0, len(bikedata)):#len(bikestart_lat_lng)):
        pstart = Point(bikedata.at[i,'start station longitude'], bikedata.at[i,'start station latitude'])
        pend = Point(bikedata.at[i,'end station longitude'], bikedata.at[i,'end station latitude'])
        for (j,geom) in enumerate(zone_areas):
            locID=zonedata.at[j,'LocationID']
            if type(geom) == MultiPolygon:
                for k in geom.geoms:
                    if pstart.within(k):
                        bikestartzonearr.append(locID)
                    if pend.within(k):
                        bikeendzonearr.append(locID)
            else:
                if pstart.within(geom):
                    bikestartzonearr.append(locID)
                if pend.within(geom):
                    bikeendzonearr.append(locID)

            if len(bikeendzonearr) == i+1 and len(bikestartzonearr) == i+1:
                break
    return (bikestartzonearr,bikeendzonearr)


(bikestartzonearr,bikeendzonearr) = get_zone_from_lat_lng(bikedata=bikedata)
bikedata.insert(0, "start zone loc id",bikestartzonearr, True)
bikedata.insert(1, "end zone loc id",bikeendzonearr, True)



#create a small sample of bike data for testing
bikedata.to_csv('data/datastubs/testbikedata.csv',index=False)


def plotzones():
    for (i,geom) in enumerate(zone_areas):
            if type(geom) == MultiPolygon:
                for j in zone_areas[i]:
                    plt.plot(*j.exterior.xy)
            else:
                plt.plot(*geom.exterior.xy)

    for i in range(0, len(bikedata)):
        p = Point(bikedata.at[i,'start station longitude'], bikedata.at[i,'start station latitude'])
        plt.plot(*p.xy, '.')
    plt.show()
