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

const urlToday = `https://mein.finanzen-zero.net/api/quote`;
const urlYesterday = `https://mein.finanzen-zero.net/api/trading/positions?customerId=4500688&withProtectionInfo=true`;

async function fetchData() {
    try {
        // Fetch today's data
        const responseToday = await fetch(urlToday, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://mein.finanzen-zero.net',
                'Cookie': '__i=eyJraWQiOiJMOTlscmJoZE51Z3dJRzV0VjdMR3dDXC85VFFQYTl0VFRBWlwvK3hwQitaZVE9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJmZDQzOGE5MS01NzRhLTQ2ODItOTFkZS0zMTQ4M2Q5OGU4NGIiLCJjb2duaXRvOmdyb3VwcyI6WyJLdW5kZW4iXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xX1c3WkRoM0FsMSIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwicHJtIjoie1wiNDUwMDY4OFwiOntcImFjY1wiOlwiNDUwMDY4ODAwOVwiLFwib3duZXJcIjp0cnVlLFwiZmlyc3ROYW1lXCI6XCJKZXJlbXkgQ2hyaXN0b3BoZXJcIixcImxhc3ROYW1lXCI6XCJOb3NhbFwiLFwiZGVwXCI6XCJLNDUwMDY4ODAwMVwifX0iLCJjb2duaXRvOnVzZXJuYW1lIjoiNTMzcTE4NSIsImF1ZCI6Ijc5bDUzcGRhdW8yb2Z2cG5pbGVoMThhbTJpIiwiZXZlbnRfaWQiOiJmMWUxMzViZi0xM2FmLTQ3ZTEtYWI1NC0wZDZlYjM3ZDZiMjgiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcyMjk0MDcxNSwicGhvbmVfbnVtYmVyIjoiKzQ5MTc2MzQ0NTk1NDIiLCJleHAiOjE3MjI5NTA3NTMsImlhdCI6MTcyMjk0NzE1MywiZW1haWwiOiJqYXJlbWEuam5AZ21haWwuY29tIn0.KkAee0gHjJLKDKxDY5FMPYYBvSxdZv6f_gngTQSEXNZGETvOqlmVuM3ZTH-lqnHFDfte1J8kl1IXy5TNxt8eXALB0Za_QSmMKOOuBGL70h-1KGqwjbeABDNkECXI-0eUa4j5_34xV0_yppLdFAd4pt9DWUUXkY134XBcswipHeQLmkIbxk4hk4Mqq-oTqN3z8sk4L2Uic7ta1uUTK5STq6fGcDEVqgq7lMFm71Z__8vo6-pg6jgYgWjWXVcD659y3l-NTG2uOGnPRz5zgu6HnzHGyAO3aChXDols3SVgKQvbvdxpuE2OG9qSwb7iC3TFw3sqICaS191qcIwGglRz9Q'
            },
            body: JSON.stringify(["CNE100000296"])
        });
        const dataToday = await responseToday.json();
        const firstPriceToday = dataToday["CNE100000296"].b;

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
                const responseYesterday = await fetch(urlYesterday, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cookie': '__i=eyJraWQiOiJMOTlscmJoZE51Z3dJRzV0VjdMR3dDXC85VFFQYTl0VFRBWlwvK3hwQitaZVE9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJmZDQzOGE5MS01NzRhLTQ2ODItOTFkZS0zMTQ4M2Q5OGU4NGIiLCJjb2duaXRvOmdyb3VwcyI6WyJLdW5kZW4iXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xX1c3WkRoM0FsMSIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwicHJtIjoie1wiNDUwMDY4OFwiOntcImFjY1wiOlwiNDUwMDY4ODAwOVwiLFwib3duZXJcIjp0cnVlLFwiZmlyc3ROYW1lXCI6XCJKZXJlbXkgQ2hyaXN0b3BoZXJcIixcImxhc3ROYW1lXCI6XCJOb3NhbFwiLFwiZGVwXCI6XCJLNDUwMDY4ODAwMVwifX0iLCJjb2duaXRvOnVzZXJuYW1lIjoiNTMzcTE4NSIsImF1ZCI6Ijc5bDUzcGRhdW8yb2Z2cG5pbGVoMThhbTJpIiwiZXZlbnRfaWQiOiJmMWUxMzViZi0xM2FmLTQ3ZTEtYWI1NC0wZDZlYjM3ZDZiMjgiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcyMjk0MDcxNSwicGhvbmVfbnVtYmVyIjoiKzQ5MTc2MzQ0NTk1NDIiLCJleHAiOjE3MjI5NTA3NTMsImlhdCI6MTcyMjk0NzE1MywiZW1haWwiOiJqYXJlbWEuam5AZ21haWwuY29tIn0.KkAee0gHjJLKDKxDY5FMPYYBvSxdZv6f_gngTQSEXNZGETvOqlmVuM3ZTH-lqnHFDfte1J8kl1IXy5TNxt8eXALB0Za_QSmMKOOuBGL70h-1KGqwjbeABDNkECXI-0eUa4j5_34xV0_yppLdFAd4pt9DWUUXkY134XBcswipHeQLmkIbxk4hk4Mqq-oTqN3z8sk4L2Uic7ta1uUTK5STq6fGcDEVqgq7lMFm71Z__8vo6-pg6jgYgWjWXVcD659y3l-NTG2uOGnPRz5zgu6HnzHGyAO3aChXDols3SVgKQvbvdxpuE2OG9qSwb7iC3TFw3sqICaS191qcIwGglRz9Q'
                    }
                });
                const dataYesterday = await responseYesterday.json();
                const instrument = dataYesterday.instruments.find(inst => inst.isin === "CNE100000296");
                firstPriceYesterday = instrument.historicQuotes[0].bid;
                // Save the updated previous day price
                const previousDayPrice = {
                    date: previousDate,
                    price: firstPriceYesterday
                };
                writeFileSync('previous_day_price.json', JSON.stringify(previousDayPrice, null, 2));
            }
        } else {
            // Fetch yesterday's data if the file doesn't exist
            const responseYesterday = await fetch(urlYesterday, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': '__i=eyJraWQiOiJMOTlscmJoZE51Z3dJRzV0VjdMR3dDXC85VFFQYTl0VFRBWlwvK3hwQitaZVE9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJmZDQzOGE5MS01NzRhLTQ2ODItOTFkZS0zMTQ4M2Q5OGU4NGIiLCJjb2duaXRvOmdyb3VwcyI6WyJLdW5kZW4iXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xX1c3WkRoM0FsMSIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwicHJtIjoie1wiNDUwMDY4OFwiOntcImFjY1wiOlwiNDUwMDY4ODAwOVwiLFwib3duZXJcIjp0cnVlLFwiZmlyc3ROYW1lXCI6XCJKZXJlbXkgQ2hyaXN0b3BoZXJcIixcImxhc3ROYW1lXCI6XCJOb3NhbFwiLFwiZGVwXCI6XCJLNDUwMDY4ODAwMVwifX0iLCJjb2duaXRvOnVzZXJuYW1lIjoiNTMzcTE4NSIsImF1ZCI6Ijc5bDUzcGRhdW8yb2Z2cG5pbGVoMThhbTJpIiwiZXZlbnRfaWQiOiJmMWUxMzViZi0xM2FmLTQ3ZTEtYWI1NC0wZDZlYjM3ZDZiMjgiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcyMjk0MDcxNSwicGhvbmVfbnVtYmVyIjoiKzQ5MTc2MzQ0NTk1NDIiLCJleHAiOjE3MjI5NTA3NTMsImlhdCI6MTcyMjk0NzE1MywiZW1haWwiOiJqYXJlbWEuam5AZ21haWwuY29tIn0.KkAee0gHjJLKDKxDY5FMPYYBvSxdZv6f_gngTQSEXNZGETvOqlmVuM3ZTH-lqnHFDfte1J8kl1IXy5TNxt8eXALB0Za_QSmMKOOuBGL70h-1KGqwjbeABDNkECXI-0eUa4j5_34xV0_yppLdFAd4pt9DWUUXkY134XBcswipHeQLmkIbxk4hk4Mqq-oTqN3z8sk4L2Uic7ta1uUTK5STq6fGcDEVqgq7lMFm71Z__8vo6-pg6jgYgWjWXVcD659y3l-NTG2uOGnPRz5zgu6HnzHGyAO3aChXDols3SVgKQvbvdxpuE2OG9qSwb7iC3TFw3sqICaS191qcIwGglRz9Q'
            });
            const dataYesterday = await responseYesterday.json();
            const instrument = dataYesterday.instruments.find(inst => inst.isin === "CNE100000296");
            firstPriceYesterday = instrument.historicQuotes[0].bid;
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