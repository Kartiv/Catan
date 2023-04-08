class MapDisplayer{
    
    constructor(map){

        this.hexButtons = {};
        this.edgeButtons = {};
        this.houseButtons = {};

        this.map = map;

        this.createHouseButtons();
        this.createHexButtons();
        this.createEdgeButtons();
        this.createRobber();
    }

    createRobber(){

        let robberMain = document.createElement('div');
        document.body.appendChild(robberMain);

        let robberPic = document.createElement('img');
        robberMain.appendChild(robberPic);

        robberPic.src = 'Assets/robber.png';

        let x;
        let y;

        for(let i=0; i<this.map.hexMap.length; i++){
            if(this.map.hexMap[i].robber){
                x = this.map.hexMap[i].poly.center.coords[0];
                y = this.map.hexMap[i].poly.center.coords[1];
                break;
            }
        }

        robberMain.style = 'position:absolute; left:' + Math.round(x).toString() + 'px; top:' + Math.round(y).toString()+'px; width:30px; height:30px;';
        robberPic.style = 'position:absolute; width:30px; height:30px';

        this.robber = robberMain;
        
    }

    displayMap(){
        for(let p of this.map.hexMap){
            this.drawHex(p);
        }        
    }

    createEdgeButtons(){
        let keys = Object.keys(this.map.edgeDict);

        for(let i=0; i<keys.length; i++){

            let edge = this.map.edgeDict[keys[i]];
        
            let b = document.createElement("button");
            document.body.appendChild(b);
    
            b.style = "position: absolute; top:" + edge.y.toString() + "px; left:" +  edge.x.toString() + 
            "px; width:20px; height:20px;" + "border-radius:16px;";
            b.style.display = 'none';
    
            b.onclick = ()=>{this.edgeOnclick(edge)}    
            
            this.edgeButtons[keys[i]] = b;
        }

        this.hide_road_buttons();
    }

    createHouseButtons(){
        let keys = Object.keys(this.map.vertDict);

        for(let i=0; i<keys.length; i++){

            let b = document.createElement('button');
            document.body.appendChild(b);
            b.style = "position:absolute; left:" + this.map.vertDict[keys[i]].listID[0].toString() + "px; top:" +
            this.map.vertDict[keys[i]].listID[1].toString() + "px; width:20px; height:20px; border-radius:12px; z-index:1; display:none;";
            b.className = 'vertex';
            b.id = this.map.vertDict[keys[i]].id;
            b.onclick = ()=>this.houseOnclick(b.id);

            this.houseButtons[keys[i]] = b;
        }
    }

    createHexButtons(){
        for(let i=0; i<this.map.hexMap.length; i++){

            let b = document.createElement('button');
            document.body.appendChild(b);
            b.style = 'position:absolute; top:' + Math.round(this.map.hexMap[i].poly.center.coords[1]) + 
            'px; left:' + Math.round(this.map.hexMap[i].poly.center.coords[0]) + 'px; width:20px; height:20px; border-radius:4px';
            b.onclick = ()=>{this.hexOnclick(this.map.hexMap[i])};

            this.hexButtons[this.map.hexMap[i].id] = b;
        }

        this.hide_hex_buttons();
    }

    houseOnclick(id){
        let turn = game.currentTurn;
        let vert = this.map.vertDict[id];

        if(vert.house == null){ //meaning a house is trying to be placed here

            let flag = true; //this is a flag to know if placing the house is a legal move
            for(let hex of vert.hexArr){ //checks if the move is legal by going through all neighbors
                for(let i=0; i<hex.vertices.length; i++){
                    let id = Math.round(hex.vertices[i].coords[0]).toString() + //looking for the pressed button in the
                            Math.round(hex.vertices[i].coords[1]).toString(); //polygons vertex list
                    if(id==vert.id){
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
                game.players[turn].houses.push(vert.id);
                game.currentPlayer.addPoint(); //add victory point to current player
                game.inAction = false;
                
                var img = document.createElement("img");
                img.src=houseTextures[turn];
                img.style = "width: " + (house_size).toString()+"px; height: "+ 
                (house_size).toString()+"px; position:absolute; top:" + (vert.listID[1]-5).toString() + "px;" + 
                "left:" + (vert.listID[0]-5).toString() + "px;";
                vert.image = img;
                document.body.appendChild(img);
                
                this.hide_placement_buttons();

                if(game.startingTurns){
                    this.show_road_buttons();
                    game.inAction = true;
                }
            }

        }

        else{
            if(vert.house == turn){
                vert.house+=10;
                game.players[turn].addPoint();
                game.inAction = false;

                vert.image.src = cityTextures[turn];
                this.hide_placement_buttons();
            }
        }
        
    }

    hexOnclick(hex){
        //scanning for current 7 block cuz fuck it im too tired to create a variable holding that information
        for(let h of this.map.hexMap){
            h.robber = false;
        }
        hex.robber = true;
        game.inAction = false;

        this.hide_hex_buttons();
        this.updateRobber();
    }

    edgeOnclick(edge){
        let turn = game.currentTurn;
        if(turn == main_player){
            ctx.strokeStyle = player_colors[turn];
            ctx.lineWidth = 7;
            ctx.beginPath();
            ctx.moveTo(edge.vert1.coords[0], edge.vert1.coords[1]);
            ctx.lineTo(edge.vert2.coords[0], edge.vert2.coords[1]);
            ctx.stroke();
            ctx.closePath();
            
            game.players[turn].roads.push(edge);
            edge.road = turn;
            check_longest_road(turn);
            game.inAction = false;

            mapDisplayer.hide_road_buttons();
        }
    }

    show_hex_buttons(){
        for(let hex of this.map.hexMap){
            if(!hex.robber){
                this.hexButtons[hex.id].style.display = 'block';
            }
        }
        game.inAction = true;
    }

    hide_hex_buttons(){
        for(let hex of this.map.hexMap){
            this.hexButtons[hex.id].style.display = 'none';
        }
    }
    
    show_placement_buttons(){
        if(game.startingTurns){
            for(let key of Object.keys(this.map.vertDict)){
                if(this.map.vertDict[key].house == null){
                    this.houseButtons[key].style.display = "block";
                }
            }
        }
        else{
            let legalHouses = create_dictionary_map_list_thing(game.currentTurn);
            for(let i of legalHouses){
                if(i.house == null){
                    this.houseButtons[i.id].style.display = "block";
                }
            }
        }
    }

    show_city_buttons(){
        for(let key of Object.keys(this.map.vertDict)){
            if(this.map.vertDict[key].house==game.currentTurn){
                this.houseButtons[key].style.display = "block";
            }
        }
    }

    hide_placement_buttons(){

        for(let key of Object.keys(this.map.vertDict)){
            this.houseButtons[key].style.display = "none";
        }
    }

    show_road_buttons(){

        //pverts is all of the vertices that the player has road access to
        let pverts = {};
        if(game.startingTurns){
            if(game.players[game.currentTurn].houses.length==1){
                let id = game.players[game.currentTurn].houses[0];
                pverts[id] = this.map.vertDict[id];
            }

            else{
                let id = game.players[game.currentTurn].houses[1];
                pverts[id] = this.map.vertDict[id]
            };
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
                        this.edgeButtons[edge].style.display = 'block';
                    }
                }
            }

        }
    }

    hide_road_buttons(){
        for(let id of Object.keys(this.map.edgeDict)){
            this.edgeButtons[id].style.display = "none";
        }
    }

    drawHex(hex){
        ctx.fillStyle = tile_textures[hex.resource];
        hex.poly.fill(ctx);
        ctx.fillStyle = 'black';
        hex.poly.draw(ctx);
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.font = map_font_size.toString() + 'px Cursive';
        ctx.strokeText(hex.number.toString(), hex.poly.center.coords[0]-map_font_size/3, 
                     hex.poly.center.coords[1]+map_font_size/3, map_font_size/1.5);
        ctx.closePath();
        ctx.strokeStyle = "black";
    }

    updateRobber(){
        for(let i=0; i<this.map.hexMap.length; i++){
            if(this.map.hexMap[i].robber){
                this.robber.style.left = Math.round(this.map.hexMap[i].poly.center.coords[0]).toString() + 'px';
                this.robber.style.top = Math.round(this.map.hexMap[i].poly.center.coords[1]).toString() + 'px';
                break;
            }
        }
    }
}