from flask import request, render_template, make_response, Flask, jsonify
from datetime import datetime as dt
from flask import current_app as app
from .models import db, User, Lot
from sqlalchemy import or_
import hashlib


# About routes.py:
# Python script to facilitate the POST and GET requests between the SQL database and js component files. 



# TEST REQUEST
@app.route('/', methods=['GET'])
def home():
    """Testing the API."""
    return make_response("Hello World")

# SIGN UP
# Post request to send the information entered by the user to the user table within the database. The password gets hashed using the HASHLIB library 
# before being sent to the database.
@app.route('/signUp', methods=['POST'])
def sign_up():
    """Sign up user"""
    user_data = request.get_json()

    username = user_data['user']
    email = user_data['email']
    password = user_data['password']
    handicap = user_data['handicap']
    status = user_data['status']

    if username and email and password:
        existing_username = User.query.filter(
            User.username == username).first()
        existing_email = User.query.filter(
            User.email == email).first()

        if existing_username or existing_email:
            return 'Account already exists', 400

        hashed_pw = hashlib.sha256(password.encode())

        new_user = User(username=username,
                        email=email,
                        password=hashed_pw.hexdigest(),
                        dateCreated=dt.now(),
                        isParked=0,
                        isHandicapped=handicap,
                        points=0,
                        status=status,
                        lotParked=0,
                        typeSpot=0
                        )
        db.session.add(new_user)
        db.session.commit()

    return 'User successfully added', 201


# LOG IN 
# Post request to check the database if the information entered by the user (Username and Password) matches a user in the database.
@app.route('/login', methods=['POST'])
def log_in():
    login_data = request.get_json()

    username = login_data['user']
    password = login_data['password']

    hashed_pw = hashlib.sha256(password.encode())

    if username and password:
        existing_user = User.query.filter(
            User.username == username).filter(User.password == hashed_pw.hexdigest()).first()

        if existing_user:
            return jsonify(id=existing_user.id), 200

        else:
            return "No user found", 400


# CHECK OUT
# Post request to check the currently logged-in user to a specific lot.
@app.route('/checkin', methods=['POST'])
def check_in():
    login_data = request.get_json()

    checkin_user = login_data['user']
    checkin_lot = login_data['lot']

    if checkin_user and checkin_lot:
        existing_user = User.query.filter(
            User.id == checkin_user).first()

        if existing_user:
            existing_user.points += 1
            existing_user.isParked = 1
            existing_user.lotParked = checkin_lot

            parking_lot = Lot.query.filter(Lot.id == checkin_lot).first()
            if existing_user.isHandicapped == 1:
                parking_lot.handicapSpotsAvailable -= 1
                parking_lot.checkedInHandicap += 1
                existing_user.typeSpot = 2
            else:
                parking_lot.spotsAvailable -= 1
                parking_lot.checkedInRegular += 1
                existing_user.typeSpot = 1

            db.session.commit()
            return "Check-In successful", 200
        else:
            return "User not found", 400

    else:
        return "User or lot not found", 400


# CHECK OUT
# Post request to check the currently logged-in user to a specific lot. 
@app.route('/checkout', methods=['POST'])
def check_out():
    login_data = request.get_json()

    checkout_user = login_data['user']
    checkout_lot = login_data['lot']

    if checkout_user and checkout_lot:
        existing_user = User.query.filter(
            User.id == checkout_user).first()

        if existing_user:
            existing_user.isParked = 0
            existing_user.lotParked = 0

            parking_lot = Lot.query.filter(Lot.id == checkout_lot).first()
            if existing_user.typeSpot == 2:
                parking_lot.handicapSpotsAvailable += 1
                parking_lot.checkedInHandicap -= 1
                existing_user.typeSpot = 0
            else:
                parking_lot.spotsAvailable += 1
                parking_lot.checkedInRegular -= 1
                existing_user.typeSpot = 0

            db.session.commit()
            return "Check-Out successful", 200
        else:
            return "User not found", 400

    else:
        return "User or lot not found", 400



# LOT INFO
# Get request to send a specific lots fields to a component file. Data is sent in JSON format.
@app.route('/lotinfo', methods=['GET'])
def lot_info():
    lot_id = request.args.get('lot')

    existing_lot = Lot.query.filter(
        Lot.id == lot_id).first()

    if existing_lot:
        return jsonify(
            id=existing_lot.id,
            name=existing_lot.name,
            capacity=existing_lot.capacity,
            spots_available=existing_lot.spotsAvailable,
            total_handicap_spots=existing_lot.totalHandicapSpots,
            handicap_spots_available=existing_lot.handicapSpotsAvailable,
            lot_type=existing_lot.lotType
        )


