
export default async(link, browser) => {
    const page = await browser.newPage();
    await page.goto(link);
    await page.waitForSelector(".productPriceInfo__price");
    const price = await page.$eval(".productPriceInfo__price", el => el.innerText);
    page.close();
    return parseFloat(price.replace(",", ".").replace("zł", ""));
}