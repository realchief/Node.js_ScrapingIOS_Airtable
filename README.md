# Scraping data from ICODrops.com and storing in Airtable

## Getting Started

-Node.js installation(>v6.4.0)

Caution: Puppeteer requires at least Node v6.4.0, but the examples below use async/await which is only supported in Node v7.6.0 or greater.
```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

sudo apt-get install nodejs

sudo apt-get install build-essential
```
-install puppetter 
```
npm install puppeteer
```
-install airtable
```
npm install airtable
```
## Generate key in airtable and configuration in code

## Running scraper

-To run this scraper:
```
node scrapingICO.js
```