const HEADER_SCROLL_OFFSET = 95;

const REGION_LABELS = {
    usa: '<img src="flag-usa.svg" class="flag-icon" alt=""> США',
    eu: '<img src="flag-eu.svg" class="flag-icon" alt=""> Европа',
    asia: '<img src="flag-asia.svg" class="flag-icon" alt=""> Азия',
    ru: '<img src="flag-ru.svg" class="flag-icon" alt=""> РФ / СНГ'
};

const REGION_LABELS_SHORT = {
    usa: '🇺🇸 США',
    eu: '🇪🇺 Европа',
    asia: '🌏 Азия',
    ru: '🇷🇺 РФ / СНГ'
};

const CONDITION_LABELS = {
    1: '💎 Идеал',
    0.85: '🎨 Косметика',
    0.6: '🔨 Бит/Крашен',
    0.3: '💀 Тотал'
};

function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g,
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

function getRatingColorClass(rating) {
    if (rating >= 8) return 'rating-high';
    if (rating >= 5) return 'rating-mid';
    return 'rating-low';
}

function scrollToElement(elementOrId, offset = HEADER_SCROLL_OFFSET) {
    const el = typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
}

const CARS_PER_PAGE = 6; // Сколько машин показывать изначально и за один клик
let visibleCarsCount = CARS_PER_PAGE; // Текущее количество отображаемых машин
let currentFilteredCars = []; // Хранилище для отфильтрованного списка

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
    { id: 21, name: "Lada Vesta Sport", price: 14000, rating: 6.0, region: "ru", year: 2019, mileage: 45, condition: 0.85 },
    { id: 22, name: "Geely Monjaro", price: 38000, rating: 8.8, region: "ru", year: 2023, mileage: 15, condition: 1 },
    { id: 25, name: "VW Polo", price: 14500, rating: 6.5, region: "eu", year: 2020, mileage: 65, condition: 0.85 },
    { id: 23, name: "Kia Rio", price: 14000, rating: 6.3, region: "asia", year: 2019, mileage: 80, condition: 0.80 },
    { id: 24, name: "Hyundai Solaris", price: 15200, rating: 7.4, region: "asia", year: 2020, mileage: 70, condition: 0.85 },
];

function normalizeRegionValue(region) {
    const value = String(region || '').toLowerCase().trim();
    if (value === 'ru' || value === 'rf' || value === 'russia' || value === 'cis' || value === 'sng') return 'ru';
    if (value === 'usa' || value === 'us') return 'usa';
    if (value === 'eu' || value === 'europe') return 'eu';
    if (value === 'asia') return 'asia';
    return value;
}

let cars = JSON.parse(localStorage.getItem('myrating_v3_db')) || defaultCars;

// Миграция старых данных
cars = cars.map((car, index) => {
    if (!car.id) car.id = Date.now() + index;
    car.region = normalizeRegionValue(car.region);
    return car;
});

let compareList = [];
let currentRegion = 'all';
let compareLimitNoteTimer = null;
const compareLimit = 3;
let activeSortKey = null;
const sortDirections = { rating: 'desc', price: 'desc' };
let clearUndoTimer = null;
let clearUndoInterval = null;
let lastClearedState = null;
let statsPulseTimer = null;

function updateCompareBarUI() {
    const hasItems = compareList.length > 0;
    document.getElementById('compare-float-bar').classList.toggle('active', hasItems);
    document.getElementById('compare-text').innerText = `Выбрано: ${compareList.length}/${compareLimit}`;
    document.body.classList.toggle('compare-bar-visible', hasItems);
}

function updateClearButtonState() {
    const clearBtn = document.getElementById('clear-all-btn');
    if (!clearBtn) return;

    clearBtn.disabled = cars.length === 0;
    if (clearBtn.disabled) {
        closeClearModal();
    }
}

