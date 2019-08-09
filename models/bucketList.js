module.exports = function(sequelize, DataTypes){
    let bucketList = sequelize.define("userList",{
        userId: DataTypes.INTEGER,
        activityId: DataTypes.INTEGER
    });
    return bucketList;
};