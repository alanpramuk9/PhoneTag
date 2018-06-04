import * as baseService from './base';


function getAllPins() {
    return baseService.get('/api/pins/');
}

function setPins(lat, long, gameId, playerId) {
    return baseService.post('/api/pins/', {lat, long, gameId, playerId})
}

function pickUpPin(playerId, lat, long) {
    return baseService.put('/api/pins/', {playerId, lat, long});
}

export { getAllPins, setPins, pickUpPin };