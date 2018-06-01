import * as baseService from './base';


function getAllPins() {
    return baseService.get('/api/pins/');
}

function setPins() {
    return baseService.post('/api/pins/', {Lat, Long, gameId, playerId})
}


export { getAllPins, setPins };