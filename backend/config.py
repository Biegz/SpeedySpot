from os import environ

# DEFINE THE PARAMETERS OF THE DATABASE IN ORDER TO ESTABLISH CONNECTION
class Config:

    FLASK_DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://admin:$peedy$pot@database-1.crfi8mxrzvs2.us-east-2.rds.amazonaws.com:3306/default_schema'
