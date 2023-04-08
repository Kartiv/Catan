export class Lobby{
    players = []
    started = false
    gameData;
    
    constructor(id){
        this.id = id
    }

    addPlayer(player){
        this.players.push(player)
    }

    getPlayer(playerId){
        for(let player of this.players)
            if (playerId == player.id)
                return player
    }

    removePlayer(playerId){
        for(let i in this.players){
            if(this.players[i].id == playerId){
                this.players.splice(i,1)
            }
        }
    }
}