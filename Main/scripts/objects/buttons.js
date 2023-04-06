function dice_click(){
    let turn = game.currentTurn;
    if(turn==main_player){
        let s1 = jsn.randint(1,7);
        let s2 = jsn.randint(1,7);

        add_resources_by_hex(s1+s2);
        updateDiceDisplay(s1,s2);
        updateCardDisplay(turn);

        dice_on = false;
        end_on = true;
    }
}

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

function add_resources_by_hex(number){
    for(let hex of map.hexMap){
        if(hex.number == number && !hex.robber){
            for(let vert of hex.poly.vertices){
                let id = calculateID(vert.coords[0], vert.coords[1]);
                let house = map.vertDict[id].house;
                if(house!=null){

                    let double = 1;
                    if(house>=1){ //if the house is a city the it has a value of 10 greater than the player id
                        double=2;
                        house-=10; //now house once again equals the player id
                    }
                    game.players[house].addResource([hex.resource], [double]); //adds 1 of the resource to the player if not city and 2 else
                }
            }
        }
    }
}

function house_button(){
    let turn = game.currentTurn;
    if(turn==main_player && game.players[turn].resourceCards[0] && game.players[turn].resourceCards[2]
        && game.players[turn].resourceCards[3] && game.players[turn].resourceCards[4]){

            game.players[turn].addResource([0,2,3,4], [-1,-1,-1,-1]);
            updateCardDisplay(turn);

            mapDisplayer.show_placement_buttons();
        }
}

function city_button(){
    let turn = game.currentTurn;
    if(turn==main_player && game.players[turn].resourceCards[1]>=3 && game.players[turn].resourceCards[2]>=2){
        game.players[turn].addResource([1,2], [-3,-2]);
        updateCardDisplay(turn);

        mapDisplayer.show_city_buttons();
    }
}

function road_button(){
    let turn = game.currentTurn;
    if(turn==main_player && game.players[turn].resourceCards[0] && game.players[turn].resourceCards[3]){
        game.players[turn].addResource([0,3], [-1,-1]);
        updateCardDisplay(turn);

        mapDisplayer.show_road_buttons();
    }
}

function dev_button(){
    let turn = game.currentTurn;
    if(turn==main_player && game.players[turn].resourceCards[1] && game.players[turn].resourceCards[2] && game.players[turn].resourceCards[4]){
            
        game.players[turn].addResource([1,2,4], [-1,-1,-1]);
        updateCardDisplay(turn);

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

        updateDevDisplay(turn);
    }
}