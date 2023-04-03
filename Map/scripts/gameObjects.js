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

class Vertex{
    constructor(id){
        this.id = id;
        this.button_id = id[0].toString() + id[1].toString();
        this.hex_arr = [];
        this.button;
        this.house; //if its a normal house it equals the player turn and otherwise it equals it +10
        this.image;
    }
}

class Edge{
    constructor(x, y, vert1, vert2){
        this.x = x;
        this.y = y;
        this.vert1 = vert1;
        this.vert2 = vert2;
        this.id = this.x.toString() + this.y.toString();
        this.road;
        
        this.button = document.createElement("button");
        document.body.appendChild(this.button);

        this.button.style = "position: absolute; top:" + y.toString() + "px; left:" + x.toString() + 
        "px; width:20px; height:20px;" + "border-radius:16px;";
        this.button.style.display = 'none';

        this.button.onclick = (e)=>{
            if(turn == main_player){
                player_roads[turn].push(this);
                ctx.strokeStyle = player_colors[turn];
                ctx.lineWidth = 7;
                ctx.beginPath();
                ctx.moveTo(vert1.coords[0], vert1.coords[1]);
                ctx.lineTo(vert2.coords[0], vert2.coords[1]);
                ctx.stroke();
                ctx.closePath();

                this.road = turn;
                check_longest_road(turn);
                hide_road_buttons();
            }
        }
    }
}

class Card{
    constructor(resource, i){
        this.resource = resource;
        //create button
        this.button = document.createElement("button");
        document.body.appendChild(this.button);

        let left = (50+i*(card_width+10)).toString();

        //create display image
        this.image = document.createElement("img");
        this.button.appendChild(this.image);
        this.image.src = card_textures[resource];
        //the image has the same dimensions as the button, adjusted to fit inside it (subtracts the border width)
        this.image.style = "width: " + (card_width-3*2).toString()+"px; height: "+ 
        (card_height-2*3).toString()+"px; position:absolute; top:0px; left:0px;";

        //counter that tracks how much of the given card the player has
        this.counter = document.createElement("div");
        this.button.appendChild(this.counter);
        this.counter.style = "position:absolute; top:" + (card_height+5).toString() + "px; + left:" + left + "px;" +
        "text-align:center; font-size:30px; width:" + (50).toString() + "px;" ;
        this.counter.innerHTML = "0";

        //style the button
        this.button.style="height: " + (card_height).toString()+"px; width:" + (card_width).toString() +
        "px; position:absolute; border:3px solid black; top:" + 
        (canvas.height+60).toString() + "px; left:" + left+"px;";

        this.turnOff();
    }

    turnOn(){
        this.button.style.display = 'block';
        this.image.style.visibility='visible';
        this.counter.style.display = "block";
    }

    turnOff(){
        this.button.style.display = 'none';
        this.image.style.visibility='hidden';
        this.counter.style.display="none";
    }
}

class Resource extends Card{
    constructor(resource, i){
        super(resource, i);
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
