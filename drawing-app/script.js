const canvas = document.getElementById('canvas');
const inc = document.getElementById('increase');
const dec = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearbtn = document.getElementById('clear');


let color = 'black';
const ctx = canvas.getContext('2d');

let size = 20;
let x = undefined;
let y = undefined;

let isPressed = false;

//to make draw only mouse clicked
canvas.addEventListener('mousedown', (e) => {
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
})

canvas.addEventListener('mouseup', () => {
    isPressed = false;

    x = undefined;
    y = undefined;
})

//event to draw shaapes
canvas.addEventListener('mousemove', (e) => {
    if(isPressed) {
        const x2 = e.offsetX;
        const y2  = e.offsetY;

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2)

        x = x2;
        y = y2;
     }


})

//function to draw circle
function drawCircle(x, y){
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI* 2);
    ctx.fill();
    ctx.fillStyle = color
}

function drawLine(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size*2;
    ctx.stroke();
}


//increase button size
inc.addEventListener('click', () => {
    size+= 2;
    if(size > 50){
        size = 50;
    }
    updateSizescreen();
})

dec.addEventListener('click', () => {
    size -= 2;
    if(size < 5){
        size = 5;
    }
    updateSizescreen();
})

//to change pen color
colorEl.addEventListener('change', (e) => {
    color = e.target.value;
})

// to clear screen
clearbtn.addEventListener('click', () => {
    ctx.clearRect(0,0, canvas.width, canvas.height);
})

// to update size on screen

function updateSizescreen(){
    sizeEl.innerText = size;
}


