// if (WURFL.is_mobile === true) {
//   window.location.replace("main.html"); //test url
// }

//size of squares/walls
const size = 50;
//size of world
const arrayLim = 40;
var board = [];
//exit
var randX = Math.floor(Math.random() * (arrayLim - 2)) + 1;
var randY = Math.floor(Math.random() * (arrayLim - 2)) + 1;
var finished = false;
//const center = size * (arrayLim / 2);
//location & orientation of player
var playerX = 100;
var playerY = 100;
var angle = 0;
//setup
var doTutorial = true;
//music
var music = [];
var dit = [];
var retrigger = true;
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
var fog;
var glowStart = 15;
//oscillation
let oscBool = false;
var wave = 0;
var osc;
let ms = 0;

//preloads music files or else code wont work
function preload() {
  music.push(loadSound('elements/planeQUIET.ogg'));
  music.push(loadSound('elements/minimalQUIET.ogg'));
  music.push(loadSound('elements/fuzzQUIET.ogg'));
  music.push(loadSound('elements/purpleQUIET.ogg'));
  //this also decides which scene is going to be chosen
  music.push(loadSound('elements/hisscut.ogg'))
  music.push(loadSound('elements/fireflies2infQUIET.ogg'));
  randomSong = music[Math.floor(random() * music.length)];
  // //dits
  dit.push(loadSound('elements/g2.ogg'));
  dit.push(loadSound('elements/a2.ogg'));
  dit.push(loadSound('elements/e3.ogg'));
  dit.push(loadSound('elements/g3.ogg'));
  dit.push(loadSound('elements/a3.ogg'));
  dit.push(loadSound('elements/c4.ogg'));
  dit.push(loadSound('elements/e4.ogg'));
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
  if (finished == false) {
    if (hyp < 1.5) {
      window.location.href = 'main.html'; //"https://slikktic.github.io/main.html";
      // printOut("FINISH");
      finished = true;
    }
  }
  //fps();

  // playdit
  if ((frameCount % 100) == 0) {
    retrigger = true;
  }
  if (doTutorial) { tutorial(); }
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
      //set all 2 to 1 for mnore empty space
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

  proxVisuals(dist);

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
    //colors & render: x, y, width, height
    fill(redW, greenW, blueW, alpha);
    floorAndWallColor();
    stroke(redS,greenS,blueS);
    var rayfull = ray(i + angle)
    if (!renderdist) {
      rect(i * 8.83, 400, 4, 10000 / rayfull);
    }

    if (renderdist && music[5].isPlaying()) {
      stroke(235,255,155);
      rect(i * 8.83, 400, 4, 10000 / rayfull);
    }
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
  if (music[0].isPlaying()) { //plane
    //dim flicker background
    background(round(random(13)), round(random(13)), round(random(13)));
  } else if (music[1].isPlaying()) { //minimal
    background(0, 0, 0);
  } else if (music[2].isPlaying()) { //fuzz
    background(randNum(21, 23), randNum(1, 2), randNum(4, 5));
  } else if (music[3].isPlaying()) { //purple
    //background(0, 0, 21);
    background(0, 0, map(osc, 0, 99, 11, 23));
    strikes("strobe");
  } else if (music[4].isPlaying()) { //rain
    background(194, 210, 246);
    strikes("rain");
  } else if (music[5].isPlaying()) { //fireflies
    background(7, 15, 48);
  } else {
    background(0);
  }
}
//background lines
function strikes(mode) {
  if (mode == "strobe") {
    strokeWeight(10);
    stroke(0, 0, randNum(25, 45));
    line(round(random(width)), 0, round(random(width)), height / 2);
    strokeWeight(1);
  }
  if (mode == "rain") {
    strokeWeight(5);
    stroke(150, 210, 255);
    var spot = round(random(width));
    line(spot, 0, spot, height / 2);
    strokeWeight(1);
  }
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
  if (music[0].isPlaying()) { //rain
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

  } else if (music[1].isPlaying()){ //minimal
    //wall stroke color
    strokeWeight(1);
    redS = blueS = greenS = 0;
    //wall color
    alpha = 255;
    fill(randNum(137,200), randNum(185,215), 255);
    //floor color
    floorR = floorG = floorB = 0;

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

  } else if (music[3].isPlaying()) { //purple
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

  } else if (music[4].isPlaying()) { //rain
    //wall stroke color
    strokeWeight(2);
    redS = blueS = greenS = 255;
    //wall color
    alpha = 255;
    fill(randNum(250,255), randNum(250,255), 240);
    //floor color
    floorR = floorG = floorB = 215;

  } else if (music[5].isPlaying()) { //fireflies
    //wall stroke color
    redS = 37;
    greenS = 46;
    blueS = 0;
    strokeWeight(2);
    //wall color
    fill(0);
    //floor color
    floorR = 3;
    floorG = 20;
    floorB = 7;

  } else { //stock
    strokeWeight(1);
    redS = blueS = greenS = 255;
    fill(0);
    floorR = floorG = floorB = 0;
  }
}

