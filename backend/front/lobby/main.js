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
const dice_faces = ['/lobby/Assets/DiceOne.png','/lobby/Assets/DiceTwo.png','/lobby/Assets/DiceThree.png','/lobby/Assets/DiceFour.png','/lobby/Assets/DiceFive.png','/lobby/Assets/DiceSix.png'] //list of the photos for the dies

const house_size = 30;

//card variables
const hand_top = 700; //distance of hand from top
const hand_left = 750; //same with left
const card_width = 70;
const card_height = Math.ceil(card_width*2**0.5);
const row_cap = 16; //number of cards in a row
const cardTextures = ['/lobby/Assets/tree.png', '/lobby/Assets/stone.png', '/lobby/Assets/wheat.png', '/lobby/Assets/bricks.png', '/lobby/Assets/sheep.png', '/lobby/Assets/point.png', '/lobby/Assets/knight.png', '/lobby/Assets/monopoly.png', '/lobby/Assets/resources.png', '/lobby/Assets/extra_roads.png'];

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

const houseTextures = ['/lobby/Assets/redhouse.png', '/lobby/Assets/bluehouse.png', '/lobby/Assets/greenhouse.png', '/lobby/Assets/greyhouse.png', '/lobby/Assets/purplehouse.png'];
const cityTextures = ['/lobby/Assets/redcity.png', '/lobby/Assets/bluecity.png', '/lobby/Assets/greencity.png', '/lobby/Assets/greycity.png', '/lobby/Assets/purplecity.png'];

var game;

socket.on('board-update',displayBoard)

function displayBoard(updatedBoard){
    console.log('hi')
    console.log(updatedBoard)
    game = updatedBoard
    var mapDisplayer = new MapDisplayer(updatedBoard.map)
    mapDisplayer.displayMap()
}