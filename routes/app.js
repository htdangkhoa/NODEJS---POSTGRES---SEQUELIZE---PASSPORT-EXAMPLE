var models = require("../models/index");
var ejs = require("ejs");
var express = require("express");
var router  = express.Router();

var passport = require("passport"),
  	Strategy = require("passport-local").Strategy;

passport.use(new Strategy(
  function(firstname, lastname, cb) {
  	models.User.findOne({
  		where: {
  			firstName: firstname,
  			lastName: lastname
  		}
  	}).then(function(user){
  		if (user == null || user == "null"){
  			return cb(null, false);
  		}else{
  			return cb(null, user.dataValues);
  		}
  	}, function(err){
  		return cb(err);
  	});
  }
));

passport.serializeUser(function(users, cb) {
  cb(null, users.id);
});

passport.deserializeUser(function(id, cb) {
	models.User.findById(id).then(function(user){
  		if (user == null || user == "null"){
  			return cb(null, false);
  		}else{
  			return cb(null, user.dataValues);
  		}
  	}, function(err){
  		return cb(err);
  	});
});

router.get("/", function(req, res){
	console.log(req.user)
	res.render("home.html", { user: req.user });
});

router.get("/login",
	function(req, res){
    res.render("login.html");	
});

router.post("/login", 
  passport.authenticate("local", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  });
  
router.get("/logout",
  function(req, res){
    req.logout();
    res.redirect("/");
  });

router.get("/profile",
  require("connect-ensure-login").ensureLoggedIn(),
  function(req, res){
    res.render("profile.html", { user: req.users });
  });

module.exports = router;
module.exports.passport = passport;