// handle routing for api get and post requests 

// get when want to grab info of an user in database
// post when we submit our questions


// handle routing for all API related requests
var path = require("path");
var friends = require("../data/friends")

// should be able to get info of any user
// should be able to get info of all users
// should be able to post to the api after user
// completes survey

module.exports = function(app){
	app.get("/api/allUsers", function(req,res){
		res.json(friends);
	});

	app.get("/api/:urlUserName", function(req,res){
		var userName = req.params.urlUserName;
		friends.forEach(function(element,index){
			if (userName === element.name) {
				return res.json(element);
			}
		})
	});

	app.post("/api/allUsers", function(req,res){
		
		friends.push(req.body);
		
		// assume first user being compared is the most compatible
		// compare to the second user, replace "most compatbile" if second has a better score
		// continue to compare until the length of arr
		var bestFriend = {};
		bestFriend.bestFriendName = friends[0].name;
		bestFriend.bestFriendPhoto = friends[0].photo;

		var myIndex = friends.length - 1;		
		var scoreDiff = Math.abs(totalScore(friends[0].scores) - friends[myIndex].scores);

		for (var i= 1; i<myIndex; i++) {
			var otherUserScore = friends[i].scores; 
			var myScore = friends[myIndex].scores;	
			var newScoreDiff = Math.abs(totalScore(otherUserScore) - myScore);

			if (newScoreDiff<scoreDiff){
				bestFriend.bestFriendName = friends[i].name;
				bestFriend.bestFriendPhoto = friends[i].photo;
			}
		}
		res.json(bestFriend);		
	});

}

function totalScore(arr){
	var sum = arr.reduce(function (a, b) {
  		return a + b;
	}, 0);
	return sum;
}
