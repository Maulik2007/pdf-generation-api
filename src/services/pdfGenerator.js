const defaults = require('../config/defaults');

async function generate(browser, html, options = {}) {
  const page = await browser.newPage();
  page.setDefaultTimeout(30000);

  try {
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pageSize = defaults.allowedPageSizes.includes(options.pageSize)
      ? options.pageSize
      : defaults.pageSize;

    const pdfOptions = {
      format: pageSize,
      landscape: options.orientation === 'landscape',
      printBackground: options.printBackground ?? defaults.printBackground,
      displayHeaderFooter: options.displayHeaderFooter ?? defaults.displayHeaderFooter,
      margin: {
        top: options.margin?.top || defaults.margin.top,
        right: options.margin?.right || defaults.margin.right,
        bottom: options.margin?.bottom || defaults.margin.bottom,
        left: options.margin?.left || defaults.margin.left,
      },
    };

    if (options.headerTemplate) pdfOptions.headerTemplate = options.headerTemplate;
    if (options.footerTemplate) pdfOptions.footerTemplate = options.footerTemplate;

    return await page.pdf(pdfOptions);
  } finally {
    await page.close();
  }
}

module.exports = { generate };
