import { canvas, context } from './canvas.js';
import Grid from './grid.js';
import move from './move.js';
import Snake from './snake.js';
import Food from './food.js';
import Detail from './score.js';
import { startMove } from './move.js';

const grid = new Grid(canvas);
const detail = new Detail();
const snake = new Snake({ canvas, context, grid, move, detail });
const food = new Food({ canvas, context, grid, snake, detail });
const FPS = 4;
let isRestarting = false;

const play = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.draw();
    food.draw();

    setTimeout(() => {
        if (snake.playing && !isRestarting) {
            requestAnimationFrame(play);
        }
    }, 1000 / FPS)
}

const input = document.querySelector('.instruction input');
const gameArea = document.querySelector('main .game-area');
const instruction = document.querySelector('main .instruction');
const playButton = document.querySelector('main .instruction button');
const boardResult = document.querySelector('.game-over');
const restartButton = document.querySelector('.game-over button');
const rewindButton = document.querySelector('.game-area .rewind-area .rewind-button');
// localStorage.removeItem('high-score')

if (!localStorage.getItem('username')) {
    instruction.style.display = 'flex';
} else {
    gameArea.style.display = 'block';
    snake.startGame();
    detail.startTimer();
    startMove();
    play()
}

input.addEventListener('input', () => {
    if (input.value) {
        playButton.style.pointerEvents = 'auto';
    }
})

playButton.addEventListener('click', () => {
    gameArea.style.display = 'block';
    instruction.style.display = 'none';
    localStorage.setItem('username', input.value)
    snake.startGame();
    detail.startTimer();
    startMove();
    play();
})

rewindButton.addEventListener('click', () => {
    const slider = document.querySelector('.rewind-area input');
    const cancelButton = document.querySelector('.rewind-area .cancel-button');

    slider.style.display = 'inline';
    cancelButton.style.display = 'inline';

    snake.stopGame();

    rewindButton.addEventListener('click', () => {
        snake.rewind(slider.value)
        snake.startGame()

        setTimeout(() => {
            snake.history = [];
        }, 0)

        if(!isRestarting){
            isRestarting = true;

            setTimeout(() => {
                isRestarting = false;
                snake.startGame();
                play();
            }, 250)
        }
    })

    const rewindHandler = () => { 
       snake.rewind(parseInt(slider.value));
    }

    slider.addEventListener('input', rewindHandler);

    cancelButton.addEventListener('click', () => {
        slider.style.display = 'none';
        cancelButton.style.display = 'none';
        slider.removeEventListener('input', rewindHandler);

        if(!isRestarting){
            isRestarting = true;

            setTimeout(() => {
                isRestarting = false;
                snake.startGame();
                play();
            }, 250)
        }
    })
})

restartButton.addEventListener('click', () => {
    localStorage.removeItem('score');
    location.reload()
    setTimeout(() => {
        gameArea.style.display = 'block';
        boardResult.style.display = 'none';
    }, 1000)
})
