const defaultCars = [
    { name: "Porsche 911 GT3", price: 195000, rating: 9.9 },
    { name: "BMW M5 F90", price: 105000, rating: 9.7 },
    { name: "Toyota LC 300", price: 110000, rating: 9.2 }
];

let cars = JSON.parse(localStorage.getItem('myrating_v3_db')) || defaultCars;
let compareList = [];

function render(data = cars) {
    const list = document.getElementById('car-list');
    list.innerHTML = '';
    
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
    updateDashboard();
    localStorage.setItem('myrating_v3_db', JSON.stringify(cars));
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    document.getElementById('theme-icon').src = isDark ? 'theme_light.png' : 'theme_night.png';
    localStorage.setItem('myrating_theme', isDark ? 'dark' : 'light');
}

function updateDashboard() {
    const total = cars.reduce((sum, car) => sum + car.price, 0);
    document.getElementById('avg-price').innerText = `$${Math.round(total / (cars.length || 1)).toLocaleString()}`;
    document.getElementById('total-value').innerText = `$${total.toLocaleString()}`;
}

function setupShareLinks() {
    const url = encodeURIComponent(window.location.href);
    document.getElementById('share-tg').href = `https://t.me/share/url?url=${url}`;
    document.getElementById('share-wa').href = `https://api.whatsapp.com/send?text=${url}`;
}

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('myrating_theme') === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-icon').src = 'theme_light.png';
    }
    render();
    setupShareLinks();
});

// Дополнительные функции (сортировка, удаление и т.д.) оставить из оригинала
function deleteCar(index) { cars.splice(index, 1); render(); }
function clearAll() { if(confirm("Удалить всё?")) { cars = []; render(); } }
function copyLink() { navigator.clipboard.writeText(window.location.href); alert("Скопировано!"); }