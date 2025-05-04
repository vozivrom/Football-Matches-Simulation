import express from 'express';
import teamsRoutes from './routes/teamsRoutes.js'
import playersRoutes from './routes/playersRoutes.js';
import matchesRoutes from './routes/matchesRoutes.js';
import eventsRoutes from './routes/eventsRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/teams', teamsRoutes);
app.use('/players', playersRoutes);
app.use('/matches', matchesRoutes);
app.use('/events', eventsRoutes);

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});
