var express 		= require("express"),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	flash			= require("connect-flash"),
	passport		= require("passport"),
	LocalStrategy 	= require("passport-local"),
	methodOverride	= require("method-override"),
	Pet 		= require("./models/pet"),
	Comment 		= require("./models/comment"),
	User			= require("./models/user"),
	seedDB			= require("./seeds");

// ROUTES
var petRoutes = require("./routes/pets"),
	commentRoutes = require("./routes/comments"),
	indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/pet_espouse");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGS
app.use(require("express-session")({
	secret: "This is just a random statement mate.",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


app.use("/", indexRoutes);
app.use("/pets", petRoutes);
app.use("/pets/:id/comments", commentRoutes);

app.listen(8080, function(){
	console.log("Server running on port 8080");
});