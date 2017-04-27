'use strict'

const fs = require('fs')
const defaultConfig = `
module.exports = {
  migrations_path: 'migrations/',
  migrations_prefix_format: '%d%d%d_',
  migrations_extension: '.sql',
  migration_table_name: 'musafa_migrations',
  fullpath_in_migration_table_name: true
}
`

module.exports = () => {
  fs.writeFileSync('.musafarc', defaultConfig);
}
