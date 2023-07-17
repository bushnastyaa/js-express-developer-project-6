// @ts-check

const crypto = require('crypto');

/**
 * @param {string} value
 */
export default (value) => crypto.createHash('sha256')
  .update(value)
  .digest('hex');
