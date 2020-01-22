 var config = {
    apiKey: "AIzaSyAnDS1UCdTZmRUPXpktzyKQGX-UAwylTmc",
    authDomain: "train-scheduler-1e4c2.firebaseapp.com",
    databaseURL: "https://train-scheduler-1e4c2.firebaseio.com",
    storageBucket: "train-scheduler-1e4c2.appspot.com"
  };


  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

console.log(database)
  var connectionsRef = database.ref("/connections");

  console.log(connectedRef)
  
  var connectedRef = database.ref(".info/connected");

//Write a function to caculate the time

// Write a function to pull info from firebase and display it in the table

//Write function to keep track of the time

//Write function to add new trains to the firebase database
function writeNewTrain(trainName, destination, frequency, nextTrain, firstTrain) {
    // A post entry.
    var trainData = {
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      nextTrain: nextTrain,
      firstTrain: firstTrain
    };
  
    // Get a key for a new Post.
    var newTrainKey = firebase.database().ref().child('train').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/train/' + newTrainKey] = trainData;
    updates['/train-scedule/' + trainName + '/' + newTrainKey] = trainData;
  
    return firebase.database().ref().update(updates);
  }
