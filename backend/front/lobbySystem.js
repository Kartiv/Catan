async function createLobby(){
    var res = await fetch('/createLobby',{
        method:"POST"
    })

    var lobbyId = await res.text()
    location.href = `/lobby/${lobbyId}`
}

async function joinLobby(){
    const lobbyId = document.getElementById('id-input').value
    var res = await fetch(`/checkLobby?id=${lobbyId}`)
    if(res.ok)
        location.href = `/lobby/${lobbyId}`
    
    else
        alert('invalid id')

}