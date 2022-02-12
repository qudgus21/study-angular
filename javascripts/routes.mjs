angular.module('app').config(function ($routeProvider) { 
    $routeProvider 
    .when('/', { 
        templateUrl: 'views/pages/home.html' 
    })
    .otherwise({ 
        redirectTo: '/404',
        templateUrl: 'views/pages/notFound.html' 
    }); 
});