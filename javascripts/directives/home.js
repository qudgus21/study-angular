/**
 * home 페이지 디렉티브
**/

angular.module('app').directive('navigator', function(){
    return {
        restrict: 'E',//default,
        templateUrl: 'views/components/home/navigator.html',
    }
})

angular.module('app').directive('calendar', function(){
    return {
        templateUrl: 'views/components/home/calendar.html',
    }
})

angular.module('app').directive('dayItem', function(){
    return {
        templateUrl: 'views/components/home/dayItem.html',
    }
})

angular.module('app').directive('modal', function(){
    return {
        templateUrl: 'views/components/common/modal.html',
    }
})


