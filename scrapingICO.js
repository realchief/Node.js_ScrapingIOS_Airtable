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

    // Get all urls
    url = links[link];

    // Get all coin names.
    // const coinnameSelector = '.white-desk.ico-desk .ico-main-info h3';
    // await page.waitForSelector(coinnameSelector);

    const coinname = await page.evaluate(
        () => document.querySelector('.white-desk.ico-desk .ico-main-info h3').innerText
    );

    // Get all Maket Verticals
  
    const marketvertical = await page.evaluate(
        () => document.querySelector('.white-desk.ico-desk .ico-main-info .ico-category-name').childNodes[0].nodeValue.slice(1,-1)
    );

    // Get all descriptions
    
    const description = await page.evaluate(
        () => document.querySelector('.white-desk.ico-desk .ico-main-info .ico-category-name').childNodes[1].innerText
    );

    // Get all icons

    const icon = await page.evaluate(
        () => document.querySelector('.white-desk.ico-desk .ico-row .ico-icon img').src
    );

    // Get all start dates of Token Sale    
    
    const presale_start_date = await page.evaluate(
        () => {
            if (document.querySelector('.row.list .col-12.title-h4 h4'))
                if (document.querySelector('.row.list .col-12.title-h4 h4').innerText.split(':')[1])
                    return document.querySelector('.row.list .col-12.title-h4 h4').innerText.split(':')[1].split('–')[0]
                else  return ' ' 
            else return ' '
        }

    );

    const presale_end_date = await page.evaluate(
        () => {
            if (document.querySelector('.row.list .col-12.title-h4 h4'))
                if (document.querySelector('.row.list .col-12.title-h4 h4').innerText.split(':')[1])
                    return document.querySelector('.row.list .col-12.title-h4 h4').innerText.split(':')[1].split('–')[1]
                else  return ' ' 
            else return ' '
        }

    );

    // Get all countries

    const presale_country = await page.evaluate(
        () => {
            if (document.querySelector('.col-12.info-analysis-list'))
                if (document.querySelector('.col-12.info-analysis-list').childNodes)
                    if (document.querySelector('.col-12.info-analysis-list').childNodes[3])
                        if (document.querySelector('.col-12.info-analysis-list').childNodes[3].innerText.includes('Team from'))
                            return document.querySelector('.col-12.info-analysis-list').childNodes[3].innerText.split(':')[1]
                        else return ' '
                    else return ' '
                else  return ' ' 
            else return ' '
        }
    );



    console.log(symbol);
    console.log(presale_end_date);

    // if (document.querySelector('.col-12.info-analysis-list').childNodes[3].innerText.includes('Team from')) {
    //     const countrySelector = '.col-12.info-analysis-list';
    //     await page.waitForSelector(presalestartSelector);
    //     const country = await page.evaluate(
    //         () => document.querySelector('.col-12.info-analysis-list').childNodes[3].innerText
    //     );       
        
 

   

    // return {
    //     'title': ti
    // }
    
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