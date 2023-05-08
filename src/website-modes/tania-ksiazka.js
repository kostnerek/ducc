
export default async(link, browser) => {
    const page = await browser.newPage();
    await page.goto(link);
    await page.waitForSelector("#updateable_price-zl");
    let price = await page.$eval("#updateable_price-zl", el => el.innerText);
    price+= "."
    price+= await page.$eval("#updateable_price-gr", el => el.innerText);
    page.close();
    return parseFloat(price);
}