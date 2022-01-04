# SpeedySpot
SpeedySpot is an Android/iOS app created to help alleviate parking congestion at Stony Brook University. The app uses a
crowdsourced model, by which faculty, staff, and students could input their current parking location into one of the various
parking lots available on the app. This way, with enough users, we would have an accurate idea as to how many spots are available
in each parking lot, which would save lots of time and reduce the stress that comes from not being able to find a spot when you
need it the most. 

This app was created as part of a Stony Brook Honors College & Computer Science research project studying the 
effect that incentivizing a crowdsourced app would have on its usability. The faculty advisor for this project was Professor
Tony Scarlatos of the Department of Computer Science at Stony Brook University. 

## Installation
### App (Front-End)
First, use the package manager [npm](https://www.npmjs.com/) to install the expo-cli and react-native-cli.
```bash
npm install -g expo-cli
npm install –g react-native-cli
```
Next, from the app folder, run the following command:
```bash
npm install
```
This will install all of dependencies as listed in the package.json file in SpeedySpot/app/
### API (Back-End)
To run the Flask API locally, please follow the instructions below: 

First, navigate to the "backend" folder. From there you can activate the virtual enviornment by running the command:
```bash
source venv/bin/activate
```
Once you are in the envrionment, use the package manager [pip](https://pip.pypa.io/en/stable/) to install all the necessary packages. They are all listed in the requirements.txt file, so please run the following command: 
```bash
pip3 install -r requirements.txt
```
Once you have completed the first two steps, you should be ready to run the flask app. Please run the command
```bash
flask run
```
and you should be able to run the Flask API.

Note: Keep in mind that currently, the Flask API has been deployed to an AWS EC2 instance on which it is running. To test locally, please ensure all fetch requests are changed to reflect the local URI.

## Running the app 
For this app, we are using React Native and Expo. Expo is a set of tools that allow developers to build, test and run code on numerous devices. In this case, Expo will allow us to run the application on both iOS and Android mobile phones, or on an Android Emulator/iOS Simulator.
### Android or iOS Device 
Install the expo app, available on both the (Apple) App Store and (Google) Play Store. Once you have installed the app, please navigate to the app folder (SpeedySpot/app/) and run the command
```bash
expo start
```
Once you run this command, the app will begin to run and you will be presented with a QR code both in your terminal and on
a web-page. If you have an Android device, use the expo app to scan the QR code. This will begin the process of running the app on your device. For an iOS device, please open your camera app and scan the QR code. You will then be redirected to Expo, where the app will start running. 
### Android Emulator
To run the app on an Android Emulator, please install [Android Studio](https://developer.android.com/studio), available for both Mac and Windows. Go to the 'AVD Manager' tab and create a new virtual device. Upon creating a device, launch the AVD in the emulator. Please navigate to the app folder (SpeedySpot/app/) and run the command 
```bash
expo start
```
and once completed, click "a" on your keyboard to open the app in your Android Emulator.

Follow [this guide](https://docs.expo.io/workflow/android-studio-emulator/) for more detailed instructions.
### iOS Simulator
To run the app on an iOS Simulator, you must be using a Mac device. First, please install [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12). In XCode, select your simulated device. Please navigate to the app folder (SpeedySpot/app/) and run the command 
```bash
expo start
```
and once completed, click "i" on your keyboard to open the app in your iOS Simulator.

Follow [this guide](https://docs.expo.io/workflow/ios-simulator/) for more detailed instructions.
### Helpful Resources 
[React Native Docs](https://reactnative.dev/docs/getting-started)

[Expo Docs](https://docs.expo.io/)

[Flask Docs](https://flask.palletsprojects.com/en/1.1.x/)
## App Visuals
### Intro Screens
<img src="https://github.com/kushaldelhiwala/SpeedySpot/blob/master/Documents/App%20Screenshots/speedy_login.png" width="300" height="630"> <img src="https://github.com/kushaldelhiwala/SpeedySpot/blob/master/Documents/App%20Screenshots/speedy_signUp.png" width="300" height="630"> <img src="https://github.com/kushaldelhiwala/SpeedySpot/blob/master/Documents/App%20Screenshots/speedy_faq2.png" width="300" height="630">
### Main Screens
<img src="https://github.com/kushaldelhiwala/SpeedySpot/blob/master/Documents/App%20Screenshots/speedy_viewLots.png" width="300" height="630"> <img src="https://github.com/kushaldelhiwala/SpeedySpot/blob/master/Documents/App%20Screenshots/speedy_specific1.png" width="300" height="630"> <img src="https://github.com/kushaldelhiwala/SpeedySpot/blob/master/Documents/App%20Screenshots/speedy_checkIn.png" width="300" height="630">

<img src="https://github.com/kushaldelhiwala/SpeedySpot/blob/master/Documents/App%20Screenshots/speedy_checkOut.png" width="300" height="630"> <img src="https://github.com/kushaldelhiwala/SpeedySpot/blob/master/Documents/App%20Screenshots/speedy_scoreboard.png" width="300" height="630"> <img src="https://github.com/kushaldelhiwala/SpeedySpot/blob/master/Documents/App%20Screenshots/speedy_preferences.png" width="300" height="630">
## Authors
Kushal Delhiwala and Austin Biegler Stony Brook University.
## Acknowledgements
Thanks to Professor Scarlatos, the Department of Parking and Transportation Services, the Honors College and the Computer Science Department for all their assistance throughout this project. 

