// Firebase config object
// This is provided by firebase
// module.exports = function(firebase) {
$(document).ready(function(){


const config = {
    apiKey: "AIzaSyDQMEHSABIOUwEvI3I011HfvInU8uVpKVU",
    authDomain: "bucketbuddy-92549.firebaseapp.com",
    databaseURL: "https://bucketbuddy-92549.firebaseio.com",
    projectId: "bucketbuddy-92549",
    storageBucket: "",
    messagingSenderId: "586786546693",
    appId: "1:586786546693:web:eb6093e114a5636c"
};
// INITIALIZE FIREBASE AUTH
firebase.initializeApp(config);
console.log(firebase);
// choosing Google Auth Provider to use in firebase auth settings
// assigning white listed domains where it is allowed (ex: localhost)


let provider = new firebase.auth.GoogleAuthProvider();
let auth = firebase.auth();

// Login Button click event listener and associated 'login' function
// When log-in is clicked, it changes the button's associated data to 'log-out' stuff
$(document).on('click', '.log-in', function () {
    login(provider, isLoggedIn);


    //       $(this).removeClass('log-in')
    //         .addClass('log-out')
    //        .html('Logout');
});

// Logout Button listener and function
$(document).on('click', '.log-out', function () {
    auth.signOut().then(() => {
        //          $(this).removeClass('log-out')
        //            .addClass('log-in')
        //            .html('Login With Google');
        isLoggedOut();
    }).catch((error) => {
        if (error) throw error
    });
});




// Using an arrow function to handle the firebase auth function
const login = (provider, isLoggedIn) => {
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        // tells firebase to make the user to authenticate using the selected providers (GoogleAuth in this case)
        
        auth.signInWithPopup(provider).then((result) => {

            
            // the promise function then returns an object of the user's info
            // (ex: email, name, gmail avatar img)
            // google handles all password security/encryption 
            const user = result.user;
            user_info = user;
           // console.log(user)
            console.log(user.displayName)
            console.log(user.photoURL)
            // runs a 'isLoggedIn' function if authentication is successful
            isLoggedIn(user);

            firebase.auth().onAuthStateChanged(user => {

                if(user) {
                  window.location = 'home.html'; //After successful login, user will be redirected to home.html
                }
              });
            
        }).catch((error) => {
            // If google returns an error, this code logs those errors for reference
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            if (error) {
                console.log(errorCode)
                console.log(errorMessage)
            }
        });
    })
}

//Handle Account Status

// Functions that handle what happens after a user logs in or out
const isLoggedIn = user => {
    // Displays response user.Display name to User on index.html span
    var x = document.getElementById("container-body");
    $("#user").text("User: " + user.displayName)

   // x.style.visibility = "visible";
}


const isLoggedOut = () => {
    // Shows no user 
  //  $("#user").empty()
  //  var x = document.getElementById("container-body");
   // x.style.visibility = "hidden";
}



})