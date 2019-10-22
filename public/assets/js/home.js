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
    let $buddyIconRow = $('#avatar-icon-row');

    //===================FUNCTIONS TO BE CALLED LATER IN AJAX CALLS ===================//

    //----------function to diplay list items in left bucket
    let myBucketList = function (activities) {
        $bucketProContainer.empty();
        for (let i = 0; i < activities.length; i++) {
            let activity = activities[i];
            $bucketProContainer.append(`
            <p class="bltxt" data-type="activity" id="bltxtid"><i class="fas fa-user-check" id="${activity.activityId}"></i>
            <i class="fas fa-trash-alt ml-2" id="${activity.bucketListsId}"></i>  ${activity.activity}
            </p>`)
        }
    }

    //--------function to display result in right console
    let myResultList = function (data) {
        console.log(data);
        $userConsole.empty();
        $userConsole.append(`<h2 class="section-heading text-uppercase text-center" id="console-header"><span id="red">S</span>E<span
        id="orange">L</span>E<span id="yellow">C</span>T<span id="green"> I</span>T<span id="blue">E</span>M<span
        id="purple">!</span></h2>`)
        for (let i = 0; i < data.length; i++) {
            $userConsole.append(`
            <p class="" data-type="activity"><i class="fa fa-plus ml-2" id="${data[i].id}"></i> ${data[i].activity}
            </p>`)
        }
    }

    // ----------function to display buddy avatars
    let myBuddyList = function (data) {
        console.log(data);
        $buddyIconRow.empty();

        for (let i = 0; i < 6; i++) {
            if (data[i]) {
                $buddyIconRow.append(`
            <span class="budIcons" title="${data[i].name}"><a href="mailto:${data[i].email}?Subject=Hey%20Buddy%20Let's%20${data[i].activity}" class="circle" id="cir${i}">
            <img height="63" width="63"
             src="${data[i].photoUrl}" alt="Buddy Avatar"></a></span>
             `)
            } else {
                $buddyIconRow.append(`
            <span title="no other buddy :(" class="budIcons"><a href=#add-Buddy class="circle" id="cir${i}">
            <img height="63" width="63"
             src="https://previews.123rf.com/images/blankstock/blankstock1402/blankstock140202174/25833750-no-user-sign-icon-do-not-enter-person-symbol-human-avatar-red-prohibition-sign-stop-symbol-.jpg" alt="The Dude"></a></span>`)
            }
        }
    }

    //==========================================AJAX API CALLS================================//

    //-----------------AJAX Call to get my bucket list JSON object from api
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

    //-----------------AJAX Call to get user profile
    let handleUserSearch = function (uid) {
        let queryString = "/api/userprofile/" + uid;
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            console.log(data.length)
            if (data.length === 0 ) {
                handleInsertUser();
                console.log("need to insert")
                handleUserSearch(userArr[0].uid);
               
            } else {
                console.log("found user");
                console.log(data);
                userDBid = data[0].id;
            }
        });
    }

    //-----------------AJAX Call to insert User
    let handleInsertUser = function () {;
        $.ajax({
            url: "/api/insertUser/",
            data: {
                name: userArr[0].displayName,
                email: userArr[0].email,
                uid: userArr[0].uid,
                photourl: userArr[0].photoURL
            },
            method: "PUT"
        }).then(function (data) {
            console.log(data);
            userDBid = data[0].id;
        });
    }


    //-----------------AJAX Call to get results from search bar
    let handleCatSearch = function (catID) {
        console.log("running handle cat search")
        let queryString = "/api/actbycat/" + catID;
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            myResultList(data)
        });
    }
    //-----------FIREBASE AUTH FUNCTION
    //-----------------------function to get the current user from firebase and store in variable-------------//
    function getCurrentUser(auth) {
        return new Promise((resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                unsubscribe();
                resolve(user);
            }, reject);
        });
    }
    // -----------------store current user in userArr
    getCurrentUser(auth).then(function (data) {
        userArr.push({
            uid: data.uid,
            displayName: data.displayName,
            photoURL: data.photoURL,
            email: data.email
        });
        // call Functions used to display content
        $("#myAvatar").attr("src", userArr[0].photoURL)
        handleMyListSearch(userArr[0].uid);
        handleUserSearch(userArr[0].uid);
        console.log(userArr);
    });

    //----------------Button Click Functions-------------//

    //--------------AJAX Call for different Catagory Buckets in Header Clicks
    $("#adv-txt").on("click", function () {
        console.log("clicked adventure")
        let queryString = "/api/actbycat/1";
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            myResultList(data)
        });
    });

    $("#tra-txt").on("click", function () {
        console.log("clicked travel")
        let queryString = "/api/actbycat/2";
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            myResultList(data)
        });
    });

    $("#edu-txt").on("click", function () {
        let queryString = "/api/actbycat/3";
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            myResultList(data)
        });
    });

    $("#rom-txt").on("click", function () {
        let queryString = "/api/actbycat/4";
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            myResultList(data)
        });
    });

    $("#ent-txt").on("click", function () {
        let queryString = "/api/actbycat/5";
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            myResultList(data)
        });
    });

    $("#uni-txt").on("click", function () {
        let queryString = "/api/actbycat/6";
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            myResultList(data)
        });
    });

    $("#all-txt").on("click", function () {
        let queryString = "/api/actbycat/7";
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            myResultList(data)
        });
    });

    //-----------------AJAX Call to Delete item from bucket list
    $(document).on("click", ".fa-trash-alt", function () {
        let delCatId = $(this).attr("id");
        let queryString = "/api/deletemylist/" + delCatId;
        $.ajax({
            url: queryString,
            method: "delete"
        }).then(function (data) {
            handleMyListSearch(userArr[0].uid);

        });
    });

    //----------------- AJAX Call to Add item to Bucket List 
    $(document).on("click", ".fa-plus", function () {
        let addCatId = $(this).attr("id");
        let queryString = "/api/insertmylist/" + userDBid + "/" + addCatId;
        $.ajax({
            url: queryString,
            method: "post"
        }).then(function (data) {
            handleMyListSearch(userArr[0].uid);
        });
    });

    //----------AJAX Call to Find Buddies based on activity 
    $(document).on("click", ".fa-user-check", function () {
        let actId = $(this).attr("id");
        let queryString = "/api/findbuddies/" + actId + "/" + userArr[0].uid;
        $.ajax({
            url: queryString,
            method: "get"
        }).then(function (data) {
            myBuddyList(data);
        });
    });

    //----------AJAX Call for search button 
    let handleSearchAct = function (event) {
        event.preventDefault()
        let searchForWords = $("#searchInput").val().trim().split(" ").toString();
        console.log(searchForWords)
        let queryString = "/api/search/" + searchForWords;

        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (data) {
            if (data) {
                myResultList(data);
            }
        });
    };
    $("#search-activity-btn").on("click", handleSearchAct);
})