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
const dice_faces = ['Assets/DiceOne.png','Assets/DiceTwo.png','Assets/DiceThree.png','Assets/DiceFour.png','Assets/DiceFive.png','Assets/DiceSix.png'] //list of the photos for the dies

const house_size = 30;

//card variables
const hand_top = 700; //distance of hand from top
const hand_left = 750; //same with left
const card_width = 70;
const card_height = Math.ceil(card_width*2**0.5);
const row_cap = 16; //number of cards in a row
const cardTextures = ['Assets/tree.png', 'Assets/stone.png', 'Assets/wheat.png', 'Assets/bricks.png', 'Assets/sheep.png', 'Assets/point.png', 'Assets/knight.png', 'Assets/monopoly.png', 'Assets/resources.png', 'Assets/extra_roads.png'];

//dice variables
var dice_on = true; //controls if the dice are clickable
var roll_display = document.getElementById("rollresult");
var diceOne = document.getElementById("diceone"); //div of first dice for display
var diceTwo = document.getElementById("dicetwo"); //div of second dice for display

//player variables
var player_colors = ["red", "blue", "green", "grey", "purple"];
var main_player = 0;
var end_on = false; //controls if end turn button is clickable
var cardDisplay = [new Resource(0,0), new Resource(1,1),new Resource(2,2),new Resource(3,3), new Resource(4,4)];
var devDisplay = [new Devcard(5,5),new Devcard(6,6),new Devcard(7,7),new Devcard(8,8),new Devcard(9,9)];

const houseTextures = ['Assets/redhouse.png', 'Assets/bluehouse.png', 'Assets/greenhouse.png', 'Assets/greyhouse.png', 'Assets/purplehouse.png'];
const cityTextures = ['Assets/redcity.png', 'Assets/bluecity.png', 'Assets/greencity.png', 'Assets/greycity.png', 'Assets/purplecity.png'];

var game;
var map;
var mapDisplayer;

function main(){
    
    //start
    game = new Game([new Player("bob", "green")])
    map = new Map();
    mapDisplayer = new MapDisplayer(map);
    mapDisplayer.displayMap()
    mapDisplayer.show_placement_buttons();
}

main()