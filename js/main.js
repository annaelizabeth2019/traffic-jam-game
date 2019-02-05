//1. Render a board, blocks, a red block and an "escape" point in front of red car. 
//Traffic Jam
//2. Blocks can be move on x and y axis
//3. Blocks can be dragged by mouse
//4. The game is winnable: player can get the red car to the escape point and know they won
//5. The game runs a timer?
//6. The game counts moves. 
//7. The game includes at least one level, but potentially can include more levels that can be easily rendered
//8. The game lets the player know when they have won!

/*----- constants -----*/ 

const canvas = document.getElementById("canvas");
const frontCanvas = document.getElementById("frontCanvas");

canvas.width = 600;
canvas.height = 600;
frontCanvas.width = 600;
frontCanvas.height = 600;

const BOARD_WIDTH = 600;
const BOARD_HEIGHT = 600;

var ctx = canvas.getContext("2d");
var fctx = frontCanvas.getContext("2d");

//dragging detection
let dragging = false;
let x, y;
ctx.clearRect(0, 0, 600, 600)

function init(){

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

init();

/*----- app's state (variables) -----*/ 

class Car {
    constructor(originX, originY, carWidth, carHeight){
        this.width = carWidth;
        this.height = carHeight;
        this.x = originX;
        this.y = originY;
        this.padding = 10;
        }

    draw(){
        fctx.fillRect(this.x + this.padding, this.y + this.padding, this.width, this.height)
    }

};

let car = new Car(0, 300, 180, 80);
let car2 = new Car(100, 400, 80, 180);
car.draw()
car2.draw()

/*----- cached element references -----*/ 


/*----- event listeners -----*/ 

frontCanvas.addEventListener('mousedown', selectCar);
frontCanvas.addEventListener('mousemove', mouseTrack);
frontCanvas.addEventListener('mouseup', releaseCar);


/*----- functions -----*/

function selectCar() {
    dragging = true;
}
function mouseTrack(evt) {
    let rect = frontCanvas.getBoundingClientRect();
    x = evt.clientX - rect.left;
    y = evt.clientY - rect.top;
    if (dragging === true) {
        ctx.clearRect(0, 0, 600, 600);
        car.draw(x, y, 180, 80)
        car2.draw()
        render();
    }
};

function releaseCar(){
    console.log('release car is ready!');
    dragging = false;
};

function render() {
    console.log('render is ready');
};


