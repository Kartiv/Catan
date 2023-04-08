import { Server as SocketServer } from 'socket.io'
import express from 'express'
import { Server } from 'http'

import {LobbyManager} from './pregame/lobbyClasses/lobbyManager.js'
import socketPreGameHandler from './pregame/lobbyLogic/socketPreGameHandler.js'
import httpLobbyCreation from './pregame/lobbyLogic/httpLobbyCreation.js'

const app = express()
const http = new Server(app)
const io = new SocketServer(http)

const port = 3000;
const root = process.cwd()

const lobbyManager = new LobbyManager()

io.on('connection',socket=>{
    socketPreGameHandler(io,socket,lobbyManager)
})

app.use('/',httpLobbyCreation(lobbyManager))

app.get('/',(req,res)=>{
    res.sendFile(root+'/front/main/index.html')
})

app.get(/^\/lobby\/[A-Z\d]+$/,(req,res)=>{
    res.sendFile(root+'/front/lobby/lobby.html')
})

app.use(express.static('front'))

http.listen(port,()=>{
    console.log(`listening on port ${port}`)
})