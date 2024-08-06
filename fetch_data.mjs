import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const currentDate = getCurrentDate();
const url = `https://api.onvista.de/api/v1/instruments/STOCK/7049698/times_and_sales?endDate=${currentDate}T23:59:59.000+00:00&idNotation=120471474&order=DESC&startDate=${currentDate}T00:00:00.000+00:00`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const firstPrice = data.price[0];
        const payload = {
            frames: [{
                text: `${firstPrice}€`,
                icon: "4372"
            }]
        };
        writeFileSync('data.json', JSON.stringify(payload, null, 2));
    })
    .catch(error => console.error('Error fetching data:', error));