const width = 20;
const height = 20;

setCanvasSize(vec(width, height));
timeMode(AlignmentMode.RELATIVE);
frameRate(5);
let snakeHeadPos = vec(width / 2, height / 2);
let snakeVelocity = vec(1, 0);
let paused = false;
let isGameOver = false;
let snake = [vec(-1, 0)];
let snakeSegmentCache = [];
updateSnakeSegments(snake);
const food = [];
snake.push(vec(-1, 1));
snake.push(vec(-1, 0));
snake.push(vec(-1, 0));
document.addEventListener("keydown", (e) => {
  // console.log(e.key);
  if (e.key === "ArrowRight") {
    snakeVelocity = vec(1, 0);
  }
  if (e.key === "ArrowLeft") {
    snakeVelocity = vec(-1, 0);
  }
  if (e.key === "ArrowUp") {
    snakeVelocity = vec(0, -1);
  }
  if (e.key === "ArrowDown") {
    snakeVelocity = vec(0, 1);
  }
  if (e.key === " ") {
    paused ^= true;
  }
});

function draw() {
  if (paused) return;
  background(vec(0, 0, 0));
  updateFood();
  drawFood();

  updateSnake();
  if (isGameOver) lib.canv.remove();
  drawSnake();
}

function updateSnakeSegments(directions) {
  let pos = snakeHeadPos.clone();
  for (const segment of directions) {
    snakeSegmentCache.push(pos);
    pos.x += segment.x;
    pos.y += segment.y;
  }
}

function updateSnake() {
  moveSnake();
  // const toDelete = [];
  for (let i = 0; i < food.length; i++) {
    if (food[i].equals(snakeHeadPos)) {
      console.log("collided with food");
      // toDelete.push(i)
      food.splice(i, 1);
      growSnake();
    }
  }
  let exists = [];
  for (const segmentCache of snakeSegmentCache) {
    exists.push(segmentCache);
    if (exists.includes(snakeSegmentCache.indexOf(segmentCache))) isGameOver = true;
  }
}

function growSnake() {
  snake.push(vec(snake[snake.length - 1]));
  updateSnakeSegments(snake);
}

function moveSnake() {
  let oldSnake = [...snake];
  // snake.splice(1,0,snakeVelocity);
  snake.unshift(snakeVelocity.clone().flip());
  snake.pop();
  let oldSnakeHeadPos = snakeHeadPos.clone();
  snakeHeadPos.x += snakeVelocity.x;
  snakeHeadPos.y += snakeVelocity.y;
  if (
    snakeHeadPos.x >= width ||
    snakeHeadPos.x < 0 ||
    snakeHeadPos.y >= height ||
    snakeHeadPos.y < 0
  ) {
    snakeHeadPos = oldSnakeHeadPos.clone();
    snake = [...oldSnake];
  }
  updateSnakeSegments(snake);
}

function drawSnake() {
  let pos = snakeHeadPos.clone();
  for (const segment of snake) {
    setPixel(
      pos,
      !pos.equals(snakeHeadPos) ? vec(255, 255, 255) : vec(255, 0, 0)
    );
    pos.x += segment.x;
    pos.y += segment.y;
  }
}

function updateFood() {
  if (food.length < 5) {
    food.push(vec(floor(random(width)), floor(random(height))));
  }
}

function drawFood() {
  for (const foody of food) {
    setPixel(foody, vec(0, 255, 0));
  }
}
