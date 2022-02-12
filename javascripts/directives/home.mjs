//페이지를 구성하는 디렉티브(컴포넌트)

angular.module('app').directive('calendar', function(){
    return {
        templateUrl: '../../views/components/home/header.html',
    }
})