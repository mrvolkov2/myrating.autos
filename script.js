const defaultCars = [
    { name: "Porsche 911 GT3", price: 195000, rating: 9.9 },
    { name: "BMW M5 F90", price: 105000, rating: 9.7 },
    { name: "Toyota LC 300", price: 110000, rating: 9.2 }
];

let cars = JSON.parse(localStorage.getItem('myrating_v3_db')) || [...defaultCars];
let compareList = [];

// Главная функция отрисовки
function render() {
    const list = document.getElementById('car-list');
    const emptyState = document.getElementById('empty-state');
    
    if (cars.length === 0) {
        list.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        list.style.display = 'grid';
        emptyState.style.display = 'none';
        
        list.innerHTML = '';
        cars.forEach((car, index) => {
            list.innerHTML += `
                <div class="car-card">
                    <h3>${car.name}</h3>
                    <p>Цена: $${car.price.toLocaleString()}</p>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;">
                        <span style="font-weight:800; color:var(--primary); font-size:1.2rem;">${car.rating}</span>
                        <button onclick="deleteCar(${index})" class="btn-main btn-small btn-danger">✕</button>
                    </div>
                </div>`;
        });
    }
    updateDashboard();
    localStorage.setItem('myrating_v3_db', JSON.stringify(cars));
}

// Переключение темы
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    document.getElementById('theme-icon').src = isDark ? 'theme_light.png' : 'theme_night.png';
    localStorage.setItem('myrating_theme', isDark ? 'dark' : 'light');
}

// Восстановление базы
function restoreDefaults() {
    cars = [...defaultCars];
    render();
}

// Очистка базы
function clearAll() {
    if(confirm("Удалить все данные?")) {
        cars = [];
        render();
    }
}

function updateDashboard() {
    const total = cars.reduce((sum, c) => sum + c.price, 0);
    document.getElementById('avg-price').innerText = `$${Math.round(total / (cars.length || 1)).toLocaleString()}`;
    document.getElementById('total-value').innerText = `$${total.toLocaleString()}`;
    document.getElementById('stats-count').innerText = `Авто в списке: ${cars.length}`;
}

function deleteCar(index) {
    cars.splice(index, 1);
    render();
}

// Загрузка
window.addEventListener('DOMContentLoaded', () => {
    // Если в памяти сохранена темная тема — применяем её
    if (localStorage.getItem('myrating_theme') === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-icon').src = 'theme_light.png';
    }
    render();
    
    // Ссылки поделиться
    const url = encodeURIComponent(window.location.href);
    document.getElementById('share-tg').href = `https://t.me/share/url?url=${url}`;
    document.getElementById('share-wa').href = `https://api.whatsapp.com/send?text=${url}`;
});

function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert("Ссылка скопирована!");
}