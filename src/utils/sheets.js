import { GoogleSpreadsheet } from 'google-spreadsheet';

export const getSheets = async () => {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });

    return doc;
}

export const previewSheets = async (duccs, doc) => {
    await doc.loadInfo();
    console.log("Previewing sheets...");
    const names = Object.keys(duccs);
    //get difference between names and sheets
    const sheetNames = doc.sheetsByIndex.map(sheet => sheet.title);
    const difference = names.filter(name => !sheetNames.includes(name));
    //create sheets for difference
    for( const name of difference) {
        await doc.addSheet({ title: name });
        const sheet = doc.sheetsByTitle[name];
        await sheet.setHeaderRow(["Store", "Price", "Date"]);
    }
}

export const updateSheet = async (book, store, price, doc) => {
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[book];
    sheet.addRow({ Store: store, Price: price, Date: new Date().toLocaleDateString() });
    /* const rows = await sheet.getRows();
    const row = rows.find(row => row.Store === store)
    await sheet.loadCells();
    const column = sheet.headerValues.length;
    const firstEmptyHeader = sheet.getCell(0, column);
    if(sheet.getCell(0, column - 1).value === new Date().toLocaleDateString()) {
        console.log("Already updated today");
        return;
    }
    firstEmptyHeader.value = new Date().toLocaleDateString();
    if(!row) {
        await sheet.addRow({ Store: store, [sheet.headerValues.length]: price });
    } else {
        sheet.getCell(row.rowNumber - 1, column).value = price;
    }
    await sheet.saveUpdatedCells(); */
}