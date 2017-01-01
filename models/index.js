var Sequelize = require("sequelize");
var sequelize = new Sequelize('postgres://username:password@host_url:port/database_name');

var model = require("./user.js");
var User = model.User(sequelize, Sequelize);

User.sync({force: true})
.then(function(){
	return User.create({
		firstName: 'Dang',
		lastName: 'Khoa',
		password: User.generateHash("1")
	});
});

module.exports.User = User;