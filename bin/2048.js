//configuration variables
const cellpadding = 8;
let tileRadius;
if (canvas.width > canvas.height) tileRadius = (canvas.height / 4 - cellpadding) / 2; 
else tileRadius = (canvas.width / 4 - cellpadding * 3) / 2; 
// maybe subract some padding for the canvas width if you cant do that in css

const emptyGrid = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
];

let grid = emptyGrid;

//functions
const addRandomTile = () => {
    let x, y;
    do {
        [x, y] = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
    } while (grid[y][x] !== null);

    grid[y][x] = new Tile(x, y, tileRadius);
}

//main game function
const game = () => {
    //background
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    //draw tile fillers
    c.fillStyle = 'pink';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            c.fillRect(i * (cellpadding + tileRadius * 2), j * (cellpadding + tileRadius * 2), tileRadius * 2, tileRadius * 2);
        }
    }
}

//initiate game interval
const gameInterval = setInterval(game, 1000 / FPS);