import pandas as pd
import numpy as np
import datetime

chunksize = 500000

relevant_zones = [4, 7, 8, 12, 13, 17, 24, 25, 33, 34, 36, 37, 40, 41, 42, 43, 45, 47, 48, 49, 50, 52, 54, 59, 60, 61, 62, 65, 66, 68, 69, 74, 75, 79, 80, 87, 88, 90, 94, 97, 100, 106, 107, 112, 113, 114, 116, 119, 120, 125, 126, 127, 128, 136, 137, 140, 141, 142, 143, 144, 145, 146, 147, 148, 151, 152, 158, 159, 161, 162, 163, 164, 166, 167, 168, 169, 170, 177, 179, 181, 186, 188, 189, 190, 193, 194, 195, 198, 202, 209, 211, 217, 223, 224, 225, 226, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 243, 244, 246, 247, 249, 255, 256, 261, 262, 263]

data = {'Weekdays':["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"]}

def simplifybike(path):

    #Count bike
    bikedata =pd.read_csv(path)
    for i,startzone  in enumerate(relevant_zones):
        weekdaysdf = pd.DataFrame(data)
        weekdayarr = np.array([[0,0,0,0,0,0,0]])
        df = bikedata.loc[(bikedata['start_zoneID']== startzone)]
        weekdays = [(datetime.datetime.strptime(i,'%Y-%m-%d %H:%M:%S')).weekday() for i in df.started_at]
        df.insert(0, "weekday", weekdays, True)
        for j in range(0,7):
            weekdayarr[0,j] = weekdayarr[0,j]+ len(df.loc[(df['weekday']== j)])
        weekdaysdf.insert(loc=1,column="Bike", value=weekdayarr.T)
        weekdaysdf.to_csv(f"data/dataforeachzoneid/weekday_locidindex{i}.csv", index=False)

# simplifybike('data/finaldata/bikedata_07_ID.csv')

def simplifytaxi(path):
    taxidata = pd.read_csv(path)
    for i, pickupzone in enumerate(relevant_zones):
        weekdaysdf = pd.read_csv(f'data/dataforeachzoneid/weekday_locidindex{i}.csv')
        weekdayarr = np.array([[0,0,0,0,0,0,0]])
        df = taxidata.loc[(taxidata['PULocationID']== pickupzone)]
        weekdays = [(datetime.datetime.strptime(i,'%m/%d/%Y %I:%M:%S %p')).weekday() for i in df.tpep_pickup_datetime]
        df.insert(0, "weekday", weekdays, True)
        for j in range(0,7):
            weekdayarr[0,j] = weekdayarr[0,j] + len(df.loc[(df['weekday']== j)])
        weekdaysdf.insert(loc=1,column="Taxi", value=weekdayarr.T)
        weekdaysdf.to_csv(f"data/dataforeachzoneid/weekday_locidindex{i}.csv", index=False)
        

# simplifytaxi('data/finaldata/taxi07.csv')

def simplifyfullview(bikepath,taxipath):
    weekdaysdf = pd.DataFrame(data)
    weekdayarr = np.array([[0,0,0,0,0,0,0]])
    bikedata =pd.read_csv(bikepath)
    for i,startzone  in enumerate(relevant_zones):
        df = bikedata.loc[(bikedata['start_zoneID']== startzone)]
        weekdays = [(datetime.datetime.strptime(i,'%Y-%m-%d %H:%M:%S')).weekday() for i in df.started_at]
        df.insert(0, "weekday", weekdays, True)
        for j in range(0,7):
            weekdayarr[0,j] = weekdayarr[0,j]+ len(df.loc[(df['weekday']== j)])
    weekdaysdf.insert(loc=1,column="Bike", value=weekdayarr.T)
    
    
    taxidata = pd.read_csv(taxipath)
    weekdayarr = np.array([[0,0,0,0,0,0,0]])
    for i, pickupzone in enumerate(relevant_zones):
        df = taxidata.loc[(taxidata['PULocationID']== pickupzone)]
        weekdays = [(datetime.datetime.strptime(i,'%m/%d/%Y %I:%M:%S %p')).weekday() for i in df.tpep_pickup_datetime]
        df.insert(0, "weekday", weekdays, True)
        for j in range(0,7):
            weekdayarr[0,j] = weekdayarr[0,j] + len(df.loc[(df['weekday']== j)])
    weekdaysdf.insert(loc=1,column="Taxi", value=weekdayarr.T)
    weekdaysdf.to_csv(f"data/dataforeachzoneid/standardview/weekdayallzones.csv", index=False)


# simplifyfullview(bikepath='data/finaldata/bikedata_07_ID.csv', taxipath='data/finaldata/taxi07.csv')

def zoneid_with_name():
    df = pd.read_csv("data/zones/relevant_zones/relevant_zones.csv", usecols=['zone','LocationID'])
    print(df)
    df_json = df.to_json()
    with open('data/zones/relevant_zones/idandname.json', "w") as outfile:
        outfile.write(df_json)

        
# zoneid_with_name()        
