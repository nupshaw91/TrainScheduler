
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

  //Write function to add new trains to the firebase database


$("#add-train-btn").on("click", function(event){
    event.preventDefault();


    var traName = $("#TrainName").val().trim();
    var traDestination = $("#Destination").val().trim();
    var traFrequency = $("#Frequency").val().trim();
    var traFirst = $("#First").val().trim();
    var traNext = moment($("#Next").val().trim()).startof(traFrequency, 'mins').fromNow(traFirst); 

    console.log(traName)
    console.log(traDestination)
    console.log(traFrequency)
    console.log(traFirst)
    
    var Train = {
        Name: traName,
        Destination: traDestination,
        Frequency: traFrequency,
        Next: traNext,
        First: traFirst
      };

      database.ref().push(Train);


     
     console.log(Train.Name);
     console.log(Train.Destination);
     console.log(Train.Frequency);
     console.log(Train.First);
     console.log(Train.Next);

     alert("Train successfully added");
      

      $("#TrainName").val("");
      $("#Destination").val("");
      $("#Frequency").val("");
      $("#First").val("");
      $("#Next").val("");
});
  // Write a function to pull info from firebase 
  

 database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var traName = childSnapshot.val().Name;
    var traDestination = childSnapshot.val().Destination;
    var traFrequency = childSnapshot.val().Frequency;
    var traFirst = childSnapshot.val().First;
    var traNext = childSnapshot.val().Next;

    //Train Details
    console.log(traName);
    console.log(traDestination);
    console.log(traFrequency);
    console.log(traFirst);
    console.log(traNext);
    

    //create and display it in the table
 var tableRow = $("<tr>").append(
  $("<td>"). text(traName),
  $("<td>"). text(traDestination),
  $("<td>"). text(traFrequency),
  $("<td>"). text(traFrequency),
  // $("<td>"). text(),
);

$("#train-table > tbody").append(tableRow)
});
//Write a function to caculate the time