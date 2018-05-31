import * as baseService from './base';



function getMyPlayerId(id) {
    return baseService.get(`/api/playergame/${id}`);
}

function getMyAllTimeScore(id) {
    return baseService.get(`/api/playergame/totalscore/${id}`);

}

export { getMyPlayerId, getMyAllTimeScore };
