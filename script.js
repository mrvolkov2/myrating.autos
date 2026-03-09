const defaultCars = [
    { name: "Porsche 911 GT3", price: 190000, rating: 9.9 },
    { name: "Bugatti Chiron", price: 3000000, rating: 9.7 },
    { name: "Toyota AE86", price: 15000, rating: 9.5 },
    { name: "Tesla Cybertruck", price: 100000, rating: 6.8 },
    { name: "BMW M5 CS", price: 145000, rating: 9.6 },
    { name: "Toyota Camry", price: 35000, rating: 9.2 },
    { name: "Hyundai Solaris", price: 18000, rating: 8.1 },
    { name: "Volkswagen Golf GTI", price: 32000, rating: 8.9 },
    { name: "Lada Vesta NG", price: 14000, rating: 7.6 },
    { name: "Nissan Skyline GT-R", price: 80000, rating: 9.8 }
];

let cars = JSON.parse(localStorage.getItem('myrating_db')) || defaultCars;

function render(data = cars) {
    const list = document.getElementById('car-list');
    const emptyState = document.getElementById('empty-state');
    const statsCount = document.getElementById('stats-count');
    
    list.innerHTML = '';
    statsCount.innerText = `Авто в базе: ${data.length}`;

    if (data.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        data.forEach((car, index) => {
            const rClass = car.rating >= 9 ? 'rating-high' : (car.rating >= 8 ? 'rating-mid' : 'rating-low');
            list.innerHTML += `
                <div class="car-card">
                    <h2>${car.name}</h2>
                    <p>💰 Цена: <strong>$${Number(car.price).toLocaleString()}</strong></p>
                    <p>⭐ Рейтинг: <span class="${rClass}">${car.rating}/10</span></p>
                    <button class="btn-delete" onclick="deleteCar(${index})">Удалить</button>
                </div>
            `;
        });
    }

    updateDashboard();
    localStorage.setItem('myrating_db', JSON.stringify(cars));
}

function updateDashboard() {
    if (cars.length === 0) {
        document.getElementById('avg-price').innerText = '$0';
        document.getElementById('top-car').innerText = '—';
        document.getElementById('total-value').innerText = '$0';
        return;
    }

    const total = cars.reduce((sum, car) => sum + car.price, 0);
    const sortedByRating = [...cars].sort((a, b) => b.rating - a.rating);
    const top = sortedByRating[0];
    const avg = total / cars.length;

    document.getElementById('avg-price').innerText = `$${Math.round(avg).toLocaleString()}`;
    document.getElementById('top-car').innerText = top.name;
    document.getElementById('total-value').innerText = `$${total.toLocaleString()}`;
}

function addCar() {
    const name = document.getElementById('car-name').value;
    const price = document.getElementById('car-price').value;
    const rating = document.getElementById('car-rating').value;

    if (name && price && rating) {
        cars.push({ name, price: Number(price), rating: Number(rating) });
        render();
        document.querySelectorAll('.add-form input').forEach(i => i.value = '');
    }
}

function deleteCar(index) {
    cars.splice(index, 1);
    render();
}

function filterCars() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = cars.filter(c => c.name.toLowerCase().includes(query));
    render(filtered);
}

function sortCars(key) {
    cars.sort((a, b) => b[key] - a[key]);
    render();
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('myrating_theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

function clearAll() {
    if(confirm("Удалить все данные?")) {
        cars = [];
        render();
    }
}

function restoreDefaults() {
    cars = [...defaultCars];
    render();
}

// Запуск
if (localStorage.getItem('myrating_theme') === 'light') document.body.classList.add('light-theme');
render();