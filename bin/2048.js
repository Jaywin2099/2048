console.log(Tile);

//main game function
const game = () => {
    //background
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
}

//initiate game interval
const gameInterval = setInterval(game, 1000 / FPS);