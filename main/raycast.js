//size of squares/walls
const size = 50;
//size of world
const arrayLim = 40;
var board = [];
//exit
var randX = Math.floor(Math.random() * (arrayLim - 2)) + 1;
var randY = Math.floor(Math.random() * (arrayLim - 2)) + 1;
var finish = 0;
//const center = size * (arrayLim / 2);
//location & orientation of player
var playerX = 100;
var playerY = 100;
var angle = 0;
//music
var music = [];
var randomSong;
//for coloring blocks
//var shadow = 0;
//var sAlpha = 255;
//wall colors
var redW;
var greenW;
var blueW;
//wall edge colors
var redS;
var greenS;
var blueS;
//background color
var bgR;
var bgG;
var bgB;
var bgColor;
//floor color
var floorR = 10;
var floorG = 10;
var floorB = 10;
//misc background
var starPos = [];
//oscillation
let oscBool = false;
var wave = 0;
var osc;

//preloads music files or else code wont work
function preload() {
  music.push(loadSound('../elements/planeQUIET.ogg'));
  music.push(loadSound('../elements/minimalQUIET.ogg'));
  music.push(loadSound('../elements/fuzzQUIET.ogg'));
  music.push(loadSound('../elements/purpleQUIET.ogg'));
  //this also decides which scene is going to be chosen
  randomSong = music[Math.floor(random() * music.length)];
  //randomSong = music[3];
}

function setup() {
  createCanvas(800, 800);
  //cg = createGraphics(800, 800);
  frameRate(60);
  background(17);
  createArray();
  //for pov & ray
  angleMode(DEGREES);
  noStroke();
}

function draw() {
  //for creating floor & exit
  var distX = abs(randX - (playerX / size));
  var distY = abs(randY - (playerY / size));
  var hyp = sqrt((distX * distX) + (distY * distY));
  //plays music and sets up background based off of the song
  oscillate();
  scene();
  createBackground(hyp);
  render();
  //pov();
  move();
  if (finish == 0) {
    if (hyp < 1.5) {
      window.location.href = "https://kikolite.neocities.org/";
      printOut("FINISH");
      finish = 1;
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

//figures out distance from walls based off of # of rays input
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
  /*if (floor(lastX) == floor(endX)) {
    shadow = 0;
  } else {
    shadow = 1;
  }*/
  return dist;
}

//for 2d rays
function pov() {
  stroke(0, 0, 255);
  for (let dir = 0; dir <= 90; dir++) {
    ray(dir + angle);
  }
}

//renders walls
function render() {
  //sends multiple rays out
  for(let i = 0; i <= 90; i++) {
    /*if shadow  != 1 then darken
    if (shadow == 1) {
      fill(200, 200, 200, sAlpha);
    } else {
      fill(150, 150, 150, sAlpha);
    }*/
    //colors & render: x, y, width, height
    fill(redW, greenW, blueW, alpha);
    //stroke(180);
    //stroke(redS,greenS,blueS);
    floorAndWallColor();
    stroke(redS,greenS,blueS);
    rect(i * 8.83, 400, 4, 10000 / ray(i + angle));
  }
}

function createBackground(hyp) {
  scene();
  //create floor colors
  if (hyp < 10) {
    //value, inMin, inMax, outMax, outMin
    fill(map(hyp * size, 0, 500, 0, floorR),
    map(hyp * size, 0, 500, 0, floorG),
    map(hyp * size, 0, 500, 150, floorB));
  } else {
    //floor color when not near center
    fill(floorR, floorG, floorB);
  }
  //horizon line gone
  noStroke();
  //rest of floor
  rectMode(CORNER);
  rect(-1, 400, width + 2, 700);
  rectMode(RADIUS);
}

function scene() {
  playMusic();
  if (music[3].isPlaying()) { //purple
    //background(0, 0, 21);
    background(0, 0, map(osc, 0, 99, 11, 23));
    strikes();
  } else if (music[2].isPlaying()) { //fuzz
    background(randNum(21, 23), randNum(1, 2), randNum(4, 5));
  } else if (music[1].isPlaying()) { //minimal
    background(0, 0, 0);
  } else { //stock
    //dim flicker background
    background(round(random(13)), round(random(13)), round(random(13)));
  }
}
//background lines
function strikes() {
  strokeWeight(10);
  stroke(0, 0, randNum(25, 45));
  line(round(random(width)), 0, round(random(width)), height / 2);
  strokeWeight(1);
}
/*function stars(amount) {
  stroke(200);
  strokeWeight(3);
  for (i = 0; i < amount; i++) {
    point(i, 200);
  }
}*/

//colors for floor and wall
function floorAndWallColor() {
  if (music[3].isPlaying()) { //purple
    //wall stroke color
    if (frameCount % 200 == 0) {
      strokeWeight(randNum(0, 1));
    }
    redS = randNum(80, 100);
    blueS = randNum(90, 110);
    greenS = randNum(0, 10);
    //wall color
    alpha = 255;
    fill(10, 0, 15);
    //floor color
    floorR = 10;
    floorG = 0;
    floorB = 15;
  } else if (music[2].isPlaying()) { //fuzz
    //wall stroke color
    strokeWeight(1);
    redS = blueS = greenS = 0;
    //wall color
    alpha = 255;
    fill(9);
    //floor color
    floorR = floorG = 5;
    floorB = 8;
  } else if (music[1].isPlaying()){ //minimal
    //wall stroke color
    strokeWeight(1);
    redS = blueS = greenS = 0;
    //wall color
    alpha = 255;
    fill(randNum(137,200), randNum(185,215), 255);
    //floor color
    floorR = floorG = floorB = 0;
  } else { //stock
    //wall stroke color
    strokeWeight(1);
    redS = randNum(160,200);
    blueS = randNum(160,200);
    greenS = randNum(160,200);
    //wall color
    alpha = 0;
    fill(0);
    //floor color
    floorR = floorG = floorB = 9;
  }
}
//player movement
function move() {
  //right (d)
  if(keyIsDown(68)) {
    angle = angle + 2;
  }
  //left (a)
  if(keyIsDown(65)) {
    angle = angle - 2;
  }
  //up (w)
  if(keyIsDown(87)) {
    if (board[floor((playerX + (sin(angle + 45)) * 2) / size)]
    [floor((playerY + (cos(angle + 45)) * 2) / size)] != 0) {
      playerX = (playerX + (sin(angle + 45)) * 2);
      playerY = (playerY + (cos(angle + 45)) * 2);
    }
  }
  //down (s)
  if(keyIsDown(83)) {
    if (board[floor((playerX - (sin(angle + 45)) * 2) / size)]
    [floor((playerY - (cos(angle + 45)) * 2) / size)] != 0) {
      playerX = playerX - (sin(angle + 45));
      playerY = playerY - (cos(angle + 45));
    }
  }
}
//music player
function playMusic(){
  //check if song is playing
  var songPlaying = false;
  for (let i = 0; i < music.length; i++){
      if(music[i].isPlaying() == true){
          songPlaying = true;
      }
  }
  //plays random song if no song is playing
  if (songPlaying == false){
      //random(music).play();
      randomSong.play();
  }
}

//random number between a min and max
function randNum(min, max) {
  return random() * (max - min) + min;
}

function oscillate() {
  if ((oscBool == true) && (wave < 100)) {
    wave--;
    if (wave <= 0) {
      oscBool = false;
    }
  } else {
    wave++;
    if (wave >= 100) {
      oscBool = true;
      wave = 99;
    }
  }
  osc = wave;
}
//function for fixing console.log lag
function printOut(output) {
  if (frameCount % 50 == 0) {
    console.log(output);
  }
}
