/**
 * Modal
 */

angular.module('app').factory('modalService', function(){
    
    const service = {
        isModalOpen : false,

        checkModalOutsideClick : function($event){
            const $modal = document.querySelector('.inner');
            if(!$modal.contains($event.target)){
                this.isModalOpen = false
            }
        },

        modalOpen : function(){
            this.isModalOpen = true;
        }
    }
    
    return service;
    
});