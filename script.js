// Вспомогательная функция для защиты от XSS
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

const defaultCars = [
    { id: 1, name: "Porsche 911 GT3", price: 195000, rating: 9.9, region: "eu", year: 2022, mileage: 12, condition: 1 },
    { id: 2, name: "BMW M5 F90", price: 105000, rating: 9.7, region: "eu", year: 2021, mileage: 35, condition: 1 },
    { id: 3, name: "Toyota LC 300", price: 110000, rating: 9.2, region: "asia", year: 2023, mileage: 15, condition: 1 },
    { id: 4, name: "Tesla Model S", price: 85000, rating: 8.5, region: "usa", year: 2020, mileage: 60, condition: 0.85 },
    { id: 5, name: "Audi RS6 Avant", price: 125000, rating: 9.6, region: "eu", year: 2022, mileage: 25, condition: 1 },
    { id: 6, name: "Mercedes G63", price: 210000, rating: 9.4, region: "eu", year: 2023, mileage: 10, condition: 1 },
    { id: 7, name: "Nissan GT-R", price: 115000, rating: 9.5, region: "asia", year: 2019, mileage: 40, condition: 1 },
    { id: 8, name: "Toyota Camry", price: 32000, rating: 9.1, region: "asia", year: 2022, mileage: 30, condition: 1 },
    { id: 9, name: "VW Golf R", price: 48000, rating: 9.0, region: "eu", year: 2021, mileage: 45, condition: 0.85 },
    { id: 10, name: "Ford Mustang", price: 45000, rating: 8.7, region: "usa", year: 2020, mileage: 50, condition: 0.85 },
    { id: 11, name: "Mazda CX-5", price: 29000, rating: 8.8, region: "asia", year: 2021, mileage: 40, condition: 1 },
    { id: 12, name: "Lexus RX 350", price: 68000, rating: 9.0, region: "asia", year: 2022, mileage: 20, condition: 1 },
    { id: 13, name: "Honda Civic R", price: 44000, rating: 9.3, region: "asia", year: 2023, mileage: 15, condition: 1 },
    { id: 14, name: "Subaru WRX STI", price: 38000, rating: 8.9, region: "asia", year: 2018, mileage: 70, condition: 0.85 },
    { id: 15, name: "Kia Stinger", price: 35000, rating: 8.2, region: "asia", year: 2019, mileage: 80, condition: 0.85 },
    { id: 16, name: "Volvo XC90", price: 72000, rating: 9.1, region: "eu", year: 2021, mileage: 55, condition: 1 },
    { id: 17, name: "Hyundai Ioniq 5", price: 50000, rating: 8.6, region: "asia", year: 2022, mileage: 30, condition: 1 },
    { id: 18, name: "Skoda Octavia RS", price: 34000, rating: 8.9, region: "eu", year: 2020, mileage: 65, condition: 0.85 },
    { id: 19, name: "Dodge Challenger", price: 55000, rating: 8.4, region: "usa", year: 2019, mileage: 50, condition: 0.85 },
    { id: 20, name: "Land Rover Defender", price: 88000, rating: 9.2, region: "eu", year: 2023, mileage: 18, condition: 1 },
    { id: 21, name: "Lada Vesta Sport", price: 18000, rating: 7.5, region: "ru", year: 2021, mileage: 45, condition: 0.85 },
    { id: 22, name: "Geely Monjaro", price: 38000, rating: 8.8, region: "ru", year: 2023, mileage: 15, condition: 1 }
];

let cars = JSON.parse(localStorage.getItem('myrating_v3_db')) || defaultCars;

// Миграция старых данных
cars = cars.map((car, index) => {
    if (!car.id) car.id = Date.now() + index;
    return car;
});

let compareList = [];
let currentRegion = 'all';

