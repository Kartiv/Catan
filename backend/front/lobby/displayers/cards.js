class Card{
    constructor(resource, i){
        this.resource = resource;

        let left = (50+i*(card_width+10)).toString();

        //create display image

        this.display = document.createElement('div');
        document.body.appendChild(this.display);

        this.display.style = "height: " + (card_height).toString()+"px; width:" + (card_width).toString() +
        "px; position:absolute; border:3px solid black; top:" + 
        (canvas.height+60).toString() + "px; left:" + left+"px;";

        this.img = document.createElement("img");
        this.display.appendChild(this.img);
        this.img.src = cardTextures[resource];

        //the image has the same dimensions as the button, adjusted to fit inside it (subtracts the border width)
        this.img.style = "width: " + (card_width).toString()+"px; height: "+ 
        (card_height).toString()+"px; position:absolute; top:0px; left:0px;";

        //counter that tracks how much of the given card the player has
        this.counter = document.createElement("div");
        this.display.appendChild(this.counter);
        this.counter.style = "position:absolute; top:" + (card_height+5).toString() + "px; + left:" + left + "px;" +
        "text-align:center; font-size:30px; width:" + (50).toString() + "px;" ;
        this.counter.innerHTML = "0";

        //create button
        this.button = document.createElement("button");
        this.display.appendChild(this.button);

        this.button.onclick = this.onclick;
        //style the button
        this.button.style="width: " + (card_width).toString()+"px; height: "+ 
        (card_height).toString()+"px; position:absolute; top:0px; left:0px;" +'background: url(' + cardTextures[resource]+'); background-size:cover';

        this.turnOff();

    }

    turnOn(){
        this.display.style.display = 'block';
        this.img.style.visibility='visible';
        this.counter.style.display = "block";
        this.button.style.display ='block';
    }

    turnOff(){
        this.display.style.display = 'none';
        this.img.style.visibility='hidden';
        this.counter.style.display="none";
        this.button.style.display ='none';
    }
}

class Resource extends Card{
    constructor(resource, i){
        super(resource, i);
    }
}

class Devcard extends Card{
    constructor(resource, i){
        super(resource, i);
    }

    onclick(){
        
    }
}