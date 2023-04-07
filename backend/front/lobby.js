function readyUp(){
    console.log('ready')
}

function displayPlayers(players){

}

const socket = io()
socket.emit('join-lobby','bob')