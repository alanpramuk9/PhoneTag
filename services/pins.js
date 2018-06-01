import * as baseService from './base';


function getAllPins() {
    return baseService.get('/api/pins/');
}


export { getAllPins };