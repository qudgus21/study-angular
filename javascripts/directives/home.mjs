//페이지를 구성하는 디렉티브(컴포넌트)

angular.module('app').directive('homeHeader', function(){
    return {
        templateUrl: '../../views/components/home/header.html',
    }
})

angular.module('app').directive('homeCalendar', function(){
    return {
        templateUrl: '../../views/components/home/calendar.html',
    }
})

angular.module('app').directive('homeModal', function(){
    return {
        templateUrl: '../../views/components/home/modal.html',
    }
})

angular.module('app').directive('modalContent', function(){
    return {
        templateUrl: '../../views/components/home/modalContent.html',
    }
})
