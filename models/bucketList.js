module.exports = function(sequelize, DataTypes){
    let bucketList = sequelize.define("bucketList",{
        userId: DataTypes.INTEGER,
        activityId: DataTypes.INTEGER
    },
    {timestamps: false
    });
    return bucketList;
};