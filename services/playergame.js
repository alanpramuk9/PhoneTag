import * as baseService from './base';



function getMyPlayerId(id) {
    return baseService.get(`/api/playergame/${id}`);
}

function getMyAllTimeScore(id) {
    return baseService.get(`/api/playergame/totalscore/${id}`);

}

function getAllScores(id) {
    return baseService.get(`/api/playergame/leaderboard/${id}`);

}

function getAllTimeScores() {
    return baseService.get(`/api/playergame/everyleader/all`);

}

export { getMyPlayerId, getMyAllTimeScore, getAllScores, getAllTimeScores };
