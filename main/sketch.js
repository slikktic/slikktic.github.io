let rotX = 0;
let rotY = 0;
let rotZ = 0;

function setup() {
  createCanvas(1600, 900, WEBGL);

}

function draw() {
  background(17);
  rotX = (mouseY/360)*-2 * PI+PI;
  rotY = (mouseX/420.0)*2 * PI-PI;
  rotZ = rotZ + .005;
  rectMode(CENTER);

  goal();

  rotateX(rotX);
  rotateY(rotY);
  rotateZ(rotZ);

  rotateX(1.3);
  rotateY(-1.5);
  axisLines();
  movingBox();

}

//rotating axis lines
function axisLines() {
  strokeWeight(3);
  stroke(0, 0, 255);
  line(-250, 0, 250, 0);
  stroke(0, 255, 0);
  line(0, 250, 0, -250);
  stroke(255, 0, 0);
  line(0, 0, -250, 0, 0, 250);
}

function goal() {
  noFill();
  stroke(255, 0, 0);
  strokeWeight(2);
  rotateX(-QUARTER_PI);
  rotateY(QUARTER_PI);
  box(windowHeight-700);
}

function movingBox() {
  fill(225);
  strokeWeight(10);
  stroke(17);
  box(windowHeight-700);
}
