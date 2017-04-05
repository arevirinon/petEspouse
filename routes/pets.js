var express = require("express");
var router = express.Router();
var Pet = require("../models/pet");
var middleware = require("../middleware");

router.get("/", function(req, res){
	// Get all campgrounds from DB
	Pet.find({}, function(err, allpets){
		if(err){
			console.log(err);
		}
		else{
			res.render("pets/index", {pets:allpets, currentUser: req.user});
		}
	});
});

router.post("/", middleware.isLoggedIn, function(req, res){

	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var emailAdd = req.body.emailAdd;
	var contactNum = req.body.contactNum;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newPet = {name:name, image:image, description: desc, author: author, emailAdd: emailAdd, contactNum: contactNum};
	// create new campground and save to DB
	Pet.create(newPet, function(err, newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			// redirect back to campgrounds page
			req.flash("success", "New entry has been added!");
			res.redirect("/pets");	
		}
	})
});

router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("pets/new");
});

// shows more info about one campground
router.get("/:id", function(req, res){
	Pet.findById(req.params.id).populate("comments").exec(function(err, foundPet){
		if(err){
			console.log(err);
		}
		else{
			res.render("pets/show", {pet: foundPet});
		}
	});
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkPetOwnership, function(req, res){
    Pet.findById(req.params.id, function(err, foundPet){
        res.render("pets/edit", {pet: foundPet});
    });
});
// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkPetOwnership, function(req, res){
	// find and update the correct campground
	Pet.findByIdAndUpdate(req.params.id, req.body.pet, function(err, updatedPet){
		if(err){
			res.redirect("/pets");
		}
		else{
			req.flash("success","Entry has been updated!");
			res.redirect("/pets/"+req.params.id);
		}
	});
	// redirect somewhere
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkPetOwnership, function(req, res){
	Pet.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/pets");
		}
		else{
			req.flash("success","Entry has been successfully removed.");
			res.redirect("/pets");
		}
	});
});



module.exports = router;