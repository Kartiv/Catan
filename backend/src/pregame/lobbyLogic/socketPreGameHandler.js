import { Player } from '../lobbyClasses/player.js'

const DEFAULT_NAME = 'the great bob'

export default function socketPreGameHandler(io,socket,lobbyManager){
    socket.on('join-lobby',name=>{
        const urlParts = socket.handshake.headers.referer.split('/')
        const lobbyId = urlParts[urlParts.length-1]
        if(!lobbyManager.getLobby(lobbyId))
            return

        lobbyManager.addPlayerToLobby(new Player(name||DEFAULT_NAME,socket.id),lobbyId)
        socket.join(lobbyId)
        io.to(lobbyId).emit('lobby-update',lobbyManager.getLobby(lobbyId))
    })

    socket.on('ready-state', readyState=>{
        const lobby = lobbyManager.getPlayersLobby(socket.id)
        if(!lobby)
            return

        lobby.getPlayer(socket.id).ready = readyState
        io.to(lobby.id).emit('lobby-update',lobby)
    })
    
    socket.on('start',()=>{
        const lobby = lobbyManager.getPlayersLobby(socket.id)
        if(!lobby)
            return 
        
        for(let player of lobby.players){
            if(!player.ready)
                return
        }

        lobby.started = true
        io.to(lobby.id).emit('start',lobby)
    })

    socket.on('disconnect',()=>{
        const lobby = lobbyManager.getPlayersLobby(socket.id)
        if(!lobby)
            return 
        
        lobby.removePlayer(socket.id)
        io.to(lobby.id).emit('lobby-update',lobby)
    })
}