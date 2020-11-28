'use strict';

const canvas = document.querySelector('#game');

const ctx = canvas.getContext('2d');

const field = new Image();
field.src = 'game_field.jpg';

const box = 32;

let score = 1;

let food = {
    x: Math.floor((Math.random() * 16) + 1) * box,
    y: Math.floor((Math.random() * 16) + 1) * box
};

let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};

document.addEventListener('keydown', direction);

let dir;

function direction(event) {
    if (event.keyCode == 37 && dir != 'right') {
        dir = 'left';
    } else if (event.keyCode == 38 && dir != 'down') {
        dir = 'up';
    } else if (event.keyCode == 39 && dir != 'left') {
        dir = 'right';
    } else if (event.keyCode == 40 && dir != 'up') {
        dir = 'down';
    }
}

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
        }
    }
}

function drawGame() {
    ctx.drawImage(field, 0, 0); // отрисовка поля
    
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box); // отрисовка еды

    for (let i = 0; i < snake.length; i++) { // отрисовка частей змейки
        ctx.fillStyle = 'blue';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'white'; // отрисовка очков
    ctx.font = '20px Arial';
    ctx.fillText('Длина: ' + score, box, box - 8);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 16 + 1) * box,
            y: Math.floor(Math.random() * 16 + 1) * box
        };
    } else {
        snake.pop();
    }

    if (snakeX < box || snakeX > box * 16 || snakeY < box || snakeY > box * 16) {
        clearInterval(game);
    }

    if (dir == 'left') {
        snakeX -= box;
    }
    if (dir == 'right') {
        snakeX += box;
    }
    if (dir == 'up') {
        snakeY -= box;
    }
    if (dir == 'down') {
        snakeY += box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}
let game = setInterval(drawGame, 100);