const size = 50;
const arrayLim = 40;
//const center = size * (arrayLim / 2);
var playerX = 100;
var playerY = 100;
var angle = 0;
var shadow = 0;
//var alpha = 255;
var freq = 0;
var floorFreq = 0;
var board = [];
var music = [];
var randX = Math.floor(Math.random() * (arrayLim - 2)) + 1;
var randY = Math.floor(Math.random() * (arrayLim - 2)) + 1;
var finish = 0;

function preload() {
  music.push(loadSound('../elements/planeQUIET.ogg'));
  music.push(loadSound('../elements/minimalQUIET.ogg'));
  music.push(loadSound('../elements/fuzzQUIET.ogg'));
  music.push(loadSound('../elements/purpleQUIET.ogg'));

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
}

function draw() {
  //for creating floor & exit
  var distX = abs(randX - (playerX / size));
  var distY = abs(randY - (playerY / size));
  var hyp = sqrt((distX * distX) + (distY * distY));

  playMusic();
  createBackground(hyp);
  render();
  //pov();
  move();

  if (finish = 1) {
    if (hyp < 1.5) {
      window.location.href = "https://slikktic.neocities.org/";
      printOut("FINISH");
      finish = 0;
    }
  }
}

function createArray() {
  for (let row = 0; row < arrayLim; row++) {
    board[row] = [];
    for (let col = 0; col < arrayLim; col++) {
      let x = row * size;
      let y = col * size;
      //randomize board from 0-2
      board[row][col] = Math.round(Math.random(2) * 2);
      border(row, col);
      //set all 2 to 1
      if (board[row][col] == 2) {
        board[row][col] = 1;
      }

      fill(200, 0, 0);
      if (board[row][col] > 0) {
        fill(0, 200, 0);
      }
      //2d array visualized
      //square(x, y, size);
    }
  }
  //nicer spawn
  board[playerX / size][playerY / size] = 1;
  //set random space on board to 2. this will be exit
  board[randX][randY] = 2
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
  //find what coord is hit by ray
  while (board[floor(endX)][floor(endY)] > 0) {
    //prev location in ray
    lastX = endX;
    lastY = endY;
    //most recent end point in ray
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
    //colors & render: x, y, width, height
    fill(17, 17, 17, 0);
    //stroke(180);
    stroke(randNum(160,200),randNum(160,200),randNum(160,200));
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

function createBackground(hyp) {
  //dim flicker background
  background(round(random(13)), round(random(13)), round(random(13)));
  //create floor (why the fuck do i need a for loop)
  for(i = 0; i < 255; i++) {
    floorFreq++;
    if (floorFreq % 50 == 0) {
      //floor color
      fill(map(hyp * size, 0, 500, 120, 0),
      map(hyp * size, 0, 500, 120, 0),
      map(hyp * size, 0, 500, 45, 0));
    }
  }
  stroke(180);
  rectMode(CORNER);
  rect(-1, 400, width + 2, 700);
  rectMode(RADIUS);
}

//music player
function playMusic(){
  //var randomSong = music[Math.floor(random() * music.length)];
  //check if song is playing
  var songPlaying = false;
  for (let i = 0; i < music.length; i++){
      if(music[i].isPlaying() == true){
          songPlaying = true;
      }
  }
  //plays random song if no song is playing
  if (songPlaying == false){
      random(music).play();
  }
}
//random number between a min and max
function randNum(min, max) {
  return random() * (max - min) + min;
}
//function for fixing console.log lag

function printOut(output) {
  freq++;
  if (freq % 50 == 0) {
    console.log(output);
  }
}
