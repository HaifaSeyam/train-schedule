// Initialize Firebase
var config = {
    apiKey: "AIzaSyADfMfPNj52WcNDFNMMgM_X3ln_o3DRDVo",
    authDomain: "train-schedule-8cc5f.firebaseapp.com",
    databaseURL: "https://train-schedule-8cc5f.firebaseio.com",
    projectId: "train-schedule-8cc5f",
    storageBucket: "",
    messagingSenderId: "319054687940"
  };

  firebase.initializeApp(config);
 
 var database = firebase.database().ref();
 