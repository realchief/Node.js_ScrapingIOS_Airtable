const puppeteer = require('puppeteer');
var Airtable = require('airtable');
var recorded_coinnames = []

// AIRTABLE API KEY
const AIRTABLE_API_KEY = 'keys5n8BbkmqN8sn4'

// TEMP ICO DATABASE
const BASE_KEY = 'appzTfyn5SZHuWzqL'
// TEST ICO DATABASE
const BASE_KEY_TEST = 'app5PCFrzosRjP2OY'

var base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(BASE_KEY_TEST);

base('ICOs').select({
    view: 'Grid view'
}).firstPage(function(err, records) {
    if (err) { console.error(err); return; }
    records.forEach(function(record) {
        let coinName = record.get('Coin Name');
        recorded_coinnames.push(coinName);
    });
      
    debugger;

    (async () => {
        console.log(recorded_coinnames[5]);

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
    
                    //Get all urls of ICODrops
                    const icodropsurl = await page.evaluate(
                        () => {
                            try {
                                return document.querySelector('.ico-row .ico-right-col a:nth-child(2)').href
                            } catch (e) {
                                return 
                            }
                        }
                    );
    
                    // //Get all urls of whitepapers
                    const whitepapersurl = await page.evaluate(
                        () => {
                            try {
                                return document.querySelectorAll('#middle-desk .ico-right-col > a')[1].href
                            } catch (e) {
                                return 
                            }
                        }
                    );
    
                    //Get all urls of facebook
                    const facebookurl = await page.evaluate(
                        () => {
                            try {
                                return document.querySelector('.soc_links a').href
                            } catch (e) {
                                return 
                            }
                        }
                    );
                
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
                                return document.querySelector('.row.list .col-12.title-h4 h4').innerText.split(':')[1].split('–')[0] + ',2018'
                            } catch (e) {
                                return 
                            }
                        }
                    );     
    
                    // Get all end dates of Token Sale
                    const presale_end_date = await page.evaluate(
                        () => {
                            try {
                                return document.querySelector('.row.list .col-12.title-h4 h4').innerText.split(':')[1].split('–')[1] + ',2018'
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
                                    return parseFloat(document.querySelector('.white-desk.ico-desk .row.list .col-12.col-md-6').childNodes[9].innerText.split(':')[1].split(' ')[1].replace(/,\s?/g, ""))
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
                    
                    //Get all urls of github
                    const githuburl = await page.evaluate(
                        () => {
                            try {
                                let social_len = document.querySelector('.soc_links').childNodes.length
                                for (i = 1; i < social_len -2; i += 2){
                                    if (document.querySelector('.soc_links').childNodes[i].href.includes('github')) {
                                        return document.querySelector('.soc_links').childNodes[i].href                                    
                                    }
                                }
                            } catch (e) {
                                return 
                            }
                        }
                    );
            
                //Get all urls of twitter
                    const twitterurl = await page.evaluate(
                        () => {
                            try {
                                let social_len = document.querySelector('.soc_links').childNodes.length
                                for (i = 1; i < social_len - 2; i += 2){
                                    if (document.querySelector('.soc_links').childNodes[i].href.includes('twitter')) {
                                        return document.querySelector('.soc_links').childNodes[i].href                                    
                                    }
                                }
                            } catch (e) {
                                return 
                            }
                        }
                    );               
                    
                    //Get all urls of telegram
                    const telegramurl = await page.evaluate(
                        () => {
                            try {
                                let social_len = document.querySelector('.soc_links').childNodes.length
                                for (i = 1; i < social_len - 2; i += 2){
                                    if (document.querySelector('.soc_links').childNodes[i].href.includes('t.me')) {
                                        return document.querySelector('.soc_links').childNodes[i].href                                    
                                    }
                                }
                            } catch (e) {
                                return 
                            }
                        }
                    );
    
                    console.log("--------")
                    console.log(url)  
                    console.log(whitepapersurl)  
                    console.log(capital_raised)                                
                    console.log("--------")                
    
                    base('ICOs').create({
                        "Coin Name": coinname,
                        "Icon": [
                            {
                                "url": icon
                            }
                        ],
                        "URL": icodropsurl,
                        "Capital Raised": capital_raised,                    
                        "Presale Start Date": presale_start_date,
                        "Presale End Date": presale_end_date,
                        "Facebook Link": facebookurl,
                        "Source URLS": " ",
                        "Token Price ETH": tokenpriceETH,
                        "Twitter": twitterurl,
                        "Code Repository URL": githuburl,                    
                        "Symbol": symbol,
                        "Description": description,
                        "White Paper LInk": whitepapersurl,
                        "Target Raise": target_raise,
                        "Market Vertical": marketvertical,
                        "Telegram": telegramurl,
                        "Blockchain Technology": " ",
                        "Team Members": tm_count,
                        "Country": country
                        }, function(err, record) {
                            if (err) { 
                                console.error(err); return; 
                            }
                            console.log(record.getId());
                            console.log(record.get('Coin Name'));
                        }
                    );                
                }
            }    
            await browser.close();
        } catch(err) {
            console.log(url)
            console.error(err);
        }

    })();

});

