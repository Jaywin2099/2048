// Tile class
export class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        //returns either 2 or 4
        if (Math.random() <= 0.1) {
            this.num = 4;
        } else {
            this.num = 2;
        }
    }

    draw() {
        
    }

    move() {
        //animate movement
    }


}