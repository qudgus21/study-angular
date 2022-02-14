/**
 * app 라우팅
 */

angular.module('app').config(function ($routeProvider) { 
    $routeProvider 
    .when('/', { 
        templateUrl: 'views/pages/home.html' 
    })
    .otherwise({ 
        templateUrl: 'views/pages/notFound.html' 
    }); 
});