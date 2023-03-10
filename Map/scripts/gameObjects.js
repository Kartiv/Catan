class Tile{
    constructor(polygon, number, resource){
        this.poly = polygon;
        this.resource = resource;
        this.number = number;
    }

    draw(ctx){ //draw the outline and fill with the correct color + draw text
        ctx.fillStyle = tile_textures[this.resource];
        this.poly.fill(ctx);
        ctx.fillStyle = 'black';
        this.poly.draw(ctx);
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.font = map_font_size.toString() + 'px Cursive';
        ctx.strokeText(this.number.toString(), this.poly.center.coords[0]-map_font_size/3, 
                        this.poly.center.coords[1]+map_font_size/3, map_font_size/1.5);
        ctx.closePath();
        ctx.strokeStyle = "black";
    }
}

class Card{
    constructor(resource){
        this.resource = resource;
        //create button
        this.button = document.createElement("button");
        document.body.appendChild(this.button);

        //create display image
        this.image = document.createElement("img");
        this.button.appendChild(this.image);
        this.image.src = card_textures[resource];
        //the image has the same dimensions as the button, adjusted to fit inside it (subtracts the border width)
        this.image.style = "width: " + (card_width-3*2).toString()+"px; height: "+ 
        (card_height-2*3).toString()+"px; position:absolute; top:0px; left:0px;";
        let i = player_hand.length;
        let row = Math.floor(player_hand.length/row_cap);
        //style the button
        this.button.style="height: " + (card_height).toString()+"px; width:" + (card_width).toString() +
        "px; position:absolute; border:3px solid black; top:" + 
        (canvas.height+50+row*(card_height+27)).toString() + "px; left:" + 
        (i*card_width-row*row_cap*card_width).toString()+"px;";
    }
}

class Resource extends Card{
    constructor(resource){
        super(resource);
        this.button.onclick = this.onclick;
    }

    onclick(){

    }
}

class Devcard extends Card{
    constructor(resource){
        super(resource);
        this.button.onclick = this.onclick;
    }

    onclick(){

    }
}

class House{
    constructor(){
        
    }
}