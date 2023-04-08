const socket = io()
socket.emit('join-lobby')

socket.on('lobby-update',displayLobby)
socket.on('start',startGame)

var isReady = false

function readyUp(){
    isReady = !isReady
    socket.emit('ready-state',isReady)
}

function startGame(){
    document.getElementById('game').hidden = false
    document.getElementById('pregame').hidden = true
}

function displayLobby(lobby){
    let s = ""
    for(let player of lobby.players){
        s+= `<div class="player ${player.ready?'ready':''}">${player.name}</div>`
    }
    document.getElementById('player-list').innerHTML = s;
    document.getElementById('lobby-id').innerText = `id: ${lobby.id}`

    let allReady = true
    for(let player of lobby.players){
        if(!player.ready){
            allReady = false
            break
        }
    }

    document.getElementById('start-button').disabled = !allReady || lobby.players.length < 2
}