function buildGarageCardHTML(car, options = {}) {
    const { showCompare = false, showDelete = false } = options;
    const ratingColorClass = getRatingColorClass(car.rating);
    const yearText = car.year ? `${car.year} г.` : '—';
    const mileageText = car.mileage !== undefined ? `${car.mileage} тыс. км` : '—';
    const conditionText = car.condition ? (CONDITION_LABELS[car.condition] || '—') : '—';
    const regionBadge = car.region
        ? `<div class="region-badge">${REGION_LABELS[car.region] || '🌐 Другое'}</div>`
        : '';

    const headerRight = showDelete
        ? `<div class="delete-wrapper">
              <span class="delete-label">Удалить</span>
              <button onclick="deleteCar(${car.id})" class="btn-delete-card" title="Удалить">✕</button>
           </div>`
        : '';

    let compareButton = '';
    if (showCompare) {
        const isComparing = compareList.some(c => c.id === car.id);
        const isCompareLimitReached = compareList.length >= compareLimit;
        const shouldDisableCompareButton = isCompareLimitReached && !isComparing;
        compareButton = `
            <button onclick="toggleCompare(${car.id})"
                    class="btn-main btn-small btn-compare-full ${isComparing ? 'active' : ''}"
                    ${shouldDisableCompareButton ? 'disabled' : ''}>
                ${isComparing ? `✅ В сравнении (${compareList.length}/${compareLimit})` : `⚖️ Добавить к сравнению (${compareList.length}/${compareLimit})`}
            </button>`;
    }

    return `
        <div class="car-card">
            <div class="car-card-top">
                ${regionBadge}
                ${headerRight}
            </div>
            <h2>${escapeHTML(car.name)}</h2>
            <div class="car-specs">
                <span>📅 ${yearText}</span>
                <span>🛣️ ${mileageText}</span>
                <span>🛠️ ${conditionText}</span>
            </div>
            <p>Цена: <strong>$${car.price.toLocaleString()}</strong></p>
            <div class="rating-container">
                <div class="rating-header">
                    <div class="rating-value ${ratingColorClass}">${car.rating}</div>
                    <span class="rating-label">РЕЙТИНГ</span>
                </div>
                <div class="rating-scale-bg">
                    <div class="rating-scale-fill ${ratingColorClass}"
                         style="width: ${car.rating * 10}%; background-color: currentColor;"></div>
                </div>
            </div>
            ${compareButton}
        </div>`;
}

function isGarageFiltered() {
    const searchEl = document.getElementById('search-input');
    const query = searchEl ? searchEl.value.trim() : '';
    return currentRegion !== 'all' || query.length > 0;
}

function getFilteredCars() {
    const searchEl = document.getElementById('search-input');
    const query = searchEl ? searchEl.value.toLowerCase().trim() : '';
    let filtered = cars;

    if (currentRegion !== 'all') {
        filtered = filtered.filter(c => c.region === currentRegion);
    }

    if (query) {
        filtered = filtered.filter(c => c.name.toLowerCase().includes(query));
    }

    return filtered;
}

function updateStatsCounter(filteredCount) {
    const statsCount = document.getElementById('stats-count');
    if (!statsCount) return;

    const total = cars.length;
    const valueText = isGarageFiltered() ? `${filteredCount} из ${total}` : String(total);

    statsCount.innerHTML = `<span class="stats-icon">🚘</span><span>В гараже:</span> <strong class="stats-value">${valueText}</strong>`;
    statsCount.classList.remove('pulse');
    void statsCount.offsetWidth;
    statsCount.classList.add('pulse');
    if (statsPulseTimer) clearTimeout(statsPulseTimer);
    statsPulseTimer = setTimeout(() => statsCount.classList.remove('pulse'), 350);
}

function filterCars() {
    currentFilteredCars = getFilteredCars();
    visibleCarsCount = CARS_PER_PAGE;
    render(currentFilteredCars);
}


