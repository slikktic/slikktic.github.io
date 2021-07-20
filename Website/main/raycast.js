var size = 50;
var arrayLim = 100;
var center = size * (arrayLim / 2);
var playerX = 100;
var playerY = 100;
var angle = 0;
var shadow = 0;
var alpha = 255;
var board = [];
var music = [];

function preload() {
  music.push(loadSound('../elements/Naked Flames - Rinse Off.ogg'));
}

function setup() {
  createCanvas(800, 800);
  frameRate(60);
  background(17);
  createArray();
  //for pov & ray
  angleMode(DEGREES);

  noStroke();
  //stroke(255);
  //strokeWeight(1);
  window.alert('EPILEPSY WARNING');
}

function draw() {
  createBackground();
  render();
  //pov();
  move();

  playMusic();
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
      //square(x, y, size);
    }
  }
  //board[playerX / size][playerY / size] = 1;
}

function border(row, col) {
  //left
  if (row == 0) {
    board[row][col] = 0;
  }
  //top
  if (col == 0) {
    board[row][col] = 0;
  }
  //right
  if (row == arrayLim - 1) {
    board[row][col] = 0;
  }
  //bottom
  if (col == arrayLim - 1) {
    board[row][col] = 0;
  }
}

function ray(dir) {
  let endX = floor(playerX / size);
  let endY = floor(playerY / size);
  let dist = 0;
  let lastX = 0;
  let lastY = 0;
  //find what block is hit by ray
  while (board[floor(endX)][floor(endY)] > 0) {
    //prev
    lastX = endX;
    lastY = endY;
    //new
    dist++;
    endX = ((sin(dir) * dist) + playerX) / size;
    endY = ((cos(dir) * dist) + playerY) / size;
    //draw line
    //line(playerX, playerY, endX * size, endY * size);
  }
  //if X coord before recent X coord is floored (rounded down)
  //then its in another square (applies shadow to that side)
  if (floor(lastX) == floor(endX)) {
    shadow = 0;
  } else {
    shadow = 1;
  }
  if (floor(lastX) == floor(endX)) {
    shadow = 0;
  } else {
    shadow = 1;
  }
  return dist;
}

function pov() {
  stroke(0, 0, 255);
  for (let dir = 0; dir <= 90; dir++) {
    ray(dir + angle);
  }
}

function render() {
  //send multiple rays out
  for(let i = 0; i <= 90; i++) {
    //if shadow  != 1 then darken
    /*if (shadow == 1) {
      fill(200, 200, 200, alpha);
    } else {
      fill(150, 150, 150, alpha);
    }*/
    fill(17, 17, 17, 0);
    stroke(180);
    //render: x, y, width, height
    rect(i * 8.83, 400, 4, 10000 / ray(i + angle));
  }
}

function move() {
  //right
  if(keyIsDown(68)) {
    angle = angle + 2;
  }
  //left
  if(keyIsDown(65)) {
    angle = angle - 2;
  }
  //up
  if(keyIsDown(87)) {
    if (board[floor((playerX + (sin(angle + 45)) * 2) / size)]
    [floor((playerY + (cos(angle + 45)) * 2) / size)] != 0) {
      playerX = (playerX + (sin(angle + 45)) * 2);
      playerY = (playerY + (cos(angle + 45)) * 2);
    }
  }
  //down
  if(keyIsDown(83)) {
    if (board[floor((playerX - (sin(angle + 45)) * 2) / size)]
    [floor((playerY - (cos(angle + 45)) * 2) / size)] != 0) {
      playerX = playerX - (sin(angle + 45));
      playerY = playerY - (cos(angle + 45));
    }
  }
}

function createBackground() {
  background(round(random(40)), round(random(40)), round(random(40)));
  //create floor
  fill(15);
  rectMode(CORNER);
  rect(0, 400, width, 700);
  rectMode(RADIUS);
}

//music player
function playMusic(){
  //check if song is playing
  var songPlaying = false;
  for (i=0;i<music.length;i++){
      if(music[i].isPlaying() == true){
          songPlaying = true;
      }
  }
  //plays random song if no song is playing
  if (songPlaying == false){
      random(music).play();
  }
}
