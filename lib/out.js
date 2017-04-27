'use strict'

function out(str, prefix='>> ')
{
  if (!str) 
  {
    process.stdout.write('\n')  
    return
  }
  process.stdout.write(prefix + str + '\n')
}
module.exports = out
module.exports.list = arr => {
  if (!arr.length) 
  {
    out('\tNOT FOUND')  
    return
  }
  arr.map(m => {
    out('\t'+m)
  })

}
