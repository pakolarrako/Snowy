function loginCtrl($scope, $location, login)
{
	$scope.loginclick = function(){
		login.loggUser($scope.name, $scope.email,function(data){
			if (!data.status){
				login.geolocateUser(function(){
					$location.path('/resorts');
				});
			}else
			{
				$scope.err = data.status;
			}
		});
	};
}
loginCtrl.$inject = ['$scope','$location','login'];