function dice_click(){
    socket.emit('dice-roll')
}

function house_button(){
    socket.emit('buy-house')
}

function city_button(){
    socket.emit('buy-city')
}

function road_button(){
    socket.emit('buy-road')
}

function dev_button(){
    socket.emit('buy-dev')
}