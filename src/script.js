// interface SnakeProps {
//   x?: number;
//   y?: number;
// }

// let canvas: HTMLElement | null = document.getElementById('snake');
// let context = canvas.getContext('2d');
// let box = 32;
// let snake: SnakeProps[] = [];

let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = [];

snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

let direction = 'right';
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

function createBG() {
  context.fillStyle = 'lightgreen';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  for (let index = 0; index < snake.length; index++) {
    context.fillStyle = 'green';
    context.fillRect(snake[index].x, snake[index].y, box, box);
  }
}

function createFood() {
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
  if (event.keyCode === 37 && direction != 'right') direction = 'left';
  if (event.keyCode === 40 && direction != 'down') direction = 'up';
  if (event.keyCode === 39 && direction != 'left') direction = 'right';
  if (event.keyCode === 38 && direction != 'up') direction = 'down';
}

function startGame() {
  createBG();
  createSnake();
  createFood();

  for (let index = 1; index < snake.length; index++) {
    if (snake[0].x === snake[index].x && snake[0].y === snake[index].y) {
      clearInterval(game);
      alert('Game Over');
    }
  }

  if (snake[0].x > 15 * box) snake[0].x = 0;
  if (snake[0].x < 0) snake[0].x = 15 * box;
  if (snake[0].y > 15 * box) snake[0].y = 0;
  if (snake[0].y < 0) snake[0].y = 15 * box;

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === 'right') snakeX += box;
  if (direction === 'left') snakeX -= box;
  if (direction === 'up') snakeY += box;
  if (direction === 'down') snakeY -= box;

  if (snakeX !== food.x || snakeY !== food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

let game = setInterval(startGame, 100);
