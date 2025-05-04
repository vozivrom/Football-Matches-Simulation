import connection from './db.js';

// Insert a new team
export async function insertTeam(name, country, city) {
    const [result] = await connection.execute(
        'INSERT INTO teams (name, country, city) VALUES (?, ?, ?)',
        [name, country, city]
    );
    return result.insertId;
}

// Insert a new player
export async function insertPlayer(name, surname, age, country, teamId) {
    const [result] = await connection.execute(
        'INSERT INTO players (name, surname, age, country, id_team) VALUES (?, ?, ?, ?, ?)',
        [name, surname, age, country, teamId]
    );
    return result.insertId;
}

// Insert a new match
export async function insertMatch(homeTeamId, awayTeamId, date, status, country, city) {
    const [result] = await connection.execute(
        `INSERT INTO matches 
        (id_home_team, id_away_team, date, status, country, city)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [homeTeamId, awayTeamId, date, status, country, city]
    );
    return result.insertId;
}

// Insert a new event
export async function insertEvent(time, type, playerId, matchId) {
    const [result] = await connection.execute(
        'INSERT INTO events (time, type, id_player, id_match) VALUES (?, ?, ?, ?)',
        [time, type, playerId, matchId]
    );
    return result.insertId;
}
