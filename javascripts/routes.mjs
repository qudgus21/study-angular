/**
 * app 라우팅
 */

angular.module('app').config(function ($routeProvider) { 
    $routeProvider 
    .when('/', { 
        templateUrl: 'views/pages/home.html',
        // controller: 'homeController', => view 에서 포함 시킴
        // controllerAs: 'homeCtrl'
    })
    .otherwise({ 
        templateUrl: 'views/pages/notFound.html',
        controller: 'notController'
    }); 
});