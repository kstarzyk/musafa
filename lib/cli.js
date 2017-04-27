'use strict'

const fs = require('fs')
const out = require('./out')
const get_migrations = require('./status')
const execute_sql = require('./execute')
const reader = require('./reader')

function help() 
{
  out(`\tusage:'
  \t\tmusafa init
  \t\tmusafa status
  \t\tmusafa up
  \t\tmusafa upall
  \t\tmusafa down
  \t\tmusafa downall`, '')
}

((args) => {
  if (args.length < 3)
  {
    help()
    return;
  }
  const cmd = args[2]
  out(cmd)
  if (cmd == 'init')
  {
    require('./init')()
    return
  }
  var config
  try {
    config = require('../.musafarc')
  } catch(err) {
    out('Cannot found .musafarc file or format is incorrect')
    out('Have you used `musafa init`?')
    return
  }
  return get_migrations(config)
  .then(({m_local,m_db,m_pending}) => {
    const promises = []
    switch (cmd)
    {
    case 'status':
      out('migrations in ' + config.migrations_path)
      out.list(m_local)
      out('migrations in DB: ' + config.credentials.database + ' TABLE: ' + config.migrations_table_name)
      out.list(m_db)
      out('PENDING migrations:')
      out.list(m_pending)    
      return Promise.resolve()
    case 'up':
      const {up} = reader(config.migrations_path+m_pending[0])
      return execute_sql(up,m_pending[0],'up', config.migrations_table_name)
    case 'upall':
      m_pending.map(m => {
        const {up} = reader(config.migrations_path+m)
        promises.push(execute_sql(up,m,'up',config.migrations_table_name))
      })
      return Promise.all(promises)
    case 'down':
      if (!m_db.length)
      {
        out('No migrations executed')
        out('bye')
        process.exit(1)
      }
      const {down} = reader(config.migrations_path+m_db[m_db.length-1])
      return execute_sql(down,m_db[m_db.length-1],'down',config.migrations_table_name)
    case 'downall':
      while (m_db.length > 0)
      {
        const tail = m_db.pop()
        const {down} = reader(config.migrations_path+tail)
        promises.push(execute_sql(down,tail,'down',config.migrations_table_name))
      }
      return Promise.all(promises)
    case 'help':
      help()
      return Promise.resolve() 
    default:
      out('UNKNOWN COMMAND')
      help()
      return Promise.resolve() 
    }
  })
  .then(executed => {
    process.exit(1)
  })
  .catch(err => {
    console.log(err)
  })
})(process.argv)
