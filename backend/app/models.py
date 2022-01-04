from . import db

# About models.py
# Python script that connects to the database and creates the following tables if tey do not alerady exist.

# USER TABLE
# Create user table with appropriate column names and types. 
class User(db.Model):
    """Model for user accounts."""

    __tablename__ = 'user'
    id = db.Column(db.Integer,
                   primary_key=True)
    username = db.Column(db.String(64),
                         index=False,
                         unique=True,
                         nullable=False)
    email = db.Column(db.String(80),
                      index=True,
                      unique=False,
                      nullable=False)
    password = db.Column(db.String(80),
                         index=True,
                         unique=False,
                         nullable=False)
    dateCreated = db.Column(db.DateTime,
                            index=False,
                            unique=False,
                            nullable=False)
    isParked = db.Column(db.Integer,
                         index=False,
                         unique=False,
                         nullable=False)
    isHandicapped = db.Column(db.Integer,
                              index=False,
                              unique=False,
                              nullable=False)
    points = db.Column(db.Integer,
                       index=False,
                       unique=False,
                       nullable=True)
    status = db.Column(db.Integer,
                       index=False,
                       unique=False,
                       nullable=False)

    lotParked = db.Column(db.Integer,
                          index=False,
                          unique=False,
                          nullable=False)

    typeSpot = db.Column(db.Integer,
                         index=False,
                         unique=False,
                         nullable=False)

    def __repr__(self):
        return '<User {}>'.format(self.username)


# LOT TABLE
# Create lot table with appropriate column names and types. 
class Lot(db.Model):
    """Model for user accounts."""

    __tablename__ = 'lot'
    id = db.Column(db.Integer,
                   primary_key=True)
    name = db.Column(db.String(64),
                     index=False,
                     unique=True,
                     nullable=False)
    capacity = db.Column(db.Integer,
                         index=False,
                         unique=False,
                         nullable=False)
    spotsAvailable = db.Column(db.Integer,
                               index=False,
                               unique=False,
                               nullable=False)
    totalHandicapSpots = db.Column(db.Integer,
                                   index=False,
                                   unique=False,
                                   nullable=False)
    handicapSpotsAvailable = db.Column(db.Integer,
                                       index=False,
                                       unique=False,
                                       nullable=False)
    latitude = db.Column(db.Integer,
                         index=False,
                         unique=False,
                         nullable=False)
    longitude = db.Column(db.Integer,
                          index=False,
                          unique=False,
                          nullable=False)
    lotType = db.Column(db.Integer,
                        index=False,
                        unique=False,
                        nullable=True)
    checkedInRegular = db.Column(db.Integer,
                                 index=False,
                                 unique=False,
                                 nullable=True)
    checkedInHandicap = db.Column(db.Integer,
                                  index=False,
                                  unique=False,
                                  nullable=True)

    def __repr__(self):
        return '<Lot {}>'.format(self.name)
