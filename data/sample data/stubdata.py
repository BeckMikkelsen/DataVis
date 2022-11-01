import pandas as pd
import random

def sample(filepath, sample_size, write_to_file):
    # The data to load
    f = filepath

    # Count the lines
    num_lines = sum(1 for l in open(f))

    # Sample size - in this case ~10%
    size = int(num_lines / sample_size)

    # The row indices to skip - make sure 0 is not included to keep the header!
    skip_idx = random.sample(range(1, num_lines), num_lines - size)

    # Read the data
    data = pd.read_csv(f, skiprows=skip_idx)

    data.to_csv(write_to_file,index=False)


sample('data/finaldata/bikedata_07_ID.csv',10,'data/sample data/bikesample.csv')
sample('data/finaldata/taxi07.csv',10,'data/sample data/taxisample.csv')




