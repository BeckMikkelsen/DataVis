import pandas as pd
from datetime import datetime


bikezones =[4, 7, 8, 12, 13, 17, 24, 25, 33, 34, 36, 37, 40, 41, 42, 43, 45, 47, 48, 49, 50, 52, 54, 59, 60, 61, 62, 65, 66, 68, 69, 74, 75, 79, 80, 87, 88, 90, 94, 97, 100, 106, 107, 112, 113, 114, 116, 119, 120, 125, 126, 127, 128, 136, 137, 140, 141, 142, 143, 144, 145, 146, 147, 148, 151, 152, 158, 159, 161, 162, 163, 164, 166, 167, 168, 169, 170, 177, 179, 181, 186, 188, 189, 190, 193, 194, 195, 198, 202, 209, 211, 217, 223, 224, 225, 226, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 243, 244, 246, 247, 249, 255, 256, 261, 262, 263]
days = ["Mon", "Tue", "Wedn", "Thu", "Fri", "Sat","Sun"]

# Find the duration for all data points in bikedata_07
def append_duration_bike():
    bikedata = pd.read_csv('data/finaldata/bikedata_07_ID.csv')
    dur_arr =[]
    for i in range(0,len(bikedata)):
        start = datetime.strptime(bikedata.at[i,'started_at'], '%Y-%m-%d %H:%M:%S')
        end = datetime.strptime(bikedata.at[i,'ended_at'], '%Y-%m-%d %H:%M:%S')
        dur_arr.append((end-start).total_seconds())

    # Insert the duration in the whole data set
    bikedata.insert(loc= 0, column=["duration"], value=dur_arr, allow_duplicates=True)
    bikedata.to_csv("data/finaldata/bikedata_07_duration.csv")

# Find the duration for all data points in taxi
def append_duration_taxi():
    taxidata = pd.read_csv('data/finaldata/taxi07.csv')
    dur_arr =[]
    for i in range(0,len(taxidata)):
        start = datetime.strptime(taxidata.at[i,'tpep_pickup_datetime'], '%m/%d/%Y %I:%M:%S %p')
        end = datetime.strptime(taxidata.at[i,'tpep_dropoff_datetime'], '%m/%d/%Y %I:%M:%S %p')
        dur_arr.append((end-start).total_seconds())

    # Insert the duration in the whole data set
    taxidata.insert(loc= 0, column=["duration"], value=dur_arr, allow_duplicates=True)
    taxidata.to_csv("data/finaldata/taxi07_duration.csv", index=False)

# Make one data set for each zone having only monday
def bike_rides_monday():
    bikedata = pd.read_csv('data/finaldata/bikedata_07_duration.csv', usecols=["duration", "start_zoneID", "started_at"])
    for i in range(0,len(bikezones)):
        df = bikedata.loc[bikedata["start_zoneID"] == bikezones[i]]
        weekdays = [(datetime.strptime(i,'%Y-%m-%d %H:%M:%S')).weekday() for i in df.started_at]
        df.insert(0, "weekday", weekdays, True)
        df = df.loc[df['weekday'] == 0]
        df.insert(0, "ride_type", "bike", True)
        #df['started_at'] = [(i.split(' '))[1] for i in df.started_at]
        df.to_csv(f'data/duration/mon/bike/bikedata_duration_{i}.csv', index=False)

# Make one data set for each zone having only monday
def taxi_rides_monday():
    taxidata = pd.read_csv('data/finaldata/taxi07_duration.csv', usecols=["duration", "PULocationID", "tpep_pickup_datetime"])
    for i in range(0,len(bikezones)):
        df = taxidata.loc[taxidata["PULocationID"] == bikezones[i]]
        col_titles = ["duration", "PULocationID", "tpep_pickup_datetime"]
        df = df.reindex(columns=col_titles)
        weekdays = [(datetime.strptime(i,'%m/%d/%Y %I:%M:%S %p')).weekday() for i in df.tpep_pickup_datetime]
        df.insert(0, "weekday", weekdays, True)
        df = df.loc[df['weekday'] == 0]
        df.insert(0, "ride_type", "taxi", True)
       
        #df['started_at'] = [(i.split(' '))[1] for i in df.started_at]
        df.to_csv(f'data/duration/mon/bike/bikedata_duration_{i}.csv', mode='a', header=False,index=False)

bike_rides_monday()
taxi_rides_monday()