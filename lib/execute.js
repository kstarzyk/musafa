'use strict'

const getDB = require('./getDB')
const out = require('./out')

function checkOrCreateMigrateTable(targetTable)
{
  return getDB().any('SELECT * FROM ' + targetTable+';')
  .catch(err => {
    out(`creating ${targetTable} table...`)
    return getDB().any(`
      CREATE TABLE ${targetTable} (
        name VARCHAR,
        executed timestamp
      );`)
  })
}

module.exports = (sql,filepath,type,targetTable) => {
  out(filepath)
  return checkOrCreateMigrateTable(targetTable)
  .then(() => {
    return  (!sql || !sql.trim().length) ? Promise.resolve() :  getDB().any(sql) 
  }) 
  .then(() => {
    out.list(sql.split('\n'))
    if (type == 'up')
      return getDB().any(`INSERT INTO ${targetTable}(name,executed) VALUES('${filepath}',now());`)
    else 
      return getDB().any(`DELETE FROM ${targetTable} WHERE name='${filepath}';`)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
}
