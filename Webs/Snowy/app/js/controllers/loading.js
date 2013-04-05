function loadingCtrl($scope, $location, login)
{
	login.redirectIfNotLogged();
}
loadingCtrl.$inject = ['$scope','$location', 'login'];