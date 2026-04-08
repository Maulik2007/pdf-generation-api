const { Router } = require('express');
const { generate } = require('../services/pdfGenerator');
const { convert } = require('../services/markdownConverter');

const router = Router();

router.post('/from-html', async (req, res, next) => {
  try {
    const { html, options } = req.body;
    if (!html || typeof html !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid "html" field' });
    }

    const pdf = await generate(req.app.locals.browser, html, options);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="document.pdf"',
    });
    res.send(pdf);
  } catch (err) {
    next(err);
  }
});

router.post('/from-markdown', async (req, res, next) => {
  try {
    const { markdown, options } = req.body;
    if (!markdown || typeof markdown !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid "markdown" field' });
    }

    const html = convert(markdown);
    const pdf = await generate(req.app.locals.browser, html, options);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="document.pdf"',
    });
    res.send(pdf);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
