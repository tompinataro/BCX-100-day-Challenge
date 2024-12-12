-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user"(
    id SERIAL PRIMARY KEY UNIQUE,
    email TEXT UNIQUE,
    first_name TEXT,
    last_name TEXT,
    password TEXT,
    dayEndTime TIME,
    notify BOOLEAN,
    challenge_complete BOOLEAN)
;

