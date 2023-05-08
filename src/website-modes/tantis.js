
export default async(link, browser) => {
    const page = await browser.newPage();
    await page.goto(link);
    await page.waitForSelector(".price");
    const price = await page.$eval(".price", el => el.innerText);
    page.close();
    return parseFloat(price.replace(",", "."));
}