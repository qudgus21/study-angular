angular.module('app').factory('dateStorage',function($rootScope){

    const storage = {

        state : {
            year: moment().year(),
            month: moment().month()+1,
        },

        //상태변경 함수
        updateState : (newState) => {
            storage.state = {
                ...storage.state,
                ...newState
            }
            storage.notify();
        },

        //이전달로 변경
        beforeMonth : () => {
            let {year, month} = storage.state;
            year = month === 1 ? year - 1 : year;
            month = month === 1 ? 12 : month - 1;
            storage.updateState({year,month})
        },

        //다음달로 변경
        afterMonth : () => {
            let {year, month} = storage.state;
            year =  month === 12 ? year + 1 : year;
            month =  month === 12 ? 1 : month + 1;
            storage.updateState({year,month})
        },

        //변경 알림
        notify : () => {
            $rootScope.$broadcast('date_updated', storage.state);
        }
        
    }    

    return storage;    
});