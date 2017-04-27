# MUSAFA

Simple NodeJS PostgreSQL migration tool

### Overview
./node_modules/.bin/musafa up

```
// .musafarc
module.exports = {
  migrations_path: 'migrations/',
  migrations_prefix_format: '%d%d%d_',
  fullpath: true
}
```

### Setup
```
npm install --save musafa
```


### Usage
```
./node_modules/.bin/musafa init
./node_modules/.bin/musafa status
./node_modules/.bin/musafa up
./node_modules/.bin/musafa up:all
./node_modules/.bin/musafa down
./node_modules/.bin/musafa down:all

```

