angular.module('app').controller('homeCtrl', function($scope, $http){
    
    $scope.images = {
        leftArrow: 'images/leftArrow.svg',
        rightArrow: 'images/rightArrow.svg'
    }

    $scope.date = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
    }

    $scope.before = function(){
        this.date.year = this.date.month === 1 ? this.date.year - 1 : this.date.year;
        this.date.month = this.date.month === 1 ? 12 : this.date.month - 1;
    }

    $scope.after = function(){
        this.date.year =  this.date.month === 12 ? this.date.year + 1 : this.date.year;
        this.date.month =  this.date.month === 12 ? 1 : this.date.month + 1;
    }

    $scope.checkMonthLength = function(month){
        return month >= 10 ? month : `0${month}`
    }


    $scope.getJobData = function(){
        $http.get('https://frontend-assignments.s3.ap-northeast-2.amazonaws.com/job_postings.json') 
        .then((response)=>{
            $scope.jobData = response.data;

            //여기부터 시작 연월 세팅/매핑 후 job 객체 하나 만들어서 ~

            console.log(response)
        })
    }

    $scope.getJobData();



    // $scope.date = state.get();
    // $scope.before = function(){
    //     state.beforeMonth();
    //     this.loadDate();    
    // }

    // $scope.after = function(){
    //     state.afterMonth();
    //     this.loadDate();
    // };

    // $scope.checkMonthLength = function(month){
    //     return state.checkMonthLength(month);
    // }

    // $scope.loadDate = function(){
    //     this.date = state.get();
    // }

    // state.getJobData().success(function(data){
    //     console.log(data)
    // })
});