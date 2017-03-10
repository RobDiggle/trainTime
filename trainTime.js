  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA2tVSlOO41trJkR9FqNJzNPgpNOBQ8gT8",
    authDomain: "train-time-ef660.firebaseapp.com",
    databaseURL: "https://train-time-ef660.firebaseio.com",
    storageBucket: "train-time-ef660.appspot.com",
    messagingSenderId: "493378461544"
  };
  firebase.initializeApp(config);


// VARIABLES
var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;


// FUNCTIONS + EVENTS
$("#addTrain").on("click", function() {

  trainName = $('#nameInput').val().trim();
  destination = $('#destinationInput').val().trim();
  firstTrainTime = $('#firstTrainInput').val().trim();
  frequency = $('#frequencyInput').val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });

});


database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  trainName = snapshot.val().trainName;
  destination = snapshot.val().destination;
  firstTrainTime = snapshot.val().firstTrainTime;
  frequency = snapshot.val().frequency;


  var trainMomentOne = moment(firstTrainTime, 'HH:mm');
  var momentNow = moment(); 
  var minutesSinceFirstArrival = momentNow.diff(trainMomentOne, 'minutes');
  var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
  var minutesAway = frequency - minutesSinceLastArrival;

  var nextArrival = momentNow.add(minutesAway, 'minutes');
  var formatNextArrival = nextArrival.format("HH:mm");


  var tr = $('<tr>');
  var a = $('<td>');
  var b = $('<td>');
  var c = $('<td>');
  var d = $('<td>');
  var e = $('<td>');
  a.append(trainName);
  b.append(destination);
  c.append(frequency);
  d.append(formatNextArrival);
  e.append(minutesAway);
  tr.append(a).append(b).append(c).append(d).append(e);
  $('#newTrains').append(tr);


  }, 
  function (errorObject) 
  {

    console.log("Houston, we've got a problem: " + errorObject.code);

  });