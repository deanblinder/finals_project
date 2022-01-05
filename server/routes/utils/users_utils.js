const DButils = require("./DButils");

async function markPlayerAsFavorite(user_id, player_id) {
    await DButils.execQuery(
        `INSERT INTO FavoritePlayers VALUES ('${user_id}',${player_id})`
    );
}

async function getFavoritePlayers(user_id) {
    return await DButils.execQuery(
        `select player_id from FavoritePlayers where user_id='${user_id}'`
    );
}