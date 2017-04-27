'use strict'

const fs = require('fs')
/**
 * Reading config file content 
 */
module.exports = () => {
  const config = fs.readFileSync('.musafarc')
  console.log(config)
}
