import app from './engine.js';
import { parseData } from './mail/parseData.js'
import sendMail from './mail/mailSender.js'
import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config();

console.log(chalk.green('Starting puppeteer...'));

app().then(async (result) => {
    console.log(chalk.green('Puppeteer finished.'));
    const date = new Date();
    const dateString = date.toISOString().slice(0, 10);
    const html = await parseData(result)
    sendMail("filip.kostecki00@gmail.com", `Ceny kaczorków z dnia ${dateString}`, html)
});
