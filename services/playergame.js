import * as baseService from './base';



function getMyPlayergame(id) {
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

function getAllTimeRankings() {
    return baseService.get(`/api/playergame/alltimerank/all`);

}

function profileRankings(id) {
    return baseService.get(`/api/playergame/profilerank/${id}`);

}

export { getMyPlayergame, getMyAllTimeScore, getAllScores, getAllTimeScores, profileRankings, getAllTimeRankings };
