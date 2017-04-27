-- UP

CREATE TABLE users (
  id SERIAL,
  first VARCHAR,
  last VARCHAR,
  age NUMERIC
);

CREATE TABLE groups (
  name VARCHAR
);

-- DOWN

DROP TABLE users;
DROP TABLE groups;

