import puppeteer from "puppeteer";
import { loadJsonFile } from "load-json-file";
import getPrice from "./website-modes/_default.js";

export default async () => {
    const browser = await puppeteer.launch({ headless: "new"});
    const duccs = await loadJsonFile("./src/links.json");

    const result = {};

    for( const [book, links] of Object.entries(duccs)) {
        for( const [store, link] of Object.entries(links)) {
            const price = await getPrice(store, link, browser);
            console.log(book, store, price);
            if (price === 0) continue;
            result[book] = { ...result[book], [store]: price}
        }
    }
    await browser.close();
    return result
}