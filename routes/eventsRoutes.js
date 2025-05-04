import express from 'express';
import * as dbQueries from "../db/dbQueries.js";
import * as dbInserts from "../db/dbInserts.js";
import * as dbUpdates from "../db/dbUpdates.js";
import * as dbDeletes from "../db/dbDeletes.js";

const router = express.Router();

// GET all events for a match
router.get('/match/:id', async (req, res) => {
    const events = await dbQueries.getEventsByMatchId(req.params.id);
    res.json(events);
});

// GET Goals in a match
router.get('/match/:id/goals', async (req, res) => {
    const events = await dbQueries.getGoalsByMatchId(req.params.id);
    res.json(events);
});

// POST event (for a specific match)
router.post('/match/:id', async (req, res) => {
    const { type, time, id_player, id_team } = req.body;
    const eventId = await dbInserts.insertEvent(type, time, id_player, id_team, req.params.id);
    res.status(201).json({ eventId });
});

// UPDATE event by ID
router.put('/:id', async (req, res) => {
    const { time, type, id_player, id_match } = req.body;
    await dbUpdates.updateEvent(req.params.id, time, type, id_player, id_match);
    res.sendStatus(204);
});

// DELETE event by ID
router.delete('/:id', async (req, res) => {
    const event = await dbQueries.getEventById(req.params.id);
    if (!event) {
        return res.status(404).send('Event not found');
    }
    await dbDeletes.deleteEvent(req.params.id);
    res.sendStatus(204);
});

// DELETE all events for a match
router.delete('/match/:id', async (req, res) => {
    const match = await dbQueries.getMatchById(req.params.id);
    if (!match) {
        return res.status(404).send('Match not found');
    }
    await dbDeletes.deleteAllEventsForMatch(req.params.id);
    res.sendStatus(204);
});

export default router;