export class Lobby{
    players = []
    started = false
    addPlayer(player){
        this.players.push(player)
    }

    getPlayer(playerId){
        for(player of this.players)
            if (playerId == player.playerId)
                return playerId
    }

    removePlayer(playerId){
        for(player of this.players){
            if(player.playerId == playerId){
                this.players.splice(thils.players.findIndex(player),1)
                break;
            }
        }
    }
}