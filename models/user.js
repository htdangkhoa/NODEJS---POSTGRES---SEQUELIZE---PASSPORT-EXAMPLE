var sequelize = require("sequelize");
var bcrypt = require("bcrypt-nodejs");

module.exports.User = function(sequelize, DataTypes){
	var User = sequelize.define("users", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		password: DataTypes.STRING
	}, {
		classMethods: {
			generateHash: function(password) {
	            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	        },
		},
		instanceMethods: {
	        validPassword: function(password) {
	            return bcrypt.compareSync(password, this.password);
	        },
	    }
	});
	return User;
}