class MapDisplayer{
    constructor(map){
        this.map = map;
        this.create_house_buttons();
    }

    display_map(){
        for(let p of this.map.hexMap){
            p.draw(ctx);
        }        
    }

    create_house_buttons(){
        for(let i=0; i<this.map.vertexList.length; i++){
            let b = document.createElement('button');
            b.style = "position:absolute; left:" + this.map.vertexList[i].id[0].toString() + "px; top:" +
            this.map.vertexList[i].id[1].toString() + "px; width:20px; height:20px; border-radius:12px; z-index:1; display:none;";
            b.className = 'vertex';
            b.id = this.map.vertexList[i].id[0].toString() + this.map.vertexList[i].id[1].toString();
            b.onclick = ()=>this.onclick(b.id);
            document.body.appendChild(b);
            this.map.vertexList[i].button = b;
        }
    }

    onclick(id){
        let turn = game.currentTurn;
        let vert = this.map.vertDict[id];

        if(vert.house == null){ //meaning a house is trying to be placed here

            let flag = true; //this is a flag to know if placing the house is a legal move
            for(let hex of vert.hexArr){ //checks if the move is legal by going through all neighbors
                for(let i=0; i<hex.vertices.length; i++){
                    let id = Math.round(hex.vertices[i].coords[0]).toString() + //looking for the pressed button in the
                            Math.round(hex.vertices[i].coords[1]).toString(); //polygons vertex list
                    if(id==vert.button_id){
                        let id1 = Math.round(hex.vertices[(i-1+6)%6].coords[0]).toString() +
                        Math.round(hex.vertices[(i-1+6)%6].coords[1]).toString(); //the vertices of a polygon are ordered
                        let id2 = Math.round(hex.vertices[(i+1+6)%6].coords[0]).toString() + //so this does work
                        Math.round(hex.vertices[(i+1+6)%6].coords[1]).toString();
                        if(this.map.vertDict[id1].house!=null || this.map.vertDict[id2].house!=null){
                            flag = false;
                        }
                    }
                }
            }

            if(flag){ //make house or something brr
                vert.house = turn;
                game.players[turn].houses.push(vert.button_id);
                game.currentPlayer.addPoint(); //add victory point to current player
                
                var img = document.createElement("img");
                img.src=houseTextures[turn];
                img.style = "width: " + (house_size).toString()+"px; height: "+ 
                (house_size).toString()+"px; position:absolute; top:" + (vert.id[1]-5).toString() + "px;" + 
                "left:" + (vert.id[0]-5).toString() + "px;";
                vert.image = img;
                document.body.appendChild(img);
                
                this.hide_placement_buttons();

                if(game.startingTurns){
                    this.show_road_buttons();
                }
            }

        }

        else{
            if(vert.house == turn){
                vert.house+=10;
                game.players[turn].addPoint();
                vert.image.src = cityTextures[turn];
                this.hide_placement_buttons();
            }
        }
        
    }
    
    show_placement_buttons(){
        if(game.startingTurns){
            for(let i of this.map.vertexList){
                if(i.house == null){
                    i.button.style.display = "block";
                }
            }
        }
        else{
            let legalHouses = create_dictionary_map_list_thing(game.currentTurn);
            for(let i of legalHouses){
                if(i.house == null){
                    i.button.style.display = "block";
                }
            }
        }
    }

    show_city_buttons(){
        for(let i of this.map.vertexList){
            if(i.house==game.currentTurn){
                i.button.style.display = "block";
            }
        }
    }

    hide_placement_buttons(){
        for(let i of this.map.vertexList){
            i.button.style.display = "none";
        }
    }

    show_road_buttons(){

        //pverts is all of the vertices that the player has road access to
        let pverts;
        if(game.startingTurns){
            if(game.players[game.currentTurn].houses.length==1){
                pverts = this.map.vertDict[game.players[game.currentTurn].houses[0]];
            }
            else{
                pverts = this.map.vertDict[game.players[game.currentTurn].houses[1]];
            }
            pverts = create_dictionary_map_list_thing(game.currentTurn);
        }
        else{
            pverts = create_dictionary_map_list_thing(game.currentTurn);
        }
        for(let key of Object.keys(pverts)){

            //calculating EXACT location (for id) of each adjacent edge, and there are two cases each with 3 edges (\|/ or /|\)
            let x = hex_width/4 * Math.cos(Math.PI/6);
            let y = hex_width/4 * Math.sin(Math.PI/6);

            let possibleEdges = [calculateID(this.map.vertDict[key].x+x, this.map.vertDict[key].y-y), 
            calculateID(this.map.vertDict[key].x-x, this.map.vertDict[key].y-y), calculateID(this.map.vertDict[key].x, this.map.vertDict[key].y+hex_width/4),
            calculateID(this.map.vertDict[key].x, this.map.vertDict[key].y-hex_width/4), calculateID(this.map.vertDict[key].x+x, this.map.vertDict[key].y+y),
            calculateID(this.map.vertDict[key].x-x, this.map.vertDict[key].y+y)];  

            for(let edge of possibleEdges){
                if(this.map.edgeDict[edge]){ //if its even on the map
                    if(this.map.edgeDict[edge].road==null){ // if vertex doesnt have a road
                        this.map.edgeDict[edge].button.style.display = 'block';
                    }
                }
            }

        }
    }

    hide_road_buttons(){
        for(let id of Object.keys(this.map.edgeDict)){
            this.map.edgeDict[id].button.style.display = "none";
        }
    }
}