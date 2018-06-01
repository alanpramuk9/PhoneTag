import * as baseService from './base';


function getAllPins() {
    return baseService.get('/api/pins/');
}

function setPins(lat, long, gameId, playerId) {
    return baseService.post('/api/pins/', {lat, long, gameId, playerId})
}


export { getAllPins, setPins };