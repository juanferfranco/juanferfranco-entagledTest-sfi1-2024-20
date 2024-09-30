let currentPageData = {
    x: window.screenX,
    y: window.screenY,
    width: window.innerWidth,
    height: window.innerHeight
}

let remotePageData = { x: 0, y: 0, width: 100, height: 100 };
let point1 = [currentPageData.width / 2, currentPageData.height / 2]

let socket = io('http://localhost:3000')

socket.on('connect', () => {
    console.log(socket.id);
    socket.emit('win1update', currentPageData, socket.id);
})


socket.on('getdata', (dataWindow) => {
    remotePageData = dataWindow;
})

let previousPageData = {
    x: window.screenX,
    y: window.screenY,
    width: window.innerWidth,
    height: window.innerHeight
};


function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
}


function checkWindowPosition() {
    currentPageData = {
        x: window.screenX,
        y: window.screenY,
        width: window.innerWidth,
        height: window.innerHeight
    };

    if (currentPageData.x !== previousPageData.x || currentPageData.y !== previousPageData.y || 
        currentPageData.width !== previousPageData.width || currentPageData.height !== previousPageData.height) {

        point1 = [currentPageData.width / 2, currentPageData.height / 2]
        socket.emit('win1update', currentPageData, socket.id);
        previousPageData = currentPageData;
    }
}


function draw() {
    background(220);
    drawCircle(point1[0], point1[1])
    checkWindowPosition();
    let vector1 = createVector(currentPageData.x, currentPageData.y);
    let vector2 = createVector(remotePageData.x, remotePageData.y);
    let resultingVector = createVector(vector2.x - vector1.x, vector2.y - vector1.y);
    stroke(50)
    strokeWeight(20)
    drawCircle(resultingVector.x + remotePageData.width / 2, resultingVector.y + remotePageData.height / 2)
    line(point1[0], point1[1], resultingVector.x + remotePageData.width / 2, resultingVector.y + remotePageData.height / 2)
}

function drawCircle(x, y) {
    fill(255, 0, 0);
    ellipse(x, y, 150, 150);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}