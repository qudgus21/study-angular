// //app 전역의 관심사 분리

// angular.module('app').factory('state', ['$http', function($http){
    
//     var state = {
        
//         year: new Date().getFullYear(),
//         month: new Date().getMonth() + 1,

//         get : function(){
//             return {
//                 year: this.year , 
//                 month : this.month,
//                 jobData: []
//             }
//         },

//         beforeMonth : function(){
//             this.year = this.month === 1 ? this.year - 1 : this.year;
//             this.month = this.month === 1 ? 12 : this.month - 1;
//         },

//         afterMonth : function(){
//             this.year =  this.month === 12 ? this.year + 1 : this.year;
//             this.month =  this.month === 12 ? 1 : this.month + 1;
//         },

//         checkMonthLength : function(month){
//             return month >= 10 ? month : `0${month}`
//         },



//     }
    
//     return state;
// }]);