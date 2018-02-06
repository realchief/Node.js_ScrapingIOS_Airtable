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

        const country = await page.evaluate(
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

        // Get all symbols

        const symbol = await page.evaluate(
            () => {
                if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6'))
                    if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes)
                        if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[1])
                            if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[1].innerText.includes('Ticker'))
                                return document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[1].innerText.split(':')[1]
                            else return ' '
                        else return ' '
                    else  return ' ' 
                else return ' '
            }
        );

        // Get all Target Raise

        const target_raise = await page.evaluate(
            () => {
                if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6'))
                    if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes)
                        if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[7])
                            if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[7].innerText.includes('Fundraising Goal'))
                                return document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[7].innerText.split(':')[1]
                            else return ' '
                        else return ' '
                    else  return ' ' 
                else return ' '
            }
        );

        // Get all Capital Raised

        const capital_raised = await page.evaluate(
            () => {
                if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6'))
                    if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes)
                        if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[9])
                            if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[9].innerText.includes('Sold on pre-sale'))
                                return document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[9].innerText.split(':')[1]
                            else return ' '
                        else return ' '
                    else  return ' ' 
                else return ' '
            }
        );

        // Telegram Membership Count

        const tm_count = await page.evaluate(
            () => {
                if (document.querySelector('.white-desk.ico-desk .row.list .col-12.info-analysis-list'))
                    if (document.querySelector('.white-desk.ico-desk .row.list .col-12.info-analysis-list').childNodes)
                        if (document.querySelector('.white-desk.ico-desk .row.list .col-12.info-analysis-list').childNodes[1])
                            if (document.querySelector('.white-desk.ico-desk .row.list .col-12.info-analysis-list').childNodes[1].innerText.includes('Number of Team Members'))
                                return document.querySelector('.white-desk.ico-desk .row.list .col-12.info-analysis-list').childNodes[1].innerText.split(':')[1]
                            else return ' '
                        else return ' '
                    else  return ' ' 
                else return ' '
            }
        );


        // Token Price
        const tokenprice = await page.evaluate(
            () => {
                if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6'))
                    if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes)
                        if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[5])
                            if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[5].innerText.includes('Token Price'))
                                return document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[5].innerText.split(':')[1]
                            else return ' '
                        else return ' '
                    else  return ' ' 
                else return ' '
            }
        );




        
       
        console.log(tokenprice);    

        // return {
        //     'title': ti
        // }
        
    } 
  await browser.close();
})();