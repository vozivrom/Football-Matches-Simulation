import connection from './db.js';

// Update a team's details by ID
export async function updateTeam(id, name, country, city) {
    await connection.execute(
        'UPDATE teams SET name = ?, country = ?, city = ? WHERE id_team = ?',
        [name, country, city, id]
    );
}

// Update a player's details by ID
export async function updatePlayer(id, name, surname, age, country) {
    await connection.execute(
        'UPDATE players SET name = ?, surname = ?, age = ?, country = ? WHERE id_player = ?',
        [name, surname, age, country, id]
    );
}

// Update a match's details by ID
export async function updateMatch(id, homeTeamId, awayTeamId, date, status, country, city) {
    await connection.execute(
        `UPDATE matches 
         SET id_home_team = ?, id_away_team = ?, date = ?, status = ?, country = ?, city = ? 
         WHERE id_match = ?`,
        [homeTeamId, awayTeamId, date, status, country, city, id]
    );
}

// Update an event's details by ID
export async function updateEvent(id, time, type, playerId, matchId) {
    await connection.execute(
        'UPDATE events SET time = ?, type = ?, id_player = ?, id_match = ? WHERE id_event = ?',
        [time, type, playerId, matchId, id]
    );
}
