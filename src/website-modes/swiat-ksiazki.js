
export default async(link, browser) => {
    const page = await browser.newPage();
    await page.goto(link);
    await page.waitForSelector(".price");
    let price = await page.$eval(".price", el => el.innerText);
    price = price.replace(",", ".");
    price = price.replace("zł", "");
    price = parseFloat(price);
    page.close();
    return price;
}