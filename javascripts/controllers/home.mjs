/**
 * home 페이지 컨트롤러
*/

angular.module('app').controller('homeCtrl', function($scope, modalService, apiService){

    //상태값
    $scope.state = {
        leftArrowImg: 'images/leftArrow.svg',
        rightArrowImg: 'images/rightArrow.svg',
        year: 2021,
        month: 9,
        // year: moment().year(),
        // month: moment().month()+1,
        jobData: [],
        calendarData: [],
        isModalOpen: false,
        selectedJob: null,
        test : moment('2019-12-10', 'YYYY-MM-DD')
    }

    //바로 실행(api 호출, 상태겂 초기화 등 수행)
    $scope.loaded = function(){
        this.getJobData();
    }

    //채용공고 데이터 가져오기
    $scope.getJobData = function(){
        apiService.get().success(function(data){
            $scope.updateState({
                jobData : data
            })
            $scope.setCalendarDate();
        })
    }

    //상태값 변경
    $scope.updateState = function(newState){
        this.state = {
            ...this.state,
            ...newState
        }   
    }

    //상단 네비게이터 - 이전버튼 클릭
    $scope.beforeMonth = function(){
        let {year, month} = this.state;
        year = month === 1 ? year - 1 : year;
        month = month === 1 ? 12 : month - 1;
        this.updateState({year,month})
        this.setCalendarDate();
    }

    //상단 네비게이터 - 이후버튼 클릭
    $scope.afterMonth = function(){
        let {year, month} = this.state;
        year =  month === 12 ? year + 1 : year;
        month =  month === 12 ? 1 : month + 1;
        this.updateState({year,month})
        this.setCalendarDate();
    }

    //10이하 월 앞에 0 붙이기
    $scope.checkMonthLength = function(month){
        return month >= 10 ? month : `0${month}`
    }

    // 날짜 세팅
    $scope.getDate = function(){
        const {year, month} = this.state;
        const viewYear = year;
        const viewMonth = month;
        const prevLast = new Date(viewYear, viewMonth - 1, 0);
        const thisLast = new Date(viewYear, viewMonth, 0);
        const prevLastDate = prevLast.getDate();
        const prevLastDay = prevLast.getDay();
        const thisLastDate = thisLast.getDate();
        const thisLastDay = thisLast.getDay();
        const thisDates = [];
        const prevDates = [];
        const nextDates = [];
        const days = Array(thisLastDate + 1).keys();

        while (true) {
            const iteratorResult = days.next();
            if (iteratorResult.done) break;
            thisDates.push(iteratorResult.value.toString());
        }
        if (prevLastDay !== 6) {
            for (let i = 0; i < prevLastDay + 1; i++) {
            prevDates.unshift((prevLastDate - i).toString());
            }
        }
        for (let i = 1; i < 7 - thisLastDay; i++) {
        nextDates.push(i.toString());
        }

        // 지난 월 최초 날짜에 월 표시
        if (prevDates.length) {
            prevDates[0] = month === 1 ? `12/${prevDates[0]}` : `${month - 1}/${prevDates[0]}`;
        }
        
        // 다음 월 최초 날짜에 월 표시
        if (nextDates.length) {
            nextDates[0] = month === 12 ? `1/${nextDates[0]}` : `${month + 1}/${nextDates[0]}`;
        }

        const dates = prevDates.concat(thisDates.slice(1), nextDates);

        return {
            dates,
            nextDates,
            prevDates,
            thisDates,
        }
    }

    // 채용정보 세팅
    $scope.getJobs = function(nextDates, prevDates, thisDates){
        const {year, month} = this.state;

        const prevJobs = prevDates.map((day) =>
        month === 1 ? this.mappingJobData(year - 1, 12, day) : this.mappingJobData(year, month - 1, day),
        );
    
        const thisJobs = thisDates.slice(1).map((day) => this.mappingJobData(year, month, day));
    
        const nextJobs = nextDates.map((day) =>
        month === 12 ? this.mappingJobData(year + 1, 1, day) : this.mappingJobData(year, month + 1, day),
        );

        const jobs = this.sortJobs(prevJobs.concat(thisJobs, nextJobs));

        return jobs
    }

    //날짜, 채용정보 연결
    $scope.mappingJobData = function(year, month, day){
        const {jobData} = this.state;
        const baseDate = new Date(`${year}-${month}-${day}`);
        const jobs = [];
    
        jobData.forEach((job) => {
            const startDate = new Date(job.start_time);
            const endDate = new Date(job.end_time);
            if (moment(baseDate).isSame(startDate, 'day')) {
            jobs.push({ ...job, status: 'S' });
            }
    
            if (moment(baseDate).isSame(endDate, 'day')) {
            jobs.push({ ...job, status: 'E' });
            }
        });

        return jobs;
    }

    //채용정보 정렬
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

    //날짜, 채용정보 합쳐서 calendarData로 세팅
    $scope.setCalendarDate = function(){
        const {
            dates,
            nextDates,
            prevDates,
            thisDates,
        } = this.getDate();

        const jobs = this.getJobs(nextDates, prevDates, thisDates);

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

    //채용공고 클릭
    $scope.handleJobClick = function(job){
        modalService.modalOpen();
        this.updateState({
            selectedJob : job,
            isModalOpen: modalService.isModalOpen
        })
    }

    //페이지 클릭(모달 종료를 위해)
    $scope.handlePageClick = function($event){
        modalService.checkModalOutsideClick($event);
        this.updateState({
            isModalOpen: modalService.isModalOpen
        })
    }

    //날짜변환
    $scope.translateDate = function(date){
        return moment(date).format('YYYY.MM.DD HH.MM');
    }

    //날짜차이
    $scope.calTimeDiff = function(date){
        return moment(new Date()).diff(moment(date), 'days')
    }

    //날짜차이
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