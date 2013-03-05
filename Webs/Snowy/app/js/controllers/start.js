function startCtrl($scope, $location, login, localdata)
{
	localdata.sincroData();
	if (login.existsUser()){
		login.loggUser(login.user.name, login.user.email,function(data, status){
			if (!data.status){
				$location.path('/resorts');
			}
		});
	}else
	{
		//$location.path('/');
	}
}
startCtrl.$inject = ['$scope','$location', 'login', 'localdata'];