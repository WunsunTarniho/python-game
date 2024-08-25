class Food {
    constructor({ canvas, context, grid, snake, detail }) {
        this.canvas = canvas;
        this.context = context;
        this.grid = grid;
        this.color = 'red';
        this.snake = snake;
        this.detail = detail;

        this.food = [
            this.random(),
            this.random(),
            this.random(),
        ]

        setInterval(() => {
            let food = this.random();
            while (this.snake.body.some(body => JSON.stringify(body) === JSON.stringify(food))) {
                food = this.random();
            }

            this.food.unshift(food);

            if (this.food.length > 5) {
                this.food.pop();
            } else if (this.food.length < 3) {
                let newFood = this.random();

                while (this.snake.body.some(body => JSON.stringify(body) === JSON.stringify(newFood))) {
                    newFood = this.random();
                }

                this.food.unshift(newFood);
            }
        }, 3000)

        setInterval(() => {
            this.food.unshift();
        }, 5000);
    }

    random() {
        const x = Math.floor(Math.random() * this.grid.x);
        const y = Math.floor(Math.random() * this.grid.y);

        return [x, y]
    }


    draw() {
        // console.log(this.snake.x);
        // console.log(this.snake.body[0][0])

        const eatenIndex = []; // Untuk menyimpan index food yang telah dimakan ular
        const remainingFood = [];

        this.food.forEach(([x, y], index) => {

            if (x === this.snake.x && y === this.snake.y) {
                this.snake.length += 1;
                localStorage.setItem('score', this.detail.score++)
                this.detail.scoreDetail.innerHTML = `Score : ${this.detail.score}`;
                let highScore = Math.max(this.detail.score, this.detail.highScore);
                localStorage.setItem('high-score', highScore);
                //console.log(localStorage.getItem('high-score'));
                eatenIndex.push(index);
            } else {
                remainingFood.push([x, y]);
            }

        })

        eatenIndex.forEach(eaten => {
            this.food.splice(eaten, 1);
        })

        remainingFood.forEach(([x, y]) => {
            this.context.beginPath();
            this.context.fillStyle = this.color;
            this.context.rect(x * this.grid.width + 2, y * this.grid.height + 2, this.grid.width - 4, this.grid.height - 4);
            this.context.fill();
            this.context.closePath();
        })
    }
}

export default Food;