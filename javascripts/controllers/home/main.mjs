/**
 * 모달 담당
*/

angular.module('app').controller('homeController', function(modalService){

    this.state = {
        selectedJob: null,
        ...angular.copy(modalService.state)
    }

    //상태변경 함수
    this.updateState = (newState) => {
        this.state = {
            ...this.state,
            ...newState
        }   
    }

    //모달 열기
    this.modalOpen = (job) => {
        modalService.modalOpen();
        this.updateState({
            selectedJob : job,
            isModalOpen: modalService.state.isModalOpen
        })
    }

    //모달 닫기
    this.handlePageClick = ($event) => {
        modalService.checkModalOutsideClick($event);
        this.updateState({
            isModalOpen: modalService.state.isModalOpen
        })
    }

    //날짜변환
    this.translateDate = (date) => {
        return moment(date).format('YYYY.MM.DD HH.MM');
    }

    //날짜차이
    this.calTimeDiff = (date) => {
        return moment(new Date()).diff(moment(date), 'days')
    }

    //날짜차이
    this.getTimeDiff = (date) => {
        const diff = this.calTimeDiff(date);
        if (diff > 0) {
            return `${diff}일 지남`;
        }
        if (diff === 0) {
            return '오늘';
        }
        return `${diff}일 전`;
    }
    
});