# ALL LOTS
# Get request to send the information of all lots to a component file. Data is sent in JSON format.
@app.route('/allLots', methods=['GET'])
def all_lots():
    lots = Lot.query.order_by(Lot.name).all()
    all_lots = [{'id': lot.id, 'name': lot.name, 'capacity': lot.capacity, 'spots_available': lot.spotsAvailable,
                 'total_handicap_spots': lot.totalHandicapSpots, 'lot_type': lot.lotType,
                 'handicap_spots_available': lot.handicapSpotsAvailable, 'latitude': lot.latitude, 'longitude': lot.longitude} for lot in lots]

    return jsonify(all_lots)



# IS CHECKED IN
# Get request to check the check in status of a user. 
@app.route('/isCheckedIn', methods=['GET'])
def is_checked_in():
    username = request.args.get('user')

    existing_user = User.query.filter(
        User.id == username).first()

    if existing_user.isParked == 1:
        return jsonify(parked_id=existing_user.lotParked)
    else:
        return "Not checked in", 404



# SCORES
# Get request to retrieve the scores of all users.
@app.route('/scores', methods=['GET'])
def scores():
    users = User.query.all()
    all_users = [{'id': user.id, 'username': user.username,
                  'score': user.points} for user in users]
    newlist = sorted(all_users, key=lambda k: k['score'], reverse=True)
    return jsonify(newlist)



# UPDATE USERNAME
# Post request to change the username of the currently logged-in user. 
@app.route('/updateUsername', methods=['POST'])
def update_username():
    login_data = request.get_json()
    username = login_data['user']
    new_username = login_data['new_username']

    existing_user = User.query.filter(
        User.id == username).first()

    already_exists = User.query.filter(
        User.username == new_username).first()

    if existing_user:
        if not already_exists:
            existing_user.username = new_username
            db.session.commit()
            return 'Successful username update', 200
        else:
            return 'A user with this username already exists', 404

    else:
        return 'Could not find user', 400



# UPDATE PASSWORD
# Get request to change the password of the currently logged-in user. 
@app.route('/updatePassword', methods=['POST'])
def update_password():
    login_data = request.get_json()
    username = login_data['user']
    password = login_data['password']
    new_password = login_data['new_password']

    hashed_pw = hashlib.sha256(password.encode())

    existing_user = User.query.filter(
        User.id == username).first()

    if existing_user:
        if existing_user.password == hashed_pw.hexdigest():
            new_hashed_pw = hashlib.sha256(new_password.encode())
            existing_user.password = new_hashed_pw.hexdigest()
            db.session.commit()
            return 'Successful password change', 200
        else:
            return 'Your current password does not match', 404

    else:
        return 'Could not find user', 400


@app.route('/updateHandicap', methods=['POST'])
def update_handicap():
    login_data = request.get_json()
    username = login_data['user']
    new_handicap = login_data['handicap']

    existing_user = User.query.filter(
        User.id == username).first()

    if existing_user:
        existing_user.isHandicapped = new_handicap
        db.session.commit()
        return 'Successful handicap status change', 200

    else:
        return 'User does not exist', 400



# CHECK IF GUEST EXISTS
# Post request to check if a guest account exists for a particular device ID.
@app.route('/checkGuestExists', methods=['POST'])
def check_guest_exists():
    login_data = request.get_json()
    guest_id = login_data['guest_id']

    existing_guest = User.query.filter(User.username == guest_id).first()

    if existing_guest:
        return jsonify(id=existing_guest.id), 200
    else:
        return "No guest with this ID", 400


# CREATE GUEST USER
# Post request to create a new guest account based on the user's device ID.
@app.route('/createGuestUser', methods=['POST'])
def create_guest_user():
    login_data = request.get_json()
    guest_id = login_data['guest_id']
    password = 'password'

    hashed_pw = hashlib.sha256(password.encode())

    new_user = User(username=guest_id,
                    email="guest@speedy.org",
                    password=hashed_pw.hexdigest(),
                    dateCreated=dt.now(),
                    isParked=0,
                    isHandicapped=0,
                    points=0,
                    status=0,
                    lotParked=0,
                    typeSpot=0
                    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(id=new_user.id), 200



# UPDATE EMAIL
# Post request to update the email of the currently logged-in user. 
@app.route('/updateEmail', methods=['POST'])
def update_email():
    login_data = request.get_json()
    username = login_data['user']
    new_email = login_data['new_email']

    existing_user = User.query.filter(
        User.id == username).first()

    if existing_user:
        existing_user.email = new_email
        db.session.commit()
        return 'Successful email update', 200
    else:
        return 'A user with this username could not be found', 400



# UPDATE THE STATUS OF A USER
# Post request to update the status field of the currently logged-in user. 
@app.route('/updateStatus', methods=['POST'])
def update_status():
    login_data = request.get_json()
    username = login_data['user']
    new_status = login_data['status']

    existing_user = User.query.filter(
        User.id == username).first()

    if existing_user:
        existing_user.status = new_status
        db.session.commit()
        return 'Successful status change', 200

    else:
        return 'User does not exist', 400
