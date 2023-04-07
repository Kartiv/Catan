import { Lobby } from "./lobby.js"

const LOBBY_ID_LENGTH = 5

export class LobbyManager{
    _lobbys = {}
    _players = {}

    createLobby(){
        const lobbyId = this._generateCode(LOBBY_ID_LENGTH)
        this._lobbys[lobbyId] = new Lobby()
        return lobbyId
    }

    getLobby(lobbyId){
        return this._lobbys[lobbyId]
    }

    addPlayerToLobby(player, lobbyId){
        this._lobbys[lobbyId].addPlayer(player) 
        this._players[player.playerId] = lobbyId
    }

    removePlayerFromLobby(playerId){
        this._lobbys[this.getPlayersLobby(playerId)].removePlayer(playerId)
    }

    getPlayersLobby(playerId){
        return this._players[playerId]
    }

    _generateCode(length) {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let result = '';
        for ( let i = 0; i < length; i++ ) 
            result += characters.charAt(Math.floor(Math.random() * characters.length));
    
        return result;
    }
}