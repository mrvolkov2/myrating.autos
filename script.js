const defaultCars = [
    { name: "Porsche 911", price: 150000, rating: 9.8 },
    { name: "Tesla Cybertruck", price: 100000, rating: 6.5 },
    { name: "Toyota Camry", price: 35000, rating: 9.2 },
    { name: "Toyota AE86", price: 15000, rating: 9.5 },
    { name: "Hyundai Solaris", price: 17500, rating: 8.1 },
    { name: "Kia Rio", price: 17000, rating: 8.0 },
    { name: "Volkswagen Polo", price: 19000, rating: 8.4 },
    { name: "Lada Vesta", price: 12000, rating: 7.5 }
];

let cars = JSON.parse(localStorage.getItem('auto_pro_db')) || defaultCars;

// Главная функция отрисовки
function render(data = cars) {
    const list = document.getElementById('car-list');
    list.innerHTML = '';

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

    updateDashboard();
    localStorage.setItem('auto_pro_db', JSON.stringify(cars));
}

// Обновление статистики (Dashboard)
function updateDashboard() {
    if (cars.length === 0) {
        document.getElementById('avg-price').innerText = '$0';
        document.getElementById('top-car').innerText = '—';
        document.getElementById('total-value').innerText = '$0';
        return;
    }

    const total = cars.reduce((sum, car) => sum + car.price, 0);
    const top = [...cars].sort((a, b) => b[rating] - a[rating])[0] || cars[0];
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
    localStorage.setItem('auto_theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

function clearAll() {
    if(confirm("Внимание! Это удалит все данные из твоего рейтинга. Продолжить?")) {
        cars = [];
        render();
    }
}

// Запуск при загрузке
if (localStorage.getItem('auto_theme') === 'light') document.body.classList.add('light-theme');
render();