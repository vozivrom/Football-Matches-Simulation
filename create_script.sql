CREATE DATABASE football_db;
USE football_db;

DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS teams;

CREATE TABLE IF NOT EXISTS teams
(
    id_team INT AUTO_INCREMENT PRIMARY KEY,
    name    VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    city    VARCHAR(50) NOT NULL,

    UNIQUE (name, city)
);

CREATE TABLE IF NOT EXISTS matches
(
    id_match     INT AUTO_INCREMENT PRIMARY KEY,
    id_home_team INT         NOT NULL,
    id_away_team INT         NOT NULL,
    date         DATETIME    NOT NULL,
    referee      VARCHAR(50),
    status       ENUM ('Finished', 'Cancelled', 'Not Started', 'Postponed', 'Is Being Played') DEFAULT ('Not Started'),
    country      VARCHAR(50) NOT NULL,
    city         VARCHAR(50) NOT NULL,

    FOREIGN KEY (id_home_team) REFERENCES teams (id_team) ON DELETE CASCADE,
    FOREIGN KEY (id_away_team) REFERENCES teams (id_team) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS players
(
    id_player   INT AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(50) NOT NULL,
    second_name VARCHAR(50) NOT NULL,
    age         INT         NOT NULL,
    country     VARCHAR(50) NOT NULL,
    id_team     INT         NOT NULL,

    FOREIGN KEY (id_team) REFERENCES teams (id_team) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS events
(
    id_event  INT AUTO_INCREMENT PRIMARY KEY,
    time      INT CHECK (time BETWEEN 1 AND 120),
    type      ENUM ('Goal', 'Yellow Card', 'Red Card'),
    id_player INT NOT NULL,
    id_match  INT NOT NULL,

    FOREIGN KEY (id_player) REFERENCES players (id_player),
    FOREIGN KEY (id_match) REFERENCES matches (id_match)
);

