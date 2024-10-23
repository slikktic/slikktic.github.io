var size = 1;
var arrayLim = 0 //1920 / size;
var array = [];
var nextArray = [];
let state = false;
var row = 0;
let setArray = false;
//higher is rarer
var rarity = 15;
//music
var music = [];
var randomSong;

function preload() {
  music.push(loadSound('elements/floating.ogg'));
  //this also decides which scene is going to be chosen
  randomSong = music[Math.floor(random() * music.length)];
  //randomSong = music[3];
}

function setup() {
  createCanvas(windowWidth, windowHeight -4);
  arrayLim = displayWidth / size;
  background(4, 0, 24, 50);
  stroke(100);
  noStroke();
  //creates random array
  createArray();
  frameRate(10);
  
}

function draw() {
  // playMusic();
  let left;
  let center;
  let right;
  //sets left, center, right vars
  //if statement here to cause less lag
  if (row < windowHeight) {
    for (let i = 0; i < arrayLim; i++) {

      if (i == 0) {
        left = arrayLim - 1;
        center = i;
        right = i + 1;
      } else if (i == arrayLim - 1) {
        left = i - 1;
        center = i;
        right = 0;
      } else {
        left = i - 1;
        center = i;
        right = i + 1;
      }
      
      generate(left, center, right);
  
    }
  
    //could use for loop here to set arrays for more variable changing
    array = nextArray.slice();
    
    row += size;
  } else {
    row = 0;
  }
  // if (row >= arrayLim) {
  //   translate(0, row);
  // }
  
  //goes back to top
}

//set random values at array[i]
function createArray() {

  for (let i = 0; i < arrayLim; i++) {
    array[i] = Math.round(Math.random(2) * rarity);
    //set all 2 to 1
    if (array[i] >= 2) {
      array[i] = 1;
    }
  }
}

function generate(left, center, right) {
  //checks at array location and sets color

  if (array[center] == 1) {
    // fill(0,0,0,255);
    fill(0,0,0,50)

  } else {

    fill(map(rule(left,center,right), 0, 1, 0, randNum(0,35)),
        map(rule(left,center,right), 0, 1, 0, randNum(0,35)),
        map(rule(left,center,right), 0, 1, 0, 255));
  }

  //draw square x,y,size
  square(center * size, row, size);
  
  // stroke(0,255,0,150);
  // strokeWeight(1);
  // if (randBin(.003) == 1) {
  //   let x = randNum(0,800);
  //   line(x, row, x + 75 + sqrt(row), 0);
  // }
  // noStroke();

  nextArray[center] = rule(left,center,right);
}

function rule(left, center, right) {
  //0 is black, 1 is white
  //false is black, true is white
  dec = array[left] * 2**2 + array[center] * 2**1 + array[right] * 2**0;

  if (dec == 0) return 1; //true  1
  if (dec == 1) return randBin(90); 
  if (dec == 2) return 0; //false 0
  if (dec == 3) return 1; //true  1
  if (dec == 4) return 0; //false 0
  if (dec == 5) return 0; //false 0
  if (dec == 6) return randBin(50); //false 0
  if (dec == 7) return randBin(95); //true  1
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

// //music player
// function playMusic(){
//   //check if song is playing
//   var songPlaying = false;
//   for (let i = 0; i < music.length; i++){
//       if(music[i].isPlaying() == true){
//           songPlaying = true;
//       }
//   }
//   //plays random song if no song is playing
//   if (songPlaying == false){
//       //random(music).play();
//       randomSong.play();
//   }
// }

//random number between a min and max
function randNum(min, max) {
  return random() * (max - min) + min;
}

//random binary chance
function randBin(chance) {
  let rand = Math.random() * 100;

  if (rand > chance) rand = 0;
  else rand = 1;

  return rand;
}

//functions below for testing
function printLimit(amount, output) {
  if (row < amount) {
    console.log(output);
  }
}

function printOut(output) {
  if (frameCount % 60 == 0) {
    console.log(output);
  }
}