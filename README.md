# Football Matches Simulation API ⚽

This API allows you to simulate football matches, manage teams, players, and events.
API supports CRUD operations for all entities and provides endpoint to simulate matches with random data.

# 🛠️ Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for building RESTful APIs.
- **MySQL**: Relational database management system for storing teams, players, matches, and events data.

## 🗂️ Endpoints

### Teams Endpoints

| Method | Endpoint                  | Description                                    |
|--------|---------------------------|------------------------------------------------|
| GET    | `/teams`                  | Get all teams                                  |
| GET    | `/teams/name/:name`       | Get a team by name                             |
| GET    | `/teams/id/:id`           | Get a team by ID                               |
| POST   | `/teams`                  | Create a new team                              |
| PUT    | `/teams/:id`              | Update a team by ID                            |
| DELETE | `/teams/:id`              | Delete a team by ID                            |

### Players Endpoints

| Method | Endpoint            | Description                                      |
|--------|---------------------|--------------------------------------------------|
| GET    | `/players`          | Get all players                                  |
| GET    | `/players/:id`      | Get a player by ID                               |
| GET    | `/players/team/:id` | Get players for a specific team                  |
| POST   | `/players/team/:id` | Create a new player for a specific team          |
| PUT    | `/players/:id`      | Update a player by ID                            |
| DELETE | `/players/:id`      | Delete a player by ID                            |

### Matches Endpoints

| Method | Endpoint            | Description                               |
|--------|---------------------|-------------------------------------------|
| GET    | `/matches`          | Get all matches                           |
| GET    | `/matches/:id`      | Get a match by ID                         |
| POST   | `/matches/simulate` | Simulate a match and generate random data |
| PUT    | `/matches/:id`      | Update a match by ID                      |
| DELETE | `/matches/:id`      | Delete a match by ID                      |

### Events Endpoints

| Method | Endpoint                  | Description                             |
|--------|---------------------------|-----------------------------------------|
| GET    | `/events/match/:id`       | Get all events for a specific match     |
| GET    | `/events/match/goals/:id` | Get goals for a specific match          |
| POST   | `/events/match/:id`       | Create a new event for a specific match |
| PUT    | `/events/:id`             | Update an event by ID                   |
| DELETE | `/events/:id`             | Delete an event by ID                   |
| DELETE | `/events/match/:id`       | Delete an event by match ID             |

---

# 📦 Installation Guide

Follow these steps to install and set up the project on your local machine:

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone git@github.com:vozivrom/Football-Matches-Simulation.git
```
### 2. 📂 Install Dependencies
```bash
npm install
```
### 3. 📂 Configure Environment Variables
```bash
cp .env.example .env
```
Edit .env with your DB credentials. (You can use 'appuser' as username and 'userpass' password for local development)

### 4. 🔍 Setup MySQL Database
Make sure MySQL is running - ```sudo systemctl status mysql```
If not:
```bash
sudo systemctl start mysql
```    
Then execute the **create_script.sql** to create tables:
```bash
sudo mysql -u root -p < create_script.sql
```

### 5. 🚀 Run the Server
```bash
node api.js
```
Server will be available at `http://localhost:3000`

## 🚀 Examples API Usage
### GET `/players`

### POST `/teams`
```json
{
  "name": "Barcelona",
  "country": "Spain",
  "city": "Barcelona"
}
```

### PUT `/matches/1`
```json
{
  "id_home_team": 1,
  "id_away_team": 2,
  "match_date": "2025-05-01",
  "status": "Finished",
  "country": "Spain",
  "city": "Barcelona"
}
```

### DELETE `/events/match/1`
```json
{
  "match_id": 1
}
```

