var size = 50;
var arrayLim = 14;
var center = size * (arrayLim / 2);
var playerX = 350;
var playerY = 350;
var angle = 0;
var shadow = 0;
/*var board = [[1,1,1,1,1,1,1],
            [1,0,0,0,0,0,1],
            [1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1],
            [1,0,0,0,0,0,1],
            [1,1,1,1,1,1,1]];*/
var board = [];

function setup() {
  createCanvas(700, 700);
  background(17);
  createArray();
  //for pov & ray

  noStroke();
  //stroke(255);
  //strokeWeight(1);
}

function draw() {

}

function createArray() {
  for (let row = 0; row < arrayLim; row++) {
    board[row] = [];
    for (let col = 0; col < arrayLim; col++) {
      let x = row * size;
      let y = col * size;

      board[row][col] = Math.round(Math.random(2) * 2);
      border(row, col);

      fill(200, 0, 0);
      if (board[row][col] > 0) {
        fill(0, 200, 0);
      }
      square(x, y, size);
    }
  }
}

function border(row, col) {
  //left
  if (row == 0) {
    board[row] = 0;
  }
  //right
  if (row == arrayLim - 1) {
    board[row] = 0;
  }
  //bottom
  if (col == arrayLim - 1) {
    board[row] = 0;
  }
  //top
  if (col == 0) {
    board[row][col] = 0;
  }
}
