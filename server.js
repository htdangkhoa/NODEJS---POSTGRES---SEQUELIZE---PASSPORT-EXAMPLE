var ejs = require("ejs"),
	cookieParser = require("cookie-parser"),
  	bodyParser = require("body-parser"),
  	expressSession = require("express-session"),
  	routes = require('./routes/app'),
  	express = require("express"),
  	app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);

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
app.use(routes.passport.initialize());
app.use(routes.passport.session());

app.use('/', routes);

app.listen(5000, function(){
	console.log("Connected");
});