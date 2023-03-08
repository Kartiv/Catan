const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1200;
canvas.height = 700;

const hex_width = 150;
const right_edge = 500;
const top_edge = 100;

const font_Size = Math.floor(hex_width/2);

const textures = ['green', 'gray', 'gold', 'brown', 'beige', 'black'];

function map_generation(){

    //create the hexagons
    let hex_grid = [];
    for(let i=3; i<6; i++){ //creating top half of hexagon
        for(let j=0; j<i; j++){
            hex_grid.push(Polygon.createHex(right_edge-hex_width*3**0.5/4*i+j*hex_width*3**0.5/2, //every row gets shifted left
                                        top_edge+(i-3)*hex_width*3/4, hex_width)); //every row gets shifted down
        }
    }
    for(let i=4; i>2; i--){ //creating bottom half (minus middle row)
        for(let j=0; j<i; j++){
            hex_grid.push(Polygon.createHex(right_edge-hex_width*3**0.5/4*i+j*hex_width*3**0.5/2, //same as before
                                        top_edge+(7-i)*hex_width*3/4, hex_width));
        }
    }

    //assign resources

    let map = [];

    let resources = [0,0,0,0,1,1,1,2,2,2,2,3,3,3,4,4,4,4] //wood-stone-wheat-clay-sheep-desert 0 through 5.
    let numbers = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12]; //desert to be added seperately

    resources = jsn.randomize(resources);
    numbers = jsn.randomize(numbers);

    let s = jsn.randint(0, resources.length);

    //add in the desert
    resources.splice(s,0,5);
    numbers.splice(s,0,7);

    for(let i=0; i<hex_grid.length; i++){
        map.push(new Tile(hex_grid[i], numbers[i], resources[i]));
    }

    return map;
}

let map = map_generation();

for(let p of map){
    p.draw(ctx);
}