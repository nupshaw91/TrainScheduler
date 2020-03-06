
firebaseConfig = {
  apiKey: "AIzaSyAnDS1UCdTZmRUPXpktzyKQGX-UAwylTmc",
  authDomain: "train-scheduler-1e4c2.firebaseapp.com",
  databaseURL: "https://train-scheduler-1e4c2.firebaseio.com",
  projectId: "train-scheduler-1e4c2",
  storageBucket: "train-scheduler-1e4c2.appspot.com",
  messagingSenderId: "691359430436",
  appId: "1:691359430436:web:94f1513b8f4bc62f5825b1"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();



//Table atributtes to make user friendly
//**----Need to add pagination and sorting feature */

$(document).ready(function () {
  $("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#train-table tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
 
});



//Write function to add new trains to the firebase database
//**---Need to Add a deletion feature */

$("#add-train-btn").on("click", function (event) {
  event.preventDefault();
  newTrain();
  function newTrain(traName, traDestination, traFrequency, traNext, traFirst) {

    var traName = $("#TrainName").val().trim();
    var traDestination = $("#Destination").val().trim();
    var traFrequency = $("#Frequency").val().trim();
    var traFirst = $("#First").val().trim();
    var traNext = $("#Frequency").val().trim();

    // console.log(traName)
    // console.log(traDestination)
    // console.log(traFrequency)
    // console.log(traFirst)

    var Train = {
      Name: traName,
      Destination: traDestination,
      Frequency: traFrequency,
      Next: traNext,
      First: traFirst
    };

    database.ref().push(Train);



    //  console.log(Train.Name);
    //  console.log(Train.Destination);
    //  console.log(Train.Frequency);
    //  console.log(Train.First);
    //  console.log(Train.Next);

    alert("Train successfully added");


    $("#TrainName").val("");
    $("#Destination").val("");
    $("#Frequency").val("");
    $("#First").val("");
  }
})
// Write a function to pull info from firebase 


database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var traName = childSnapshot.val().Name;
  var traDestination = childSnapshot.val().Destination;
  var traFrequency = childSnapshot.val().Frequency;
  var traFirst = childSnapshot.val().First;
  // var traNext = childSnapshot.val().Next;

  //Train Details
  // console.log(traName);
  // console.log(traDestination);
  // console.log(traFrequency);
  // console.log(traFirst);
  // console.log(traNext);


  //create and display it in the table
  //Next train arrival
  //moment times

  let now = new Date(moment());
  let beginToday = new Date(moment().startOf("day"));

  let current = (now - beginToday);
  let f = JSON.stringify(traFirst);
  let hour = f.slice(1, 3);
  let min = f.slice(4, 6);
  let theFirst = new Date(moment().startOf("day").add(hour, "hours").add(min, "minutes"));
  let b = (theFirst - beginToday);
  let between = (current - b);


  var num = (((((current - b) / 1000) / 60) / traFrequency));
  var numOfTrains = Math.abs(Math.floor(num));

  //  var next = (between + Math.floor((numOfTrains*60)));
  // //  var o =(Math.round(Math.abs(Math.round((next/1000)/60))));
  // //  console.log("n",o);

  function minConvert(num) {
    if (num <= 0) {
      return 0
    } else {
      return 1
    }
  }


  let final = ((minConvert(between) * numOfTrains) * traFrequency);

  let next = (between + Math.floor(((numOfTrains * final) * 60)));

  let o = (Math.round(Math.abs(Math.ceil((next / 1000) / 60))));
  let nextTrain = Math.abs((o - final) - traFrequency);

  //  function time_convert(num)
  //  { 
  //   var hours = Math.floor(num / 60);  
  //   var minutes = num % 60;
  //   return hours + ":" + minutes;        
  // }

  // console.log(time_convert(next));
  // console.log(time_convert((nextTrain)));


  //main clock
  function updateTime() {
    const clock = document.getElementById("clock")
    const now = moment();
    const read = now.format("HH:mm");
    clock.textContent = (read);

  }
  setInterval(updateTime, 1000);
  updateTime();


  var tableRow = $("<tr>").append(
    $("<td>").text(traName),
    $("<td>").text(traDestination),
    $("<td>").text(traFrequency),
    $("<td>").text(traFirst),
    $("<td>").text(nextTrain + " mins")
    // .append(
    //   $("<div>").append(
    //     $("<p>").addClass(traName +"Counter").text(count + " mins")
    //     ),
    //   ),
  );


  $("#train-table > tbody").append(tableRow)
});
//Write a function to caculate the time