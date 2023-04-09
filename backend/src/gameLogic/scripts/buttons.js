import { jsn } from "./imports.js";

export function roll_the_dice(game){
    let s1 = jsn.randint(1,7);
    let s2 = jsn.randint(1,7);

    game.add_resources_by_hex(s1+s2);
}

export function house_button(game){
    let turn = game.currentTurn;
    if(!game.inAction && game.players[turn].resourceCards[0] && game.players[turn].resourceCards[2]
        && game.players[turn].resourceCards[3] && game.players[turn].resourceCards[4]){

            game.players[turn].addResource([0,2,3,4], [-1,-1,-1,-1]);
            game.inAction = true;
        }
}

export function city_button(game){
    let turn = game.currentTurn;
    if(!game.inAction && game.players[turn].resourceCards[1]>=3 && game.players[turn].resourceCards[2]>=2){

        game.players[turn].addResource([1,2], [-3,-2]);
        game.inAction = true;
    }
}

export function road_button(game){
    let turn = game.currentTurn;
    if(!game.inAction && game.players[turn].resourceCards[0] && game.players[turn].resourceCards[3]){

        game.players[turn].addResource([0,3], [-1,-1]);
        game.inAction = true;
    }
}

export function dev_button(game){
    let turn = game.currentTurn;
    if(!game.inAction && game.players[turn].resourceCards[1] && game.players[turn].resourceCards[2] && game.players[turn].resourceCards[4]){
            
        game.players[turn].addResource([1,2,4], [-1,-1,-1]);
        game.inAction = true;

        //add random dev card
        let total = game.bank.devCards.reduce((pv, cv)=>(pv+cv), 0);
        let s1 = jsn.random(0,1);
        let p = 0;
        let devIndex = 0;
        for(let i=0; i<game.bank.devCards.length; i++){
            if(s1<p+game.bank.devCards[i]/total && game.bank.devCards[i]>0){
                game.bank.devCards[i]-=1;
                devIndex = i;
                game.players[turn].addDev(devIndex);
                break;
            }
            p+=game.bank.devCards[i]/total;
        }
    }
}