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
const dice_faces = ['DiceOne.png','DiceTwo.png','DiceThree.png','DiceFour.png','DiceFive.png','DiceSix.png']
var vertex_list = []; //list of the vertices of the hexagons WITHOUT REPETITION
var hex_map = []; //list of the hexagon elements
var house_buttons = []; //list of the buttons on the vertices that place houses
var houses = [];

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
var diceOne = document.getElementById("diceone");
var diceTwo = document.getElementById("dicetwo");
//player variables
var turn = 1; //1 if its the players turn and 0 else
var end_on = false; //controls if end turn button is clickable
var player_houses = [];
var player_hand = [];

//map generation

function map_generation(){

    //create the hexagons
    let hex_grid = [];
    for(let i=3; i<6; i++){ //creating top half of hexagon
        for(let j=0; j<i; j++){
            hex_grid.push(Polygon.createHex(map_left-hex_width*3**0.5/4*i+j*hex_width*3**0.5/2, //every row gets shifted left
                                        map_top+(i-3)*hex_width*3/4, hex_width)); //every row gets shifted down

            for(let k=0; k<hex_grid[hex_grid.length-1].vertices.length; k++){
                let vert = hex_grid[hex_grid.length-1].vertices[k];
                let id = [Math.round(vert.coords[0]), + Math.round(vert.coords[1])];
                if(!(jsn.arrInArr(vertex_list, id))){
                    vertex_list.push(id);
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
                if(!(jsn.arrInArr(vertex_list, id))){
                    vertex_list.push(id);
                }
            }          
        }
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
        b.style = "position:absolute; left:" + vertex_list[i][0].toString() + "px; top:" + vertex_list[i][1].toString() +
        "px; width:20px; height:20px; border-radius:12px; z-index:1; display:none;";
        b.className = 'vertex';
        b.onclick = house_click;
        document.body.appendChild(b);
        house_buttons.push(b);
    }
}

//create and draw map
hex_map = map_generation();
create_house_buttons();

for(let p of hex_map){
    p.draw(ctx);
}

//Houses and shit
function house_click(){
    console.log("oongaboonga");
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
