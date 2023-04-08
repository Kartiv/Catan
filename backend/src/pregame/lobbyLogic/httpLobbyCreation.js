import { Router } from "express"

export default function httpLobbyCreation(lobbyManager){
    const router = Router() 

    router.post('/createLobby',(req,res)=>{
        res.send(lobbyManager.createLobby())
    })

    router.get('/checkLobby',(req,res)=>{
        if(lobbyManager.getLobby(req.query.id))
            res.sendStatus(200)
        else
            res.sendStatus(404)
        
    })
    return router
}
