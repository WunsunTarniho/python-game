class Grid{
    constructor(canvas){

        this.x = 48;
        this.y = 30;

        this.width = canvas.width / this.x;
        this.height = canvas.height / this.y;
    }
}

export default Grid;