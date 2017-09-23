// Initialize Firebase
var config = {
    apiKey: "AIzaSyBGk9jfTHyJYiJKFWQcmcdi-V7mMBoVnKY",
    authDomain: "stay-todo-cards.firebaseapp.com",
    databaseURL: "https://stay-todo-cards.firebaseio.com",
    projectId: "stay-todo-cards",
    storageBucket: "",
    messagingSenderId: "902451592842"
};

firebase.initializeApp(config);

var database = firebase.database();


database.ref().on("value", function(snapshot) {
    console.log(snapshot.val().check1);
    // Then we console.log the value of snapshot
    console.log(snapshot.val());
    //Check the value
    if(snapshot.val().check1){
        $("#checkbox1").attr("checked","checked") ;
    }

    // Then we change the html associated with the number.
    // $("#checkbox1").html(snapshot.val().check1);
    // // Then update the clickCounter variable with data from the database.
    // clickCounter = snapshot.val().check1;
    //
    // // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
    // // Again we could have named errorObject anything we wanted.


});


//
// $("#checkbox1").on("click", function() {

//     if (check1 == false){
//             console.log("I am clicked");
//             database.ref().set({
//                 check1: true;
//             });
//
//         }
//         if(database.ref().snapshot.val(check1){
//             console.log("I am not clicked")
//             clicked = false
//             database.ref().set({
//                 check1: clicked
//             });
//
//
//     });


