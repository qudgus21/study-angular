/**
 * 달력 컨트롤러
*/

angular.module('app').controller('calendarController', function($scope, apiService, dateStorage, $rootScope){

    this.state = {
        calendarData: [],
        jobData: [],
        ...angular.copy(dateStorage.state)
    }

    //상태변경 함수
    this.updateState = (newState) => {
        this.state = {
            ...this.state,
            ...newState
        }   
    }

    //바로 실행(api 호출, 상태값 초기화 등 수행)
    this.loaded = () => {
        this.getJobData();
    }

    //채용공고 데이터 가져오기
    this.getJobData = () => {
        apiService.get().success((data)=>{
            this.updateState({
                jobData : data
            })
            this.setCalendarDate();
        })
    }

    //날짜, 채용정보 합쳐서 calendarData로 세팅
    this.setCalendarDate = () => {
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

    // 날짜 세팅
    this.getDate = () => {
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
    this.getJobs = (nextDates, prevDates, thisDates) => {
        const {year, month} = this.state;
        const prevJobs = prevDates.map((day) =>
        month === 1 ? this.mappingJobData(year - 1, 12, day) : this.mappingJobData(year, month - 1, day));
        const thisJobs = thisDates.slice(1).map((day) => this.mappingJobData(year, month, day));
        const nextJobs = nextDates.map((day) =>
        month === 12 ? this.mappingJobData(year + 1, 1, day) : this.mappingJobData(year, month + 1, day));
        const jobs = this.sortJobs(prevJobs.concat(thisJobs, nextJobs));
        return jobs
    }

    //날짜, 채용정보 연결
    this.mappingJobData = (year, month, day) => {
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
    this.sortJobs = (jobs) => {
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

    //채용공고 클릭
    this.handleJobClick = (job) => {
        $scope.$parent.homeCtrl.notifyDataToModal(job);
        $rootScope.$broadcast('modal_open');
    }

    //날짜 변경 시 알림 수신
    $scope.$on('date_updated', (e,data)=>{
        this.updateState(data);
        this.setCalendarDate();
    })

    this.loaded();
    
});