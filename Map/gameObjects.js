class Tile{
    constructor(polygon, number, resource){
        this.poly = polygon;
        this.resource = resource;
        this.number = number;
    }

    draw(ctx){
        ctx.fillStyle = textures[this.resource];
        this.poly.fill(ctx);
        ctx.fillStyle = 'black';
        this.poly.draw(ctx);
        ctx.strokeStyle = "blue";
        ctx.font = font_Size.toString() + 'px Cursive';
        ctx.strokeText(this.number.toString(), this.poly.center.coords[0]-font_Size/3, this.poly.center.coords[1]+font_Size/4);
        ctx.strokeStyle = "black";
    }
}