function render(data = cars) {
    const list = document.getElementById('car-list');
    const emptyState = document.getElementById('empty-state');
    const loadMoreContainer = document.getElementById('load-more-container');

    currentFilteredCars = data;
    updateStatsCounter(data.length);

    if (data.length === 0) {
        if (list) list.innerHTML = '';
        if (emptyState) emptyState.style.display = cars.length === 0 ? 'block' : 'none';
        if (loadMoreContainer) loadMoreContainer.style.display = 'none';
    } else {
        if (emptyState) emptyState.style.display = 'none';
        
        const carsToRender = data.slice(0, visibleCarsCount);
        let htmlString = '';
        
        carsToRender.forEach((car) => {
            htmlString += buildGarageCardHTML(car, { showCompare: true, showDelete: true });
        });

        if (list) list.innerHTML = htmlString;

        if (loadMoreContainer) {
            const loadMoreBtn = document.getElementById('load-more-btn');
            const collapseBtn = document.getElementById('collapse-btn');
            
            // 1. Показываем или прячем весь блок кнопок
            if (data.length > CARS_PER_PAGE) {
                loadMoreContainer.style.display = 'block';
            } else {
                loadMoreContainer.style.display = 'none';
            }

            // 2. Логика для кнопки "Показать еще" (нужна, пока видны не все машины)
            if (visibleCarsCount < data.length) {
                loadMoreBtn.style.display = 'inline-block';
            } else {
                loadMoreBtn.style.display = 'none'; // Все машины на экране — прячем её
            }

            // 3. Логика для кнопки "Свернуть" (появляется, как только вышли за лимит 6 машин)
            if (visibleCarsCount > CARS_PER_PAGE) {
                collapseBtn.style.display = 'inline-block';
            } else {
                collapseBtn.style.display = 'none';
            }
        }


    }

    updateDashboard(data);
    updateClearButtonState();
    localStorage.setItem('myrating_v3_db', JSON.stringify(cars));
    renderPromoGarage(data);
}


function loadMoreCars() {
    visibleCarsCount += CARS_PER_PAGE;
    render(currentFilteredCars);
}


function collapseCars() {
    visibleCarsCount = CARS_PER_PAGE;
    render(currentFilteredCars);
    scrollToElement('region-filters');
}



function setRegion(region) {
    currentRegion = region;
    document.querySelectorAll('#region-filters .filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.region === region);
    });
    filterCars();
}


