require('dotenv').config();
const puppeteer = require('puppeteer');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

async function start() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  app.locals.browser = browser;

  const server = app.listen(PORT, () => {
    console.log(`PDF API running on port ${PORT}`);
  });

  const shutdown = async () => {
    console.log('Shutting down...');
    server.close();
    await browser.close();
    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

start().catch((err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});
