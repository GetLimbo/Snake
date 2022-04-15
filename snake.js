const canvas = document.getElementById('game');
const gameForm = canvas.getContext('2d');

const gameField = new Image();
gameField.src = 'Snake img/SnakeField.png';

const foodImg = new Image();
foodImg.src = 'Snake img/SnakeFood.png';

let box = 32;

let score = 0;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

document.addEventListener('keydown', direction);

let dir;

function direction(event) {
    if(event.keyCode === 37 && dir !='right')
        dir = 'left';
    else if(event.keyCode == 38 && dir !='down')
        dir = 'up';
    else if(event.keyCode == 39 && dir !='left')
        dir = 'right';
    else if(event.keyCode == 40 && dir !='up')
        dir = 'down';
}

function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y)
        clearInterval(game);
    }
}


function consoleGame () {
    gameForm.drawImage(gameField, 0, 0);
    gameForm.drawImage(foodImg, food.x, food.y)

    for(let i = 0; i < snake.length; i++ ) {
        gameForm.fillStyle = i == 0 ? 'orangeRed' : 'black';
        gameForm.fillRect(snake[i].x, snake[i].y, box, box);
    }

    gameForm.fillStyle = 'black';
    gameForm.font = '50px Arial';
    gameForm.fillText(score, box * 9.1, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        snake.pop();
    }

    if(snakeX < box || snakeX > box * 17 
        || snakeY < 3 * box || snakeY > box * 17)
        clearInterval(game);

    if(dir == 'left') snakeX -= box;
    if(dir == 'right') snakeX += box;
    if(dir == 'up') snakeY -= box;
    if(dir == 'down') snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake)

    snake.unshift(newHead);
}

let game = setInterval(consoleGame, 100);