function render(data = cars) {
    const list = document.getElementById('car-list');
    const statsCount = document.getElementById('stats-count');
    const emptyState = document.getElementById('empty-state');
    
    statsCount.innerText = `Авто в списке: ${data.length}`;

    const regionLabels = {
        'usa': '🇺🇸 США',
        'eu': '🇪🇺 Европа',
        'asia': '🌏 Азия',
        'ru': '🇷🇺 РФ / Ближнее зарубежье'
    };

    const conditionLabels = {
        1: '💎 Идеал',
        0.85: '🎨 Косметика',
        0.6: '🔨 Бит/Крашен',
        0.3: '💀 Тотал'
    };

    if (data.length === 0) {
        list.innerHTML = '';
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        
        let htmlString = '';
        
        
         data.forEach((car) => {
    const isComparing = compareList.some(c => c.id === car.id);
    const regionBadge = car.region ? `<div class="region-badge">${regionLabels[car.region] || '🌐 Другое'}</div>` : '';
    const safeName = escapeHTML(car.name); 
    
    // Определяем цвет в зависимости от балла
    let ratingColorClass = 'rating-low';
    if (car.rating >= 8) ratingColorClass = 'rating-high';
    else if (car.rating >= 5) ratingColorClass = 'rating-mid';

    const yearText = car.year ? `${car.year} г.` : '—';
    const mileageText = car.mileage !== undefined ? `${car.mileage} тыс. км` : '—';
    const conditionText = car.condition ? (conditionLabels[car.condition] || '—') : '—';
    
    htmlString += `
        <div class="car-card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                ${regionBadge}
                                <div class="delete-wrapper">
                  <span class="delete-label">Удалить</span>
                  <button onclick="deleteCar(${car.id})" class="btn-delete-card" title="Удалить">✕</button>
                </div>
            </div>
            <h2>${safeName}</h2>
            <div class="car-specs">
                <span>📅 ${yearText}</span>
                <span>🛣️ ${mileageText}</span>
                <span>🛠️ ${conditionText}</span>
            </div>
            <p>Цена: <strong>$${car.price.toLocaleString()}</strong></p>
            
            <div class="rating-container">
                <div class="rating-header">
                     <div class="rating-value ${ratingColorClass}">${car.rating}</div>
                     <span style="font-size: 0.8rem; font-weight: 600; opacity: 0.7;">РЕЙТИНГ</span>
                </div>
                <div class="rating-scale-bg">
                     <div class="rating-scale-fill ${ratingColorClass}" 
                         style="width: ${car.rating * 10}%; background-color: currentColor;"></div>
                </div>
            </div>

            <button onclick="toggleCompare(${car.id})" 
                    class="btn-main btn-small btn-compare-full ${isComparing ? 'active' : ''}">
                ${isComparing ? '✅ В сравнении' : '⚖️ Добавить к сравнению'}
            </button>
        </div>`;
});





        
        list.innerHTML = htmlString;
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

function toggleCompare(id) {
    const car = cars.find(c => c.id === id);
    if (!car) return;

    const existsIndex = compareList.findIndex(c => c.id === id);
    if (existsIndex > -1) {
        compareList.splice(existsIndex, 1);
    } else {
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

    let html = `<table class="compare-table">
        <tr><th>Параметр</th>${compareList.map(c => `<th>${escapeHTML(c.name)}</th>`).join('')}</tr>
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
    
    const conditionSelect = document.getElementById('car-condition');
    const regionSelect = document.getElementById('car-region');
    const condition = Number(conditionSelect.value);
    const region = regionSelect.value;

    const currentYear = new Date().getFullYear();

    if (!name || !price || !year || mileageInput === '') {
        return alert("Пожалуйста, заполните все поля, включая пробег!");
    }

    if (year > currentYear || year < 1900) {
        return alert(`Пожалуйста, введите корректный год выпуска (от 1900 до ${currentYear}).`);
    }

    const mileage = Number(mileageInput);
    let score = 10;
    const age = currentYear - year;
    
    score -= (age * 0.3);
    const normalMileage = age * 18;
    if (mileage > normalMileage) score -= (mileage - normalMileage) / 50;
    score = score * condition;
    const finalRating = Math.max(0, Math.min(10, score)).toFixed(1);
    
    cars.push({ 
        id: Date.now(), 
        name, 
        price, 
        rating: Number(finalRating), 
        region,
        year,
        mileage,
        condition
    });
    
    filterCars(); 
    
    document.getElementById('car-name').value = '';
    document.getElementById('car-price').value = '';
    document.getElementById('car-year').value = '';
    document.getElementById('car-mileage').value = '';
    conditionSelect.selectedIndex = 0; 
    regionSelect.selectedIndex = 0; 
}

function closeCompare() { document.getElementById('compare-modal').style.display = 'none'; }
function resetCompare() { compareList = []; document.getElementById('compare-float-bar').classList.remove('active'); filterCars(); }

function deleteCar(id) { 
    cars = cars.filter(c => c.id !== id);
    compareList = compareList.filter(c => c.id !== id);
    
    document.getElementById('compare-float-bar').classList.toggle('active', compareList.length > 0);
    document.getElementById('compare-text').innerText = `Выбрано: ${compareList.length}`;
    
    filterCars(); 
}

function sortCars(key) { 
    cars.sort((a, b) => b[key] - a[key]); 
    filterCars(); 
}

function restoreDefaults() { cars = JSON.parse(JSON.stringify(defaultCars)); filterCars(); }
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
    document.getElementById('top-car').innerText = escapeHTML(top.name);
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

function addToBookmarks() {
    const isMac = navigator.userAgent.toLowerCase().includes('mac');
    alert(`Нажмите ${isMac ? 'Cmd' : 'Ctrl'} + D, чтобы добавить сайт в закладки.`);
}

// --- Управление формой обратной связи ---
function openContactModal() {
    document.getElementById('contact-modal').style.display = 'block';
}

function closeContactModal() {
    document.getElementById('contact-modal').style.display = 'none';
}

// Закрытие модалки при клике вне её области
window.onclick = function(event) {
    const compareModal = document.getElementById('compare-modal');
    const contactModal = document.getElementById('contact-modal');
    if (event.target == compareModal) {
        closeCompare();
    }
    if (event.target == contactModal) {
        closeContactModal();
    }
}

// --- Асинхронная отправка формы (AJAX) ---
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Останавливаем стандартную перезагрузку страницы
        
        // Меняем текст кнопки на время отправки, чтобы пользователь не кликал дважды
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Отправка...';
        submitBtn.disabled = true;

        const data = new FormData(event.target);

        try {
            // Отправляем запрос на Formspree
            const response = await fetch(event.target.action, {
                method: contactForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Если всё супер
                contactStatus.innerText = '✅ Сообщение успешно отправлено!';
                contactStatus.style.color = '#22c55e'; // Зеленый цвет успеха
                contactStatus.style.display = 'block';
                contactForm.reset(); // Очищаем поля формы
                
                // Закрываем модалку через 3 секунды
                setTimeout(() => {
                    closeContactModal();
                    contactStatus.style.display = 'none';
                }, 3000);

            } else {
                // Если Formspree вернул ошибку (например, неверный email)
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    contactStatus.innerText = responseData.errors.map(error => error.message).join(", ");
                } else {
                    contactStatus.innerText = '❌ Произошла ошибка при отправке.';
                }
                contactStatus.style.color = 'var(--danger)'; // Красный цвет из твоих переменных
                contactStatus.style.display = 'block';
            }
        } catch (error) {
            // Если пропал интернет
            contactStatus.innerText = '❌ Ошибка сети. Проверьте подключение.';
            contactStatus.style.color = 'var(--danger)';
            contactStatus.style.display = 'block';
        } finally {
            // В любом случае возвращаем кнопку в исходное состояние
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}