//configuration variables
const cellPadding = 8;
const numTilesInSide = 4;
let tileRadius = (canvas.width - cellPadding * 3) / 8;
let totalScore = 0, highscore = 0;
let start = Math.floor(Date.now() / 1000);
let merges = [];
const emptyGrid = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]];
let grid = emptyGrid;
let lost = false;

//functions (name of function explains its function)
const addRandomTile = (numberOfTiles=1) => {
    for (let i = 1; i <= numberOfTiles; i++) {
        let x, y;
        do {
            [x, y] = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
        } while (grid[y][x] !== null);

        grid[y][x] = new Tile(x * tileRadius * 2 + x * cellPadding, y * tileRadius * 2 + y * cellPadding, tileRadius);
    }
}

const impossibleToMerge = () => {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) { try {
            //checks the grid cells to the right and below each cell to see if a merge is possible
            if (grid[i][j] === null  || grid[i + 1][j] === null || grid[i][j + 1] === null || grid[i][j].num === grid[i][j + 1].num || grid[i][j].num === grid[i + 1][j].num) return false;
        } catch {}}
    }
    return true;
}

const move = (twoKeys, x, y) => {
    let moved = false;
    if (keys[twoKeys[0]] || keys[twoKeys[1]]) {
        let i, j, col;
        for (let row = 0; row < 4; row++) {
            if (x) i = row;
            else if (y) j = row;
            if (x + y < 0) col = 1;
            else col = 2;

            //loops through the columns or rows depending on x and y
            while ((x + y < 0) ? col < 4 : col > -1) {
                if (x) j = col;
                else if (y) i = col;
                
                if (grid[i][j] !== null) {
                    try {
                        if (grid[i + y][j + x] === null) {
                            //moves to position
                            if (x) {
                                grid[i][j].move({
                                    toX: ((col + x) * tileRadius * 2 + (col + x) * cellPadding),
                                    toY: null
                                });
                            } else if (y) {
                                grid[i][j].move({
                                    toX: null,
                                    toY: ((col + y) * tileRadius * 2 + (col + y) * cellPadding)
                                });
                            }

                            //moves the tile in the grid up and replaces its old index with null
                            grid[i + y][j + x] = grid[i][j];
                            grid[i][j] = null;
                            moved = true;
                            col += 2 * (x + y);
                        } else if (grid[i + y][j + x].num === grid[i][j].num) {
                            //merge two tiles
                            grid[i + y][j + x] = new Tile((j + x) * tileRadius * 2 + (j + x) * cellPadding, (i + y) * tileRadius * 2 + (i + y) * cellPadding, tileRadius, grid[i][j].num * 2)
                            
                            //increases score
                            totalScore += grid[i][j].num * 2;

                            //copies tile to merges array, then moves it.
                            merges.push(grid[i][j]);
                            if (x) {
                                merges[merges.length - 1].move({
                                    toX: ((col + x) * tileRadius * 2 + (col + x) * cellPadding),
                                    toY: null
                                });
                            } else if (y) {
                                merges[merges.length - 1].move({
                                    toX: null,
                                    toY: ((col + y) * tileRadius * 2 + (col + y) * cellPadding)
                                });
                            }

                            //gets rid of old tile
                            grid[i][j] = null;
                            moved = true;
                            col += (x + y);
                        }
                    } catch {}
                }

                col += -1 * (x + y);
            }
        }

        [keys[twoKeys[0]], keys[twoKeys[1]]] = [false, false];
    }

    return moved;
}

addRandomTile(2);

//main game function
const game = () => {
    //if lost
    if (lost) {
        console.log('u lose');
        grid = emptyGrid;
        totalScore = 0;
        addRandomTile(2);
        start = Date.now();
        merges = [];
        lost = false;

        grid.forEach((row) => {
            console.log(row);
        })
    }

    //updates score and time
    score.textContent = totalScore;
    if (!lost) time.textContent = Math.floor(Date.now() / 1000) - start;
    
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

    //moves each direction
    if (move(['w', 'ArrowUp'], 0, -1) ||
        move(['s', 'ArrowDown'], 0, 1) ||
        move(['a', 'ArrowLeft'], -1, 0) ||
        move(['d', 'ArrowRight'], 1, 0))
        {
        //checks if they player has lost
        if (!lost && impossibleToMerge()) {
            lost = true;
            if (highscore === 0) statsList.appendChild(document.createElement('li'));
            if (totalScore > highscore) {
                highscore = totalScore;
                statsList.lastChild.innerHTML = `Highscore<span>${highscore}</span>`;
            }
        } else {
            //if the player hasn't lost then another tile will be added
            addRandomTile();
        }
    }

    //draws tiles
    for (let i in merges) {
        merges[i].draw(c);

        if (Math.abs(merges[i].x - merges[i].direction.toX) < tileRadius + cellPadding) merges.splice(i, 1);
        else if (Math.abs(merges[i].y - merges[i].direction.toY) < tileRadius + cellPadding) merges.splice(i, 1);
    }
    for (let i in grid) {
        for(let j in grid) {
            if (grid[j][i] !== null) {
                grid[j][i].draw(c);
            }
        }
    }
}

//initiate game interval
const gameInterval = setInterval(game, 1000 / FPS);

//event listeners
addEventListener('keydown', e => {
    if ((e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd') || (e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowDown')) {
        keys[e.key] = true;
    }
});