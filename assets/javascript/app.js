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
 
 $("#submitBtn").on("click", function () {

   var trainName = $("#trainName").val().trim();
   var destination = $("#destination").val().trim();
   var firstTrainTime = $("#firstTrainTime").val().trim();
   var frequency = $("#frequency").val().trim();

        database.push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        });

 });