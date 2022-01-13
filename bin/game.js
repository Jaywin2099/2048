//main game function
function game() {
    //background
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    addRandomTile();
    console.log(grid);
}
