'use strict'

const fs = require('fs')

const UP_TOKEN = '-- UP'
const DOWN_TOKEN = '-- DOWN'

module.exports = filepath => {
  const txt = fs.readFileSync(filepath)
  const tokens = txt.toString().split('\n')
  const up_index = tokens.indexOf(UP_TOKEN)
  const down_index = tokens.indexOf(DOWN_TOKEN)
  if (up_index == -1 || down_index == -1) throw new Error(`MISSING ${UP_TOKEN} OR/AND ${DOWN_TOKEN}`)
  return {
    up: tokens.slice(up_index + 1, down_index).filter(x => x.trim()).join('').split(';').filter(x => x.trim()).map(x => `${x};`).join('\n'),
    down: tokens.slice(down_index + 1).filter(x => x.trim()).join('').split(';').filter(x => x.trim()).map(x => `${x};`).join('\n'),
  }

}

