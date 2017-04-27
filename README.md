# MUSAFA

Simple NodeJS PostgreSQL migration tool

### Overview

```
// .musafarc
module.exports = {
  migrations_path: 'migrations/',
  migrations_prefix_format: '[0-9]{3,}_',
  migrations_extension: '.sql',
  migrations_table_name: 'musafa_migrations',
  fullpath_in_migration_table: true,
  credentials: {
    host: 'localhost',
    port: 5432,
    database: 'db',
    user: 'postgres',
    password: ''
  }
}
```


### Setup
```
npm install --save musafa
```

### Usage
```
./node_modules/.bin/musafa init      # create .musafarc file 
./node_modules/.bin/musafa status    # prints content of migration table
./node_modules/.bin/musafa up        # migrate next file
./node_modules/.bin/musafa upall     # migrate ALL next files
./node_modules/.bin/musafa down      # rollback last migration
./node_modules/.bin/musafa downall   # rollback ALL migrations

```







