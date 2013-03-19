angular.module('snowy.twitterservice',[]).
factory('twitter',function(remotedata){
	var userTweets = [];
	var searchTweets = [];
	var maxUser = 50;
	var maxSearch = 50;
	var currentUser = null;
	var currentTag = null;	
	var callbackUser = null;
	var callbackSearch = null;

	var workersearch = null;
	var workeruser = null;

	var startTweetsForUser = function(user, callback){
		userTweets = [];
		currentUser = user;
		callbackUser = callback;
		fillUser(currentUser,10);
		workeruser = new Worker("./js/services/workers/twitteruserworker.js");
		workeruser.onmessage = function(event) {
			fillNextUser.apply(this,arguments);
		};
	};

	var startTweetsForSearch = function(tag, callback){
		searchTweets = [];
		currentTag = tag;
		callbackSearch = callback;
		fillSearch(currentTag,10);
		workersearch = new Worker("./js/services/workers/twittersearchworker.js");
		workersearch.onmessage = function(event) {
			fillNextSearch.apply(this,arguments);
		};
	};

	var fillUser = function(user, count){
		remotedata.UserTweetsHttp.get({name:user}, function(tweets){
			console.log(tweets);
			var tweet = null;
			var exists = false;
			for(var i in tweets){
				tweet = tweets[i];
				for(var j = 0; j<userTweets.length && !exists; j++)
				{
					var arrayt = userTweets[j];
					if (arrayt.id === tweet.id){
						exists = true;
					}
				}
				if (exists === false)
				{
					if (userTweets.length === maxUser){
						userTweets.slice();
					}
					userTweets.push(tweet);
				}
			}
			callbackUser(userTweets);
		}, function(res){
			console.log(res);
		});
	};

	var fillSearch = function(tag, count){
		remotedata.HashTagTweets.get({search:tag, number:count}, function(tweets){
			console.log(tweets);
			var tweet = null;
			var exists = false;
			for(var i in tweets.results){
				tweet = tweets.results[i];
				for(var j = 0; j<searchTweets.length && !exists; j++)
				{
					var arrayt = searchTweets[j];
					if (arrayt.id === tweet.id){
						exists = true;
					}
				}
				if (exists === false)
				{
					if (searchTweets.length === maxSearch){
						searchTweets.slice();
					}
					searchTweets.push(tweet);
				}
			}
			callbackSearch(searchTweets);
		});
	};

	var fillNextUser = function(){
		fillUser(currentUser,5);
	};

	var fillNextSearch = function(callback){
		fillSearch(currentTag,5);
	};

	return{
		startTweetsForSearch: startTweetsForSearch,
		startTweetsForUser: startTweetsForUser
	};

});