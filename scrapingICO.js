const puppeteer = require('puppeteer');
var Airtable = require('airtable');

// AIRTABLE API KEY
const AIRTABLE_API_KEY = 'keys5n8BbkmqN8sn4'

// TEMP ICO DATABASE
const BASE_KEY = 'appzTfyn5SZHuWzqL'
// TEST ICO DATABASE
const BASE_KEY_TEST = 'app5PCFrzosRjP2OY'

var base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(BASE_KEY);

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
                        try {
                            return document.querySelector('.row.list .col-12.title-h4 h4').innerText.split(':')[1].split('–')[0]
                        } catch (e) {
                            return 
                        }
                    }
                );     

                // Get all end dates of Token Sale
                const presale_end_date = await page.evaluate(
                    () => {
                        try {
                            return document.querySelector('.row.list .col-12.title-h4 h4').innerText.split(':')[1].split('–')[1]
                        } catch (e) {
                            return 
                        }
                    }
                );        
        
                // Get all countries
                const country = await page.evaluate(
                    () => {
                        try {
                            if (document.querySelector('.col-12.info-analysis-list').childNodes[3].innerText.includes('Team from')) {
                                return document.querySelector('.col-12.info-analysis-list').childNodes[3].innerText.split(':')[1]
                            }
                        } catch (e) {
                            return ' '
                        }
                    }
                );

                // Get all symbols
                const symbol = await page.evaluate(
                    () => {
                        try {
                            if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[1].innerText.includes('Ticker')) {
                                return document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[1].innerText.split(':')[1]
                            }
                        } catch (e) {
                            return ' '
                        }
                    }
                );
        
                // Get all Target Raise
                const target_raise = await page.evaluate(
                    () => {
                        try {
                            if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[7].innerText.includes('Fundraising Goal')) {
                                return parseFloat((document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[7].innerText.split(':')[1].split(' ')[1].replace('USD', ' ')).replace(/,\s?/g, ""))
                            }
                        } catch (e) {
                            return 
                        }
                    }
                );
       
                // Get all Capital Raised
                const capital_raised = await page.evaluate(
                    () => {
                        try {
                            if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[9].innerText.includes('Total Tokens')) {
                                return parseFloat(document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[9].innerText.split(':')[1])
                            }
                        } catch (e) {
                            return 
                        }
                    }
                );
        
                // Team Members
                const tm_count = await page.evaluate(
                    () => {
                        try {
                            if (document.querySelector('.white-desk.ico-desk .row.list .col-12.info-analysis-list').childNodes[1].innerText.includes('Number of Team Members')) {
                                return document.querySelector('.white-desk.ico-desk .row.list .col-12.info-analysis-list').childNodes[1].innerText.split(':')[1]
                            }
                        } catch (e) {
                            return ' '
                        }
                    }
                );
        
                // Token Price ETH
                const tokenpriceETH = await page.evaluate(
                    () => {
                        try {
                            if (document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[5].innerText.includes('ICO Token Price')) {
                                return parseFloat(document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[5].innerText.split(':')[1].split('(')[1].split(" ")[0])
                            }
                        } catch (e) {
                            return 
                        }
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

                console.log("--------")
                console.log(url)   
                console.log(target_raise)                         
                console.log("--------")

                base('ICOs').create({
                    "Coin Name": coinname,
                    "Icon": [
                        {
                            "url": icon
                        }
                    ],
                    "URL": url,
                    "Capital Raised": capital_raised,                    
                    "Presale Start Date": presale_start_date,
                    "Presale End Date": presale_end_date,
                    "Source URLS": " ",
                    "Token Price ETH": tokenpriceETH,
                    "Twitter": twitter,
                    "Facebook Link": " ",
                    "Symbol": symbol,
                    "Description": description,
                    "White Paper LInk": " ",
                    "Target Raise": target_raise,
                    "Market Vertical": marketvertical,
                    "Telegram": telegram,
                    "Blockchain Technology": " ",
                    "Team Members": tm_count,
                    "Country": country
                    }, function(err, record) {
                        if (err) { 
                            console.error(err); return; 
                        }
                        console.log(record.getId());
                    });                
            }
        }    
        await browser.close();
    } catch(err) {
        console.log(url)
        console.error(err);
    }
})();





