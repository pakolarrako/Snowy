function resortListCtrl($scope, $location,login, localdata)
{
	login.redirectIfNotLogged();
	$scope.resorts = localdata.getResorts();
}
resortListCtrl.$inject = ['$scope','$location','login', 'localdata'];