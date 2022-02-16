/**
 * 모달 컨트롤러
*/

angular.module('app').controller('modalController', function($scope){

    this.state = {
        isModalOpen : false,
        data : null,
    },

    //상태변경 함수
    this.updateState = (newState) => {
        this.state = {
            ...this.state,
            ...newState
        }
    },
    
    //모달 열기
    this.modalOpen = () => {
        this.updateState({isModalOpen : true})
    }   

    //모달 외부 클릭 => 모달 닫기
    this.checkModalOutsideClick = ($event) => {
        const $modal = document.querySelector('.inner');
        if(!$modal.contains($event.target)){
            this.updateState({isModalOpen : false})
        }
    }
    
    //이벤트 - 모달 열기
    $scope.$on('modalOpen',(e,data)=>{
        this.modalOpen();
    })

    //이벤트 - 모달 내부 데이터 설정
    $scope.$on('modalContent', (e,data)=>{
        this.updateState({data})
    })

});