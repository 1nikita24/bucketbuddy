module.exports = function (sequelize, DataTypes) {
    let activities = sequelize.define("activities",{
        activity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER
        }
    },
    {timestamps: false
    });
    return activities;
};