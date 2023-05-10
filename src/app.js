import engineK from './engineK.js';
import { parseDataK, parseDataWSKD } from './mail/parseData.js'
import sendMail from './mail/mailSender.js'
import chalk from 'chalk';
import dotenv from 'dotenv';
import scrapeWSKD from './engineWSKD.js';
dotenv.config();

console.log(chalk.green('Starting puppeteer...'));

/* engineK().then(async (result) => {
    console.log(chalk.green('Puppeteer finished.'));
    const date = new Date();
    const dateString = date.toISOString().slice(0, 10);    
    const html = await parseDataK(result)
    sendMail(process.env.MAIL_TO, `🔥Ceny kaczorków - Kaczogród [${dateString}]🔥`, html)
}); */


scrapeWSKD().then(async (result) => {
    const date = new Date();
    const dateString = date.toISOString().slice(0, 10); 
    const html = await parseDataWSKD(result);
    sendMail(process.env.MAIL_TO, `🔥Ceny kaczorków - Wujek Sknerus i Kaczor Donald [${dateString}]🔥`, html);
});