const url = "https://api.onvista.de/api/v1/instruments/STOCK/7049698/times_and_sales?endDate=2024-08-05T23:59:59.000+00:00&idNotation=120471474&order=DESC&startDate=2024-08-05T00:00:00.000+00:00";

fetch(url)
    .then(response => response.json())
    .then(data => {
        const firstPrice = data.price[0];
        document.getElementById('price-display').innerText = `Price: €${firstPrice}`;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('price-display').innerText = 'Error loading price';
    });
