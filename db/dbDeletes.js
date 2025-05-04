import connection from './db.js';

// Delete a team by ID
export async function deleteTeam(id) {
    // Delete all players in the team first to avoid foreign key constraints
    await connection.execute(
        'DELETE FROM players WHERE id_team = ?',
        [id]
    );

    // Then delete the team
    await connection.execute(
        'DELETE FROM teams WHERE id_team = ?',
        [id]
    );
}

// Delete a player by ID
export async function deletePlayer(id) {
    await connection.execute(
        'DELETE FROM players WHERE id_player = ?',
        [id]
    );
}

// Delete a match by ID
export async function deleteMatch(id) {
    // Delete all events associated with the match
    await connection.execute(
        'DELETE FROM events WHERE id_match = ?',
        [id]
    );

    // Then delete the match
    await connection.execute(
        'DELETE FROM matches WHERE id_match = ?',
        [id]
    );
}

// Delete an event by ID
export async function deleteEvent(id) {
    await connection.execute(
        'DELETE FROM events WHERE id_event = ?',
        [id]
    );
}

// Delete all events for a match
export async function deleteAllEventsForMatch(matchId) {
    await connection.execute(
        'DELETE FROM events WHERE id_match = ?',
        [matchId]
    );
}
