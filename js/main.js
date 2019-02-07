//1. Render a board, blocks, a red block and an "escape" point in front of red car. 
    // establish render method for cars
    //once render() format is known, put update function into requestAnimationFrame()
    // draw() is in update() is in requestAnimation
    //call requestAnimationFrame inside of init()
    //call requestAnimationFrame 2x: in init to know the origin points, and when on a loop. 
//Traffic Jam
//2. Blocks can be move on x and y axis
    //figure out where the mouse is and how far it has traveled
    //How to get area of cars?
    //if mouse's x is > car's x + width (ish?)
//3. Blocks can be dragged by mouse 
    // figure out and know when the mouse is inside of a car
    //
//4. The game is winnable: player can get the red car to the escape point and know they won
//5. The game runs a timer?
//6. The game counts moves. 
//7. The game includes at least one level, but potentially can include more levels that can be easily rendered
//8. The game lets the player know when they have won!


/*----- constants -----*/ 

const canvas = document.getElementById("canvas");
const frontCanvas = document.getElementById("frontCanvas");
var ctx = canvas.getContext("2d");
var fctx = frontCanvas.getContext("2d");
const CANVAS_WIDTH = frontCanvas.width;
const CANVAS_HEIGHT = frontCanvas.height;

/*----- app's state (variables) -----*/ 

//dragging detection
let dragging = false;
let mouseX, mouseY;

let redCar, car1, car2, car3, car4, car5, car6, car7, car8, car9, bus1, bus2, selectedCar;

let cars = [];
let allOtherCars = [];

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
    }
    
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
    get topSide() {return this.y};
    get leftSide() {return this.x};
    get bottomSide() {return this.x + this.width};
    get topSide() {return this.y + this.height};
};

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

/*----- functions -----*/

function selectCar() {
    dragging = true;
    for (let i = 0; i < cars.length; i++){
        var c = cars[i];
        if (mouseX >= c.x && mouseX < c.x + c.width && mouseY >= c.y && mouseY < c.y + c.height){
            c.isSelected = true;
        } else {
            c.isSelected = false;
        }
    }
};

function mouseTrack(evt) {
    let rect = frontCanvas.getBoundingClientRect();
    //find the position of the mouse
    mouseX = evt.clientX - rect.left;
    mouseY = evt.clientY - rect.top;   
    //drag the cars
    allOtherCars = cars.slice();
    carCollision();
    for (let i = 0; i < cars.length; i++){
        var c = cars[i];
        if (dragging && c.isSelected) {
            carCollision();
        };
        //horizontally-aligned car logic
        if (dragging && c.isSelected && c.position === 'h') {
            c.x = mouseX - c.width/2;
            //collision detection on the canvas
            if (c.x < 0){
                c.x =0;
            } else if (c.x + c.width > 600) {
                c.x = 580 - c.width;
            };
            //vertically aligned car logic
        } else if (dragging && c.isSelected && c.position === 'v'){
            c.y = mouseY - c.height/2;
            //collision detection on the y-axis of the canvas
            if (c.y < 0){
                c.y = 0;
            } else if (c.y + c.height > 600) {
                c.y = 580 - c.height;
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
        redCar = new Car(0, 200, 180, 80, 'h', 'red'),
        car1 = new Car(0, 300, 180, 80, 'h', 'lightgreen'),
        car2 = new Car(100, 400, 80, 180, 'v', 'darkblue'),
        car3 = new Car(0, 400, 80, 180, 'v', 'gold'),
        car4 = new Car(200, 400, 180, 80, 'h', 'purple'),
        car5 = new Car(200, 500, 180, 80, 'h', 'grey'),
        car6 = new Car(200, 200, 80, 180, 'v', 'cream'),
        car7 = new Car(200, 0, 80, 180, 'v', 'silver'),
        car8 = new Car(300, 100, 80, 180, 'v', 'blue'),
        car9 = new Car(300, 300, 180, 80, 'h', 'orange'),
        bus1 = new Car(300, 0, 280, 80, 'h', 'yellow'),
        bus2 = new Car(500, 200, 80, 280, 'v', 'scarlet')
    ];

};

function createGrid() {
    ctx.strokeRect(0, 0, 600, 600);
    
    //rows
    ctx.strokeStyle = "pink";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(600, 100);
    ctx.moveTo(0, 200);
    ctx.lineTo(600, 200);
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


};

//renders the game 
function update() {
    fctx.clearRect(0, 0, 600, 600)
    //draw the cars 
    for (i = 0; i < cars.length; i++){
        cars[i].draw()
    };
    requestAnimationFrame(update);
//some logic for collision detection
    // if (c.position.x < 0) {
    //     c.position = 0;
    // };
    // if (c.position.x + c.width > CANVAS_WIDTH) {
    //     c.position = 0;
    // }

    // };
    // requestAnimationFrame();
};

function carCollision() {
    for (let i = 0; i < cars.length; i++){
        let j = 0; j < allOtherCars.length; j++;
        var c = cars[i];
        if (dragging ===true && c.isSelected === true){
        allOtherCars.splice(c, 1);
        if(c.rightSide > allOtherCars[j].leftSide && c.leftSide < allOtherCars[j].rightSide && c.bottomSide > allOtherCars[j].topSide && c.topSide < allOtherCars[j].bottomSide){
        console.log('collision detected')
        }
    }
    }
};

area = 

init();