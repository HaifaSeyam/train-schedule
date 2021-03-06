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
   /*
    if(trainName.length == 0) || destination.length == 0 || frequency.length == 0 || firstTrainTime.length == 0){
        alert("You have to fill all fields!");
    }*/
    //Form validaton
    if(trainName.length == 0) {
        $("#trainName").css("border", "1px solid red");
    } else {$("#trainName").css("border", "");}
    
    if(destination.length == 0) {
        $("#destination").css("border", "1px solid red");
    } else {$("#destination").css("border", "");} 
    
    if(firstTrainTime.length == 0 || !moment(firstTrainTime, "HHmm", true).isValid()) {
        $("#firstTrainTime").css("border", "1px solid red");
    } else {$("#firstTrainTime").css("border", "");}
    
    if(frequency.length == 0) {
        $("#frequency").css("border", "1px solid red");
    }  else { $("#frequency").css("border", "");}
    
    if((trainName.length > 0) && (destination.length > 0) && (frequency.length > 0)
    && (firstTrainTime.length > 0) && (moment(firstTrainTime, "HHmm", true).isValid()) ) 
    {
        database.push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        });
    }
 });
 
 database.on("child_added", function(snapshot){

    var firstTT = moment(snapshot.val().firstTrainTime, "hhmm").format("hh:mm");
    var tFrequency = snapshot.val().frequency;
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTT, "HH:mm").subtract(1, "years");
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

    var tableRow = "<tr><td scope='col'>" + snapshot.val().trainName + "</td>" +
                 "<td scope='col'>" + snapshot.val().destination + "</td>" +
                 "<td scope='col'>" + snapshot.val().frequency + "</td>" +
                 "<td scope='col'>" + nextTrain + "</td>" +
                 "<td scope='col'>" + tMinutesTillTrain + "</td></tr>";

    $("#tableBody").prepend(tableRow);

 }, function (errorObject){
    console.log("Errors handled:"+ errorObject.code)
 });