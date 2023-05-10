import { loadJsonFile } from "load-json-file";

const capitalize = (str)=>{
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const sortBooksByPrice = (books) => {
    const entries = Object.entries(books);
    entries.sort((a, b) => a[1][Object.keys(a[1])[0]].price - b[1][Object.keys(b[1])[0]].price);
    return Object.fromEntries(entries);
}

const sumOfPrices = (books) => {
    return Object.entries(books).reduce((acc, [book, stores]) => {
        return acc + Object.entries(stores).reduce((acc, [store, {price}]) => {
            return acc + price;
        }, 0);
    }, 0);
}


export const parseDataK = async (duccs) => {
    const date = new Date();
    const dateString = date.toISOString().slice(0, 10);
    const duccsLinks = await loadJsonFile("./src/links.json");

    const parsed = {};
    //get cheapest price for each ducc
    for( const [book, stores] of Object.entries(duccs)) {
        const cheapestStore = Object.keys(stores).reduce((a, b) => stores[a] < stores[b] ? a : b);
        parsed[book] = { [cheapestStore]: stores[cheapestStore] };
    }

    //get links for each ducc
    for( const [book, stores] of Object.entries(duccsLinks)) {
        for( const [store, link] of Object.entries(stores)) {
            if (parsed[book] && parsed[book][store]) {
                parsed[book][store] = { price: parsed[book][store], link };
            }
        }
    }

    const parsedByPrice = sortBooksByPrice(parsed)

    // mail html
    return `
        <html>
            <head>
                <style>
                    table, th, td {
                        border: 1px solid black;
                        border-collapse: collapse;
                    }
                    th, td {
                        padding: 5px;
                        text-align: left;
                    }
                </style>
            </head>
            
            <body>
                <h1>Najtańsze ceny dnia ${dateString}</h1>
                <table>
                    <tr>
                        <th>Tytuł</th>
                        <th>Sklep</th>
                        <th>Cena</th>
                        <th>Link</th>
                    </tr>
                    ${Object.entries(parsedByPrice).map(([book, stores]) => {
                        return Object.entries(stores).map(([store, {price, link}]) => {
                            return `
                                <tr>
                                    <td><strong>${book}</strong></td>
                                    <td>${capitalize(store.replace("-", " "))}</td>
                                    <td>${price} zł</td>
                                    <td><a href="${link}">Link</a></td>
                                </tr>
                            `
                        }).join('');
                    }).join('')}
                </table>
                <h3>Suma ${sumOfPrices(parsed).toFixed(2)} zł</h3>
            </body>
        </html>
    `
}

export const parseDataWSKD = async (duccs) => {
    const date = new Date();
    const dateString = date.toISOString().slice(0, 10);

    const sumOfPrices = (books) => {
        return books.reduce((acc, {bookPrice}) => {
            return acc + bookPrice;
        }, 0);
    }

    return `
        <html>
            <head>
                <style>
                    table, th, td {
                        border: 1px solid black;
                        border-collapse: collapse;
                    }
                    th, td {
                        padding: 5px;
                        text-align: left;
                    }
                </style>
            </head>
            <body>
                <h1>Najtańsze ceny dnia ${dateString}</h1>
                <table>
                    <tr>
                        <th><strong>Tytuł</strong></th>
                        <th><strong>Cena</strong></th>
                        <th><strong>Link</strong></th>
                    </tr>
                    ${duccs.map((book) => {
                        const index = duccs.indexOf(book);
                        return `<tr>
                            <td><strong>${index}. Wujek Sknerus i Kaczor Donald - ${book.bookTitle}</strong></td>
                            <td>${book.bookPrice} zł</td>
                            <td><a href='${book.bookLink}'>Link</a></td>
                        </tr>`
                    }).join('')}
                </table>
                <h3>Suma ${sumOfPrices(duccs).toFixed(2)} zł</h3>
            </body>
        </html>
    `;
}