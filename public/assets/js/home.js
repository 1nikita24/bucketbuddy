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
    let $bucketProContainer = $('#user-profile-list');
    let $userConsole = $('#user-console');
    var $advCatSelect = $('#adv-text');
    let $traCatSelect = $('#tra-text');
    let $eduCatSelect = $('#edu-text');
    let $romCatSelect = $('#rom-text');
    const $entCatSelect = $('#ent-text');

    const $uniCatSelect = $('#uni-text');
    const $allCatSelect = $('#all-text');

    //===================FUNCTIONS CALLED IN AJAX CALLS ===================//
    
    //function to diplay list items
    let myBucketList = function (activities) {
        $bucketProContainer.empty();
        for (let i = 0; i < activities.length; i++) {
            let activity = activities[i];
            $bucketProContainer.append(`
            <p class="" data-type="activity">${activity.activity}
            <i class="fas fa-trash-alt ml-2" data-bucketListId="${activity.bucketListsId}"></i></p>`)
        }
    }

    //--------function to display result list in console
    let myResultList = function(data){
        console.log(data);
        $userConsole.empty();
        $userConsole.append(`<h2 class="section-heading text-uppercase text-center"><span id="red">C</span>O<span
        id="orange">N</span>S<span id="yellow">O</span>L<span id="green">E</span> <span id="blue">M</span>I<span
        id="purple">D</span></h2>`)
        for (let i = 0; i < data.length; i++) {
            $userConsole.append(`
            <p class="" data-type="activity">${data[i].activity}
            <i class="fa fa-plus ml-2" id="cat${data[i].id}"></i></p>`)
        }
    }

   





    //===================AJAX API CALLS===================//

    //AJAX Call to get my list JSON object from api
    let handleMyListSearch = function () {
        let queryString = "/api/mylist/" + userArr[0].uid;
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            console.log(data);
            myBucketList(data);
        });
    };

    let handleUserSearch = function(uid){
        let queryString = "/api/userprofile/" + uid;
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            userDBid = data[0].id;
        });
    }

    let handleCatSearch = function(catID){
        console.log("running handle cat search")
        let queryString = "/api/actbycat/" + catID;
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
        handleMyListSearch(userArr[0].uid);
        handleUserSearch(userArr[0].uid);
        
    });




    //===============Button Click Functions===============//
    $("#adv-txt").on("click", function () {
        console.log("clicked adventure")
        let queryString = "/api/actbycat/1";
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            myResultList(data)
        });
    } );

    $("#tra-txt").on("click", function () {
        console.log("clicked travel")
        let queryString = "/api/actbycat/2";
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            myResultList(data)
        });
    } );

    $("#edu-txt").on("click", function () {
        let queryString = "/api/actbycat/3";
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            myResultList(data)
        });
    } );

    $("#rom-txt").on("click", function () {
        let queryString = "/api/actbycat/4";
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            myResultList(data)
        });
    } );

    $("#ent-txt").on("click", function () {
        let queryString = "/api/actbycat/5";
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            myResultList(data)
        });
    } );

    $("#uni-txt").on("click", function () {
        let queryString = "/api/actbycat/6";
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            myResultList(data)
        });
    } );

    $("#all-txt").on("click", function () {
        let queryString = "/api/actbycat/7";
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            myResultList(data)
        });
    } );
   
    




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