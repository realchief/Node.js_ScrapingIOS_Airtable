const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://icodrops.com/category/active-ico/');

  // Get the "viewport" of the page, as reported by the page.
  const allResultsSelector = '.tabs__content.active .category-desk.justify-content-center .a_ico a#n_color';
  await page.waitForSelector(allResultsSelector);

  // Extract the results from the page.
  const links = await page.evaluate(allResultsSelector => {
    const anchors = Array.from(document.querySelectorAll(allResultsSelector));
    return anchors.map(anchor => {
      return `${anchor.href}`;
    });
  }, allResultsSelector);
  console.log(links.join('\n'));

  await browser.close();

})();