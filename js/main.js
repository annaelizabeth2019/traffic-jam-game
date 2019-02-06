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
    //know when 
    //
//4. The game is winnable: player can get the red car to the escape point and know they won
//5. The game runs a timer?
//6. The game counts moves. 
//7. The game includes at least one level, but potentially can include more levels that can be easily rendered
//8. The game lets the player know when they have won!

// ctx.clearRect(0, 0, 600, 600)


/*----- constants -----*/ 

const canvas = document.getElementById("canvas");
const frontCanvas = document.getElementById("frontCanvas");
var ctx = canvas.getContext("2d");
var fctx = frontCanvas.getContext("2d");
const CANVAS_WIDTH = frontCanvas.width;
const CANVAS_HEIGHT = frontCanvas.height;

//dragging detection
let dragging = false;
let x, y;
let carY;

let redCar, car1, car2, car3, car4, car5, car6, car7, car8, car9, bus1, bus2;

class Car {
    constructor(carX, originY, carWidth, carHeight){
        this.width = carWidth;
        this.height = carHeight;
        this.x = carX;
        this.y = originY;
        this.padding = 10;
    }
    
    draw(){
        fctx.fillStyle = "rgb(58, 135, 154)";
        fctx.fillRect(this.x + this.padding, this.y + this.padding, this.width, this.height);
        
    }
    clickEvent () {
        
        console.log(this.x)
    }
    
};

function init(){

    createGrid();

    createCars();

    /*----- event listeners -----*/ 
    
    frontCanvas.addEventListener('mousedown', selectCar)
    frontCanvas.addEventListener('mousemove', mouseTrack);
    frontCanvas.addEventListener('mouseup', releaseCar);



Car.prototype.moveX = function() {
    if (dragging === true) {
        this.x = carX
    }
};
};

/*----- app's state (variables) -----*/ 

let carX = 100; 
let dx = 100; 


/*----- cached element references -----*/ 






/*----- functions -----*/

function selectCar() {
    console.log(frontCanvas.style.right);
    // let temp = frontCanvas.style.right.split('p')
    // console.log(temp)
    
    // let num = Number(temp[0]) + 100;
    // temp[0] = num.toString();   
    
    // temp = temp.join('p')
    
    // frontCanvas.style.right = temp;
}

function mouseTrack(evt) {
    let rect = frontCanvas.getBoundingClientRect();
    x = evt.clientX - rect.left;
    y = evt.clientY - rect.top;
    if (dragging === true) {
        
    }
    
};

function releaseCar(){
    console.log('release car is ready!');
    dragging = false;
};

function render() {
    console.log('render is ready');
};

function animate() {
    requestAnimationFrame(animate);
    carX += dx;
    console.log(carX);
};

function createCars() {
    // cars
    redCar = new Car(0, 200, 180, 80);
    car1 = new Car(0, 300, 180, 80);
    car2 = new Car(100, 400, 80, 180);
    car3 = new Car(0, 400, 80, 180);
    car4 = new Car(200, 400, 180, 80);
    car5 = new Car(200, 500, 180, 80);
    car6 = new Car(200, 200, 80, 180);
    car7 = new Car(200, 0, 80, 180);
    car8 = new Car(300, 100, 80, 180);
    car9 = new Car(300, 300, 180, 80);
    bus1 = new Car(300, 0, 280, 80);
    bus2 = new Car(500, 200, 80, 280);
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

function update() {
    redCar.draw();
    car1.draw();
    car2.draw();
    car3.draw();
    car4.draw();
    car5.draw();
    car6.draw();
    car7.draw();
    car8.draw();
    car9.draw();
    bus1.draw();
    bus2.draw();
    update();
    };
    // requestAnimationFrame();


// animate()

init();
