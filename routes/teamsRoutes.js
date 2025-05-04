import express from 'express';
import * as dbQueries from "../db/dbQueries.js";
import * as dbInserts from "../db/dbInserts.js";
import * as dbUpdates from "../db/dbUpdates.js";
import * as dbDeletes from "../db/dbDeletes.js";

const router = express.Router();

// GET all teams
router.get('/', async (req, res) => {
    const teams = await dbQueries.getAllTeams();
    res.json(teams);
});

// GET team by name
router.get('/name/:name', async (req, res) => {
    const team = await dbQueries.getTeamByName(req.params.name);
    team ? res.json(team) : res.status(404).send('Team not found');
});

// GET team by ID
router.get('/id/:id', async (req, res) => {
    const team = await dbQueries.getTeamById(req.params.id);
    team ? res.json(team) : res.status(404).send(`Team with id: ${req.params.id} not found`);
});

//POST team
router.post('/', async (req, res) => {
    const { name, country, city } = req.body;
    const id = await dbInserts.insertTeam(name, country, city);
    res.status(201).json({ id });
});


// UPDATE team by ID
router.put('/:id', async (req, res) => {
    const { name, country, city } = req.body;
    await dbUpdates.updateTeam(req.params.id, name, country, city);
    res.sendStatus(204);
});

// DELETE team by ID
router.delete('/:id', async (req, res) => {
    const team = await dbQueries.getTeamById(req.params.id);
    if (!team) {
        return res.status(404).send('Team not found');
    }
    await dbDeletes.deleteTeam(req.params.id);
    res.sendStatus(204);
});

export default router;