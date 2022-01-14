//configuration variables
const cellPadding = 8;
let tileRadius = (canvas.width - cellPadding * 3) / 8;
const emptyGrid = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]];
let grid = emptyGrid;
let totalScore = 0;
let start = Math.floor(Date.now() / 1000);

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
    //updates score and time
    score.textContent = totalScore.toString();
    time.textContent = Math.floor(Date.now() / 1000) - start;

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
    
    //checks for movement
    let moved = false;

    //moves up
    if (keys['w'] || keys['ArrowUp']) {
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                try {
                    if (grid[j][i] !== null) {
                        if (grid[j - 1][i] === null) {
                            //move up to position j - 1
                            grid[j][i].y =  (j - 1) * tileRadius * 2 + (j - 1) * cellPadding;
                            
                            //moves the tile in the grid up and replaces its old index with null
                            grid[j - 1][i] = grid[j][i];
                            grid[j][i] = null;
                                
                            moved = true;
                            j-=2;
                        } else if (grid[j - 1][i].num === grid[j][i].num) {
                            //merge two tiles
                            grid[j - 1][i] = new Tile(i * tileRadius * 2 + i * cellPadding, (j - 1) * tileRadius * 2 + (j - 1) * cellPadding, tileRadius, grid[j][i].num * 2)
                            
                            //increases score
                            totalScore += grid[j][i] * 2;

                            //gets rid of old tile
                            grid[j][i] = null;

                            
                            moved = true;
                            j--;
                        }
                    }
                } catch {}
            }
        }

        [keys['w'], keys['ArrowUp']] = [false, false];
    }

    //moves down
    if (keys['s'] || keys['ArrowDown']) {
        for (let i = 0; i < 4; i++) {
            for (let j = 2; j >= 0; j--) {
                try {
                    if (grid[j][i] !== null) {
                        if (grid[j + 1][i] === null) {
                            //move up to position j + 1
                            grid[j][i].y =  (j + 1) * tileRadius * 2 + (j + 1) * cellPadding;
                            
                            //moves the tile in the grid up and replaces its old index with null
                            grid[j + 1][i] = grid[j][i];
                            grid[j][i] = null;
                            moved = true;
                            j+=2;
                        } else if (grid[j + 1][i].num === grid[j][i].num) {
                            //merge two tiles
                            grid[j + 1][i] = new Tile(i * tileRadius * 2 + i * cellPadding, (j + 1) * tileRadius * 2 + (j + 1) * cellPadding, tileRadius, grid[j][i].num * 2)
                            
                            //increases score
                            totalScore += grid[j][i] * 2;

                            //gets rid of old tile
                            grid[j][i] = null;
                            moved = true;
                            j++;
                        }
                    }
                } catch {}
            }
        }

        [keys['s'], keys['ArrowDown']] = [false, false];
    }

    //moves left
    if (keys['a'] || keys['ArrowLeft']) {
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                try {
                    if (grid[i][j] !== null) {
                        if (grid[i][j - 1] === null) {
                            //move up to position j - 1
                            grid[i][j].x =  (j - 1) * tileRadius * 2 + (j - 1) * cellPadding;
                            
                            //moves the tile in the grid up and replaces its old index with null
                            grid[i][j - 1] = grid[i][j];
                            grid[i][j] = null;
                                
                            moved = true;
                            j-=2;
                        } else if (grid[i][j - 1].num === grid[i][j].num) {
                            //merge two tiles
                            grid[i][j - 1] = new Tile((j - 1) * tileRadius * 2 + (j - 1) * cellPadding, i * tileRadius * 2 + i * cellPadding, tileRadius, grid[i][j].num * 2)
                            
                            //increases score
                            totalScore += grid[i][j] * 2;

                            //gets rid of old tile
                            grid[i][j] = null;

                            moved = true;
                            j--;
                        }
                    }
                } catch {}
            }
        }

        [keys['a'], keys['ArrowLeft']] = [false, false];
    }

    //moves right
    if (keys['d'] || keys['ArrowRight']) {
        for (let i = 0; i < 4; i++) {
            for (let j = 2; j >= 0; j--) {
                try {
                    if (grid[i][j] !== null) {
                        if (grid[i][j + 1] === null) {
                            //move up to position j + 1
                            grid[i][j].x =  (j + 1) * tileRadius * 2 + (j + 1) * cellPadding;
                            
                            //moves the tile in the grid up and replaces its old index with null
                            grid[i][j + 1] = grid[i][j];
                            grid[i][j] = null;
                            moved = true;
                            j+=2;
                        } else if (grid[i][j + 1].num === grid[i][j].num) {
                            //merge two tiles
                            grid[i][j + 1] = new Tile((j + 1) * tileRadius * 2 + (j + 1) * cellPadding, i * tileRadius * 2 + i * cellPadding, tileRadius, grid[i][j].num * 2)
                            
                            //increases score
                            totalScore += grid[i][j] * 2;
                            
                            //gets rid of old tile
                            grid[i][j] = null;
                            moved = true;
                            j++;
                        }
                    }
                } catch {}
            }
        }

        [keys['d'], keys['ArrowRight']] = [false, false];
    }

    //adds new tile
    if (moved) addRandomTile();

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