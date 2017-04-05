var mongoose = require("mongoose");
var Pet = require("./models/pet");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest",
		image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
		description: "blah blah blah"
	},
	{
		name: "Desert Mesa",
		image: "https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg",
		description: "blah blah blah"
	},
	{
		name: "Canyon Floor",
		image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg",
		description: "blah blah blah"
	},
]

function seedDB(){
	// Remove all campgrounds
	Pet.remove({}, function(err){
/*		if(err){
			console.log(err);
		}
		console.log("removed campgrounds");
		// add few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				}
				else{
					console.log("added a campground");
					// create a commment
					Comment.create(
						{
							text: "This place is great",
							author: "Homer"
						}, function(err,comment){
							if(err){
								console.log(err);
							}
							else{
								campground.comments.push(comment);
								campground.save();
								console.log("added a comment");	
							}
							
					});
				}
			});
		});*/
	});		
}

module.exports = seedDB;
