 var config = {
    apiKey: "AIzaSyAnDS1UCdTZmRUPXpktzyKQGX-UAwylTmc",
    authDomain: "train-scheduler-1e4c2.firebaseapp.com",
    databaseURL: "https://train-scheduler-1e4c2.firebaseio.com",
    storageBucket: "train-scheduler-1e4c2.appspot.com"
  };


  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  //Write function to add new trains to the firebase database

$("add-train-btn").on("click", function(event){
    event.preventDefault();

    var traName = $("#trainName").val().trim();
    var traDestination = $("#destination").val().trim();
    var traFrequency = $("#frequency").val().trim();
    var traFirst = $("#firstTrain").val().trim();
    var traNext = $("#nextTrain").val().trim();

    var trainData = {
        name: traName,
        destination: traDestination,
        frequency: traFrequency,
        nextTrain: traNext,
        firstTrain: traFirst
      };

     console.log(trainData.traName);
     console.log(trainData.traDestination);
     console.log(trainData.traFrequency);
     console.log(trainData.traFirst);
     console.log(trainData.traNext);

      database.ref().push(trainData);

      $("#trainName").val("");
      $("#destination").val("");
      $("#frequency").val("");
      $("#firstTrain").val("");
      $("#nextTrain").val("");
});
  // Write a function to pull info from firebase 
  
 database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var traName = childSnapshot.val().name;
    var traDestination = childSnapshot.val().destination;
    var traFrequency = childSnapshot.val().frequency;
    var traFirst = childSnapshot.val().firstTrain;
    var traNext = childSnapshot.val().nextTrain;

    //Train Details
    console.log(traName);
    console.log(traDestination);
    console.log(traFrequency);
    console.log(traFirst);
    console.log(traNext);
    

    //create and display it in the table
 var table = $("<tr>").append(
  $("<td>"). text(traName),
  $("<td>"). text(traDestination),
  $("<td>"). text(traFrequency),
  $("<td>"). text(traFrequency),
  $("<td>"). text(),
);

$("> tbody").append(table)
});
//Write a function to caculate the time