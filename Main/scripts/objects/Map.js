class Map{
    vertexList = []; //list of the vertices- each vertex knows its neighboring hexes and its relevant button
    edgeList = []; //list of the edges
    vertDict = {}; //dictionary of the vertices where the keys are their buttons' id's
    hexMap = []; //list of the hexagon elements

    constructor(){
        this.hexMap = this.mapGeneration()
    }

    compareID(id, hexGrid){
        for(let i=0; i<this.vertexList.length; i++){
            if(jsn.areEqual(this.vertexList[i].id,id)){
                this.vertexList[i].hexArr.push(hexGrid[hexGrid.length-1]); //if we already encountered this vertex then
                //we note that the current hex is adjacent to it
                return true;
            }
        }
        return false;
    }

    mapGeneration(){
    
        //create the hexagons
        let hexGrid = [];
        for(let i=3; i<6; i++){ //creating top half of hexagons
            for(let j=0; j<i; j++){
                hexGrid.push(Polygon.createHex(map_left-hex_width*3**0.5/4*i+j*hex_width*3**0.5/2, //every row gets shifted left
                                            map_top+(i-3)*hex_width*3/4, hex_width)); //every row gets shifted down
    
                for(let k=0; k<hexGrid[hexGrid.length-1].vertices.length; k++){ //add new vertices
                    let vert = hexGrid[hexGrid.length-1].vertices[k];
                    let id = [Math.round(vert.coords[0]), + Math.round(vert.coords[1])];
                    if(!(this.compareID(id, hexGrid))){
                        this.vertexList.push(new Vertex(id));
                        this.vertexList[this.vertexList.length-1].hexArr.push(hexGrid[hexGrid.length-1]);
                    }
                }
            }
        }
        for(let i=4; i>2; i--){ //creating bottom half (minus middle row)
            for(let j=0; j<i; j++){
                hexGrid.push(Polygon.createHex(map_left-hex_width*3**0.5/4*i+j*hex_width*3**0.5/2, //same as before
                                            map_top+(7-i)*hex_width*3/4, hex_width));
    
                for(let k=0; k<hexGrid[hexGrid.length-1].vertices.length; k++){
                    let vert = hexGrid[hexGrid.length-1].vertices[k];
                    let id = [Math.round(vert.coords[0]), + Math.round(vert.coords[1])];
                    if(!(this.compareID(id, hexGrid))){
                        this.vertexList.push(new Vertex(id));
                        this.vertexList[this.vertexList.length-1].hexArr.push(hexGrid[hexGrid.length-1]);
                    }
                }          
            }
        }
    
        //create vertDict
        for(let i=0; i<this.vertexList.length; i++){
            this.vertDict[this.vertexList[i].button_id] = this.vertexList[i];
        }
    
        //assign resources
    
        let map = [];
    
        let resources = [0,0,0,0,1,1,1,2,2,2,2,3,3,3,4,4,4,4] //wood-stone-wheat-clay-sheep-desert 0 through 5.
        let numbers = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12]; //desert to be added seperately
    
        //randomize the map
        resources = jsn.randomize(resources);
        numbers = jsn.randomize(numbers);
    
        //add desert in a random spot
        let s = jsn.randint(0, resources.length);
    
        resources.splice(s,0,5);
        numbers.splice(s,0,''); //doesn't have text, so technically the deserts number = '' (empty string)
    
        for(let i=0; i<hexGrid.length; i++){ //create map
            map.push(new Tile(hexGrid[i], numbers[i], resources[i]));
        }
    
        //creating edge list
        for(let i=0; i<map.length; i++){
            let verts = map[i].poly.vertices;
            for(let j=0; j<verts.length; j++){
                let mid = verts[j].add(verts[(j+1)%verts.length]).scale(1/2);
                let x = Math.round(mid.coords[0]);
                let y = Math.round(mid.coords[1]);
    
                let flag = true;
                for(let k=0; k<this.edgeList.length; k++){
                    if(this.edgeList[k].id == x.toString()+y.toString()){
                        flag = false;
                    }
                }
                if(flag){
                    this.edgeList.push(new Edge(x, y, verts[j], verts[(j+1)%verts.length]));
                }
            }
        }
    
        return map;
    }
}