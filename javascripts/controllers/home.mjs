//함수 분리 & moment js적용

angular.module('app').controller('homeCtrl', function($scope, $http){

    //상태값
    $scope.state = {
        leftArrowImg: 'images/leftArrow.svg',
        rightArrowImg: 'images/rightArrow.svg',
        year: 2021,
        month: 9,
        // year: new Date().getFullYear(),
        // month: new Date().getMonth() + 1,
        jobData: [],
        calendarData: [],
        isModalOpen: false,
        selectedJob: null,
    }

    $scope.test = false;
    $scope.testToggle = function(){
    }
    $scope.getMyCtrlScope = function() {
        return $scope;   
   }


    //바로 실행
    $scope.loaded = function(){
        this.getJobData();
    }

    //상태값 변경 험수
    $scope.updateState = function(newState){
        this.state = {
            ...this.state,
            ...newState
        }   
    }

    $scope.before = function(){
        let {year, month} = this.state;
        year = month === 1 ? year - 1 : year;
        month = month === 1 ? 12 : month - 1;
        this.updateState({year,month})
        this.setDatesAndJobs();
    }

    $scope.after = function(){
        let {year, month} = this.state;
        year =  month === 12 ? year + 1 : year;
        month =  month === 12 ? 1 : month + 1;
        this.updateState({year,month})
        this.setDatesAndJobs();
    }

    $scope.checkMonthLength = function(month){
        return month >= 10 ? month : `0${month}`
    }

    $scope.getJobData = function(){
        $http.get('https://frontend-assignments.s3.ap-northeast-2.amazonaws.com/job_postings.json') 
        .then((response)=>{
            this.updateState({
                jobData : response.data,
            })
            this.setDatesAndJobs();
        })
    }

    $scope.setDatesAndJobs = function(){
        const {year, month} = this.state;
        const viewYear = year;
        const viewMonth = month;
        const prevLast = new Date(viewYear, viewMonth - 1, 0);
        const thisLast = new Date(viewYear, viewMonth, 0);
        const pldate = prevLast.getDate();
        const plday = prevLast.getDay();
        const tldate = thisLast.getDate();
        const tlday = thisLast.getDay();
        const thisDates = [];
        const prevDates = [];
        const nextDates = [];
        const days = Array(tldate + 1).keys();
    
        // 날짜 세팅
        while (true) {
          const iteratorResult = days.next();
          if (iteratorResult.done) break;
          thisDates.push(iteratorResult.value.toString());
        }
        if (plday !== 6) {
          for (let i = 0; i < plday + 1; i++) {
            prevDates.unshift((pldate - i).toString());
          }
        }
        for (let i = 1; i < 7 - tlday; i++) {
          nextDates.push(i.toString());
        }
    
        // 채용정보 세팅
        const prevJobs = prevDates.map((day) =>
          month === 1 ? this.mappingJobData(year - 1, 12, day) : this.mappingJobData(year, month - 1, day),
        );
    
        const thisJobs = thisDates.slice(1).map((day) => this.mappingJobData(year, month, day));
    
        const nextJobs = nextDates.map((day) =>
          month === 12 ? this.mappingJobData(year + 1, 1, day) : this.mappingJobData(year, month + 1, day),
        );
    
        // 지난 월 최초 날짜에 월 표시
        if (prevDates.length) {
          prevDates[0] = month === 1 ? `12/${prevDates[0]}` : `${month - 1}/${prevDates[0]}`;
        }
    
        // 다음 월 최초 날짜에 월 표시
        if (nextDates.length) {
          nextDates[0] = month === 12 ? `1/${nextDates[0]}` : `${month + 1}/${nextDates[0]}`;
        }
    
        const dates = prevDates.concat(thisDates.slice(1), nextDates);
        let jobs = prevJobs.concat(thisJobs, nextJobs);
        jobs = this.sortJobs(jobs);


        const calendarData = dates.map(function(item, i) {
            return {
                date: item,
                jobs: jobs[i]
            };
        });

        this.updateState({
            calendarData
        })
    }
    

    $scope.mappingJobData = function(year, month, day){
        const {jobData} = this.state;
        const baseDate = new Date(`${year}-${month}-${day}`);
        const jobs = [];
    
        jobData.forEach((job) => {
            const startDate = new Date(job.start_time);
            const endDate = new Date(job.end_time);
          
            //issame day moment js
            if (this.isSameDay(baseDate, startDate)) {
            jobs.push({ ...job, status: 'S' });
            }
    
            if (this.isSameDay(baseDate, endDate)) {
            jobs.push({ ...job, status: 'E' });
            }
        });

        return jobs;
    }

    $scope.sortJobs = function(jobs){
        jobs.map((job) => {
            job.sort((a, b) => {
                if (a.status === b.status) {
                return a.name < b.name ? -1 : 0;
                }
                return a.status === 'S' ? -1 : 1;
            });
        });
        return jobs;
    }

    $scope.isSameDay = function(d1, d2){
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }

    $scope.status = function(status){
        return status === 'S' ? '시' : '끝'
    }

    $scope.handleJobClick = function(job){

        this.updateState({
            selectedJob : job,
            isModalOpen: true
        })    
            
    }

    //page
    $scope.modalClose = function($event){

        const $modal = document.querySelector('.inner');

        if(!$modal.contains($event.target)){
            this.updateState({
                isModalOpen: false
            })    
        }
    }

    $scope.translateDate = function(date){
        const base = new Date(date);
        const year = base.getFullYear();
        let month = base.getMonth() + 1;
        let day = base.getDate();
        let hour = base.getHours();
        let min= base.getMinutes();
        month = month >= 10 ? month : `0${month}`;
        day = day >= 10 ? day : `0${day}`;
        hour = hour >= 10 ? hour : `0${hour}`;
        min = min >= 10 ? min : `0${min}`;
        return `${year}.${month}.${day} ${hour}:${min}`;
    }

    $scope.calTimeDiff = function(date){
        const diff = (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24);
        return Math.round(diff);
    }

    $scope.getTimeDiff = function(date){
        const diff = this.calTimeDiff(date);
        if (diff > 0) {
          return `${diff}일 지남`;
        }
        if (diff === 0) {
          return '오늘';
        }
        return `${diff}일 전`;
    }

    $scope.loaded();
});