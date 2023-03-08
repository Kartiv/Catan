const resourceTypes = ["brick", "lumber", "wool", "grain", "ore", "gold"];

class Card{
    constructor(image, playable){
        this.image = image;
        this.playable = playable;
    }
}

class Resource extends Card{
    constructor(image, type){
        if (!(type in resourceTypes))
            throw "invalid resource";
        else{
            this.type = type;
        }
        super(image, false);
    }
}

class Dev extends Card{
    constructor(image, playable, effect){
        super(image, playable);
        this.effect = effect;
    }
}
