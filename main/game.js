let mouseDown = false;
let startDragX = 0;
let startDragY = 0;
let endDragX = 0;
let endDragY = 0;
let restartLine = true;

function setup() {
    createCanvas(800, 800, WEBGL); 
    background(20);
    // console.log(randRange(randNum(-100,100), 10));
    //frameRate(60);
}

function draw() {
    background(20);
    fill(0,0,255);
    stroke(255);
    strokeWeight(3);
    // noStroke();
    // rotateX(frameCount * 0.01);
    // rotateZ(frameCount * 0.01);
    rotateX(mouseX * 0.01);
    rotateZ(mouseY * 0.01);
    rotateY(frameCount * 0.01);
    createObject();
    // console.log
    // fps();
}

function createObject() {
    box(150);
    // applyMatrix(mouseX, 0.0,  mouseY,  0.0,
    //             0.0, 1.0, 0.0,  0.0,
    //             -mouseY, 0.0,  mouseX,  0.0,
    //             0.0, 0.0, 0.0,  1.0);
    box(150);
    // beginShape(TESS);
    // vertex(randNum(0,10),randNum(0,10),randNum(0,10));
    // vertex(randNum(0,200),randNum(0,200),randNum(190,200));
    // vertex(randNum(0,200),randNum(190,200),randNum(0,200));
    // vertex(randNum(0,200),randNum(190,200),randNum(190,200));
    // vertex(randNum(0,200),randNum(190,200),randNum(190,200));
    // var array = [];
    // for (let x = 0; x < 50; x++) {
    //     array[x] = [];
    //     for (let y = 0; y < 50; y++) {
    //         array[x][y];
    //         vertex(randNum(190,200), randNum(190,200), randNum(190,200));
    //     }
    // }
    
    // endShape(CLOSE);
}

function mouseDragged() {
    if (mouseDown) {
        console.log("hello");
    }
    // stroke(255); 
    // if (restartLine) {
    //     line(startDragX, startDragY, mouseX, mouseY);
    // }
    // restartLine = false;
    console.log(mouseX);
}

function mousePressed() {
    mouseDown = true;
    startDragX = mouseX;
    startDragY = mouseY;   
}

function mouseReleased() {
    // mouseDown = false;
    endDragX = mouseX;
    endDragY = mouseY;
}

//random number between a min and max
function randRange(min, range) {
    return random() * range + min;
}

function randNum(min, max) {
    return random() * (max - min) + min;
}

function fps() {
    fill(255);
    stroke(0);
    textSize(20);
    text(round(frameRate()), 5, 25);
}