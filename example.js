//moudle
const puppeteer = require('puppeteer');

//標記為 async->可以撰寫await的同步語法
(async () => {
    //await->同步 
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://tw.yahoo.com');
    await page.screenshot({ path: 'example.png' });

    await browser.close();
})();