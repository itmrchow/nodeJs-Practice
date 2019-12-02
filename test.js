const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.goto('https://www.google.com');

    // Type into search box.
    await page.type('input.gLFyf.gsfi', '光頭哥哥');
    await page.keyboard.press('Enter');

    //等導頁完成
    await page.waitForNavigation()

    await page.screenshot({ path: 'test.png' });

    await browser.close();
});