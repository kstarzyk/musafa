'use strict'

const fs = require('fs')
const getDB = require('./getDB')
const out = require('./out')

function getMigrationsList(path, prefix, extension)
{
  return fs.readdirSync(path)
  .filter(file => file.search(new RegExp(prefix+'.*\\'+extension+'$')) > -1)
}

module.exports = config => {
  const db = getDB(config.credentials)
  const m_local = getMigrationsList(config.migrations_path, config.migrations_prefix_format, config.migrations_extension)
  return db.any('SELECT name FROM ' + config.migrations_table_name)
  .then(m_db => {
    m_db = m_db.map(x => x.name)
    const m_pending = []
    for(let i=0;i<m_local.length;i++)
      if (i >= m_db.length || m_local[i] != m_db[i]) 
        m_pending.push(m_local[i])
    return {m_local,m_db,m_pending}
  })
  .catch(err => {
    console.log(err)
    if (err.code === '42P01')
    {
      out(config.migration_table_name + ' table doesn\'t exist')
      out(config.migration_table_name + ' will be created after first migration')
      process.exit(1)
    }

    out('Something went wrong...')
    out(err.error)
    process.exit(1)
  })
}
