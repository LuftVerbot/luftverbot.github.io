const fetch = require('node-fetch');
const fs = require('fs');

const url = "https://api.onvista.de/api/v1/instruments/STOCK/7049698/times_and_sales?endDate=2024-08-05T23:59:59.000+00:00&idNotation=120471474&order=DESC&startDate=2024-08-05T00:00:00.000+00:00";

fetch(url)
    .then(response => response.json())
    .then(data => {
        const firstPrice = data.price[0];
        const payload = {
            frames: [{
                text: `Price: €${firstPrice}`,
                icon: "i555"
            }]
        };
        fs.writeFileSync('data.json', JSON.stringify(payload, null, 2));
    })
    .catch(error => console.error('Error fetching data:', error));
