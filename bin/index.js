//globals
var FPS = 30;
var gameUI = document.getElementById('gameUI')
var canvas = document.getElementById('gameCanvas');
var c = canvas.getContext('2d');
var keys = [];

//sets canvas dimensions
canvas.setAttribute('width', gameUI.clientWidth.toString());
canvas.setAttribute('height', gameUI.clientHeight.toString());

// Tile class
class Tile {
    constructor(x, y, rad) {
        this.x = x;
        this.y = y;
        this.drawn = false;
        this.trueRadius = rad;
        this.radius = 0;

        //returns either 2 or 4
        if (Math.random() <= 0.1) {
            this.num = 4;
        } else {
            this.num = 2;
        }
    }

    static growRadius() {
        return this.radius + 1;
    }

    draw(context) {
        //animates growing
        if (!this.drawn) {
            this.radius = growRadius();
        } else {
            this.radius = this.trueRadius;
        }

        //square
        context.fillStyle = 'grey';
        context.fillRect(this.x + this.trueRadius/2 - this.radius/2, this.y + this.trueRadius/2 - this.radius/2, this.radius * 2, this.radius * 2);

        //text
        context.fillStyle = 'black';
        context.font = `${Math.floor(this.radius / 2)}px sans-serif`;
    }

    move() {
        //move

        //animate movement
    }


}

//event listeners
addEventListener('keydown', e => {
    if ((e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd') || (e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowDown')) {
        keys.push(e.key);
        if (keys.length > 2) {
            keys.shift();
        }
    }
});

addEventListener('keyup', e => {
    if ((e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd') || (e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowDown') && keys[0] === e.key) {
        keys.shift();        
    }
});