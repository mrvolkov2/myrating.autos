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
    { id: 22, name: "VW Polo", price: 14500, rating: 6.5, region: "eu", year: 2020, mileage: 65, condition: 0.85 },
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

function filterCars() {
    const query = document.getElementById('search-input').value.toLowerCase();
    let filtered = cars;
    
    if (currentRegion !== 'all') {
        filtered = filtered.filter(c => c.region === currentRegion);
    }
    
    if (query) {
        filtered = filtered.filter(c => c.name.toLowerCase().includes(query));
    }
    
    // Сохраняем отфильтрованный список в глобальную переменную
    currentFilteredCars = filtered;
    
    // При любом изменении фильтра или поиска — сбрасываем счетчик на начальный
    visibleCarsCount = CARS_PER_PAGE;
    
    render(currentFilteredCars);
}


function render(data = cars) {
    const list = document.getElementById('car-list');
    const statsCount = document.getElementById('stats-count');
    const emptyState = document.getElementById('empty-state');
    const loadMoreContainer = document.getElementById('load-more-container');
    
    if (data === cars) {
        currentFilteredCars = cars;
    }

    statsCount.innerHTML = `<span class="stats-icon">🚘</span><span>В гараже:</span> <strong class="stats-value">${data.length}</strong>`;
    statsCount.classList.remove('pulse');
    void statsCount.offsetWidth;
    statsCount.classList.add('pulse');
    if (statsPulseTimer) clearTimeout(statsPulseTimer);
    statsPulseTimer = setTimeout(() => statsCount.classList.remove('pulse'), 350);

    const regionLabels = {
        'usa': '<img src="flag-usa.svg" class="flag-icon" alt=""> США',
        'eu': '<img src="flag-eu.svg" class="flag-icon" alt=""> Европа',
        'asia': '<img src="flag-asia.svg" class="flag-icon" alt=""> Азия',
        'ru': '<img src="flag-ru.svg" class="flag-icon" alt=""> РФ / СНГ'
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
        if (loadMoreContainer) loadMoreContainer.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        
        const carsToRender = data.slice(0, visibleCarsCount);
        let htmlString = '';
        
        carsToRender.forEach((car) => {
            const isComparing = compareList.some(c => c.id === car.id);
            const isCompareLimitReached = compareList.length >= compareLimit;
            const shouldDisableCompareButton = isCompareLimitReached && !isComparing;
            const regionBadge = car.region ? `<div class="region-badge">${regionLabels[car.region] || '🌐 Другое'}</div>` : '';
            const safeName = escapeHTML(car.name); 
            
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
                            class="btn-main btn-small btn-compare-full ${isComparing ? 'active' : ''}"
                            ${shouldDisableCompareButton ? 'disabled' : ''}>
                        ${isComparing ? `✅ В сравнении (${compareList.length}/${compareLimit})` : `⚖️ Добавить к сравнению (${compareList.length}/${compareLimit})`}
                    </button>
                </div>`;
        });
        
        list.innerHTML = htmlString;
        
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
                loadMoreBtn.style.style.display = 'none'; // Все машины на экране — прячем её
            }

            // 3. Логика для кнопки "Свернуть" (появляется, как только вышли за лимит 6 машин)
            if (visibleCarsCount > CARS_PER_PAGE) {
                collapseBtn.style.display = 'inline-block';
            } else {
                collapseBtn.style.display = 'none';
            }
        }


    } // Закрыли else

    updateDashboard();
    updateClearButtonState();
    localStorage.setItem('myrating_v3_db', JSON.stringify(cars));
} // Закрыли функцию render


function loadMoreCars() {
    visibleCarsCount += CARS_PER_PAGE;
    render(currentFilteredCars);
}


function collapseCars() {
    visibleCarsCount = CARS_PER_PAGE; // Сбрасываем до начальных 6
    render(currentFilteredCars);
    
    // Находим секцию фильтров по региону
    const filtersElement = document.getElementById('region-filters');
    
    if (filtersElement) {
        // Получаем точное расстояние от верха страницы до панели фильтров
        const elementPosition = filtersElement.getBoundingClientRect().top + window.pageYOffset;
        
        // Высота твоей фиксированной шапки (80px) + берем небольшой запас в 15px для красоты
        const offsetPosition = elementPosition - 95; 

        // Плавно скроллим страницу с учетом отступа под шапку
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}



function setRegion(region) {
    currentRegion = region;
    document.querySelectorAll('.filter-btn').forEach(btn => {
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

function sortCars(key) { 
    cars.sort((a, b) => b[key] - a[key]); 
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


function updateDashboard() {
    const topCarEl = document.getElementById('top-car');
    const cheapestCarEl = document.getElementById('cheapest-car');
    const bestValueCarEl = document.getElementById('best-value-car');

    // Если гараж пуст, сбрасываем всё в дефолтное состояние
    if (cars.length === 0) {
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

    // 1. Лидер рейтинга (самый высокий балл)
    const topCar = [...cars].sort((a, b) => b.rating - a.rating)[0];
    topCarEl.innerHTML = renderCardContent(topCar);

    // 2. Авто с минимальной ценой
    const cheapestCar = [...cars].sort((a, b) => a.price - b.price)[0];
    cheapestCarEl.innerHTML = renderCardContent(cheapestCar);

    // 3. Лучший по соотношению Цена/Качество (минимальная стоимость одного балла)
    const bestValueCar = [...cars].sort((a, b) => {
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
    const clearModal = document.getElementById('clear-modal');
    if (event.target == compareModal) {
        closeCompare();
    }
    if (event.target == contactModal) {
        closeContactModal();
    }
    if (event.target == clearModal) {
        closeClearModal();
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