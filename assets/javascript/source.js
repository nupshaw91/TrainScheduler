//**--- Add authentication feature to have a delete feature under admin only */

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

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("train-table");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}



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
