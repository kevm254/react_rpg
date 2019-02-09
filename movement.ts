const level = [
  [1, 0, 2],
  [3, 4, 0],
  [0, 2, 0],
  [1, 2, 4]
];

currentState = '';


const levelWidth = level[1].length;
const levelHeight = level.length;

console.log(levelWidth);
console.log(levelHeight);

xPos = 0;
yPos = 0;

playerPos = level[yPos][xPos];

console.log(playerPos);
function updatePlayerPos(xPos, yPos) {
  playerPos = level[yPos][xPos];
}

function moveLeft() {
  if (xPos > 0 && (level[yPos][xPos - 1] !== 0)) {
    xPos = xPos - 1;
    updatePlayerPos(xPos, yPos);
    console.log(level[xPos][yPos]);
    currentState = 'you have moved left';
  } else {
    currentState = 'you cannot move there';
  }

}

function moveRight() {
  if (xPos < levelWidth && (level[yPos][xPos + 1] !== 0)) {


    xPos = xPos + 1;
    updatePlayerPos(xPos, yPos);
    currentState = 'you have moved right';
  } else {
    currentState = 'you cannot move there';
  }
}

function moveDown() {
  if (yPos < levelHeight && (level[yPos + 1][xPos] !== 0)) {
    yPos = yPos + 1;
    updatePlayerPos(xPos, yPos);
    currentState = ' you have moved down';
  } else {
    currentState = ' you cannot move there';
  }
}

function moveUp() {
  if (yPos)
}

// [1, 0, 2]
moveLeft();
console.log(playerPos);
console.log(currentState);
console.log(yPos);
moveRight();
console.log(xPos);
console.log(currentState);
console.log(playerPos);
moveRight();
console.log(playerPos);
console.log(currentState);
moveDown();
console.log(playerPos);
moveRight();
console.log(playerPos);
moveLeft();
moveDown();
console.log(currentState);
let rep = [];

level.forEach((row) => {
  row.forEach(item => {
    rep.push(item)
  }
    rep.push('\n');

});

console.log(rep);



