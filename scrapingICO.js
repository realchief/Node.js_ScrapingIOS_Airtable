const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://icodrops.com/category/active-ico/');

  // Extract the product urls of active-ico category
  const allResultsSelector = '.tabs__content.active .category-desk.justify-content-center .a_ico a#n_color[href]';
  await page.waitForSelector(allResultsSelector);

  const links = await page.evaluate(
    () => Array.from(document.body.querySelectorAll('.tabs__content.active .category-desk.justify-content-center .a_ico a#n_color[href]'), ({ href }) => href)
  );

  console.log(links)

  for (link in links) {
    await page.goto(links[link]);

    // Get all coin names.
    const coinnameSelector = '.white-desk.ico-desk .ico-main-info h3';
    await page.waitForSelector(coinnameSelector);

    const coinname = await page.evaluate(
        () => document.querySelector('.white-desk.ico-desk .ico-main-info h3').innerText
    );

    // Get all Maket Verticals
    const mvSelector = '.white-desk.ico-desk .ico-main-info .ico-category-name';
    await page.waitForSelector(mvSelector);

    const marketvertical = await page.evaluate(
        () => document.querySelector('.white-desk.ico-desk .ico-main-info .ico-category-name').childNodes[0].nodeValue
    );

    // return {
    //     'title': ti
    // }
    console.log(marketvertical)
  }
  
//   Extract the detailed titles of active-ico category
  
//   await page.goto(links);
//   const detailpageSelector = '.ico-main-info h3';
//   await page.waitForSelector(detailpageSelector);
  
//   const titles = await page.evaluate(detailpageSelector => {
//     const anchors = Array.from(document.querySelectorAll(detailpageSelector));
//     return anchors.map(anchor => {     
//       return `${anchor.text}`;
//     });
//   }, detailpageSelector);

//   await page.evaluate( (obj) => {
//     return obj.getAttribute('data-src');
//   }, imgurlEle);


  await browser.close();

})();