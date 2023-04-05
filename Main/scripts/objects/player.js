class Player{
    name;
    id;
    color;
    resourceCards = [0,0,0,0,0]
    devCards = [0,0,0,0,0]
    roads = []
    longestRoad = 0
    victoryPoints = 0
    constructor(name, color){
        this.name = name
        this.color = color
    }

    addResource(cardList, amounts){ //add to the card_list cards values given by amounts
        for(let i=0; i<cardList.length; i++){
            this.resourceCards[cardList[i]]+=amounts[i];
        }
    }

    addDev(dev){
        this.devCards[dev]+=1;
    }

    addPoint(n=1){
        this.victoryPoints+=n;
    }

}