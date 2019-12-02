const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    const ticketPlus = "#ticket_228299 > div > span.ticket-quantity.ng-scope > button.btn-default.plus";
    const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout));

    await page.goto('https://kktix.com/users/sign_in?back_to=https://kktix.com/events/fwfle4srt/registrations/new');

    //step1 登入與導頁

    await page.type('#user_login', 'itmrchow@gmail.com');
    await page.type('#user_password', 'Jeff584584886');

    // 直接用waitForNavigation會產生race condition
    // await Promise.all([page.click('input.btn.normal.btn-login'), page.waitForNavigation()]);

    await Promise.all([
        page.click('input.btn.normal.btn-login'),
        page.waitForNavigation(),
        page.waitForSelector(ticketPlus)
    ]);
    await page.screenshot({ path: 'kktix_step1.png', fullPage: true });

    //step2 輸入要買的票和張數
    await page.click(ticketPlus);
    await page.click(ticketPlus);
    await page.click('#person_agree_terms');
    await page.screenshot({ path: 'kktix_step2.png', fullPage: true });

    //step3 時間到送出
    let executionTime = 1575018000000; //執行時間
    let currentTime = (+new Date()); //現在時間
    let timeLeft = executionTime - currentTime; //剩餘時間

    //每一秒檢查一次、剩一分鐘開始點
    var interval = setInterval(function () {
        timeLeft -= 1000;
        console.log("剩餘時間：" + timeLeft); //轉成日期格式
        if (timeLeft <= 10000) {
            //開始點
            //成功
            //失敗
            clearInterval(interval);
        }
        //do whatever here..
    }, 1000);


    // if (1575014700000 <= currentTime) {
    //     await sleep(1575014700000 - currentTime);
    // }
    // await Promise.all([
    //     console.log(new Date()),
    //     page.click('.btn.btn-lg'),
    //     page.waitForNavigation()
    // ]);

    await page.waitForSelector(".reselect-ticket");
    await page.screenshot({ path: 'kktix_step3.png', fullPage: true });

    console.log(page.url());

    await browser.close();
});


