module.exports = function (sequilize,Datatypes) {
    let UserProfile = sequilize.define("UserProfile", {
        fistname: {
            type: Datatypes.STRING,
            allownull: false,
            validate: {
                len: [1, 100]
            }
        },
        lastname: {
            type: Datatyoes.STRING,
            allnull: false,
            validate: {
                len: [1,100]
            }
        },
        email: {
            type:Datatypes.STRING,
            allunull: false,
            vaildate: {
                len: [1, 100]
            }
        }

    });
    return UserProfile;
}