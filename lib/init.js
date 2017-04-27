'use strict'

const fs = require('fs')
const defaultConfig = `
module.exports = {
  migrations_path: 'migrations/',
  migrations_prefix_format: '%d%d%d_',
  migrations_extension: '.sql',
  migrations_table_name: 'musafa_migrations',
  fullpath_in_migrations_table_name: true,
  credentials: {
    host: 'localhost',
    port: 5432,
    database: 'db',
    user: 'postgres',
    password: ''
  }
}
`

module.exports = () => {
  console.log('Initialize musafa config file...')
  fs.writeFileSync('.musafarc', defaultConfig);
  console.log('.musafarc with default config created')
}
