function resortDetailsCtrl($scope, $location, $routeParams, login, localdata, twitter, weather)
{
	console.log($routeParams);
	login.redirectIfNotLogged();
	var name = $routeParams.resortname;
	var resorts = localdata.getResorts();
	var index = 0;
	$scope.currentDate = new Date();
	console.log($scope.currentDate);
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
			$scope.currentUserTweet = result[index];
		}
	};
	var setSearchTwitter = function(result){
		if (result){
			index = 0;
			$scope.searchTweets = result;
			$scope.currentSearchTweet = result[index];
		}
	};
	var setWeatherForecast = function(result){
		if (result){
			index = 0;
			var dayforecast = result.forecast.simpleforecast.forecastday[0];
			$scope.weather = dayforecast;
			console.log(dayforecast);
		}
	};

	$scope.rate = function()
	{
		$location.path('/resorts/rate/'+ $scope.currentResort.name);
	};

}
resortDetailsCtrl.$inject = ['$scope','$location','$routeParams','login','localdata', 'twitter', 'weather'];