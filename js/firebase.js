

$(document).ready(function(){

    // $('.scrollspy').scrollSpy()
    $('.scrollspy').scrollSpy({
        scrollOffset:240
    });




    $('.target').pushpin({
        top: 0,
        bottom: 1000,
        offset: 0
    });

    $('.bttn-stay').on("click", function(){
        $(".carousel").addClass('big');
        $(".carousel-item").addClass('big');
    });


});

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
//first checkbox
    var check1 = (snapshot.val().check1)
    var check2 = (snapshot.val().check2)
    var check3 = (snapshot.val().check3)
    var check4 = (snapshot.val().check4)
    var check5 = (snapshot.val().check5)
    var check6 = (snapshot.val().check6)
    var check7 = (snapshot.val().check7)

    console.log(snapshot.val());

    //Check the value
    if((snapshot.val().check1) == true){
        $("#checkbox1").attr("checked","checked") ;
        $("#sideWater").css('text-decoration', 'line-through');

    }
    else{
        $("#sideWater").css('text-decoration', 'none');
    }

        $("#checkbox1").on("click", function() {
            if (check1 === true){
                database.ref().update({
                    check1: false
                })
                }

                else{
                    database.ref().update({
                        check1: true
                    })


            }
        });
//checkbox 2

    if((snapshot.val().check2) == true){
        $("#checkbox2").attr("checked","checked") ;
        $("#sideFood").css('text-decoration', 'line-through');

    }
    else{
        $("#sideFood").css('text-decoration', 'none');
    }



        $("#checkbox2").on("click", function() {
            if (check2 === true){
                
                database.ref().update({
                    check2: false
                })
            }

            else{
                
                database.ref().update({
                    check2: true
                })


            }
        });
//Checkbox 3


    if((snapshot.val().check3) == true){
        $("#checkbox3").attr("checked","checked") ;
        $("#sideLights").css('text-decoration', 'line-through');

    }
    else{
        $("#sideLights").css('text-decoration', 'none');
    }

        $("#checkbox3").on("click", function() {
            if (check3 === true){
                database.ref().update({
                    check3: false
                })
            }

            else{
                database.ref().update({
                    check3: true
                })


            }
        });

//Checkbox 4

    if((snapshot.val().check4) == true){
        $("#checkbox4").attr("checked","checked") ;
        $("#sideMedication").css('text-decoration', 'line-through');

    }
    else{
        $("#sideMedication").css('text-decoration', 'none');
    }

        $("#checkbox4").on("click", function() {
            if (check4 === true){
                
                database.ref().update({
                    check4: false
                })
            }

            else{
                
                database.ref().update({
                    check4: true
                })


            }
        });

//Checkbox 5

    if((snapshot.val().check5) == true){
        $("#checkbox5").attr("checked","checked") ;
        $("#sideHygiene").css('text-decoration', 'line-through');

    }
    else{
        $("#sideHygiene").css('text-decoration', 'none');
    }

        $("#checkbox5").on("click", function() {
            if (check5 === true){
                database.ref().update({
                    check5: false
                })
            }

            else{
                database.ref().update({
                    check5: true
                })


            }
        });

//Checkbox 6

    if((snapshot.val().check6) == true){
        $("#checkbox6").attr("checked","checked") ;
        $("#sideFirstAid").css('text-decoration', 'line-through');

    }
    else{
        $("#sideFirstAid").css('text-decoration', 'none');
    }

        $("#checkbox6").on("click", function() {
            if (check6 === true){
                database.ref().update({
                    check6: false
                })
            }

            else{
                database.ref().update({
                    check6: true
                })


            }
        });

//Checkbox 7

    if((snapshot.val().check7) == true){
        $("#checkbox7").attr("checked","checked") ;
        $("#sidePet").css('text-decoration', 'line-through');

    }
    else{
        $("#sidePet").css('text-decoration', 'none');
    }

        $("#checkbox7").on("click", function() {
            if (check7 === true){
                database.ref().update({
                    check7: false
                })
            }

            else{
                database.ref().update({
                    check7: true
                })


            }
        });




});








