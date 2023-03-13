const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

//map variables
const hex_width = 100; //longest diagonal of the hexagon
const map_left = 500; //not really the distance from the left but imagine that it is
const map_top = 100; //same
const map_font_size = Math.floor(hex_width/2); //fontsize of numbers
const tile_textures = ['green', 'gray', 'gold', 'brown', 'beige', 'black']; //the indices are associated with resources
const dice_faces = ['DiceOne.png','DiceTwo.png','DiceThree.png','DiceFour.png','DiceFive.png','DiceSix.png'] //list of the photos for the dies
var vertex_list = []; //list of the vertices- each vertex knows its neighboring hexes and its relevant button
var vert_dict = {}; //dictionary of the vertices where the keys are their buttons' id's
var hex_map = []; //list of the hexagon elements

//card variables
const hand_top = 700; //distance of hand from top
const hand_left = 750; //same with left
const card_width = 70;
const card_height = Math.ceil(card_width*2**0.5);
const row_cap = 16; //number of cards in a row
const card_textures = ['tree.png', 'stone.png', 'wheat.png', 'bricks.png', 'sheep.png', 'purple'];

//dice variables
var dice_on = true; //controls if the dice are clickable
var roll_display = document.getElementById("rollresult");
var diceOne = document.getElementById("diceone"); //div of first dice for display
var diceTwo = document.getElementById("dicetwo"); //div of second dice for display
//player variables
var turn = 1; //1 if its the players turn and 0 else
var end_on = false; //controls if end turn button is clickable
var player_hand = [];

//map generation

function map_generation(){

    function compare_id(id, hex_grid){
        for(let i=0; i<vertex_list.length; i++){
            if(jsn.areEqual(vertex_list[i].id,id)){
                vertex_list[i].hex_arr.push(hex_grid[hex_grid.length-1]); //if we already encountered this vertex then
                //we note that the current hex is adjacent to it
                return true;
            }
        }
        return false;
    }

    //create the hexagons
    let hex_grid = [];
    for(let i=3; i<6; i++){ //creating top half of hexagon
        for(let j=0; j<i; j++){
            hex_grid.push(Polygon.createHex(map_left-hex_width*3**0.5/4*i+j*hex_width*3**0.5/2, //every row gets shifted left
                                        map_top+(i-3)*hex_width*3/4, hex_width)); //every row gets shifted down

            for(let k=0; k<hex_grid[hex_grid.length-1].vertices.length; k++){ //add new vertices
                let vert = hex_grid[hex_grid.length-1].vertices[k];
                let id = [Math.round(vert.coords[0]), + Math.round(vert.coords[1])];
                if(!(compare_id(id, hex_grid))){
                    vertex_list.push(new Vertex(id));
                    vertex_list[vertex_list.length-1].hex_arr.push(hex_grid[hex_grid.length-1]);
                }
            }
        }
    }
    for(let i=4; i>2; i--){ //creating bottom half (minus middle row)
        for(let j=0; j<i; j++){
            hex_grid.push(Polygon.createHex(map_left-hex_width*3**0.5/4*i+j*hex_width*3**0.5/2, //same as before
                                        map_top+(7-i)*hex_width*3/4, hex_width));

            for(let k=0; k<hex_grid[hex_grid.length-1].vertices.length; k++){
                let vert = hex_grid[hex_grid.length-1].vertices[k];
                let id = [Math.round(vert.coords[0]), + Math.round(vert.coords[1])];
                if(!(compare_id(id, hex_grid))){
                    vertex_list.push(new Vertex(id));
                    vertex_list[vertex_list.length-1].hex_arr.push(hex_grid[hex_grid.length-1]);
                }
            }          
        }
    }

    //create vert_dict
    for(let i=0; i<vertex_list.length; i++){
        vert_dict[vertex_list[i].button_id] = vertex_list[i];
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

    for(let i=0; i<hex_grid.length; i++){ //create map
        map.push(new Tile(hex_grid[i], numbers[i], resources[i]));
    }

    return map;
}

function create_house_buttons(){
    for(let i=0; i<vertex_list.length; i++){
        let b = document.createElement('button');
        b.style = "position:absolute; left:" + vertex_list[i].id[0].toString() + "px; top:" +
        vertex_list[i].id[1].toString() + "px; width:20px; height:20px; border-radius:12px; z-index:1; display:none;";
        b.className = 'vertex';
        b.id = vertex_list[i].id[0].toString() + vertex_list[i].id[1].toString();
        b.onclick = function(e){
            let flag = true; //this is a flag to know if placing the house is a legal move
            let vert = vert_dict[this.id];
            for(let hex of vert.hex_arr){ //checks if the move is legal by going through all neighbors
                for(let i=0; i<hex.vertices.length; i++){
                    let id = Math.round(hex.vertices[i].coords[0]).toString() + //looking for the pressed button in the
                            Math.round(hex.vertices[i].coords[1]).toString(); //polygons vertex list
                    if(id==vert.button_id){
                        let id1 = Math.round(hex.vertices[(i-1+6)%6].coords[0]).toString() +
                        Math.round(hex.vertices[(i-1+6)%6].coords[1]).toString(); //the vertices of a polygon are ordered
                        let id2 = Math.round(hex.vertices[(i+1+6)%6].coords[0]).toString() + //so this does work
                        Math.round(hex.vertices[(i+1+6)%6].coords[1]).toString();
                        if(vert_dict[id1].house || vert_dict[id2].house){
                            flag = false;
                        }
                    }
                }
            }

            if(flag){ //make house or something brr
                vert.house = turn;
                ctx.fillStyle = "red";
                ctx.fillRect(vert.id[0]-20, vert.id[1]-20, 40, 40);
                ctx.fill();
                this.style.display = 'none';
            }
        };
        document.body.appendChild(b);
        vertex_list[i].button = b;
    }
}

//create and draw map
hex_map = map_generation();
create_house_buttons();

for(let p of hex_map){
    p.draw(ctx);
}


//Gameloop

function start_turn(){
    turn = 1;
    dice_on = true;
    end_on = false;
}

function dice_click(){
    if(turn){
        let s1 = jsn.randint(1,7);
        let s2 = jsn.randint(1,7);

        let value = s1+s2;
        roll_display.innerHTML = "Roll:" + (s1+s2).toString();
        diceOne.innerHTML = "<img src='" + dice_faces[s1-1] + "'>"
        diceTwo.innerHTML = "<img src='" + dice_faces[s2-1] + "'>"
        for(let i=0; i<hex_map.length; i++){
            if(hex_map[i].number == value){
                player_hand.push(new Resource(hex_map[i].resource));
            }
        }
        

        dice_on = false;
        end_on = true;
    }
}
