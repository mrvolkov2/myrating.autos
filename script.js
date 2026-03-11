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
let compareList = [];

function render(data = cars) {
    const list = document.getElementById('car-list');
    const statsCount = document.getElementById('stats-count');
    const emptyState = document.getElementById('empty-state');
    
    list.innerHTML = '';
    statsCount.innerText = `Авто в списке: ${data.length}`;

    if (data.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        data.forEach((car, index) => {
            const isComparing = compareList.some(c => c.name === car.name);
            list.innerHTML += `
                <div class="car-card">
                    <h2>${car.name}</h2>
                    <p>Цена: <strong>$${car.price.toLocaleString()}</strong></p>
                    <div style="display:flex; justify-content: space-between; align-items: center; margin-top:15px;">
                        <div style="font-size: 1.4rem; font-weight:900; color:var(--primary);">${car.rating}</div>
                        <div style="display:flex; gap:8px;">
                            <button onclick="toggleCompare(${index})" class="btn-main btn-small" style="background:${isComparing ? '#238636' : 'var(--border)'}">⚖️</button>
                            <button onclick="deleteCar(${index})" style="background:none; border:1px solid var(--danger); color:var(--danger); padding:5px 10px; border-radius:8px; cursor:pointer;">✕</button>
                        </div>
                    </div>
                </div>`;
        });
    }
    updateDashboard();
    localStorage.setItem('myrating_v3_db', JSON.stringify(cars));
}

function toggleCompare(index) {
    const car = cars[index];
    const exists = compareList.findIndex(c => c.name === car.name);
    if (exists > -1) {
        compareList.splice(exists, 1);
    } else {
        if (compareList.length >= 3) return alert("Максимум 3 авто!");
        compareList.push(car);
    }
    document.getElementById('compare-float-bar').classList.toggle('active', compareList.length > 0);
    document.getElementById('compare-text').innerText = `Выбрано: ${compareList.length}`;
    render();
}

function openCompare() {
    const container = document.getElementById('compare-table-container');
    if (compareList.length < 2) return alert("Выберите минимум 2 авто!");
    
    const minPrice = Math.min(...compareList.map(c => c.price));
    const maxRating = Math.max(...compareList.map(c => c.rating));

    let html = `<table class="compare-table">
        <tr><th>Параметр</th>${compareList.map(c => `<th>${c.name}</th>`).join('')}</tr>
        <tr><td>Цена</td>${compareList.map(c => `<td class="${c.price === minPrice ? 'best' : ''}">$${c.price.toLocaleString()}</td>`).join('')}</tr>
        <tr><td>Рейтинг</td>${compareList.map(c => `<td class="${c.rating === maxRating ? 'best' : ''}">${c.rating}</td>`).join('')}</tr>
    </table>`;
    
    container.innerHTML = html;
    document.getElementById('compare-modal').style.display = 'block';
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
        
        cars.push({ name, price, rating: Number(finalRating) });
        render();
        document.querySelectorAll('.add-form input').forEach(i => i.value = '');
    }
}

function closeCompare() { document.getElementById('compare-modal').style.display = 'none'; }
function resetCompare() { compareList = []; document.getElementById('compare-float-bar').classList.remove('active'); render(); }
function deleteCar(index) { cars.splice(index, 1); render(); }
function sortCars(key) { cars.sort((a, b) => b[key] - a[key]); render(); }
function filterCars() {
    const query = document.getElementById('search-input').value.toLowerCase();
    render(cars.filter(c => c.name.toLowerCase().includes(query)));
}
function restoreDefaults() { cars = [...defaultCars]; render(); }
function clearAll() { if(confirm("Удалить базу?")) { cars = []; render(); } }

function updateDashboard() {
    if (cars.length === 0) {
        document.getElementById('avg-price').innerText = '$0';
        document.getElementById('top-car').innerText = '—';
        document.getElementById('total-value').innerText = '$0';
        return;
    }
    const total = cars.reduce((sum, car) => sum + car.price, 0);
    const top = [...cars].sort((a, b) => b.rating - a.rating)[0];
    document.getElementById('avg-price').innerText = `$${Math.round(total / cars.length).toLocaleString()}`;
    document.getElementById('top-car').innerText = top.name;
    document.getElementById('total-value').innerText = `$${total.toLocaleString()}`;
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    document.getElementById('theme-icon').src = isLight ? 'theme_night.png' : 'theme_light.png';
    localStorage.setItem('myrating_theme', isLight ? 'light' : 'dark');
}

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('myrating_theme') === 'light') {
        document.body.classList.add('light-theme');
        document.getElementById('theme-icon').src = 'theme_night.png';
    }
    render();
});

function setupShareLinks() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Смотри, какой крутой сервис для рейтинга и сравнения авто! 🚗");
    
    document.getElementById('share-tg').href = `https://t.me/share/url?url=${url}&text=${text}`;
    document.getElementById('share-wa').href = `https://api.whatsapp.com/send?text=${text}%20${url}`;
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Ссылка скопирована! Отправь её друзьям 🚀");
    });
}

// Вызови setupShareLinks при загрузке
window.addEventListener('DOMContentLoaded', () => {
    // ... твой старый код ...
    setupShareLinks();
});