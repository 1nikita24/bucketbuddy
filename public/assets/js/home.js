$(function () {
    console.log("page is ready");
    // choosing Google Auth Provider to use in firebase auth settings
    // assigning white listed domains where it is allowed (ex: localhost)
    let provider = new firebase.auth.GoogleAuthProvider();
    let auth = firebase.auth();
    let userArr = [];
    console.log(userArr);

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
        userArr.push(data.uid);
        userArr.push(data.displayName);
        userArr.push(data.photoURL);
        console.log(userArr[0])
        // Functions used to display content
        const $bucketProContainer = $('#user-profile-list');


        // Function to display Bucket List

        let myBucketList = function (activities) {
            $bucketProContainer.empty();


            for (let i = 0; i < activities.length; i++) {
                let activity = activities[i];
                $bucketProContainer.append(`
        <p class="" data-type="activity">${activity.activity}<i class="fas fa-trash-alt ml-2" id="${activity.id}"></i></p>`)
            }
        }

        let getJSONactivities = function () {
            console.log(userArr[0])
            let queryString = "/api/mylist/" + userArr[0];
            $.ajax({
                url: queryString,
                method: "GET"
            }).then(function (data) {
                console.log(data);
                myBucketList(data);
            });
        };
        //call function to get and display notes


        getJSONactivities();

    })


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