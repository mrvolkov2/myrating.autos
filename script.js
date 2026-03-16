const defaultCars = [
    { name: "Porsche 911 GT3", price: 195000, rating: 9.9, region: "eu", year: 2024, mileage: 5, conditionText: "💎 Идеал" },
    { name: "BMW M5 F90", price: 105000, rating: 9.7, region: "eu", year: 2021, mileage: 45, conditionText: "💎 Идеал" },
    { name: "Toyota LC 300", price: 110000, rating: 9.2, region: "asia", year: 2023, mileage: 15, conditionText: "💎 Идеал" }
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
        'ru': '🇷🇺 РФ / СНГ'
    };

    if (data.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        data.forEach((car, index) => {
            const isComparing = compareList.some(c => c.name === car.name);
            const regionBadge = car.region ? `<div class="region-badge">${regionLabels[car.region] || '🌐 Другое'}</div>` : '';
            
            // Формируем блок характеристик
            const specsHtml = car.year ? `
                <div class="car-specs">
                    <span>📅 ${car.year}</span>
                    <span>🛣️ ${car.mileage}к км</span>
                    <span>🛠️ ${car.conditionText ? car.conditionText.split(' ')[0] : '🔧'}</span>
                </div>` : '';

            list.innerHTML += `
                <div class="car-card">
                    ${regionBadge}
                    <h2 style="margin: 0 0 10px 0;">${car.name}</h2>
                    <p style="margin: 0; font-size: 1.1rem;">Цена: <strong>$${car.price.toLocaleString()}</strong></p>
                    
                    ${specsHtml}

                    <div style="display:flex; justify-content: space-between; align-items: center; margin-top:15px;">
                        <div style="font-size: 1.6rem; font-weight:900; color:var(--primary);">${car.rating}</div>
                        <div style="display:flex; gap:8px;">
                            <button onclick="toggleCompare(${index})" class="btn-main btn-small" style="background:${isComparing ? '#238636' : 'var(--border)'}; color: ${isComparing ? '#fff' : 'var(--text)'}">⚖️</button>
                            <button onclick="deleteCar(${index})" style="background:none; border:1px solid var(--danger); color:var(--danger); padding:5px 10px; border-radius:8px; cursor:pointer;">✕</button>
                        </div>
                    </div>
                </div>`;
        });
    }
    updateDashboard();
    localStorage.setItem('myrating_v3_db', JSON.stringify(cars));
}

function calculateAndAdd() {
    const name = document.getElementById('car-name').value;
    const price = Number(document.getElementById('car-price').value);
    const year = Number(document.getElementById('car-year').value);
    const mileage = Number(document.getElementById('car-mileage').value);
    const conditionEl = document.getElementById('car-condition');
    const conditionVal = Number(conditionEl.value);
    const conditionText = conditionEl.options[conditionEl.selectedIndex].text;
    const region = document.getElementById('car-region').value;

    if (name && price && year) {
        let score = 10;
        const age = 2026 - year;
        score -= (age * 0.3);
        const normalMileage = age * 18;
        if (mileage > normalMileage) score -= (mileage - normalMileage) / 50;
        score = score * conditionVal;
        const finalRating = Math.max(0, Math.min(10, score)).toFixed(1);
        
        cars.push({ 
            name, price, 
            rating: Number(finalRating), 
            region, year, mileage, conditionText 
        });
        filterCars(); 
        document.querySelectorAll('.add-form input').forEach(i => i.value = '');
    } else {
        alert("Заполните основные поля (Модель, Цена, Год)");
    }
}

// Вспомогательные функции (фильтрация, поиск, сравнение)
function setRegion(region) {
    currentRegion = region;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.region === region));
    filterCars();
}

function filterCars() {
    const query = document.getElementById('search-input').value.toLowerCase();
    let filtered = cars.filter(c => (currentRegion === 'all' || c.region === currentRegion) && c.name.toLowerCase().includes(query));
    render(filtered);
}

function toggleCompare(index) {
    const car = cars[index];
    const exists = compareList.findIndex(c => c.name === car.name);
    if (exists > -1) compareList.splice(exists, 1);
    else {
        if (compareList.length >= 3) return alert("Максимум 3 авто!");
        compareList.push(car);
    }
    document.getElementById('compare-float-bar').classList.toggle('active', compareList.length > 0);
    document.getElementById('compare-text').innerText = `Выбрано: ${compareList.length}`;
    filterCars();
}

function openCompare() {
    const container = document.getElementById('compare-table-container');
    if (compareList.length < 2) return alert("Выберите минимум 2 авто!");
    const minPrice = Math.min(...compareList.map(c => c.price));
    const maxRating = Math.max(...compareList.map(c => c.rating));

    container.innerHTML = `<table class="compare-table">
        <tr><th>Параметр</th>${compareList.map(c => `<th>${c.name}</th>`).join('')}</tr>
        <tr><td>Цена</td>${compareList.map(c => `<td class="${c.price === minPrice ? 'best' : ''}">$${c.price.toLocaleString()}</td>`).join('')}</tr>
        <tr><td>Рейтинг</td>${compareList.map(c => `<td class="${c.rating === maxRating ? 'best' : ''}">${c.rating}</td>`).join('')}</tr>
        <tr><td>Год</td>${compareList.map(c => `<td>${c.year || '—'}</td>`).join('')}</tr>
    </table>`;
    document.getElementById('compare-modal').style.display = 'block';
}

function closeCompare() { document.getElementById('compare-modal').style.display = 'none'; }
function resetCompare() { compareList = []; document.getElementById('compare-float-bar').classList.remove('active'); filterCars(); }
function deleteCar(index) { if(confirm("Удалить?")) { cars.splice(index, 1); filterCars(); } }
function sortCars(key) { cars.sort((a, b) => b[key] - a[key]); filterCars(); }
function restoreDefaults() { cars = [...defaultCars]; filterCars(); }
function clearAll() { if(confirm("Очистить всё?")) { cars = []; filterCars(); } }

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
});