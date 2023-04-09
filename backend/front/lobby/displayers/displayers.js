function updateDiceDisplay(s1,s2){
    roll_display.innerHTML = "Roll:" + (s1+s2).toString();
    diceOne.innerHTML = "<img src='" + dice_faces[s1-1] + "'>"
    diceTwo.innerHTML = "<img src='" + dice_faces[s2-1] + "'>"
}

function updateCardDisplay(player){
    for(let i=0; i<cardDisplay.length; i++){
        cardDisplay[i].counter.innerHTML = game.players[player].resourceCards[i];
        if(game.players[player].resourceCards[i]){
            cardDisplay[i].turnOn();
        }


        else{
            cardDisplay[i].turnOff();
        }
    }
}

function updateDevDisplay(player){
    for(let i=0; i<devDisplay.length; i++){
        if(game.players[player].devCards[i]){
            devDisplay[i].counter.innerHTML = game.players[player].devCards[i];
            devDisplay[i].turnOn();
        }

        else{
            devDisplay[i].turnOff();
        }
    }
}