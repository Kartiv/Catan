class Game{
    players;
    currentTurn = 0;
    startingTurns = true;

    constructor(players){
        this.players = players
        this.bank = new Bank();
    }

    get currentPlayer(){
        return this.players[this.currentTurn]
    }

    nextTurn(){
        this.currentTurn = this.currentPlayer % this.players.length
    }
}