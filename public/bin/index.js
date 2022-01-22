//globals
const FPS = 60;
var keys = {};
const smoothness = 5;
const smoother = (num, end, looseness) => num + (end - num) / looseness;

//elements
var score = document.getElementById('score');
var time = document.getElementById('time');
var gameUI = document.getElementById('gameUI');
var canvas = document.getElementById('gameCanvas');
var c = canvas.getContext('2d');

//all the colors of blocks. only 16 because there is space only for 16 different tiles on the board
const colors = {
    2: '#f9f6f2',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e',
    'bigger': '#3c3731',
    'ogText': '#80776e',
    'text': '#f9f6f2'
}

//sets canvas dimensions
canvas.setAttribute('width', (gameUI.clientWidth - 10).toString());
canvas.setAttribute('height', (gameUI.clientWidth - 10).toString());

//sets the maxheight of the game UI
gameUI.style.maxHeight = `${canvas.width + 10}px`;

// Tile class
class Tile {
    constructor(x, y, rad, num=null) {
        this.x = x;
        this.y = y;
        this.drawn = false;
        this.trueRadius = rad;
        this.radius = tileRadius / 4;
        this.shrunk = 0;
        this.direction = {
            toX: null, toY: null
        };

        //returns either 2 or 4
        if (!num && Math.random() <= 0.1) {
            this.num = 4;
        } else {
            this.num = num || 2;
        }
    }

    growRadius = () => this.radius + 7;

    shrinkRadius = () => this.radius - ++this.shrunk;

    draw(context) {
        //animates growing
        if (!this.drawn) {
            //handles radius growing/shrinking
            if (this.radius <= this.trueRadius + cellPadding/4) this.radius = this.growRadius();
            else this.radius = this.shrinkRadius();

            //stops animating after the shrinking has
            if (this.shrunk > 3) this.drawn = true;
        }
        
        //animate movement
        if (this.direction.toX) this.x = smoother(this.x, this.direction.toX, smoothness);
        if (this.direction.toY) this.y = smoother(this.y, this.direction.toY, smoothness);

        //decides color then draws square
        if (this.num >= 4096) context.fillStyle = colors['bigger'];
        else context.fillStyle = colors[this.num];
        context.fillRect(this.x + (this.trueRadius - this.radius)/2, this.y + (this.trueRadius - this.radius)/2, this.radius * 2, this.radius * 2);

        //text formatted and drawn
        context.fillStyle = this.num < 5 ? colors['ogText'] : colors['text'];
        context.textAlign = 'center';
        context.font = `${Math.floor(this.radius * 3/4)}px sans-serif`;
        context.fillText(this.num.toString(), this.x + this.trueRadius, this.y + this.trueRadius + Math.floor(this.radius * 3/4) / 4);
    }

    move(direction) {
        // finish last animation if needed
        if (this.direction.toX && this.x !== this.direction.toX) this.x = this.direction.toX;
        else if (this.direction.toY && this.y !== this.direction.toY) this.y = this.direction.toY;

        // start new animation
        this.direction = direction;
    }
}

//event listeners
addEventListener('keydown', e => {
    if ((e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd') || (e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowDown')) {
        keys[e.key] = true;
    }
});