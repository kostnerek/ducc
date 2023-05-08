
export default async(link, browser) => {
    const page = await browser.newPage();
    await page.goto(link);
    await page.waitForXPath("//*[@id='right-sidebar']/div[1]/form/div/div[1]/span/strong");
    const priceHandle = await page.$x("//*[@id='right-sidebar']/div[1]/form/div/div[1]/span/strong", el => el.innerText);
    let price = await page.evaluate(el => el.innerText, priceHandle[0]);
    price = price.replace(",", ".");
    price = price.replace("zł", "");
    price = parseFloat(price);
    page.close();
    return price;
}