function resortListCtrl($scope, $location, localdata)
{
	$scope.resorts = localdata.getResorts();
}
resortListCtrl.$inject = ['$scope','$location', 'localdata'];