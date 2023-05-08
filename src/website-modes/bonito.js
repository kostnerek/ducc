
export default async(link, browser) => {
    const page = await browser.newPage();
    await page.goto(link);
    await page.waitForSelector(".H1B");
    let price = await page.$eval(".H1B", el => el.innerText);
    page.close();
    price = price.replace(",", ".");
    price = price.replace("zł", "");
    price = parseFloat(price);
    return price;
}