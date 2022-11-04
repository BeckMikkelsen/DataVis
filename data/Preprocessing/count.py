import pandas as pd
import numpy as np

chunksize = 500000

zonedata = pd.read_csv('data/zones/relevant_zones/relevant_zones.csv') #len of zonedata is 113
zonedata = zonedata.sort_values(by=['LocationID']).reset_index()

def create_zone_dict():
    zonedict = {}
    print(zonedata)
        
relevant_zones = [4, 7, 8, 12, 13, 17, 24, 25, 33, 34, 36, 37, 40, 41, 42, 43, 45, 47, 48, 49, 50, 52, 54, 59, 60, 61, 62, 65, 66, 68, 69, 74, 75, 79, 80, 87, 88, 90, 94, 97, 100, 106, 107, 112, 113, 114, 116, 119, 120, 125, 126, 127, 128, 136, 137, 140, 141, 142, 143, 144, 145, 146, 147, 148, 151, 152, 158, 159, 161, 162, 163, 164, 166, 167, 168, 169, 170, 177, 179, 181, 186, 188, 189, 190, 193, 194, 195, 198, 202, 209, 211, 217, 223, 224, 225, 226, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 243, 244, 246, 247, 249, 255, 256, 261, 262, 263]


def count_instances_of_trip_taxi():
    #Count taxi
    taxi_trip_amount = np.zeros((len(relevant_zones),len(relevant_zones)))
    for taxidata_chunk in pd.read_csv('data/finaldata/taxi07.csv',chunksize=chunksize):
        for i,pickup  in enumerate(relevant_zones):
            for j,dropoff in enumerate(relevant_zones):
                count = 0
                count = count + len(taxidata_chunk.loc[(taxidata_chunk['PULocationID']== pickup) & (taxidata_chunk['DOLocationID'] == dropoff)])
                taxi_trip_amount[i,j] += count
    json_taxitrip = pd.DataFrame(taxi_trip_amount).to_json()
    with open('taxitrips.json', "w") as outfile:
        outfile.write(json_taxitrip)
    
def count_instances_of_trip_bike():
    #Count bike
    bike_trip_amount = np.zeros((len(relevant_zones),len(relevant_zones)))

    for bikedata_chunk in pd.read_csv('data/finaldata/bikedata_07_ID.csv', chunksize=chunksize):
        for i,startzone  in enumerate(relevant_zones):
            for j,endzone in enumerate(relevant_zones):
                count = 0
                count = count + len(bikedata_chunk.loc[(bikedata_chunk['start_zoneID']== startzone) & (bikedata_chunk['end_zoneID'] == endzone)])
                bike_trip_amount[i,j] += count
    json_biketrip = pd.DataFrame(bike_trip_amount).to_json()
    with open('biketrips.json', "w") as outfile:
        outfile.write(json_biketrip)


def count_instances_sample():
    #Count taxi
    taxi_trip_amount = np.zeros((len(relevant_zones),len(relevant_zones)))
    td = pd.read_csv('data/sample data/taxisample.csv')
    for i,pickup  in enumerate(relevant_zones):
        for j,dropoff in enumerate(relevant_zones):
            count = 0
            count = count + len(td.loc[(td['PULocationID']== pickup) & (td['DOLocationID'] == dropoff)])
            taxi_trip_amount[i,j] += count
    json_taxitrip = pd.DataFrame(taxi_trip_amount).to_json()
    with open('taxitripssample.json', "w") as outfile:
        outfile.write(json_taxitrip)

    #count bike
    bike_trip_amount = np.zeros((len(relevant_zones),len(relevant_zones)))

    bd= pd.read_csv('data/sample data/bikesample.csv')
    for i,startzone  in enumerate(relevant_zones):
        for j,endzone in enumerate(relevant_zones):
            count = 0
            count = count + len(bd.loc[(bd['start_zoneID']== startzone) & (bd['end_zoneID'] == endzone)])
            bike_trip_amount[i,j] += count
    
    json_biketrip = pd.DataFrame(bike_trip_amount).to_json()
    with open('biketripssample.json', "w") as outfile:
        outfile.write(json_biketrip)


count_instances_sample()