// class Car {
//     constructor(boardWidth, boardHeight){
//         this.width= 290;
//         this.height= 90;
        
//         this.position = {
//             x: boardHeight/2 - this.height/2 -50px,
//             y: boardWidth/2 - this.width - 100;
//         }
//     }

//     draw(ctx){
//         c.fillRect(this.position.x, this.position.y, this.width, this.height)
//     }

// };


var canvas, cx, width, height;
var canvasRect;

var cube1, cube2;

var dragData = {
    draggables: [],
    start: {        x: 0,        y: 0
    },
    current: {      x: 0,        y: 0
    },
    target: null
};

function Cube(x,y,w,h, color) {
  this.x=x; this.y=y; this.w=w; this.h = h;
  this.color = color;
}

Cube.prototype = {
    update: function () {

    },
    draw: function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    },
    isPointInside: function (x, y) {
        return (x >= this.x) && (x < this.x + this.w) && (y > this.y) && (y < this.y + this.h);
    }
};

var pointerCoords = {
    x: 0,
    y: 0,
    update: function (e) {
        var coords = e.touches ? e.touches[0] : e;
        this.x = coords.pageX - canvasRect.left;
        this.y = coords.pageY - canvasRect.top;
    }
};


function onStart(e) {
    e.preventDefault();
    pointerCoords.update(e);
    // look if we start the touch within a draggable object
    var target = null;
    for (var i = 0; i < dragData.draggables.length; i++) {
        var draggable = dragData.draggables[i];
        if (draggable.isPointInside(pointerCoords.x, pointerCoords.y)) {
            target = draggable;
            break;
        }
    }
    dragData.target = target;
}

function onMove(e) {
    pointerCoords.update(e);
    var target = dragData.target;
    if (!target) return;
    target.x = pointerCoords.x;
    target.y = pointerCoords.y;
}

function onStop(e) {
    pointerCoords.update(e);
    e.preventDefault();
    if (!dragData.target) return;
    onMove(e);
    dragData.target = null;
}

function main() {
    canvas = document.createElement("canvas");

    width = window.innerWidth;
    height = window.innerHeight;

    if (width >= 500) {
        width = 320;
        height = 480;
        canvas.style.border = "1px solid #000";
    }

    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    canvasRect = canvas.getBoundingClientRect();
    canvas.addEventListener("touchstart", onStart);
    canvas.addEventListener('touchmove', onMove);
    canvas.addEventListener("touchstop", onStop);
    canvas.addEventListener("mousedown", onStart);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener("mouseup", onStop);
    
    cube1 = new Cube(100, 80, 100, 200, 'blue');
    cube2 = new Cube(150, 160, 200, 100, 'red');
    dragData.draggables.push(cube1, cube2);
    run();
}


function run() {
    var loop = function () {
        requestAnimationFrame(loop);
        update();
        render();
    }
    loop();
}

function update() {

}

function render() {
    ctx.clearRect(0, 0, width, height);
    cube1.draw(ctx);
    cube2.draw(ctx);
}

main();