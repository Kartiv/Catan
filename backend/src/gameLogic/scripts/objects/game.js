import Map from "./Map.js";
import { Bank } from "./gameObjects.js";
import { calculateID } from "../util.js";

export default class Game{
    players;
    bank;
    map;

    currentTurn = 0;
    startingTurns = true;
    inAction = true;
    

    constructor(players){
        this.players = players
        this.bank = new Bank();
        this.map = new Map();
    }

    get currentPlayer(){
        return this.players[this.currentTurn]
    }

    nextTurn(){
        this.currentTurn = this.currentPlayer % this.players.length
    }

    addResourcesByHex(number){
        for(let hex of this.map.hexMap){
            if(hex.number == number && !hex.robber){
                for(let vert of hex.poly.vertices){
                    let id = calculateID(vert.coords[0], vert.coords[1]);
                    let house = this.map.vertDict[id].house;
                    if(house!=null){
    
                        let double = 1;
                        if(house>=1){ //if the house is a city the it has a value of 10 greater than the player id
                            double=2;
                            house-=10; //now house once again equals the player id
                        }
                        this.players[house].addResource([hex.resource], [double]); //adds 1 of the resource to the player if not city and 2 else
                    }
                }
            }
        }
    }
}