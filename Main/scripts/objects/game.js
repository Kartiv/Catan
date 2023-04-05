class Game{
    players;
    currentTurn = 0
    constructor(players){
        this.players = players
    }

    get currentPlayer(){
        return this.players[this.currentTurn]
    }

    nextTurn(){
        this.currentTurn = this.currentPlayer % this.players.length
    }
}