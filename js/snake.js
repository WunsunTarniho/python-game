const DIRECTION_UP = 0;
const DIRECTION_RIGHT = 1;
const DIRECTION_LEFT = 2;
const DIRECTION_DOWN = 3;

class Snake {
    constructor({ canvas, context, grid, move, detail }) {
        this.canvas = canvas;
        this.grid = grid;
        this.context = context;
        this.color = 'darkgreen';
        this.move = move;
        this.detail = detail;
        this.playing = false;
        this.history = [];
        this.stepHistory = 0;

        //Snake default position
        this.x = Math.floor(this.grid.x / 2);
        this.y = Math.floor(this.grid.y / 2);

        //Direction default
        this.dx = 1;
        this.dy = 0;
        this.direction = DIRECTION_LEFT;

        //Snake body
        this.body = [
            [this.x, this.y],
            [this.x - 1, this.y],
            [this.x - 2, this.y],
            [this.x - 3, this.y],
            [this.x - 4, this.y],
            [this.x - 5, this.y],
        ]

        //Panjang awal tubuh ular
        this.length = 6;

    }

    startGame() {
        this.playing = true;
    }

    stopGame() {
        this.playing = false;
    }

    rewind(step) {
        this.stopGame();

        const steps = step * (1000 / 250);

        if (this.history.length > 0 && this.history.length > steps) {

            const lastState = this.history[this.history.length - steps]; // Jika panjang riwayat ular(array) 20 sama dengan 20 step
            this.stepHistory = steps;
            this.x = lastState.x;                                        // 1 detik 4 step karna kecepatan 1 detik 4 grid
            this.y = lastState.y;
            this.body = lastState.body;
            this.dx = lastState.dx;
            this.dy = lastState.dy;
            this.direction = lastState.direction;
            // this.detail.score = lastState.score;

            this.length = this.history[this.history.length - 1].body.length;

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.draw()

            const [headX, headY] = this.body[0];
            this.body.slice(1).forEach(([x, y]) => {
                if (headX === x && headY === y) {
                    console.log([x, y])
                    console.log('tabrakan terjadi');
                    this.stopGame();
                }
            })

        } else {
            console.log('Tidak memungkinkam')
        }


    }


    draw() {
        // console.log(this.grid.x/2)
        // console.log(this.grid.width)
        // console.log(this.x * this.grid.width)
        if (this.move.up === true && this.direction !== DIRECTION_DOWN) {
            this.dx = 0;
            this.dy = -1;
            this.direction = DIRECTION_UP;
        } else if (this.move.bottom === true && this.direction !== DIRECTION_UP) {
            this.dx = 0;
            this.dy = 1;
            this.direction = DIRECTION_DOWN;
        } else if (this.move.left === true && this.direction !== DIRECTION_RIGHT) {
            this.dx = -1;
            this.dy = 0;
            this.direction = DIRECTION_LEFT;
        } else if (this.move.right === true && this.direction !== DIRECTION_LEFT) {
            this.dx = 1;
            this.dy = 0;
            this.direction = DIRECTION_RIGHT;
        }


        if (this.playing) {
            this.x += this.dx;
            this.y += this.dy;

            // this.prevX = this.x;
            // this.prevY = this.y;

            if (this.x >= this.grid.x) {
                this.x = 0;
            } else if (this.y >= this.grid.y) {
                this.y = 0;
            } else if (this.x < 0) {
                this.x = this.grid.x - 1;
            } else if (this.y < 0) {
                this.y = this.grid.y - 1;
            }

            this.body.forEach(([x, y]) => {
                if (this.x === x && this.y === y) {
                    this.detail.gameArea.style.display = 'none';
                    this.detail.boardResult.style.display = 'flex';
                    this.detail.stopTimer();
                    this.detail.result()
                }
            })

            this.body.unshift([this.x, this.y]);

            while (this.body.length > this.length) {
                this.body.pop();
            }

            this.history.push({ x: this.x, y: this.y, body: [...this.body], dx: this.dx, dy: this.dy, direction: this.direction, score: this.detail.score });
        }




        // while(this.history.length > 5 * (1000/250)){
        //     this.history.shift();
        // }

        this.body.forEach(([x, y]) => {

            // if(this.x === x && this.y === y){
            //     return location.reload();
            // }

            // console.log(this.x === x)
            // console.log(this.x + " " + x)

            this.context.beginPath();
            this.context.strokeStyle = 'navy';
            this.context.lineWidth = 1;
            this.context.strokeRect(x * this.grid.width, y * this.grid.height, this.grid.width, this.grid.height);
            this.context.fillStyle = this.color;
            this.context.fillRect(x * this.grid.width, y * this.grid.height, this.grid.width, this.grid.height);
        })

    }
}

export default Snake;