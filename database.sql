-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT null,
    "first_name" VARCHAR(80) not null,
    "last_name" varchar(80) not null,
    "dayEndTime" int,
    "notify" boolean,
    "challenge_complete" boolean
);

create table "viewText" (
	"id" SERIAL primary key,
	revisionDate date,
	viewName varchar(80),
	blurbtext varchar(80)
)

create table steps (
	stepid serial primary key, 
	step_name varchar(80),
	dailyhabits integer,
	message varchar(80),
	image varchar(80),
	video varchar(80),
	step_description_text integer,
	completion_text integer
)

create table phases (
	id serial primary key,
	image varchar(80),
	intro_video varchar(80),
	intro_text varchar(80),
	completion_text integer,
	completion_video integer
)

create table "userProgress" (
	id int primary key references "user"(id),
	day int,
	step int,
	missed_days int,
	warning bool
)

create table "dailyHabits" (
	user_id int primary key references "user"(id),
	date date,
	daily_hydrate boolean,
	daily_grow boolean,
	daily_move boolean,
	daily_focus boolean,
	daily_nourish boolean,
	daily_dinner boolean
)