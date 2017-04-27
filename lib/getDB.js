'use strict'


/*
 *  credentials: 
 *  host, port, database, user, password 
 */

var db
module.exports = credentials => {
  if (!credentials) return db
  const pgp = require('pg-promise')({})
  db = pgp(credentials)
  return db
}
