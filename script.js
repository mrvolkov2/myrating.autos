const defaultCars = [
    { name: "Porsche 911 GT3", price: 195000, rating: 9.9 },
    { name: "BMW M5 F90", price: 105000, rating: 9.7 },
    { name: "Toyota LC 300", price: 110000, rating: 9.2 },
    { name: "Tesla Model S", price: 85000, rating: 8.5 },
    { name: "Audi RS6 Avant", price: 125000, rating: 9.6 },
    { name: "Mercedes G63", price: 210000, rating: 9.4 },
    { name: "Nissan GT-R", price: 115000, rating: 9.5 },
    { name: "Toyota Camry", price: 32000, rating: 9.1 },
    { name: "VW Golf R", price: 48000, rating: 9.0 },
    { name: "Ford Mustang", price: 45000, rating: 8.7 },
    { name: "Mazda CX-5", price: 29000, rating: 8.8 },
    { name: "Lexus RX 350", price: 68000, rating: 9.0 },
    { name: "Honda Civic R", price: 44000, rating: 9.3 },
    { name: "Subaru WRX STI", price: 38000, rating: 8.9 },
    { name: "Kia Stinger", price: 35000, rating: 8.2 },
    { name: "Volvo XC90", price: 72000, rating: 9.1 },
    { name: "Hyundai Ioniq 5", price: 50000, rating: 8.6 },
    { name: "Skoda Octavia RS", price: 34000, rating: 8.9 },
    { name: "Dodge Challenger", price: 55000, rating: 8.4 },
    { name: "Land Rover Defender", price: 88000, rating: 9.2 }
];

let cars = JSON.parse(localStorage.getItem('myrating_v3_db')) || defaultCars;

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    document.getElementById('theme-icon').src = isLight ? 'theme_night.png' : 'theme_light.png';
    localStorage.setItem('myrating_theme', isLight ? 'light' : 'dark');
}

function calculateAndAdd() {
    const name = document.getElementById('car-name').value;
    const price = Number(document.getElementById('car-price').value);
    const year = Number(document.getElementById('car-year').value);
    const mileage = Number(document.getElementById('car-mileage').value);
    const condition = Number(document.getElementById('car-condition').value);

    if (name && price && year) {
        let score = 10;
        const age = 2026 - year;
        score -= (age * 0.3);
        const normalMileage = age * 18;
        if (mileage > normalMileage) score -= (mileage - normalMileage) / 50;
        score = score * condition;
        const finalRating = Math.max(0, Math.min(10, score)).toFixed(1);
        
        cars.push({ name, price: Number(price), rating: Number(finalRating) });
        render();
        document.querySelectorAll('.add-form input').forEach(i => i.value = '');
    } else {
        alert("Заполните название, цену и год!");
    }
}

function render(data = cars) {
    const list = document.getElementById('car-list');
    const statsCount = document.getElementById('stats-count');
    list.innerHTML = '';
    statsCount.innerText = `Авто в списке: ${data.length}`;

    data.forEach((car, index) => {
        list.innerHTML += `
            <div class="car-card">
                <h2>${car.name}</h2>
                <p>Цена: <strong>$${car.price.toLocaleString()}</strong></p>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;">
                    <div style="font-size:1.5rem; font-weight:900; color:var(--primary);">${car.rating}</div>
                    <button onclick="deleteCar(${index})" style="background:none; border:1px solid var(--danger); color:var(--danger); padding:5px 10px; border-radius:8px; cursor:pointer;">Удалить</button>
                </div>
            </div>`;
    });
    updateDashboard();
    localStorage.setItem('myrating_v3_db', JSON.stringify(cars));
}

function updateDashboard() {
    if (cars.length === 0) return;
    const total = cars.reduce((sum, car) => sum + car.price, 0);
    const top = [...cars].sort((a, b) => b.rating - a.rating)[0];
    document.getElementById('avg-price').innerText = `$${Math.round(total / cars.length).toLocaleString()}`;
    document.getElementById('top-car').innerText = top.name;
    document.getElementById('total-value').innerText = `$${total.toLocaleString()}`;
}

function deleteCar(index) { cars.splice(index, 1); render(); }
function sortCars(key) { cars.sort((a, b) => b[key] - a[key]); render(); }
function filterCars() {
    const query = document.getElementById('search-input').value.toLowerCase();
    render(cars.filter(c => c.name.toLowerCase().includes(query)));
}
function clearAll() { if(confirm("Удалить всё?")) { cars = []; render(); } }
function restoreDefaults() { cars = [...defaultCars]; render(); }

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('myrating_theme') === 'light') {
        document.body.classList.add('light-theme');
        document.getElementById('theme-icon').src = 'theme_night.png';
    }
    render();
});