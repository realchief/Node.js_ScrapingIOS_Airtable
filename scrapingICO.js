const puppeteer = require('puppeteer');
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keys5n8BbkmqN8sn4'}).base('app5PCFrzosRjP2OY');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const domain_url = 'https://icodrops.com/'
        let result = {};    
        let category_names = ['active-ico', 'upcoming-ico', 'ended-ico']        
        for(i = 0; i < 3; i ++){
            category_url = domain_url + 'category/' + category_names[i];       
            await page.goto(category_url);
            result[i] = []
            //  Extract the product urls of active-ico category
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
                            else  return 'AAA' 
                        else return 'AAA'
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
        
                // Twitter 
                const twitter = await page.evaluate(
                    () => {
                        if (document.querySelector('.twitter a').href)
                            return document.querySelector('.twitter a').href
                        else return ' '
                    }
                );
                
                // telegram 
                const telegram = await page.evaluate(
                    () => {
                        if (document.querySelector('.telega a').href)
                            return document.querySelector('.telega a').href
                        else return ' '
                    }
                );

                let item = {};
                item['url'] = url;
                item['coinname'] = coinname;
                item['marketvertical'] = marketvertical;
                item['description'] = description;
                item['icon'] = icon;
                item['presale_start_date'] = presale_start_date;
                item['presale_end_date'] = presale_end_date;
                item['country'] = country;
                item['symbol'] = symbol;
                item['target_raise'] = target_raise;
                item['capital_raised'] = capital_raised;
                item['tm_count'] = tm_count;
                item['tokenprice'] = tokenprice;
                item['twitter'] = twitter;
                item['telegram'] = telegram;
                item['blockchain_technology'] = " ";

                base('ICOs').create({
                    "Coin Name": item['coinname'],
                    "Icon": [
                        {
                            "url": item['icon']
                        }
                    ],
                    "URL": item['url'],
                    "Presale Start Date": item['presale_start_date'],
                    "Presale End Date": item['presale_end_date'],
                    "Source URLS": " ",
                    "Twitter": item['twitter'],
                    "Facebook Link": " ",
                    "Symbol": item['symbol'],
                    "Description": item['description'],
                    "White Paper LInk": " ",                 
                    "Market Vertical": item['marketvertical'],
                    "Telegram": item['telegram'],
                    "Blockchain Technology": item['blockchain_technology'],                    
                    "Country": item['country']
                    }, function(err, record) {
                        if (err) { 
                            console.error(err); return; 
                        }
                        console.log(record.getId());
                    });

                console.log(item['url'])

                // console.log(telegram);   
                result[i].push(item);
            }
        }    
        await browser.close();
    } catch(err) {
        console.error(err);
    }
})();

// for(i = 0; i<3; i++){
//     base('ICOs').create({
//         "Coin Name": result[i]['coinname'],
//         "Icon": [
//             {
//                 "url": result[i]['icon']
//             }
//         ],
//         "URL": result[i]['url'],
//         "Presale Start Date": result[i]['presale_start_date'],
//         "Presale End Date": result[i]['presale_end_date'],
//         "Source URLS": " ",
//         "Twitter": result[i]['twitter'],
//         "Facebook Link": " ",
//         "Symbol": result[i]['symbol'],
//         "Description": result[i]['description'],
//         "White Paper LInk": " ",
//         "Target Raise": result[i]['target_raise'],
//         "Market Vertical": result[i]['target_raise'],
//         "Telegram": result[i]['telegram'],
//         "Blockchain Technology": result[i]['blockchain_technology'],
//         "Telegram Membership Count": result[i]['tm_count'],
//         "Country": result[i]['country']
//         }, function(err, record) {
//             if (err) { 
//                 console.error(err); return; 
//             }
//             console.log(record.getId());
//         });
// }




