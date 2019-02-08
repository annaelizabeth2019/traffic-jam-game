//a timer
const clockFace = document.querySelector("#timer");
clockFace.innerHTML = "00:00:00";

this.session = true; //set true if timer has not started

var seconds = 0; //used var to make seconds available to all functions
const pad = val => (val > 9 ? val : "0" + val); //the padding function to add zeros to single digits

//starter function
let start = () => {
  if (this.session === true) {
    this.set_time = setInterval(() => {
      seconds++;
      clockFace.innerHTML = `${pad(Math.trunc(seconds / 3600))}:${pad(
        Math.trunc(seconds / 60) % 60
      )}:${pad(seconds % 60)}`;
    }, 1000);

    this.session = false; //timer has started
  }
};

//pause function
let pause = () => {
  clearInterval(this.set_time);
  this.session = true; //true because timer has been paused
};

//the resume function
let cont = () => {
  start();
  this.session = false; //timer resumed
};

//the stop function
let stop = () => {
  clearInterval(this.set_time);
  seconds = 0; //restart timer
  this.session = true;
};

/*----- constants -----*/ 

const canvas = document.getElementById("canvas");
const frontCanvas = document.getElementById("frontCanvas");
var ctx = canvas.getContext("2d");
var fctx = frontCanvas.getContext("2d");
const CANVAS_WIDTH = frontCanvas.width;
const CANVAS_HEIGHT = frontCanvas.height;

//Car class holds information about each car
class Car {
    constructor(originX, originY, carWidth, carHeight, orientation, color){
        this.width = carWidth;
        this.height = carHeight;
        this.x = originX;
        this.y = originY;
        this.padding = 10;
        this.isSelected = false;
        this.position = orientation;
        this.color = color;
        this.isColliding = false;
    }
//so the mouse knows when it is inside a rectangle
    mouseDetection() {
        if (dragging === true){
            if (mouseX >= this.x && 
                mouseX < this.x + this.width && 
                mouseY >= this.y && 
                mouseY < this.y + this.height){
                this.isSelected = true;
            } else {
                this.isSelected = false;
            }
        }
    }
//this method draws the cars
    draw(){
        //saves the current state of the canvas code
        fctx.save();
        //clear
        //draw cars
        fctx.fillStyle = this.color;
        fctx.fillRect(this.x + this.padding, this.y + this.padding, this.width, this.height);
        fctx.strokeStyle = "black";
        fctx.strokeRect(this.x + this.padding, this.y + this.padding, this.width, this.height);        
        //restore cars
        fctx.restore();    
    }
//attempts at detecting distance. Still not working. 
    distance() {
        for (let i = 0; i < cars.length; i++){
            var a = this.x - cars[i].x;
            var b = this.y - cars[i].y;
            var dist = Math.sqrt( a*a + b*b );
            if (dist < 100){
            this.isColliding = true;
            } else {
            this.isColliding = false;
            }
        }
    }
};

/*----- app's state (variables) -----*/ 

//dragging detection
let dragging = false;
let mouseX, mouseY;
//variables for cars
let redCar, car1, car2, car3, car4, car5, car6, car7, car8, car9, bus1, bus2;
//this array holds the cars
let cars = [];


/*----- functions -----*/

function init(){
            
    /*----- event listeners -----*/ 
            
    frontCanvas.addEventListener('mousedown', selectCar)
    frontCanvas.addEventListener('mousemove', mouseTrack);
    document.addEventListener('mouseup', releaseCar);
            
    /*---- make the game board and cars ----*/

    createGrid();
    createCars(); 

    /*--- Starts the update loop ----*/
    
    requestAnimationFrame(update);
    
};

//when a car is clicked, starts mouseDetection method of cars
function selectCar() {
    dragging = true;
    for (let i = 0; i < cars.length; i++){
        cars[i].mouseDetection();
    }
};

function mouseTrack(evt) {
    let rect = frontCanvas.getBoundingClientRect();
    //find the position of the mouse
    mouseX = evt.clientX - rect.left;
    mouseY = evt.clientY - rect.top;   
    //drag the cars
    for (let i = 0; i < cars.length; i++){
        var c = cars[i];
        //horizontally-aligned car logic
        if (dragging && c.isSelected && c.position === 'h') {
            c.x = mouseX - c.width/2;
            //collision detection on the canvas
            if (c.x < 0){
                c.x =0;
            } else if (c.x + c.width > frontCanvas.width) {
                c.x = frontCanvas.width - c.width; //580 = canvas size - padding
            };
            //vertically aligned car logic
        } else if (dragging && c.isSelected && c.position === 'v'){
            c.y = mouseY - c.height/2;
            //collision detection on the y-axis of the canvas
            if (c.y < 0){
                c.y = 0;
            } else if (c.y + c.height > frontCanvas.height) {
                c.y = frontCanvas.height - c.height;
            };
        }
    }
};

function releaseCar(){
    dragging = false;
    for (let i = 0; i < cars.length; i++){
        var c = cars[i];
        c.isSelected= false; 
    }
};

function animate() {
    requestAnimationFrame(animate);
    if (x + 90 > CANVAS_WIDTH || x < 0) {
        dx = 0;
    }
    // detectCollision();
    update();   
};

function createCars() {
    // cars and originX, origin Y, height, width
    cars = [
        redCar = new Car(0, 200, 180, 80, 'h', '#fa3901'),
        car1 = new Car(0, 300, 180, 80, 'h', '#BCD6F3'),
        car2 = new Car(100, 400, 80, 180, 'v', '#2162AD'),
        car3 = new Car(0, 400, 80, 180, 'v', '#F1A204'),
        car4 = new Car(200, 400, 180, 80, 'h', '#5316BD'),
        car5 = new Car(200, 500, 180, 80, 'h', '#7f7f61'),
        car6 = new Car(200, 200, 80, 180, 'v', '#b26a4e'),
        car7 = new Car(200, 0, 80, 180, 'v', '#5316BD'),
        car8 = new Car(300, 100, 80, 180, 'v', ' #e19417'),
        car9 = new Car(300, 300, 180, 80, 'h', '#6b2ba1'),
        bus1 = new Car(300, 0, 280, 80, 'h', '#f7cc30'),
        bus2 = new Car(500, 200, 80, 280, 'v', '#f7cc30')
    ];

};

function createGrid() {
    ctx.strokeRect(0, 0, 600, 600);
    
    //rows
    ctx.strokeStyle = "#FFAA00";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(600, 100);
    ctx.moveTo(0, 200);
    ctx.lineTo(600, 200);
    ctx.closePath();
    ctx.moveTo(600, 300);
    ctx.lineTo(0, 300);
    ctx.moveTo(600, 400);
    ctx.lineTo(0, 400);
    ctx.moveTo(600, 500);
    ctx.lineTo(0, 500)
    ctx.stroke();
    
    //columns
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 600);
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 600);
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 600);
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 600);
    ctx.moveTo(500, 0);
    ctx.lineTo(500, 600)
    ctx.stroke();

    //a "special" path to highlight the goal path
    var img = document.getElementById("arrow");
    ctx.drawImage(img, 0, 200);
};

//renders the game continuously 
function update() {
    fctx.clearRect(0, 0, 600, 600)
    //draw the cars 
    for (i = 0; i < cars.length; i++){
        cars[i].draw()
    };
    requestAnimationFrame(update);
};

init();