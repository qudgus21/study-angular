/**
 * app 라우팅
 */

angular.module('app').config(function ($routeProvider) { 
    $routeProvider 
    .when('/', { 
        templateUrl: 'views/pages/home.html',
        // controller: 'homeController',
        // controllerAs: 'home'
    })
    .otherwise({ 
        templateUrl: 'views/pages/notFound.html',
        controller: 'notController'
    }); 
});