import chalk from "chalk";
import tantis from "./tantis.js";
import empik from "./empik.js";
import taniaKsiazka from "./tania-ksiazka.js";
import swiatKsiazki from "./swiat-ksiazki.js";
import bonito from "./bonito.js";
import gandalf from "./gandalf.js";


export default async (mode, link, browser) => {
    console.log(chalk.bgGreen.black(`MODE: ${mode}`));
    console.log(chalk.bgGreen.black(`LINK: ${link}`));
    switch (mode) {
        case "tantis":
            return await tantis(link, browser);
        case "empik":
            return await empik(link, browser);
        case "tania-ksiazka":
            return await taniaKsiazka(link, browser);
        case "swiat-ksiazki":
            return await swiatKsiazki(link, browser);
        case "bonito":
            return await bonito(link, browser);
        case "gandalf":
            return await gandalf(link, browser);
        default:
            console.log(chalk.bgRedBright.black(`ERROR: Invalid mode: ${mode} specified!`));
            break;
    }
}