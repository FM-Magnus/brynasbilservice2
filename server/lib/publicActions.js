const fs = require('fs');
const path = require('path');

const KEYS = ['book', 'contact', 'call', 'email', 'directions'];
const KINDS = new Set(KEYS);
const DEFAULT_FILE = path.join(__dirname, '..', 'config', 'public-actions.json');

function readPublicActions(file = process.env.PUBLIC_ACTIONS_FILE || DEFAULT_FILE) {
  const source = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!source || Array.isArray(source) || typeof source !== 'object') {
    throw new Error('Public action configuration must be an object');
  }
  if (Object.keys(source).length !== KEYS.length ||
      KEYS.some((key) => !KINDS.has(source[key]))) {
    throw new Error('Public action configuration has missing or unsupported actions');
  }
  return { version: 1, actions: Object.fromEntries(KEYS.map((key) => [key, source[key]])) };
}

module.exports = { readPublicActions };
