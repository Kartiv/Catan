import { BasePlayer } from "../../../pregame/lobbyClasses/player.js";

export default class Player extends BasePlayer{
    color;
    resourceCards = [0,0,0,0,0]
    devCards = [0,0,0,0,0]
    roads = []
    houses = []
    longestRoad = 0
    victoryPoints = 0
    constructor(name, id, color){
        super(name,id)
        this.color = color
    }

    addResource(cardList, amounts){ //add to the card_list cards values given by amounts
        for(let i=0; i<cardList.length; i++){
            this.resourceCards[cardList[i]]+=amounts[i];
        }
    }

    addDev(dev){
        this.devCards[dev]+=1;
        if(dev==0){
            this.addPoint();
        }
    }

    addPoint(n=1){
        this.victoryPoints+=n;
    }

}