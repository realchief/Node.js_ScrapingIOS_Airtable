# Scraping data from ICODrops.com and storing in Airtable

## Getting Started

-Node.js installation(>v7.6.0)

Caution: Puppeteer requires at least Node v6.4.0, but the examples below use async/await which is only supported in Node v7.6.0 or greater.
```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

sudo apt-get install nodejs

sudo apt-get install build-essential
```
-install packages
```
npm install 
```
-Generate key in airtable.com and configuration

for example:
```
const AIRTABLE_API_KEY = 'keyxxxxxxxxxxxxxx'
const BASE_KEY = 'appzxxxxxxxxxxx'
```

## Running scraper

-To run this scraper:
```
node scrapingICO.js
```