//globals
var FPS = 30;
var canvas = document.getElementById('gameCanvas');
var c = canvas.getContext('2d');
var keys = [];

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