function proxVisuals(dist) {
  if (music[4].isPlaying()) { fog = true; }

  if ((dist >= 120) && fog) {
    renderdist = true;
  } else {
    renderdist = false;
  }
  if (music[5].isPlaying()) { glowStart = 100; }
  if (dist <= glowStart) {
    if (music[4].isPlaying()) { ditTrigger(); }
    if (music[5].isPlaying()) { renderdist = true; }
  } else {
    if (music[5].isPlaying()) { renderdist = false; }
  }
}
//tutorial info screen
function tutorial() {
  fill(17);
  square(width/2, height/2, 300);
  fill(255);
  textFont('monospace');
  textSize(30);
  text("WASD/Arrow Keys to move", width/2 - 180, height/2 - 100);
  text("Click to Play", width/2 - 106, height/2 + 100);
}

function ditTrigger() {
  randomDit = dit[Math.floor(random() * music.length)];
  if (retrigger) {
    retrigger = false;
    randomDit.play();
  }
}
//player movement
function move() {
  //right (d = 68) (arrowright = 39)
  if(keyIsDown(68) || keyIsDown(39)) {
    angle = angle + 2;
  }
  //left (a = 65) (arrowleft = 37)
  if(keyIsDown(65) || keyIsDown(37)) {
    angle = angle - 2;
  }
  //up (w = 87) (arrowup = 38)
  if(keyIsDown(87) || keyIsDown(38)) {
    if (board[floor((playerX + (sin(angle + 45)) * 2) / size)]
    [floor((playerY + (cos(angle + 45)) * 2) / size)] != 0) {
      playerX = (playerX + (sin(angle + 45)) * 2);
      playerY = (playerY + (cos(angle + 45)) * 2);
    }
  }
  //down (s = 83) (arrowdown = 40)
  if(keyIsDown(83) || keyIsDown(40)) {
    if (board[floor((playerX - (sin(angle + 45)) * 2) / size)]
    [floor((playerY - (cos(angle + 45)) * 2) / size)] != 0) {
      playerX = playerX - (sin(angle + 45));
      playerY = playerY - (cos(angle + 45));
    }
  }
}

//mouseclick
function mouseClicked() {
  doTutorial = false;
}

//music player
function playMusic(){
  var songPlaying = false;
  if (randomSong.isPlaying() == true) {
    songPlaying = true;
  }
  //plays random song if no song is playing
  if (songPlaying == false){
      randomSong.loop(true);
  }
}

//random number between a min and max
function randNum(min, max) {
  return random() * (max - min) + min;
}

//oscillates 1-100 back and forth. used for a background glow change
//NOTE: make more efficient with sin()
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

function fps() {
  fill(255);
  stroke(0);
  textSize(20);
  text(round(frameRate()), 5, 25);
}
