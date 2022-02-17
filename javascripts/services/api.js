/**
 * API 호출
 */

angular.module('app').factory('apiService', ['$http', function($http){

    const END_POINT = 'https://frontend-assignments.s3.ap-northeast-2.amazonaws.com/job_postings.json';

    const service = {

        //get
        get : (endPoint) => {
            return $http.get(endPoint || END_POINT) 
            .success(function(data) { 
              return data; 
            })
            .error(function(err) { 
              return err; 
            }); 
        }
        
    }
    return service;
    
}]);