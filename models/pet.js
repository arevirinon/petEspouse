var mongoose = require("mongoose");

// SCHEMA SETUP
var petSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	emailAdd: String,
	contactNum: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},	
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

var Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;