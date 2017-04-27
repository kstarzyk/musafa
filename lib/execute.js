'use strict'

const getDB = require('./getDB')
const out = require('./out')

function checkOrCreateMigrateTable(targetTable)
{
  return getDB().any('SELECT * FROM ' + targetTable+';')
  .catch(err => {
    return getDB().any(`
      CREATE TABLE ${targetTable} (
        name VARCHAR,
        executed timestamp,      
      );`)
      .then(() => {
        out(targetTable + ' created!')
      })
  })
}

module.exports = (sql,filepath,type,targetTable) => {
  out(filepath)
  out.list(sql.split('\n'))
  return checkOrCreateMigrateTable(targetTable)
  .then(() => {
    return getDB().any(sql) 
  }) 
  .then(() => {
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
