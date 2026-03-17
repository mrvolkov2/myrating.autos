// Вспомогательная функция для защиты от XSS
function escapeHTML(str) {
    if (!str) return "";
    return str.toString().replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// Начальные данные с учетом параметров
const defaultCars = [
    { id: 1, name: "Porsche 911 GT3", price: 195000, rating: 9.9, region: "eu", year: 2023, mileage: 5 },
    { id: 2, name: "BMW M5 F90", price: 105000, rating: 9.7, region: "eu", year: 2021, mileage: 25 },
    { id: 3, name: "Toyota LC 300", price: 110000, rating: 9.2, region: "asia", year: 2022, mileage: 15 },
    { id: 4, name: "Tesla Model S", price: 85000, rating: 8.5, region: "usa", year: 2022, mileage: 30 },
    { id: 21, name: "Lada Vesta Sport", price: 18000, rating: 7.5, region: "ru", year: 2022, mileage: 40 },
    { id: 22, name: "Geely Monjaro", price: 38000, rating: 8.8, region: "ru", year: 2023, mileage: 10 }
];

let cars = JSON.parse(localStorage.getItem('myrating_v3_db')) || defaultCars;
let compareList = [];
let currentRegion = 'all';

// Функция для определения цвета рейтинга
function getRatingColor(rating) {
    if (rating >= 9) return '#238636'; // Зеленый
    if (rating >= 7) return '#e3b341'; // Желтый
    return '#ef4444'; // Красный
}

function render(data = cars) {
    const list = document.getElementById('car-list');
    const statsCount = document.getElementById('stats-count');
    const emptyState = document.getElementById('empty-state');
    
    statsCount.innerText = `Авто в списке: ${data.length}`;

    if (data.length === 0) {
        list.innerHTML = '';
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        let htmlString = '';
        
        data.forEach((car) => {
            const isComparing = compareList.some(c => c.id === car.id);
            const safeName = escapeHTML(car.name);
            const ratingColor = getRatingColor(car.rating);
            
            htmlString += `
                <div class="car-card">
                    <div class="card-header">
                        <div class="region-badge">${car.region ? car.region.toUpperCase() : 'N/A'}</div>
                        <button onclick="deleteCar(${car.id})" class="delete-btn">✕</button>
                    </div>
                    
                    <h2 class="car-title">${safeName}</h2>
                    
                    <div class="car-specs">
                        <div class="spec-item"><span>📅</span> ${car.year || '—'} г.</div>
                        <div class="spec-item"><span>🛣️</span> ${car.mileage || 0} т.км</div>
                        <div class="spec-item"><span>💰</span> $${car.price.toLocaleString()}</div>
                    </div>

                    <div class="rating-section">
                        <div class="rating-header">
                            <span class="rating-label">Рейтинг</span>
                            <span class="rating-value" style="color: ${ratingColor}">${car.rating}</span>
                        </div>
                        <div class="rating-bar-container">
                            <div class="rating-bar-fill" style="width: ${car.rating * 10}%; background: ${ratingColor}"></div>
                        </div>
                    </div>

                    <div class="card-actions">
                        <button onclick="toggleCompare(${car.id})" class="btn-compare ${isComparing ? 'active' : ''}">
                            ${isComparing ? '✅ В сравнении' : '⚖️ Сравнить'}
                        </button>
                    </div>
                </div>`;
        });
        
        list.innerHTML = htmlString;
    }
    updateDashboard();
    localStorage.setItem('myrating_v3_db', JSON.stringify(cars));
}

function calculateAndAdd() {
    const name = document.getElementById('car-name').value;
    const price = Number(document.getElementById('car-price').value);
    const year = Number(document.getElementById('car-year').value);
    const mileageInput = document.getElementById('car-mileage').value;
    const condition = Number(document.getElementById('car-condition').value);
    const region = document.getElementById('car-region').value;

    const currentYear = new Date().getFullYear();

    if (!name || !price || !year || mileageInput === '') {
        return alert("Заполните все поля!");
    }

    const mileage = Number(mileageInput);
    let score = 10;
    const age = currentYear - year;
    
    // Логика расчета рейтинга
    score -= (age * 0.3);
    const normalMileage = age * 18;
    if (mileage > normalMileage) score -= (mileage - normalMileage) / 50;
    score = score * condition;
    
    const finalRating = Math.max(0, Math.min(10, score)).toFixed(1);
    
    cars.push({ 
        id: Date.now(), 
        name, 
        price, 
        year,
        mileage,
        rating: Number(finalRating), 
        region 
    });
    
    // Очистка полей
    document.getElementById('car-name').value = '';
    document.getElementById('car-price').value = '';
    document.getElementById('car-year').value = '';
    document.getElementById('car-mileage').value = '';
    
    filterCars(); 
}

// --- СИСТЕМНЫЕ ФУНКЦИИ (Фильтры, Сортировка, Тема) ---

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
    if (currentRegion !== 'all') filtered = filtered.filter(c => c.region === currentRegion);
    if (query) filtered = filtered.filter(c => c.name.toLowerCase().includes(query));
    render(filtered);
}

function sortCars(key) { 
    cars.sort((a, b) => b[key] - a[key]); 
    filterCars(); 
}

function deleteCar(id) { 
    cars = cars.filter(c => c.id !== id);
    compareList = compareList.filter(c => c.id !== id);
    filterCars(); 
}

function toggleCompare(id) {
    const car = cars.find(c => c.id === id);
    const idx = compareList.findIndex(c => c.id === id);
    if (idx > -1) compareList.splice(idx, 1);
    else if (compareList.length < 3) compareList.push(car);
    else alert("Максимум 3 авто!");
    
    document.getElementById('compare-float-bar').classList.toggle('active', compareList.length > 0);
    document.getElementById('compare-text').innerText = `Выбрано: ${compareList.length}`;
    filterCars();
}

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
    document.getElementById('top-car').innerText = escapeHTML(top.name);
    document.getElementById('total-value').innerText = `$${total.toLocaleString()}`;
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    document.getElementById('theme-icon').src = isDark ? 'theme_light.png' : 'theme_night.png';
    localStorage.setItem('myrating_theme', isDark ? 'dark' : 'light');
}

// Инициализация при загрузке
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('myrating_theme') === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-icon').src = 'theme_light.png';
    }
    render();
});