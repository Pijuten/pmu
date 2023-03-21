CREATE TABLE Entry(
	id SERIAL PRIMARY KEY UNIQUE,
	approved bool,
	name varchar,
	title varchar,
	beschreibung varchar,
	kontakt varchar,
	image varchar,
	have bool
);

CREATE TABLE Erfolg(
	id SERIAL PRIMARY KEY UNIQUE,
	approved bool,
	image varchar,
	caption varchar
	
)
