import * as baseService from './base';


function getAllPins() {
    return baseService.get('/api/pins/');
}

function getOnePin(id) {
    console.log(id);
    return baseService.get(`/api/pins/${id}`);
}

function setPins(lat, long, gameId, playerGameId) {
    return baseService.post('/api/pins/', {lat, long, gameId, playerGameId})
}

function pickUpPin(playerId, lat, long) {
    return baseService.put('/api/pins/', {playerId, lat, long});
}

export { getAllPins, setPins, pickUpPin, getOnePin };