import * as baseService from './base';

function getAllPins() {
    return baseService.get('/api/pins/');
}

function getOnePin(id) {
    return baseService.get(`/api/pins/${id}`);
}

function setPins(lat, long, gameId, playerGameId) {
    return baseService.post('/api/pins/', {lat, long, gameId, playerGameId})
}

function pickUpPin(pinID, playerGameId) {
    return baseService.put(`/api/pins/${pinID}`, {playerGameId});
}

export { getAllPins, setPins, pickUpPin, getOnePin };