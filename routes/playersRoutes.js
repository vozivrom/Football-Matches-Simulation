import express from 'express';
import * as dbQueries from "../db/dbQueries.js";
import * as dbInserts from "../db/dbInserts.js";
import * as dbUpdates from "../db/dbUpdates.js";
import * as dbDeletes from "../db/dbDeletes.js";


const router = express.Router();

// GET all players
router.get('/', async (req, res) => {
    const players = await dbQueries.getAllPlayers();
    res.json(players);
});

// GET players by team ID
router.get('/team/:id', async (req, res) => {
    const players = await dbQueries.getPlayersByTeamId(req.params.id);
    res.json(players);
});

// GET player by ID
router.get('/:id', async (req, res) => {
    const player = await dbQueries.getPlayerById(req.params.id);
    player ? res.json(player) : res.status(404).send('Player not found');
});

// POST player (for a specific team)
router.post('/team/:id', async (req, res) => {
    const { name, surname, age, country } = req.body;
    const playerId = await dbInserts.insertPlayer(name, surname, age, country, req.params.id);
    res.status(201).json({ playerId });
});

// UPDATE player by ID
router.put('/:id', async (req, res) => {
    const { name, surname, age, country } = req.body;
    await dbUpdates.updatePlayer(req.params.id, name, surname, age, country);
    res.sendStatus(204);
});

// DELETE player by ID
router.delete('/:id', async (req, res) => {
    const player = await dbQueries.getPlayerById(req.params.id);
    if (!player) {
        return res.status(404).send('Player not found');
    }
    await dbDeletes.deletePlayer(req.params.id);
    res.sendStatus(204);
});

export default router;