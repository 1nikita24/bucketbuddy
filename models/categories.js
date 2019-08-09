module.exports = function (sequelize, DataTypes) {
    let categories = sequelize.define("categories", {
        category: {
            type: DataTypes.STRING
        }
    });
    return categories;
};