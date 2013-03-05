function registerCtrl($scope, $location, login)
{
	$scope.registerClick = function(){
		login.registerUser($scope.name, $scope.email,function(data){
			if (!data.status){
				$location.path('/resorts');
			}else
			{
				$scope.err = data;
			}
		});
	};
}
registerCtrl.$inject = ['$scope','$location','login'];