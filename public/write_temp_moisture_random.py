import random
import time
import datetime

# Write a line in file f, with time t
def write_line(f, t):
    curr_temp = str(140 + 20*random.random())
    curr_humid = str(50 + 10*random.random())
    f.write(",".join([t, curr_temp, curr_humid, str(140), str(160), str(40), str(60)]) + "\n")
    
while True:
    # Write the previous 20 values
    f = open("temp_moisture_read_hardcode.csv", "w")
    f.write("day,temp,humidity,idealTempMin,idealTempMax,idealHumidityMin,idealHumidityMax\n")
    for i in range(20):
        newtime = datetime.datetime.now() - (20-i)*datetime.timedelta(seconds=5)
        write_line(f, newtime.strftime("%Y-%m-%d %H:%M:%S"))

    f.close()

    # Write the live file
    f = open("temp_moisture_read_live_hardcode.csv", "w")
    curr_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    f.write("day,temp,humidity,idealTempMin,idealTempMax,idealHumidityMin,idealHumidityMax\n")
    write_line(f, curr_time)
    f.close()
    time.sleep(5)