function toggleCompare(id) {
    const car = cars.find(c => c.id === id);
    if (!car) return;

    const existsIndex = compareList.findIndex(c => c.id === id);
    if (existsIndex > -1) {
        compareList.splice(existsIndex, 1);
    } else {
        if (compareList.length >= compareLimit) {
            setCompareLimitNote(`Максимум ${compareLimit} авто для сравнения`);
            return;
        }
        compareList.push(car);
    }

    setCompareLimitNote('');
    updateCompareBarUI();
    
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
    const region = normalizeRegionValue(regionSelect.value);

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
function resetCompare() {
    compareList = [];
    setCompareLimitNote('');
    updateCompareBarUI();
    filterCars();
}

function deleteCar(id) { 
    cars = cars.filter(c => c.id !== id);
    compareList = compareList.filter(c => c.id !== id);
    setCompareLimitNote('');
    updateCompareBarUI();
    
    filterCars(); 
}

function setCompareLimitNote(message) {
    const note = document.getElementById('compare-limit-note');
    if (!note) return;

    if (compareLimitNoteTimer) {
        clearTimeout(compareLimitNoteTimer);
        compareLimitNoteTimer = null;
    }

    note.innerText = message;
    note.classList.toggle('visible', Boolean(message));

    if (message) {
        compareLimitNoteTimer = setTimeout(() => {
            note.innerText = '';
            note.classList.remove('visible');
            compareLimitNoteTimer = null;
        }, 2500);
    }
}

function updateSortButtonsUI() {
    const labels = { rating: 'По рейтингу', price: 'По цене' };

    Object.keys(labels).forEach(key => {
        const btn = document.getElementById(`sort-btn-${key}`);
        if (!btn) return;

        const arrowEl = btn.querySelector('.sort-arrow');
        const isActive = activeSortKey === key;

        btn.classList.toggle('sort-btn--active', isActive);
        btn.classList.toggle('sort-btn--desc', isActive && sortDirections[key] === 'desc');
        btn.classList.toggle('sort-btn--asc', isActive && sortDirections[key] === 'asc');

        if (arrowEl) {
            arrowEl.textContent = isActive ? (sortDirections[key] === 'desc' ? '↓' : '↑') : '';
        }

        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        const dirLabel = sortDirections[key] === 'desc' ? 'убыванию' : 'возрастанию';
        btn.setAttribute('aria-label', isActive
            ? `${labels[key]}: ${dirLabel}`
            : labels[key]);
    });
}

function sortCars(key) {
    if (activeSortKey === key) {
        sortDirections[key] = sortDirections[key] === 'desc' ? 'asc' : 'desc';
    } else {
        activeSortKey = key;
        sortDirections[key] = 'desc';
    }

    const dir = sortDirections[key];
    cars.sort((a, b) => (dir === 'desc' ? b[key] - a[key] : a[key] - b[key]));

    updateSortButtonsUI();
    filterCars();
}

function restoreDefaults() { cars = JSON.parse(JSON.stringify(defaultCars)); filterCars(); }
function clearAll() { openClearModal(); }

function openClearModal() {
    document.getElementById('clear-modal').style.display = 'block';
}

function closeClearModal() {
    document.getElementById('clear-modal').style.display = 'none';
}

function confirmClearAll() {
    lastClearedState = {
        cars: JSON.parse(JSON.stringify(cars)),
        compareList: JSON.parse(JSON.stringify(compareList))
    };

    cars = [];
    compareList = [];
    setCompareLimitNote('');
    updateCompareBarUI();
    closeClearModal();
    filterCars();
    showUndoClearToast();
}

function showUndoClearToast() {
    const toast = document.getElementById('undo-clear-toast');
    const countdown = document.getElementById('undo-countdown');
    if (!toast) return;

    toast.classList.add('active');
    let secondsLeft = 5;
    if (countdown) countdown.innerText = String(secondsLeft);

    if (clearUndoTimer) clearTimeout(clearUndoTimer);
    if (clearUndoInterval) clearInterval(clearUndoInterval);

    clearUndoInterval = setInterval(() => {
        secondsLeft -= 1;
        if (countdown && secondsLeft >= 0) {
            countdown.innerText = String(secondsLeft);
        }
    }, 1000);

    clearUndoTimer = setTimeout(() => {
        toast.classList.remove('active');
        lastClearedState = null;
        if (clearUndoInterval) {
            clearInterval(clearUndoInterval);
            clearUndoInterval = null;
        }
        clearUndoTimer = null;
    }, 5000);
}

function undoClearAll() {
    if (!lastClearedState) return;

    cars = lastClearedState.cars;
    compareList = lastClearedState.compareList;
    lastClearedState = null;

    const toast = document.getElementById('undo-clear-toast');
    if (toast) toast.classList.remove('active');
    if (clearUndoTimer) {
        clearTimeout(clearUndoTimer);
        clearUndoTimer = null;
    }
    if (clearUndoInterval) {
        clearInterval(clearUndoInterval);
        clearUndoInterval = null;
    }

    updateCompareBarUI();
    filterCars();
}


function updateDashboard(data = currentFilteredCars) {
    const topCarEl = document.getElementById('top-car');
    const cheapestCarEl = document.getElementById('cheapest-car');
    const bestValueCarEl = document.getElementById('best-value-car');
    if (!topCarEl || !cheapestCarEl || !bestValueCarEl) return;

    if (data.length === 0) {
        topCarEl.innerText = '—';
        cheapestCarEl.innerText = '—';
        bestValueCarEl.innerText = '—';
        return;
    }

    // Вспомогательная функция для генерации HTML-содержимого карточки
    const renderCardContent = (car) => {
        const usdPerPoint = Math.round(car.price / car.rating);
        return `
            <strong class="dashboard-car-name">${escapeHTML(car.name)}</strong>
            <span style="font-size: 0.9rem; font-weight: 400; opacity: 0.7; display: block; margin-top: 4px;">
                $${car.price.toLocaleString()} | ${car.rating} ★
            </span>
            <span style="font-size: 0.8rem; font-weight: 600; color: #2563eb; opacity: 0.9; display: block; margin-top: 2px;">
                $${usdPerPoint.toLocaleString()} за 1 балл
            </span>
        `;
    };

    const topCar = [...data].sort((a, b) => b.rating - a.rating)[0];
    topCarEl.innerHTML = renderCardContent(topCar);

    const cheapestCar = [...data].sort((a, b) => a.price - b.price)[0];
    cheapestCarEl.innerHTML = renderCardContent(cheapestCar);

    const bestValueCar = [...data].sort((a, b) => {
        const costPerPointA = a.price / a.rating;
        const costPerPointB = b.price / b.rating;
        return costPerPointA - costPerPointB;
    })[0];
    bestValueCarEl.innerHTML = renderCardContent(bestValueCar);
}



function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    document.getElementById('theme-icon').src = isDark ? 'theme_light.png' : 'theme_night.png';
    localStorage.setItem('myrating_theme', isDark ? 'dark' : 'light');
}

