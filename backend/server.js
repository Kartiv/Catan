import { Server as SocketServer } from 'socket.io'
import express from 'express'
import { Server } from 'http'
import * as path from 'path'

import {LobbyManager} from './lobbys/lobbyManager.js'
import { Player } from './lobbys/player.js'

const app = express()
const http = new Server(app)
const io = new SocketServer(http)

const port = 3000;
const root = process.cwd()

const lobbyManager = new LobbyManager()

io.on('connection',socket=>{
    console.log(socket.id + " connected")
    socket.on('join-lobby',name=>{
        console.log(JSON.stringify(socket,null,2))
        lobbyId = socket.request.url.split('/')[1]
        console.log(lobbyId)
        if(!lobbyManager.getLobby(lobbyId))
            return

        console.log(`${name} joined ${lobbyId}`)
        lobbyManager.addPlayerToLobby(new Player(name,socket.id),lobbyId)
        socket.join(lobbyId)
        io.to(lobbyId).emit('lobby-update',lobbyManager.getLobby(lobbyId))
    })

    socket.on('ready-state', ({playerId,readyState})=>{
        lobbyManager.getPlayersLobby(playerId).getPlayer(playerId).ready = readyState
    })
    
    socket.on('disconnect',()=>{
        lobby = lobbyManager.getPlayersLobby(socket.id)
        lobbyManager.removePlayerFromLobby(socket.id)
        io.to(lobby.lobbyId).emit(lobbyManager.getLobby(lobby.lobbyId))
        console.log(socket.id + " disconnected")
    })
})

app.post('/createLobby',(req,res)=>{
    res.send(lobbyManager.createLobby())
})

app.get('/checkLobby',(req,res)=>{
    if(lobbyManager.getLobby(req.query.id))
        res.sendStatus(200)
    else
        res.sendStatus(404)
        
})

app.get('/',(req,res)=>{
    res.sendFile(root+'/front/index.html')
})

app.get(/^\/lobby\/[A-Z\d]+$/,(req,res)=>{
    res.sendFile(root+'/front/lobby.html')
})

app.use(express.static('front'))

// app.get('*',(req,res)=>{
//     res.send('invalid page')
// })

http.listen(port,()=>{
    console.log(`listening on port ${port}`)
})