angular.module('app').controller('notController', function($location){
    
    this.state = {
        notFoundImg: 'images/notFound.png',
        path: $location.$$path,
    }
    
});