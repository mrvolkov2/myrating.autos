const cars = [
    { name: "Porsche 911", price: 150000, rating: 9.8, img: "🏎️" },
    { name: "Tesla Model S", price: 90000, rating: 9.2, img: "⚡" },
    { name: "BMW M5", price: 110000, rating: 9.5, img: "🇩🇪" },
    { name: "Toyota Camry", price: 35000, rating: 8.5, img: "🇯🇵" }
];

function displayCars(data) {
    const list = document.getElementById('car-list');
    list.innerHTML = ''; // Очищаем список перед отрисовкой

    data.forEach(car => {
        list.innerHTML += `
            <div class="car-card">
                <h2>${car.img} ${car.name}</h2>
                <p class="price">Цена: $${car.price.toLocaleString()}</p>
                <p class="rating">Рейтинг: ${car.rating}/10</p>
            </div>
        `;
    });
}

function sortCars(key) {
    const sorted = [...cars].sort((a, b) => b[key] - a[key]);
    displayCars(sorted);
}

// Первая отрисовка при загрузке
displayCars(cars);