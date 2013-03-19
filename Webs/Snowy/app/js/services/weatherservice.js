angular.module('snowy.weatherservice', []).
  // Declare new object called time,
  // which will be available for injection
	factory('weather', function(remotedata, localdata) {
		getWeatherForResort = function(name, callback){
			var mycallback = callback;
			var params = {
			name : name						
			};
		
			remotedata.WeatherForecast.get(params,mycallback);
		};
				

		return {
			getWeatherForResort : getWeatherForResort
		};
	});