function initTheme() {
    const isDark = localStorage.getItem('myrating_theme') === 'dark';
    document.body.classList.toggle('dark-theme', isDark);
    document.getElementById('theme-icon').src = isDark ? 'theme_light.png' : 'theme_night.png';
}

function initNewsModal() {
    const newsModal = document.getElementById('news-modal');
    if (!newsModal) return;
    newsModal.addEventListener('click', (e) => {
        if (e.target === newsModal) closeNewsModal();
    });
}

const VIN_BANNER_HTML = `
    <section class="vin-services-section" aria-label="Рекомендуемые сервисы">
        <div class="section-header">
            <h2>⭐ Рекомендуемые сервисы</h2>
            <p>Проверенные партнёры для проверки автомобиля по VIN перед покупкой</p>
        </div>
        <section class="promo-banner">
            <div class="promo-content">
                <div class="promo-text">
                    <h3>🔍 Проверка истории по VIN</h3>
                    <p>ДТП, пробеги и залоги в одном отчете.</p>
                </div>
                <a href="https://autoteka.ru/" target="_blank" rel="noopener noreferrer" class="btn-main btn-small vin-btn">Проверить в Автотеке</a>
            </div>
        </section>
    </section>`;

function mountVinBanners() {
    document.querySelectorAll('[data-vin-banner]').forEach(slot => {
        slot.innerHTML = VIN_BANNER_HTML;
    });
}

function initApp() {
    initTheme();
    updateSortButtonsUI();
    filterCars();
    setupShareLinks();
    renderPromoNews();
    initNewsTabs();
    initNewsModal();
    initModalClickOutside();
    initContactForm();
    mountVinBanners();
    if (typeof initEncyclopediaApp === 'function') initEncyclopediaApp();
}

document.addEventListener('DOMContentLoaded', initApp);

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

// --- Управление формой обратной связи ---
function openContactModal() {
    document.getElementById('contact-modal').style.display = 'block';
}

function closeContactModal() {
    document.getElementById('contact-modal').style.display = 'none';
}

