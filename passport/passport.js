var passport = require("passport"),
  	Strategy = require("passport-local").Strategy,
  	cookieParser = require("cookie-parser"),
  	bodyParser = require("body-parser"),
  	expressSession = require("express-session"),
  	model = require("../models/index");


module.exports = function(){
	passport.use(new Strategy(
	  function(firstname, lastname, cb) {
	  	model.User.findOne({
	  		where: {
	  			firstName: firstname,
	  			lastName: lastname
	  		}
	  	}).then(function(users){
	  		if (users == ""){
	  			return cb(null, false);
	  		}else{
	  			return cb(null, users);
	  		}
	  	}, function(err){
	  		return cb(err);
	  	});
	  	// db.users.findByUsername(email, function(err, user) {
	   //    if (err) { return cb(err); }
	   //    if (!user) { return cb(null, false); }
	   //    if (user.password != password) { return cb(null, false); }
	   //    return cb(null, user);
	   //  });
	  }
	));

	passport.serializeUser(function(users, cb) {
	  cb(null, users.id);
	});

	passport.deserializeUser(function(id, cb) {
		model.User.findById(id).then(function(users){
	  		if (users == ""){
	  			return cb(null, false);
	  		}else{
	  			return cb(null, users);
	  		}
	  	}, function(err){
	  		return cb(err);
	  	});
	  // db.users.findById(id, function (err, user) {
	  //   if (err) { return cb(err); }
	  //   cb(null, user);
	  // });
	});

	//
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(expressSession({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false
	}));


	//
	app.use(passport.initialize());
	app.use(passport.session());
}