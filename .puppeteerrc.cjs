const { join } = require('path');

/**
 * Puppeteer config - ensures Chromium is cached in the project
 * so cloud platforms (Render, Railway) can find it.
 */
module.exports = {
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
