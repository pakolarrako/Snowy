function resortDetailsCtrl($scope, $location, $routeParams, localdata, twitter, weather)
{
	console.log($routeParams);
	var name = $routeParams.resortname;
	var resorts = localdata.getResorts();
	$scope.currentResort = null;
	for(var r in resorts){
		if (resorts[r].name === name){
			$scope.currentResort = resorts[r];
		}
	}
	if ($scope.currentResort){
		var tag = $scope.currentResort.twitteraccount;
		twitter.startTweetsForUser(tag, function(){setUserTwitter.apply(this,arguments);});
		twitter.startTweetsForSearch(tag,function(){setSearchTwitter.apply(this,arguments);});
		weather.getWeatherForResort(name, function(){setWeatherForecast.apply(this,arguments);});

	}
	var setUserTwitter = function(result){
		if (result){
			$scope.userTweets = result;
			$scope.currentUserTweet = result[result.length-1];
		}
	};
	var setSearchTwitter = function(result){
		if (result){
			$scope.searchTweets = result;
			$scope.currentSearchTweet = result[result.length-1];
		}
	};
	var setWeatherForecast = function(result){
		if (result){
			$scope.weather = result;
			console.log(result);		}
	};

}
resortDetailsCtrl.$inject = ['$scope','$location','$routeParams','localdata', 'twitter', 'weather'];