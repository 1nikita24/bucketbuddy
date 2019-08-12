$(function () {
    console.log("page is ready");
    // choosing Google Auth Provider to use in firebase auth settings
    // assigning white listed domains where it is allowed (ex: localhost)
    let provider = new firebase.auth.GoogleAuthProvider();
    let auth = firebase.auth();
    //userArr is an array of 1 object that contains data from firebase authentication
    let userArr = [];
    let userDBid = "";

    //===================TARGETED HTML ELEMENTS USING JQuery===================//
    const $bucketProContainer = $('#user-profile-list');
    const $userConsole = $('#user-console');
    const $advCatSelect = $();
    const $traCatSelect = $();
    const $eduCatSelect = $();
    const $romCatSelect = $();
    const $entCatSelect = $();
    const $uniCatSelect = $();
    const $allCatSelect = $();

    //===================FUNCTIONS CALLED IN AJAX CALLS ===================//
    
    //function to diplay list items
    let myBucketList = function (activities) {
        $bucketProContainer.empty();
        for (let i = 0; i < activities.length; i++) {
            let activity = activities[i];
            $bucketProContainer.append(`
            <p class="" data-type="activity">${activity.activity}
            <i class="fas fa-trash-alt ml-2" id="${activity.id}"></i></p>`)
        }
    }

    //--------function to display result list in console
    let myResultList = function(results){
        $userConsole.empty();
        for (let i = 0; i < results.length; i++) {
            let listItem = results[i];
            $bucketProContainer.append(`
            <p class="" data-type="activity">${results.activity}
            <i class="fa fa-plus ml-2" id="${activity.id}"></i></p>`)
        }
    }





    //===================AJAX API CALLS===================//

    //AJAX Call to get my list JSON object from api
    let getJSONactivities = function () {
        let queryString = "/api/mylist/" + userArr[0].uid;
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            console.log(data);
            myBucketList(data);
        });
    };

    let getJSONUserProfile = function(uid){
        let queryString = "/api/userprofile/" + uid;
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            userDBid = data[0].id;
        });
    }

    let getJSONResultList = function(catID){
        let queryString = "/api/userprofile/" + catID;
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            myResultList(data)
        });
    }

    //function to get the current user from firebase and store in variable
    function getCurrentUser(auth) {
        return new Promise((resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                unsubscribe();
                resolve(user);
            }, reject);
        });
    }
    // store current user in userArr
    getCurrentUser(auth).then(function (data) { 
        userArr.push({
            uid: data.uid, 
            displayName: data.displayName,
            photoURL: data.photoURL
         });
        // call Functions used to display content
        getJSONactivities(userArr[0].uid);
        getUserProfile(userArr[0].uid);
        
    });




    //===============Button Click Functions===============//

    $

   
    




})













//     //Grab user info from firebase auth
// var user = firebase.auth().currentUser;

// var name, email, photoUrl, uid, emailVerified;
// if (user != null) {
//     name = user.displayName;
//     email = user.email;
//     photoUrl = user.photoURL;
//     emailVerified = user.emailVerified;
//     uid = user.uid;
// }
// console.log(user);
// target areas in home.html using jQuery selectors