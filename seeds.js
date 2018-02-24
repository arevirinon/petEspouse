var mongoose = require("mongoose");
var Pet = require("./models/pet");
var Comment = require("./models/comment");

var data = [
	
]

function seedDB(){
	// Remove all entries
	Pet.remove({}, function(err){
/*		if(err){
			console.log(err);
		}
		console.log("removed entries");
		// add few entries
		data.forEach(function(seed){
			Pet.create(seed, function(err, pet){
				if(err){
					console.log(err);
				}
				else{
					console.log("added a pet");
					// create a commment
					Comment.create(
						{
							text: "Aww so cute",
							author: "Jennifer"
						}, function(err,comment){
							if(err){
								console.log(err);
							}
							else{
								pet.comments.push(comment);
								pet.save();
								console.log("added a comment");	
							}
							
					});
				}
			});
		});*/
	});		
}

module.exports = seedDB;
