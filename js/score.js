class Detail {

    constructor() {
        this.score = 6;
        this.highScore = localStorage.getItem('high-score') || 0;
        this.scoreDetail = document.querySelector('.game-area .game-detail .score-detail');
        this.timerDetail = document.querySelector('.game-area .game-detail .timer');
        this.gameArea = document.querySelector('.game-area');
        this.boardResult = document.querySelector('.game-over');
        this.playing = false;
        this.timerResult;
        // this.startTime = new Date().getTime();
    }

    // setTimer(){
    //     this.timer = new Date().getTime();
    // }

    startTimer() {
        this.playing = true;
        this.timer = new Date().getTime();

        this.intervalTimer = setInterval(() => {
            this.timerCount()
        }, 1000)
    }

    stopTimer() {
        this.playing = false;
        clearInterval(this.intervalTimer)
    }

    result() {
        const score = document.querySelector('.game-over .score');
        const highScore = document.querySelector('.game-over .high-score');
        const timeResult = document.querySelector('.game-over .time-result');

        timeResult.innerHTML = `Time : ${this.timerResult}`;
        score.innerHTML = `Your score : ${this.score}`;
        highScore.innerHTML = `Highscore : ${Math.max(this.score, this.highScore)}`;
    }

    formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    timerCount() {
        if (this.playing) {
            let currentTime = (new Date().getTime() - this.timer) / 1000;
            let seconds = currentTime % 60;
            let minutes = currentTime % 3600 / 60;
            let hours = currentTime / 3600;
            let formatedTime = `${Math.floor(hours)}:${this.formatTime(Math.floor(minutes) % 60)}:${this.formatTime(Math.floor(seconds) % 60)}`;
            this.timerResult = formatedTime;
            this.timerDetail.innerHTML = 'Timer: ' + formatedTime;
        }
    }
}

export default Detail;