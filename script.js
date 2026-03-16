const defaultCars = [
    { name: "Porsche 911 GT3", price: 195000, rating: 9.9, region: "eu" },
    { name: "BMW M5 F90", price: 105000, rating: 9.7, region: "eu" },
    { name: "Toyota LC 300", price: 110000, rating: 9.2, region: "asia" },
    { name: "Tesla Model S", price: 85000, rating: 8.5, region: "usa" },
    { name: "Audi RS6 Avant", price: 125000, rating: 9.6, region: "eu" },
    { name: "Mercedes G63", price: 210000, rating: 9.4, region: "eu" },
    { name: "Nissan GT-R", price: 115000, rating: 9.5, region: "asia" },
    { name: "Toyota Camry", price: 32000, rating: 9.1, region: "asia" },
    { name: "VW Golf R", price: 48000, rating: 9.0, region: "eu" },
    { name: "Ford Mustang", price: 45000, rating: 8.7, region: "usa" },
    { name: "Mazda CX-5", price: 29000, rating: 8.8, region: "asia" },
    { name: "Lexus RX 350", price: 68000, rating: 9.0, region: "asia" },
    { name: "Honda Civic R", price: 44000, rating: 9.3, region: "asia" },
    { name: "Subaru WRX STI", price: 38000, rating: 8.9, region: "asia" },
    { name: "Kia Stinger", price: 35000, rating: 8.2, region: "asia" },
    { name: "Volvo XC90", price: 72000, rating: 9.1, region: "eu" },
    { name: "Hyundai Ioniq 5", price: 50000, rating: 8.6, region: "asia" },
    { name: "Skoda Octavia RS", price: 34000, rating: 8.9, region: "eu" },
    { name: "Dodge Challenger", price: 55000, rating: 8.4, region: "usa" },
    { name: "Land Rover Defender", price: 88000, rating: 9.2, region: "eu" },
    { name: "Lada Vesta Sport", price: 18000, rating: 7.5, region: "ru" },
    { name: "Geely Monjaro", price: 38000, rating: 8.8, region: "ru" }
];

let cars = JSON.parse(localStorage.getItem('myrating_v3_db')) || defaultCars;
let compareList = [];
let currentRegion = 'all';

function render(data = cars) {
    const list = document.getElementById('car-list');
    const statsCount = document.getElementById('stats-count');
    const emptyState = document.getElementById('empty-state');
    
    list.innerHTML = '';
    statsCount.innerText = `Авто в списке: ${data.length}`;

    const regionLabels = {
        'usa': '🇺🇸 США',
        'eu': '🇪🇺 Европа',
        'asia': '🌏 Азия',
        'ru': '🇷🇺 РФ / Ближнее зарубежье'
    };

    if (data.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        data.forEach((car) => {
            // Ищем реальный индекс автомобиля в основном массиве, чтобы фильтры не ломали удаление
            const realIndex = cars.indexOf(car); 
            const isComparing = compareList.some(c => c.name === car.name);
            const regionBadge = car.region ? `<div class="region-badge">${regionLabels[car.region] || '🌐 Другое'}</div>` : '';
            
            list.innerHTML += `
                <div class="car-card">
                    ${regionBadge}
                    <h2>${car.name}</h2>
                    <p>Цена: <strong>$${car.price.toLocaleString()}</strong></p>
                    <div style="display:flex; justify-content: space-between; align-items: center; margin-top:15px;">
                        <div style="font-size: 1.4rem; font-weight:900; color:var(--primary);">${car.rating}</div>
                        <div style="display:flex; gap:8px;">
                            <button onclick="toggleCompare(${realIndex})" class="btn-main btn-small" style="background:${isComparing ? '#238636' : 'var(--border)'}">⚖️</button>
                            <button onclick="deleteCar(${realIndex})" style="background:none; border:1px solid var(--danger); color:var(--danger); padding:5px 10px; border-radius:8px; cursor:pointer;">✕</button>
                        </div>
                    </div>
                </div>`;
        });
    }
    updateDashboard();
    localStorage.setItem('myrating_v3_db', JSON.stringify(cars));
}

function setRegion(region) {
    currentRegion = region;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.region === region);
    });
    filterCars();
}

function filterCars() {
    const query = document.getElementById('search-input').value.toLowerCase();
    let filtered = cars;
    
    if (currentRegion !== 'all') {
        filtered = filtered.filter(c => c.region === currentRegion);
    }
    
    if (query) {
        filtered = filtered.filter(c => c.name.toLowerCase().includes(query));
    }
    
    render(filtered);
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
    render(cars.filter(c => {
        if (currentRegion !== 'all' && c.region !== currentRegion) return false;
        const query = document.getElementById('search-input').value.toLowerCase();
        return c.name.toLowerCase().includes(query);
    }));
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
    const mileageInput = document.getElementById('car-mileage').value;
    const condition = Number(document.getElementById('car-condition').value);
    const region = document.getElementById('car-region').value;

    // Добавлена проверка на наличие введенного пробега
    if (name && price && year && mileageInput !== '') {
        const mileage = Number(mileageInput);
        let score = 10;
        
        // Автоматический расчет текущего года
        const currentYear = new Date().getFullYear();
        const age = currentYear - year;
        
        score -= (age * 0.3);
        const normalMileage = age * 18;
        if (mileage > normalMileage) score -= (mileage - normalMileage) / 50;
        score = score * condition;
        const finalRating = Math.max(0, Math.min(10, score)).toFixed(1);
        
        cars.push({ name, price, rating: Number(finalRating), region });
        filterCars(); 
        
        // Очистка только текстовых/числовых полей, чтобы не сбрасывать селекты
        document.getElementById('car-name').value = '';
        document.getElementById('car-price').value = '';
        document.getElementById('car-year').value = '';
        document.getElementById('car-mileage').value = '';
    } else {
        alert("Пожалуйста, заполните все поля, включая пробег!");
    }
}

function closeCompare() { document.getElementById('compare-modal').style.display = 'none'; }
function resetCompare() { compareList = []; document.getElementById('compare-float-bar').classList.remove('active'); filterCars(); }
function deleteCar(index) { cars.splice(index, 1); filterCars(); }
function sortCars(key) { cars.sort((a, b) => b[key] - a[key]); filterCars(); }
function restoreDefaults() { cars = [...defaultCars]; filterCars(); }
function clearAll() { if(confirm("Удалить базу?")) { cars = []; filterCars(); } }

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
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    document.getElementById('theme-icon').src = isDark ? 'theme_light.png' : 'theme_night.png';
    localStorage.setItem('myrating_theme', isDark ? 'dark' : 'light');
}

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('myrating_theme') === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-icon').src = 'theme_light.png';
    } else {
        document.getElementById('theme-icon').src = 'theme_night.png';
    }
    render();
    setupShareLinks();
});

function setupShareLinks() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Смотри, какой крутой сервис для рейтинга и сравнения авто! 🏎️");
    
    document.getElementById('share-tg').href = `https://t.me/share/url?url=${url}&text=${text}`;
    document.getElementById('share-wa').href = `https://api.whatsapp.com/send?text=${text}%20${url}`;
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Ссылка скопирована! Отправь её друзьям 🚀");
    });
}

// Упрощенная и актуальная функция для закладок
function addToBookmarks() {
    const isMac = navigator.userAgent.toLowerCase().includes('mac');
    alert(`Нажмите ${isMac ? 'Cmd' : 'Ctrl'} + D, чтобы добавить сайт в закладки.`);
}