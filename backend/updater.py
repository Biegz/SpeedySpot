from apscheduler.schedulers.blocking import BlockingScheduler
import mysql.connector
import datetime


# About updater.py
# Python script that updates the availability of each type of lot every hour. Although it does not directly update with the true availability of each lot, this is
# done to approximate the availability of each lot to a figure that is as close as possible to the true availaability (with the data currently provided). 


# Establish a connection to the database
mydb = mysql.connector.connect(
    host="database-1.crfi8mxrzvs2.us-east-2.rds.amazonaws.com",
    user="admin",
    passwd="$peedy$pot",
    database="default_schema"
)

# MATRIX DEFINITION
# Avilability percentage by time matrix [From Time, To Time, Percent Available] (Time is in UTC format)

# UPDATE FACULTY LOTS
def facultyUpdater():
    arr = [	[5, 10, .90],  # 12am-5am
            [10, 12, .75],  # 5am-7am...
            [12, 13, .45],
            [13, 14, .20],
            [14, 15, .10],
            [15, 16, .05],
            [16, 17, .10],
            [17, 18, .25],
            [18, 19, .15],
            [19, 20, .10],
            [20, 21, .05],
            [21, 22, .15],
            [22, 24, .65],
            [0, 5, .85], ]

    # Make all lots available if it is Saturday or Sunday (IN UTC TIME ZONE)
    d = datetime.datetime.now()
    if datetime.datetime.today().weekday() == 5 and d.hour in range(5, 24):
        makeAllAvailable()
    elif datetime.datetime.today().weekday() == 6:
        makeAllAvailable()
    elif datetime.datetime.today().weekday() == 0 and d.hour in range(0, 5):
        makeAllAvailable()
    else:
        for x in arr:
            if d.hour in range(x[0], x[1]):
                mycursor = mydb.cursor()
                var = x[2]
                print("Facultys current lot availability:\t", var)

                # ------------------------- Regular Parking --------------------------------
                sql = "UPDATE lot SET spotsAvailable = FLOOR(capacity*%s - checkedInRegular) Where lotType = 1"
                mycursor.execute(sql, (var,))

                # ------------------------- Handicap Parking --------------------------------
                sql2 = "UPDATE lot SET handicapSpotsAvailable = FLOOR(totalHandicapSpots*%s - checkedInHandicap) Where lotType = 1"
                mycursor.execute(sql2, (var,))

                mydb.commit()


#UPDATE COMMUTER LOTS
def commuterUpdater():
    arr = [	[5, 10, .90],  # 12am-5am
            [10, 12, .75],  # 5am-7am...
            [12, 13, .45],
            [13, 14, .20],
            [14, 15, .10],
            [15, 16, .05],
            [16, 17, .05],
            [17, 18, .10],
            [18, 19, .10],
            [19, 20, .15],
            [20, 21, .15],
            [21, 22, .15],
            [22, 24, .45],
            [0, 5, .65], ]

    # Make all lots available if it is Saturday or Sunday (IN UTC TIME ZONE)
    d = datetime.datetime.now()
    if datetime.datetime.today().weekday() == 5 and d.hour in range(5, 24):
        makeAllAvailable()
    elif datetime.datetime.today().weekday() == 6:
        makeAllAvailable()
    elif datetime.datetime.today().weekday() == 0 and d.hour in range(0, 5):
        makeAllAvailable()
    else:
        for x in arr:
            if d.hour in range(x[0], x[1]):
                mycursor = mydb.cursor()
                var = x[2]
                print("Commuters current lot availability:\t", var)

                # ------------------------- Regular Parking --------------------------------
                sql = "UPDATE lot SET spotsAvailable = FLOOR(capacity*%s - checkedInRegular) Where lotType = 2"
                mycursor.execute(sql, (var,))

                # ------------------------- Handicap Parking --------------------------------
                sql2 = "UPDATE lot SET handicapSpotsAvailable = FLOOR(totalHandicapSpots*%s - checkedInHandicap) Where lotType = 2"
                mycursor.execute(sql2, (var,))

                mydb.commit()


# UPDATES RESIDENTIAL LOTS
def residentUpdater():
    arr = [	[5, 10, .15],  # 12am-5am
            [10, 12, .15],  # 5am-7am...
            [12, 13, .15],
            [13, 14, .15],
            [14, 15, .15],
            [15, 16, .15],
            [16, 17, .15],
            [17, 18, .15],
            [18, 19, .15],
            [19, 20, .15],
            [20, 21, .15],
            [21, 22, .15],
            [22, 24, .15],
            [0, 5, .15], ]

    # Make all lots available if it is Saturday or Sunday (IN UTC TIME ZONE)
    d = datetime.datetime.now()
    if datetime.datetime.today().weekday() == 5 and d.hour in range(5, 24):
        makeAllAvailable()
    elif datetime.datetime.today().weekday() == 6:
        makeAllAvailable()
    elif datetime.datetime.today().weekday() == 0 and d.hour in range(0, 5):
        makeAllAvailable()
    else:
        for x in arr:
            if d.hour in range(x[0], x[1]):
                mycursor = mydb.cursor()
                var = x[2]
                print("Residents current lot availability:\t", var)

                # ------------------------- Regular Parking --------------------------------
                sql = "UPDATE lot SET spotsAvailable = FLOOR(capacity*%s - checkedInRegular) Where lotType = 3"
                mycursor.execute(sql, (var,))

                # ------------------------- Handicap Parking --------------------------------
                sql2 = "UPDATE lot SET handicapSpotsAvailable = FLOOR(totalHandicapSpots*%s - checkedInHandicap) Where lotType = 3"
                mycursor.execute(sql2, (var,))

                mydb.commit()


# UPDATE ALL LOTS TO COMPLETELY AVAILABLE (WEEKENDS)
def makeAllAvailable():
    print('Making all lots available')
    mycursor = mydb.cursor()

    # ------------------------- Regular Parking --------------------------------
    sql = "UPDATE lot SET spotsAvailable = FLOOR(capacity*.85 - checkedInRegular)"
    mycursor.execute(sql)

    # ------------------------- Handicap Parking --------------------------------
    sql2 = "UPDATE lot SET handicapSpotsAvailable = FLOOR(totalHandicapSpots*.85 - checkedInHandicap)"
    mycursor.execute(sql2)

    mydb.commit()


# Blocking scheduler library used to call each of the funtions above once an hour
scheduler = BlockingScheduler()
scheduler.add_job(facultyUpdater, 'interval', hours=1)
scheduler.add_job(commuterUpdater, 'interval', hours=1)
scheduler.add_job(residentUpdater, 'interval', hours=1)
scheduler.start()