function initModalClickOutside() {
    window.addEventListener('click', (event) => {
        if (event.target === document.getElementById('compare-modal')) closeCompare();
        if (event.target === document.getElementById('contact-modal')) closeContactModal();
        if (event.target === document.getElementById('clear-modal')) closeClearModal();
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const contactStatus = document.getElementById('contact-status');
    if (!contactForm || !contactStatus) return;

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Отправка...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(event.target.action, {
                method: contactForm.method,
                body: new FormData(event.target),
                headers: { Accept: 'application/json' }
            });

            if (response.ok) {
                contactStatus.innerText = '✅ Сообщение успешно отправлено!';
                contactStatus.style.color = '#22c55e';
                contactStatus.style.display = 'block';
                contactForm.reset();
                setTimeout(() => {
                    closeContactModal();
                    contactStatus.style.display = 'none';
                }, 3000);
            } else {
                const responseData = await response.json();
                contactStatus.innerText = Object.hasOwn(responseData, 'errors')
                    ? responseData.errors.map(error => error.message).join(', ')
                    : '❌ Произошла ошибка при отправке.';
                contactStatus.style.color = 'var(--danger)';
                contactStatus.style.display = 'block';
            }
        } catch {
            contactStatus.innerText = '❌ Ошибка сети. Проверьте подключение.';
            contactStatus.style.color = 'var(--danger)';
            contactStatus.style.display = 'block';
        } finally {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}


// База данных новостей портала (новые добавляй вверх массива)
const newsDatabase = [
    {
        id: 5, 
        date: "28.05.2026",
        tag: "Обновление",
        title: "Глобальное обновление: добавили Базу знаний в Энциклопедии и новые умные вкладки!",
        excerpt: "Мы полностью переработали архитектуру данных и запустили интерактивные вкладки для быстрого анализа двигателей, коробок и слабых мест авто...", 
        fullText: `
            <p>Команда <strong>MyRating.autos</strong> рада представить самое масштабное техническое обновление нашего портала!</p>
            
            <p>Мы проделали огромную работу, долго и скрупулезно мучались с дизайном интерфейса, чтобы сделать его максимально интуитивным, легким и быстрым как на смартфонах, так и на ПК. Нашей главной задачей было уместить огромный массив технической информации, не перегружая ваши экраны.</p>
            
            <h3>🔥 Что нового?</h3>
            <ul>
                <li><strong>Интерактивные вкладки на карточках:</strong> Теперь прямо из общего списка можно мгновенно переключаться между ключевыми параметрами машины — смотреть коды кузовов, доступные моторы, коробки передач, рейтинги безопасности или сразу переходить к «болячкам». Больше никаких бесконечных текстовых простыней!</li>
                <li><strong>Масштабное расширение базы:</strong> Мы добавили более 100 популярных автомобилей для рынков РБ и РФ во всех поколениях! Теперь в энциклопедии есть всё: от народных любимцев в бюджете ~$8,000 (VW Polo, Skoda Rapid, Hyundai Solaris, Kia Rio) до современных кроссоверов и новинок рынка.</li>
                <li><strong>Связанные компоненты:</strong> Двигатели и коробки передач теперь вынесены в отдельные независимые справочники с подробным разбором их реального ресурса и специфики обслуживания в наших условиях.</li>
            </ul>

            <p style="background: rgba(37, 99, 235, 0.1); border-left: 4px solid var(--primary); padding: 12px; border-radius: 4px; margin: 15px 0;">
                <strong>💡 И это только начало!</strong> Данное обновление заложило прочный фундамент для архитектуры портала. Мы продолжим активно расширять базу моделей, добавлять экспертные обзоры и новые инструменты аналитики.
            </p>
            
            <p>Заходите в раздел <strong>«Энциклопедия»</strong>, тестируйте новые вкладки и подбирайте свой идеальный автомобиль с умом!</p>
        ` // <-- Косая кавычка здесь закрывает текст. И не забываем запятую в конце объекта!
    },


    {
        id: 1,
        date: "21.05.2026",
        tag: "Обновление",
        title: "Юбилейное обновление: Внедрена умная пагинация гаража",
        excerpt: "Наш портал преодолел отметку в 100 коммитов! В честь этого события мы полностью переработали интерфейс вывода автомобилей. Теперь длинные списки автоматически скрываются под кнопку «Показать еще», разгружая процессор и память вашего устройства, а сворачивание списка мгновенно возвращает вас к панели фильтров.",
        fullText: "<p>Наш портал преодолел знаковую отметку в 100 коммитов! В честь этого технологического юбилея мы полностью переработали архитектуру вывода карточек в вашем гараже.</p><p>При добавлении большого количества машин страница больше не превращается в бесконечную простыню контента. Теперь система отображает порции по 6 автомобилей. Интерактивная кнопка «Показать еще» позволяет плавно расширять список, а умная кнопка «Свернуть» аккуратно возвращает вас назад, автоматически центрируя экран на блоке выбора стран и регионов.</p><p>Это обновление значительно снизило нагрузку на DOM-дерево и сделало использование агрегатора на мобильных телефонах максимально премиальным и быстрым.</p>"
    },
    {
        id: 2,
        date: "14.05.2026",
        tag: "Аналитика",
        title: "Цены за балл рейтинга: как не переплатить в 2026 году?",
        excerpt: "Мы провели масштабное исследование добавленных пользователями автомобилей за весну. На основе нашей уникальной метрики «Цена за балл» были выявлены явные лидеры вторичного рынка в сегментах Азии и Европы.",
        fullText: "<p>Использование разработанного нами коэффициента стоимости одного балла экспертной оценки показало удивительные результаты при анализе рынка.</p><p>В ходе весеннего аудита выяснилось, что наиболее эффективное вложение средств среди б/у сегментов обеспечивают автомобили азиатского региона возрастом 3-5 лет в состоянии «Косметика» — их цена за балл рейтинга в среднем на 18% выгоднее идеальных моделей из автосалонов. В то же время европейский премиум-сегмент демонстрирует самую высокую удельную стоимость за один балл, что обусловлено резким падением остаточной стоимости электрокаров.</p>"
    },
    {
        id: 3,
        date: "01.05.2026",
        tag: "Функционал",
        title: "Запуск системы кросс-сравнения моделей",
        excerpt: "Разработан и запущен долгожданный плавающий модуль сравнения характеристик. Выбирайте до 3 машин одновременно и оценивайте их параметры лоб в лоб в один клик.",
        fullText: "<p>В CodLod Studio разработан интерактивный модуль для сопоставления автомобилей. Теперь вам не нужно переключаться между вкладками или сверять параметры по памяти.</p><p>Достаточно нажать кнопку «Добавить к сравнению» на любых карточках (лимит системы — до 3 моделей одновременно). Внизу экрана появится плавающий бар, фиксирующий ваш выбор. При клике на кнопку «Сравнить» открывается детальная интерактивная таблица, наглядно демонстрирующая разницу в ценах, пробеге, годе выпуска и, самое главное, в итоговом рейтинге машин.</p>"
    },
    {
        id: 4,
        date: "15.04.2026",
        tag: "База данных",
        title: "Миграция данных из Excel таблиц успешно завершена",
        excerpt: "Локальное хранилище портала полностью синхронизировано. Все экспертные оценки, собранные аналитиками вручную, теперь обрабатываются встроенным JavaScript-движком.",
        fullText: "<p>Мы официально завершили этап ручного проектирования архитектуры в таблицах Excel. Все накопленные данные перенесены в полноценные структуры объектов JavaScript и интегрированы со встроенным хранилищем LocalStorage браузера.</p><p>Это позволило внедрить систему мгновенной фильтрации по регионам происхождения (США, Европа, Азия, СНГ), защитить пользовательские сессии от случайной потери данных при перезагрузке и заложить прочный фундамент под будущую интеграцию полноценных серверных баз данных.</p>"
    }

];

let currentNewsTab = 'all';

function buildNewsCardHTML(item) {
    return `
        <div class="news-card">
            <div>
                <div class="news-card-header">
                    <span class="news-date">🗓️ ${item.date}</span>
                    <span class="news-tag">${escapeHTML(item.tag)}</span>
                </div>
                <h3>${escapeHTML(item.title)}</h3>
                <p class="news-excerpt">${escapeHTML(item.excerpt)}</p>
            </div>
            <button class="btn-read-more" onclick="openNewsModal(${item.id})">Подробнее →</button>
        </div>
    `;
}

function getFilteredNews() {
    const searchInput = document.getElementById('news-search');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    return newsDatabase.filter(item => {
        const matchesTab = currentNewsTab === 'all' || item.tag === currentNewsTab;
        const haystack = `${item.title} ${item.excerpt} ${item.tag}`.toLowerCase();
        const matchesSearch = !query || haystack.includes(query);
        return matchesTab && matchesSearch;
    });
}

function renderPromoNews() {
    const container = document.getElementById('promo-news-container');
    if (!container) return;

    container.innerHTML = newsDatabase.slice(0, 3).map(item => `
        <div class="car-card news-promo-card">
            <div class="news-card-header">
                <span class="news-date">🗓️ ${item.date}</span>
                <span class="news-tag">${escapeHTML(item.tag)}</span>
            </div>
            <h3 class="promo-card-title">${escapeHTML(item.title)}</h3>
            <p class="news-excerpt news-excerpt--promo">${escapeHTML(item.excerpt)}</p>
            <button class="btn-main btn-small btn-card-full" onclick="openNewsModal(${item.id})">Читать новость</button>
        </div>
    `).join('');
}

function renderNewsScreen() {
    const newsGrid = document.getElementById('news-screen-grid');
    if (!newsGrid) return;

    const filtered = getFilteredNews();

    if (filtered.length === 0) {
        newsGrid.innerHTML = '<div class="empty-message empty-message--grid"><p>Ничего не найдено. Попробуйте другой запрос или категорию.</p></div>';
        return;
    }

    newsGrid.innerHTML = filtered.map(item => buildNewsCardHTML(item)).join('');
}

function filterNews() {
    renderNewsScreen();
}

function initNewsTabs() {
    const tabButtons = document.querySelectorAll('[data-news-tab]');
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentNewsTab = e.currentTarget.getAttribute('data-news-tab');
            renderNewsScreen();
        });
    });
}

