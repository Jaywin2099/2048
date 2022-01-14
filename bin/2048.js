//configuration variables
const cellPadding = 8;
let tileRadius = (canvas.width - cellPadding * 3) / 8;

const emptyGrid = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
];

let grid = emptyGrid;

//functions (name of function explains its function)
const addRandomTile = () => {
    let x, y;
    do {
        [x, y] = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
    } while (grid[y][x] !== null);

    grid[y][x] = new Tile(x * tileRadius * 2 + x * cellPadding, y * tileRadius * 2 + y * cellPadding, tileRadius);
}

addRandomTile();
addRandomTile();

//main game function
const game = () => {
    //background
    c.fillStyle = '#b6ac99';
    c.fillRect(0, 0, canvas.width, canvas.height);

    //draw tile fillers
    c.fillStyle = '#c9bbae';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            c.fillRect(i * (cellPadding + tileRadius * 2), j * (cellPadding + tileRadius * 2), tileRadius * 2, tileRadius * 2);
        }
    }
    
    console.log(keys);

    //checks for movement
    if (keys.length !== 0) {
        switch (keys[0]) {
            case 'w': case 'ArrowUp':
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 4; j++) {
                        
                    }
                }
            break;
            case 'a': case 'ArrowLeft':
    
            break;
            case 's': case 'ArrowDown':
    
            break;
            case 'd': case 'ArrowRight':
    
        }
        keys.shift();
    }
    

    //draws tiles
    for (let i in grid) {
        for(let j in grid) {
            if (grid[j][i]) {
                grid[j][i].draw(c);
            }
        }
    }
}

//initiate game interval
const gameInterval = setInterval(game, 1000 / FPS);