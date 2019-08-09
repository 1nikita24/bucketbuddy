module.exports = function(sequelize, DataTypes){
    let userList = sequelize.define("userList",{
        userId: DataTypes.INTEGER,
        activityId: DataTypes.INTEGER
    });
    return userList;
};