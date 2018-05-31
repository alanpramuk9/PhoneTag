import * as baseService from './base';


function findGames() {
    return baseService.get(`/api/game/`);

}


export { findGames };
