/**
 * 상단 네비게이터 담당
*/

angular.module('app').controller('navigatorController', function($scope, dateStorage){

    this.state = {
        leftArrowImg: 'images/leftArrow.svg',
        rightArrowImg: 'images/rightArrow.svg',
        ...angular.copy(dateStorage.state)
    }

    //상태변경 함수
    this.updateState = (newState) => {
        this.state = {
            ...this.state,
            ...newState
        }   
    }

    //상단 네비게이터 - 이전버튼 클릭
    this.handleBeforeButtonClick = () => {
        dateStorage.beforeMonth();
    }

    //상단 네비게이터 - 이후버튼 클릭
    this.handleAfterButtonClick = () => {
        dateStorage.afterMonth();
    }

    //10이하 월 앞에 0 붙이기
    this.checkMonthLength = (month) => {
        return month >= 10 ? month : `0${month}`
    }

    //날짜 변경 시 알림 수신
    $scope.$on('date_updated', (e, data)=>{
        this.updateState(data);
    })
    
});