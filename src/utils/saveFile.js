import fs from 'fs';

export const saveObjectToJsonFile = (obj) => {
    const date = new Date();
    const dateString = date.toISOString().slice(0, 10);
    const filename = `./results/${dateString}.json`;
    const json = JSON.stringify(obj);
    fs.writeFile(filename, json, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`File ${filename} has been saved.`);
    });
}