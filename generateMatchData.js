import * as dbQueries from './db/dbQueries.js';
import * as dbInserts from './db/dbInserts.js';


const teamNames = [
    'Barcelona', 'Real Madrid', 'Manchester United', 'Bayern Munich',
    'Paris Saint-Germain', 'Juventus', 'Chelsea', 'AC Milan',
    'Sparta', 'Slavia'
];

const cities = [
    'Barcelona', 'Madrid', 'Manchester', 'Munich',
    'Paris', 'Turin', 'London', 'Milan', 'Prague', 'Prague'
];

const countries = [
    'Spain', 'Spain', 'England', 'Germany',
    'France', 'Italy', 'England', 'Italy', 'Czech Republic', 'Czech Republic'
];

const statuses = ['Finished', 'Cancelled', 'Not Started', 'Postponed', 'Is Being Played'];

const firstNames = ['Liam', 'Noah', 'Oliver', 'Elijah', 'Mateo', 'Leo', 'Luka', 'Max', 'Ethan', 'Oscar'];
const lastNames = ['Garcia', 'Martinez', 'Smith', 'Rossi', 'Silva', 'Kovač', 'Novák', 'Popescu', 'Ivanov', 'Nguyen'];


function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomDate() {
    const start = new Date('2025-01-01');
    const end = new Date('2025-05-03');
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export async function generateRandomTeam() {
    const teamName = getRandomItem(teamNames);
    const team = await dbQueries.getTeamByName(teamName);

    if(team !== null){
        return team;
    }

    const countryIndex = teamNames.indexOf(teamName);
    const country = countries[countryIndex];
    const city = cities[countryIndex];

    console.log('Inserting team:', { teamName, country, city });
    const teamId = await dbInserts.insertTeam(teamName, country, city);

    await Promise.all(
        Array.from({ length: 11 }, () => generateRandomPlayer(teamId))
    );


    return { id_team: teamId, name: teamName, country, city };
}

async function generateRandomPlayer(teamId) {

    const newPlayer = {
        name: getRandomItem(firstNames),
        surname: getRandomItem(lastNames),
        age: Math.floor(Math.random() * 20) + 18,
        country: getRandomItem(countries),
        id_team: teamId
    };

    await dbInserts.insertPlayer(
        newPlayer.name,
        newPlayer.surname,
        newPlayer.age,
        newPlayer.country,
        newPlayer.id_team
    );
    return newPlayer;
}

async function generateMatchEvents(players, matchId, goals, yellowCard, redCard) {
    const events = [];

    for(let i = 0; i < goals + yellowCard + redCard; i++){
        let type;

        if(i < goals) type = 'Goal'
        else if(i < yellowCard) type = 'Yellow Card'
        else type = 'Red Card'

        const time = Math.floor(Math.random() * 90) + 1;
        const player = getRandomItem(players);

        events.push({
            time,
            type,
            id_player: player.id_player,
            id_match: matchId
        });
    }

    for (const matchEvent of events) {
        matchEvent.id_match = await dbInserts.insertEvent(matchEvent.time, matchEvent.type, matchEvent.id_player, matchEvent.id_match);
    }

    return events;
}

async function logEvents(events, teamName) {
    for (const matchEvent of events) {
        console.log(`Event: ${matchEvent.type}`);
        console.log(`Time: ${matchEvent.time} min`);

        const player = await dbQueries.getPlayerById(matchEvent.id_player);
        console.log(`Player: ${player.name} ${player.surname}`);
        console.log(`Team: ${teamName}`);
        console.log('---');
    }
}


export async function generateMatch() {
    let homeTeam = await generateRandomTeam();
    let awayTeam = await generateRandomTeam();

    let homeTeamId = homeTeam.id_team;
    let awayTeamId = awayTeam.id_team;

    console.log('Match teams:', homeTeam.name, 'vs', awayTeam.name);

    let status = getRandomItem(statuses);
    console.log('Status:', status);


    // Insert match into the database
    const matchId = await dbInserts.insertMatch(
        homeTeamId,
        awayTeamId,
        generateRandomDate(),
        status,
        homeTeam.country,
        homeTeam.city
    );

    const match = await dbQueries.getMatchById(matchId);

    // Generate events
    if (status === 'Finished' || status === 'Is Being Played') {
        let goals = Math.floor(Math.random() * 3);
        let yellowCard = Math.floor(Math.random() * 2);
        let redCard = Math.floor(Math.random() * 2);

        const homePlayers = await dbQueries.getPlayersByTeamId(homeTeamId);
        const awayPlayers = await dbQueries.getPlayersByTeamId(awayTeamId);

        const homeEvents = await generateMatchEvents(homePlayers, matchId, goals, yellowCard, redCard);
        const awayEvents = await generateMatchEvents(awayPlayers, matchId, 4 - goals, yellowCard, redCard);

        match['home_events'] = homeEvents;
        match['away_events'] = awayEvents;

        await logEvents(homeEvents, homeTeam.name);
        await logEvents(awayEvents, awayTeam.name);

        console.log('Final score:', homeTeam.name, goals, '-', 4 - goals, awayTeam.name);
    }
    return match;
}


