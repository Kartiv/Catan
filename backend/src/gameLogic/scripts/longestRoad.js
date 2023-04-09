import { jsn } from "./imports.js";
//longest road stuff. WARNING - THIS SHIT INEFFICIENT AS SHIT. AVERT YOUR EYES AND KEEP AWAY FROM CHILDREN

function longest_road_from_starting_point_a(map, a, path=[]){

    if(!path.length){
        path = [a];
    }

    let max = path.length-1;

    for(let i of map[a]){
        if(i==path[0]){
            let k = path.length;
            if(k!=2 && k>max){
                max = k;
            }
        }
        else if(!jsn.inArr(path, i)){
            let k = longest_road_from_starting_point_a(map, i, path.concat(i))
            if(k>max){
                max = k;
            }
        }
        else{
            let k = path.length-1;
            if(k>max){
                max = k;
            }
        }
    }

    return max;

}

function create_dictionary_map_list_thing(player){
    let edges = game.players[player].roads;
    
    let map_thing = {};
    for(let i=0; i<game.players[player].houses.length; i++){
        map_thing[game.players[player].houses[i]] = [];
    }
    
    for(let edge of edges){

        let id1 = Math.round(edge.vert1.coords[0]).toString() + Math.round(edge.vert1.coords[1]).toString();
        let id2 = Math.round(edge.vert2.coords[0]).toString() + Math.round(edge.vert2.coords[1]).toString();

        if(map_thing[id1]){
            map_thing[id1].push(id2);
        }
        else{
            map_thing[id1] = [id2];
        }

        if(map_thing[id2]){
            map_thing[id2].push(id1);
        }
        else{
            map_thing[id2] = [id1];
        }
    }

    return map_thing;
}

export function check_longest_road(player){
    let dict = create_dictionary_map_list_thing(player);
    let max = -1;
    let keys = Object.keys(dict);
    for(let i=0; i<keys.length; i++){
        let k = longest_road_from_starting_point_a(dict, keys[i]);
        if(k>max){
            max = k;
        }
    }
    if(max>game.players[player].longestRoad){
        game.players[player].longestRoad = max;
        }
}