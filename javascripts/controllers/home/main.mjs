/**
 * home 페이지 메인 컨트롤러
*/

angular.module('app').controller('homeController', function($rootScope){

    this.state = {}

    //상태변경 함수
    this.updateState = (newState) => {
        this.state = {
            ...this.state,
            ...newState
        }   
    }

    //모달 열기
    this.notifyDataToModal = (job) => {
        $rootScope.$broadcast('modalContent', {
            ...job,
            start_time: this.translateDate(job.start_time),
            end_time: this.translateDate(job.end_time), 
            diff: this.getTimeDiff(job.end_time),
        })
    }

    //날짜변환
    this.translateDate = (date) => {
        return moment(date).format('YYYY.MM.DD HH.MM');
    }

    //날짜차이
    this.getTimeDiff = (date) => {
        const diff = moment(new Date()).diff(moment(date), 'days');
        if (diff > 0) {
            return `${diff}일 지남`;
        }
        if (diff === 0) {
            return '오늘';
        }
        return `${diff}일 전`;
    }
});