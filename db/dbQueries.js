import connection from './db.js';

export async function getTeamByName(name) {
    const [rows] = await connection.execute(
      'SELECT * FROM teams WHERE name = ?',
      [name]
    );
    return rows[0] || null;
}

export async function getTeamById(id) {
    const [rows] = await connection.execute(
        'SELECT * FROM teams WHERE id_team = ?',
        [id]
    );
    return rows[0] || null;
}
  
export async function getAllTeams() {
    const [rows] = await connection.execute('SELECT * FROM teams');
    return rows;
}


export async function getAllPlayers() {
    const [rows] = await connection.execute('SELECT * FROM players');
    return rows;
}

export async function getPlayerById(id) {
    const [rows] = await connection.execute(
        'SELECT * FROM players WHERE id_player = ?',
        [id]
    );
    return rows[0] || null;
}

export async function getPlayersByTeamId(teamId) {
    const [rows] = await connection.execute(
        'SELECT * FROM players WHERE id_team = ?',
        [teamId]
    );
    return rows;
}

export async function getPlayerByParams(params) {
    const [rows] = await connection.execute(
        'SELECT * FROM players WHERE name = ? AND surname = ? AND age = ? AND country = ?',
        [...params]
    );
    return rows[0] || null;
}

export async function getMatchById(id) {
    const [rows] = await connection.execute(
        'SELECT * FROM matches WHERE id_match = ?',
        [id]
    );
    return rows[0] || null;
}

export async function getAllMatches() {
    const [rows] = await connection.execute('SELECT * FROM matches');
    return rows;
}

export async function getEventsByMatchId(matchId) {
    const [rows] = await connection.execute(
        'SELECT * FROM events WHERE id_match = ?',
        [matchId]
    );
    return rows;
}

export async function getEventById(id) {
    const [rows] = await connection.execute(
        'SELECT * FROM events WHERE id_event = ?',
        [id]
    );
    return rows[0] || null;
}

export async function getGoalsByMatchId(matchId) {
    const [rows] = await connection.execute(
        'SELECT * FROM events WHERE id_match = ? AND type = ?',
        [matchId, 'goal']
    );
    return rows;
}
  