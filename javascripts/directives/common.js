/**
 * 공통 디렉티브
**/

angular.module('app').directive('modalContent', ['$location', function($location){
    
    let content;

    //페이지에 따라 modal의 content변경
    switch($location.$$path){
        case '/':
            content = 'home'
            break;
        default :
            content = '/no'
    }

    const contentPath = `views/components/${content}/modalContent.html`

    return {
        templateUrl: contentPath
    }

}])