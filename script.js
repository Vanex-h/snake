const gameContainer = document.querySelector('.game-container');
const snakeElement = document.getElementById('snake');
const foodElement = document.getElementById('food');

let snake = [{x: 10, y: 10}];
let food = {x: Math.floor(Math.random() * 15) * 20, y: Math.floor(Math.random() * 15) * 20};
let score = 0;

let dx = 0;
let dy = 0;

function update() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').innerText = score;
        food = {x: Math.floor(Math.random() * 15) * 20, y: Math.floor(Math.random() * 15) * 20};
    } else {
        snake.pop();
    }
}

function draw() {
    snakeElement.innerHTML = '';
    snake.forEach(segment => {
        const element = document.createElement('div');
        element.style.gridRowStart = segment.y;
        element.style.gridColumnStart = segment.x;
        element.classList.add('snake');
        snakeElement.appendChild(element);
    });

    const element = document.createElement('div');
    element.style.gridRowStart = food.y;
    element.style.gridColumnStart = food.x;
    element.classList.add('food');
    snakeElement.appendChild(element);
}

function main() {
    update();
    draw();

    if (checkCollision()) {
        alert('Game Over! Your score is ' + score);
        snake = [{x: 10, y: 10}];
        score = 0;
        document.getElementById('score').innerText = score;
    }

    setTimeout(main, 100);
}

function checkCollision() {
    return (
        snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0 ||
        snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
    );
}

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            if(dy !== 1) {
                dx = 0;
                dy = -1;
            }
            break;
        case 'ArrowDown':
            if(dy !== -1) {
                dx = 0;
                dy = 1;
            }
            break;
        case 'ArrowLeft':
            if(dx !== 1) {
                dx = -1;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if(dx !== -1) {
                dx = 1;
                dy = 0;
            }
            break;
    }
});

main();

