$(function () {

    // choosing Google Auth Provider to use in firebase auth settings
    // assigning white listed domains where it is allowed (ex: localhost)
    
    
    let provider = new firebase.auth.GoogleAuthProvider();
    let auth = firebase.auth();

    function getCurrentUser(auth) {
        return new Promise((resolve, reject) => {
           const unsubscribe = auth.onAuthStateChanged(user => {
              unsubscribe();
              resolve(user);
           }, reject);
        });
      }

      getCurrentUser(auth).then(function(data){
        
        console.log(data.displayName);



        }
      )

//     //Grab user info from firebase auth

    var user = firebase.auth().currentUser;

    var name, email, photoUrl, uid, emailVerified;
    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;
    }
    // console.log(user);
    // target areas in home.html using jQuery selectors
    const $bucketProContainer = $('#user-profile-list');
    const firebaseUserArr = [{
        uid: "sUT5cnwz3He8kEo3NHksK6osX0J2"
    }]

    // Function to display Bucket List

    let myBucketList = function (activities) {
        $bucketProContainer.empty();

        let activityListItems = [];

        for (let i = 0; i < activities.length; i++) {
            let activity = activities[i];


            let $li = $("<li class='list-group-item'>").data();
            let $titleDiv = $("<div>");
            let $titleSpan = $("<span class='font-weight-bold'>").text(activity);
            let $delBtn = $(`<i class='fas fa-trash-alt delete-note ml-2' data-id="${note.id}">`);
            let noteP = $("<p class='mt-2'>").text(note.body);

            titleDiv.append(titleSpan, delBtn);

            li.append(titleDiv, noteP);
            noteListItems.push(li);
        }

        noteList.append(noteListItems);

    }
})