-- UP

CREATE TABLE posts (
  id SERIAL,
  msg VARCHAR
);

CREATE TABLE comments (
  id SERIAL,
  msg VARCHAR
);

-- DOWN

DROP TABLE posts;
DROP TABLE comments;

