var sequelize = require("sequelize");

module.exports.User = function(sequelize, DataTypes){
	var User = sequelize.define("users", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
	});
	return User;
}