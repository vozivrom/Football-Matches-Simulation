import express from 'express';
import * as dbQueries from "../db/dbQueries.js";
import * as dbInserts from "../db/dbInserts.js";
import * as dbUpdates from "../db/dbUpdates.js";
import * as dbDeletes from "../db/dbDeletes.js";
import {generateMatch} from "../generateMatchData.js";

const router = express.Router();

// GET all matches
router.get('/', async (req, res) => {
    const matches = await dbQueries.getAllMatches();
    res.json(matches);
});

// GET match by ID
router.get('/:id', async (req, res) => {
    const match = await dbQueries.getMatchById(req.params.id);
    match ? res.json(match) : res.status(404).send('Match not found');
});

// POST match (simulate match)
router.post('/simulate', async (req, res) => {
    try {
        const match = await generateMatch();  // assuming generateMatch is already implemented
        res.status(201).json(match);
    } catch (err) {
        res.status(500).json({ error: 'Match simulation failed', details: err.message });
    }
});

// UPDATE match by ID
router.put('/:id', async (req, res) => {
    const { homeTeamId, awayTeamId, date, status } = req.body;
    await dbUpdates.updateMatch(req.params.id, homeTeamId, awayTeamId, date, status);
    res.sendStatus(204);
});

// DELETE match by ID
router.delete('/:id', async (req, res) => {
    const match = await dbQueries.getMatchById(req.params.id);
    if (!match) {
        return res.status(404).send('Match not found');
    }
    await dbDeletes.deleteMatch(req.params.id);
    res.sendStatus(204);
});

export default router;