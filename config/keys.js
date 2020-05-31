// keys.js - figure out what set of credentials to return

if (process.env.NODE_ENV === 'production') {
  // we are in production return prod set of keys
  module.exports = require('./prod.js')
} else {
  // we are in dev reutrn dev set of keys
  // statement below requires and exports them at the same time.
  module.exports = require('./dev.js')
}
