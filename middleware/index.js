var Pet = require("../models/pet");
var Comment = require("../models/comment");

// all middleware goes here
var middlewareObj = {};

middlewareObj.checkPetOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Pet.findById(req.params.id, function(err, foundPet){
			if(err){
				req.flash("error", "Not found.")
				res.redirect("/pets");
			}
			else{
			// does user own this
				if(foundPet.author.id.equals(req.user._id)){
				//	res.render("campgrounds/edit", {campground: foundCampground});	
					next();
				}
				else{
					req.flash("error", "You do not have permission for this.");
					res.redirect("back");
				}
			}
		});
	}
	else{
		req.flash("error", "Sorry, you must be logged in to do that.")
		res.redirect("back");
	}	
}

middlewareObj.checkCommentOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect("/pets");
      }
      else{
      // does user own this
        if(foundComment.author.id.equals(req.user._id)){
        //  res.render("campgrounds/edit", {campground: foundCampground});  
          next();
        }
        else{
        	req.flash("error","You do not have permission for this.");
          	res.redirect("back");
        }
      }
    });
  }
  else{
  	req.flash("error","Sorry, you must be logged in to do that.");
    res.redirect("back");
  }
    
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
	    return next();
	}
	req.flash("error", "Sorry, you must be logged in to do that.")
	res.redirect("/login");
}

module.exports = middlewareObj;