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

var houses = [];

//card variables
const hand_top = 700; //distance of hand from top
const hand_left = 750; //same with left
const card_width = 70;
const card_height = Math.ceil(card_width*2**0.5);
const row_cap = 20; //number of cards in a row
const card_textures = ['tree.png', 'stone.png', 'wheat.png', 'bricks.png', 'sheep.png', 'purple'];

//dice variables
var dice_on = true; //controls if the dice are clickable

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
        }
    }
    for(let i=4; i>2; i--){ //creating bottom half (minus middle row)
        for(let j=0; j<i; j++){
            hex_grid.push(Polygon.createHex(map_left-hex_width*3**0.5/4*i+j*hex_width*3**0.5/2, //same as before
                                        map_top+(7-i)*hex_width*3/4, hex_width));
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

//create and draw map
let map = map_generation();

for(let p of map){
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

        player_hand.push(new Card(4));

        dice_on = false;
        end_on = true;
        //draw_hand();
    }
}
