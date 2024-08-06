import fetch from 'node-fetch';
import { writeFileSync, readFileSync, existsSync } from 'fs';

function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getPreviousDate() {
    const now = new Date();
    now.setDate(now.getDate() - 1); // Go back one day
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const currentDate = getCurrentDate();
const previousDate = getPreviousDate();

const urlToday = `https://api.onvista.de/api/v1/instruments/STOCK/7049698/times_and_sales?endDate=${currentDate}T23:59:59.000+00:00&idNotation=120471474&order=DESC&startDate=${currentDate}T00:00:00.000+00:00`;
const urlYesterday = `https://api.onvista.de/api/v1/instruments/STOCK/7049698/times_and_sales?endDate=${previousDate}T23:59:59.000+00:00&idNotation=120471474&order=DESC&startDate=${previousDate}T00:00:00.000+00:00`;

async function fetchData() {
    try {
        // Fetch today's data
        const responseToday = await fetch(urlToday);
        const dataToday = await responseToday.json();
        const firstPriceToday = dataToday.price[0];

        // Load the previous day's price from a file
        let firstPriceYesterday;
        if (existsSync('previous_day_price.json')) {
            const data = readFileSync('previous_day_price.json');
            const savedData = JSON.parse(data);
            // Check if the saved date is the previous date
            if (savedData.date === previousDate) {
                firstPriceYesterday = savedData.price;
            } else {
                // Fetch yesterday's data if the saved date is not the previous date
                const responseYesterday = await fetch(urlYesterday);
                const dataYesterday = await responseYesterday.json();
                firstPriceYesterday = dataYesterday.price[0];
                // Save the updated previous day price
                const previousDayPrice = {
                    date: previousDate,
                    price: firstPriceYesterday
                };
                writeFileSync('previous_day_price.json', JSON.stringify(previousDayPrice, null, 2));
            }
        } else {
            // Fetch yesterday's data if the file doesn't exist
            const responseYesterday = await fetch(urlYesterday);
            const dataYesterday = await responseYesterday.json();
            firstPriceYesterday = dataYesterday.price[0];
            // Save the previous day price
            const previousDayPrice = {
                date: previousDate,
                price: firstPriceYesterday
            };
            writeFileSync('previous_day_price.json', JSON.stringify(previousDayPrice, null, 2));
        }

        // Calculate percentage difference
        const percentageDifference = ((firstPriceToday - firstPriceYesterday) / firstPriceYesterday) * 100;

        const payload = {
            frames: [{
                text: `${firstPriceToday}€`,
                icon: "4372"
            },
            {
                text: `${percentageDifference.toFixed(2)}%`,
                icon: "27427"
            }]
        };

        writeFileSync('data.json', JSON.stringify(payload, null, 2));

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
