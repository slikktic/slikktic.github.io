function setup() {
    createCanvas(800, 800, WEBGL); 
    background(20);
    console.log(randRange(randNum(-100,100), 10));
    //frameRate(60);
}

function draw() {
    background(20);
    fill(0,0,255);
    stroke(0,0,0);
    strokeWeight(3);
    noStroke();
    //rotateX(frameCount * 0.01);
    //rotateZ(frameCount * 0.01);

    createObject();
    console.log
}

function createObject() {
    beginShape(TESS);
    var array = [];
    // for (let x = 0; x < 50; x++) {
    //     array[x] = [];
    //     for (let y = 0; y < 50; y++) {
    //         array[x][y];
    //         vertex(randNum(190,200), randNum(190,200), randNum(190,200));
    //     }
    // }
    
    endShape(CLOSE);
}

//random number between a min and max
function randRange(min, range) {
    return random() * range + min;
}

function randNum(min, max) {
    return random() * (max - min) + min;
}