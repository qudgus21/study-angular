angular.module('app').controller('notCtrl', function($scope,$location){
    $scope.state = {
        notFoundImg: 'images/notFound.png',
        path: $location.$$path,
    }
});