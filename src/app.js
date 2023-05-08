import app from './engine.js';
import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config();

console.log(chalk.green('Starting puppeteer...'));

app().then(() => {
    console.log(chalk.green('Puppeteer finished.'));
});
