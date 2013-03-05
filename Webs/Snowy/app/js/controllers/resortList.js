function resortListCtrl($scope, $location, localdata)
{
	$scope.resorts = localdata.Resorts;
}
resortListCtrl.$inject = ['$scope','$location', 'localdata'];