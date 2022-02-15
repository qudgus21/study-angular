/**
 * Modal
 */

angular.module('app').factory('modalService', function(){
    
    const service = {
        
        state : {
            isModalOpen : false,//모달은 한개임. 여기서 오픈관리 하는게 맞음.
        },

        //상태변경 함수
        updateState : (newState) => {
            service.state = {
                ...this.state,
                ...newState
            }
        },

        //외부클릭
        checkModalOutsideClick : ($event) => {
            const $modal = document.querySelector('.inner');
            if(!$modal.contains($event.target)){
                service.updateState({isModalOpen : false})
            }
        },

        //오픈
        modalOpen : () => {
            service.updateState({isModalOpen : true})
        }
  
    }
    
    return service;
    
});