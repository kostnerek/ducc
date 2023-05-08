import puppeteer from "puppeteer";
import { getSheets, previewSheets, updateSheet } from "./sheets.js";
import { loadJsonFile } from "load-json-file";
import getPrice from "./website-modes/_default.js";

export default async () => {
    const browser = await puppeteer.launch({ headless: "new"});
    const duccs = await loadJsonFile("./src/links.json");

    const sheets = await getSheets();
    await previewSheets(duccs, sheets);

    for( const [book, links] of Object.entries(duccs)) {
        for( const [store, link] of Object.entries(links)) {
            const price = await getPrice(store, link, browser);
            console.log(book, store, price);
            await updateSheet(book, store, price, sheets);
        }
    }
    
    await browser.close();
}