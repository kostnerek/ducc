import puppeteer from "puppeteer";

export default async () => {
    const url = 'https://lubimyczytac.pl/cykl/23598/wujek-sknerus-i-kaczor-donald'
    const browser = await puppeteer.launch({ headless: 'new'});
    const page = await browser.newPage();
    await page.goto(url);
    
    const result = await page.evaluate(() => {
        const books = [];
        document.querySelectorAll('.authorAllBooks__singleTextTitle').forEach((book) => {
            const bookUrl = 'https://lubimyczytac.pl' + book.getAttribute('href');
            books.push(bookUrl);
        });
        return books;
    }).then(async (books) => {
        const bookPrices = [];
        for (let i = 0; i < books.length; i++) {
            console.log(`Scraping ${i+1}/${books.length}`);
            const bookPage = await browser.newPage();
            await bookPage.goto(books[i]);
            await bookPage.waitForSelector('#buybox-bookstores-lowest-price>div>a>div:nth-child(3)>div');
            const bookResult = await bookPage.evaluate(() => {
                return document.querySelector('#buybox-bookstores-lowest-price>div>a>div:nth-child(3)>div').innerText;
            });
            const bookTitle = await bookPage.evaluate(() => {
                return document.querySelector('.book__title').innerText;
            });
            const bookLink = await bookPage.evaluate(() => {
                return document.querySelector('.bookstore').getAttribute('href');
            });

            const bookPrice = parseFloat(bookResult.replace("\n", "").replace(",", ".").replace("zł", ""));
            bookPrices.push({bookTitle, bookPrice, bookLink});
            bookPage.close();
        }
        return bookPrices;
    })
    browser.close();
    return result;
}