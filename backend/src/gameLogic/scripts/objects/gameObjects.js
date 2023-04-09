import { calculateID } from "../util.js";

export class Tile{
    poly;
    resource;
    number;
    robber;
    id;

    constructor(polygon, number, resource){
        this.poly = polygon;
        this.resource = resource;
        this.number = number;
        this.robber = false;
        if(this.number == ''){
            this.robber = true;
        }

        this.id = calculateID(this.poly.center.coords[0], this.poly.center.coords[1]);
    }
}

export class Vertex{
    listID;
    id;
    hexArr;
    button;
    house; //if its a normal house it equals the player turn and otherwise it equals it +10
    image;
    x;
    y;


    constructor(id, x, y){
        this.listID = id;
        this.id = calculateID(id[0],id[1]);
        this.hexArr = [];
        this.x = x;
        this.y = y;
    }
}

export class Edge{
    x;
    y;
    vert1;
    vert2;
    id;
    road;

    constructor(x, y, vert1, vert2){
        this.x = x;
        this.y = y;
        this.vert1 = vert1;
        this.vert2 = vert2;
        this.id = this.x.toString() + this.y.toString();
        this.road;
    }
}

export class Bank{
    devCards = [5, 14, 2, 2, 2] //indices are associated point-knight-monopoly-resource-road
    constructor(){
    }
}