function renderPromoGarage(data = currentFilteredCars) {
    const container = document.getElementById('promo-garage-container');
    if (!container) return;

    if (cars.length === 0) {
        container.innerHTML = `
            <div class="car-card empty-message empty-message--grid">
                <div class="card-emoji card-emoji--large">📁</div>
                <h3>Гараж пуст</h3>
                <p class="promo-card-excerpt">Добавьте первый автомобиль или восстановите демо-набор</p>
                <button class="btn-main btn-small btn-card-full" onclick="switchScreen('garage'); restoreDefaults();">Восстановить гараж</button>
            </div>`;
        return;
    }

    if (data.length === 0) {
        container.innerHTML = `
            <div class="car-card empty-message empty-message--grid">
                <h3>Ничего не найдено</h3>
                <p class="promo-card-excerpt">По выбранному фильтру или запросу автомобилей нет. Сбросьте фильтр или измените поиск.</p>
            </div>`;
        return;
    }

    // Если пользователь применил сортировку (activeSortKey не равен null), 
    // показываем первые 3 машины в выбранном им порядке.
    // Если сортировка не выбрана, показываем топ-3 по рейтингу (поведение по умолчанию).
    const topCars = activeSortKey 
        ? data.slice(0, 3) 
        : [...data].sort((a, b) => b.rating - a.rating).slice(0, 3);

    container.innerHTML = topCars
        .map(car => buildGarageCardHTML(car, { showCompare: false, showDelete: false }))
        .join('');
}

// Открытие модального окна новости
function openNewsModal(id) {
    const newsItem = newsDatabase.find(item => item.id === id);
    if (!newsItem) return;

    document.getElementById('modal-news-date').textContent = `🗓️ Дата публикации: ${newsItem.date} | Категория: ${newsItem.tag}`;
    document.getElementById('modal-news-title').textContent = newsItem.title;
    document.getElementById('modal-news-content').innerHTML = newsItem.fullText;

    const modal = document.getElementById('news-modal');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Запрещаем скролл страницы под модалкой
}

// Закрытие модального окна новости
function closeNewsModal() {
    const modal = document.getElementById('news-modal');
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Возвращаем скролл
}
