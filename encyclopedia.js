/**
 * БАЗА ДАННЫХ ЭНЦИКЛОПЕДИИ НАДЕЖНОСТИ (MyRating.autos)
 */
const encyclopediaDatabase = [
    {
        id: "volvo-xc90-ii",
        name: "Volvo XC90 (II поколение)",
        years: "2015 — н.в.",
        rating: "8.8",
        isPopular: true,
        imagePlaceholder: "🚗",
        summary: "Премиальный кроссовер с отличной безопасностью, но требовательной к софту электроникой.",
        body: { rating: "high", text: "Кузов отлично оцинкован. Ржавчина не появляется даже в местах глубоких сколов. Хром на элементах отделки может мутнеть от зимних реагентов в СНГ." },
        transmission: { rating: "high", text: "8-ступенчатый автомат Aisin крайне надежен. Главное — менять масло каждые 60 000 км и следить за чистотой радиаторов. Спокойно ходит до 300 тыс. км." },
        engines: "Дизель D5 (2.0) хорош после 2017 года (когда устранили проблему с патрубками турбины PowerPulse). Бензиновый T6 (турбина + компрессор) сложный, очень требователен к качеству топлива и масла.",
        safety: "Традиционные 5 звезд Euro NCAP. Один из самых безопасных автомобилей в классе благодаря прочнейшей капсуле салона из бористой стали и комплексу систем безопасности City Safety (автоторможение, удержание в полосе).",
        weakPoints: ["Глюки мультимедиа Sensus на ранних версиях прошивок", "Быстрый износ оригинальных тормозных дисков", "Датчики пневмоподвески боятся грязи и соли"]
    },

    {
        id: "vw-passat-b8",
        name: "Volkswagen Passat B8",
        years: "2014 — 2023",
        rating: "8.6",
        isPopular: true,
        imagePlaceholder: "🚗",
        summary: "Эталон управляемости и эргономики в классе, но требует качественного обслуживания сложных узлов.",
        body: { 
            rating: "high", 
            text: "Кузов автомобиля имеет полную двустороннюю гальваническую оцинковку. ЛКП прочное, однако на стыках бамперов с крыльями и в районе колесных арок со временем могут появляться сколы, которые долго не цветут благодаря качественному металлу." 
        },
        transmission: { 
            rating: "medium", 
            text: "Роботы DSG-7 (DQ200 с сухими сцеплениями) после 2014 года стали значительно надежнее, но в пробках всё же изнашиваются быстрее. Модификации с DSG-6 (DQ250) и DSG-7 (DQ381) с мокрыми сцеплениями на мощных моторах ходят до 250 000 км при замене масла каждые 60 000 км." 
        },
        engines: "Бензиновые моторы серии ЕА211 (1.4 TSI) избавились от проблем с цепью (теперь там ремень) и масложором. 2.0 TSI (серия EA888 Gen3) динамичен, но требователен к качеству помпы и термостата. Дизели 2.0 TDI (EA288) — одни из лучших и самых живучих, легко выхаживают за 300 000 км.",
        safety: "5 звезд Euro NCAP (95% за безопасность взрослых). В базе идут фронтальные и боковые подушки, шторки безопасности, система распознавания усталости водителя и функция автоторможения Multi-collision Brake. В богатых комплектациях доступен отличный адаптивный круиз-контроль (ACC) и удержание в полосе.",
        weakPoints: [
            "Скрипы сайлентблоков передних рычагов в холодную погоду (лечится смазкой)",
            "Сбои в работе сенсорного блока климат-контроля (на рестайлинге)",
            "Закисание исполнительного механизма актуатора турбины на бензиновых моторах",
            "Капризный термостат в сборе с помпой на моторах 1.8 и 2.0 TSI"
        ]
    },

    {
        id: "ford-focus-iii",
        name: "Ford Focus III (Рестайлинг)",
        years: "2014 — 2019",
        rating: "7.9",
        isPopular: true,
        imagePlaceholder: "🚗",
        summary: "Популярный хэтчбек и универсал. Надежные атмосферные моторы, но есть нюансы с роботом PowerShift.",
        body: { rating: "medium", text: "Металл неплохой, но ЛКП довольно тонкое. Сколы на капоте и колесных арках могут быстро начать 'цвести', если их вовремя не подкрашивать." },
        transmission: { rating: "low", text: "Механическая КПП идеальна. А вот робот PowerShift (DCT250) дергается в пробках, блок ТСМ часто перегорает от перегрева, а сцепление редко ходит больше 80-100 тыс. км." },
        engines: "Мотор 1.6 Sigma — старый, конструктивно простой и очень надежный (ресурс до 300к км). Турбо 1.5 EcoBoost горячий, боится перегревов и детонации — есть риск разрушения поршней.",
        safety: "5 звезд Euro NCAP. Кузов прочный, но электроника попроще, чем у премиума. В рестайлинге улучшили систему автоматического торможения Active City Stop (работает на скорости до 50 км/ч) и добавили систему отслеживания слепых зон BLIS с предупреждением о движении перекрестного транспорта.",
        weakPoints: ["Тесноватый салон на заднем ряду", "Рулевая рейка может застучать к 80 тыс. км", "Капризный блок управления роботом (TCM)"]
    }
];


// Вспомогательная функция экранирования HTML
function escapeHTML(str) {
    if (!str) return '';
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


/**
 * 1. ВКЛАДКИ И ДИНАМИЧЕСКИЙ РЕНДЕР КАРТОЧЕК
 */
let currentEncTab = 'all';

// Функция инициализации табов
function initEncyclopediaTabs() {
    const tabButtons = document.querySelectorAll('.enc-tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            currentEncTab = e.currentTarget.getAttribute('data-tab');
            renderEncyclopedia(); // Перерисовываем карточки в соответствии с новым табом
        });
    });
}

// Универсальная функция рендера карточек для любой вкладки
function renderEncyclopedia() {
    const container = document.getElementById('encyclopedia-main-container') || document.getElementById('encyclopedia-container');
    if (!container) return;

    container.innerHTML = ''; // Очищаем контейнер

    // Создаем обертку-сетку, чтобы карточки не шли сплошной строкой
    const gridWrapper = document.createElement('div');
    gridWrapper.className = 'db-promo-grid'; 

    encyclopediaDatabase.forEach(car => {
        let tabContent = '';

        // Формируем контент для центральной части карточки в зависимости от выбранного таба
        if (currentEncTab === 'all') {
            tabContent = `<p style="font-size: 14px; opacity: 0.8; min-height: 40px;">${escapeHTML(car.summary)}</p>`;
        } 
        else if (currentEncTab === 'body') {
            tabContent = `
                <div style="margin-bottom: 10px;">
                    <span class="reliability-badge reliability-${car.body.rating}">Кузов: ${car.body.rating === 'high' ? 'Отличный' : 'Средний'}</span>
                </div>
                <p style="font-size: 13px; line-height: 1.4; color: var(--text); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                    ${escapeHTML(car.body.text)}
                </p>`;
        } 
        else if (currentEncTab === 'engines') {
            tabContent = `
                <h4 style="margin-bottom: 5px; font-size: 14px; color: var(--primary);">🔧 Двигатели:</h4>
                <p style="font-size: 13px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                    ${escapeHTML(car.engines)}
                </p>`;
        } 
        else if (currentEncTab === 'transmissions') {
            tabContent = `
                <div style="margin-bottom: 10px;">
                    <span class="reliability-badge reliability-${car.transmission.rating}">КПП: ${car.transmission.rating === 'high' ? 'Надежная' : car.transmission.rating === 'medium' ? 'Средняя' : 'Слабая'}</span>
                </div>
                <p style="font-size: 13px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                    ${escapeHTML(car.transmission.text)}
                </p>`;
        } 
        else if (currentEncTab === 'safety') {
            tabContent = `
                <h4 style="margin-bottom: 5px; font-size: 14px; color: #06b6d4;">🚨 Безопасность:</h4>
                <p style="font-size: 13px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                    ${car.safety ? escapeHTML(car.safety) : 'Информация обновляется...'}
                </p>`;
        } 
        else if (currentEncTab === 'weak-points') {
            tabContent = `
                <h4 style="margin-bottom: 5px; font-size: 14px; color: var(--danger);">⚠️ Известные проблемы:</h4>
                <ul style="font-size: 13px; margin: 0; padding-left: 15px; list-style-type: disc;">
                    ${car.weakPoints.slice(0, 2).map(point => `<li>${escapeHTML(point)}</li>`).join('')}
                    ${car.weakPoints.length > 2 ? '<li>и другие нюансы...</li>' : ''}
                </ul>`;
        }

        // Рендерим элемент как полноценную карточку .car-card
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <div style="font-size: 30px; margin-bottom: 5px;">${car.imagePlaceholder}</div>
            <h3>${escapeHTML(car.name)}</h3>
            <p style="color: #64748b; font-size: 13px; margin-bottom: 10px;">Выпуск: ${car.years}</p>
            
            <div class="tab-card-preview" style="min-height: 80px; margin-bottom: 15px;">
                ${tabContent}
            </div>
            
            <button class="btn-main btn-small" style="width: 100%; margin-top: auto;" onclick="viewCarDetails('${car.id}')">Читать обзор →</button>
        `;
        gridWrapper.appendChild(carCard);
    });

    container.appendChild(gridWrapper);
}

// Заменяем старый вызов renderEncyclopediaList в switchScreen, чтобы при переходе открывался правильный плиточный вид
function renderEncyclopediaList(filterText = '') {
    const container = document.getElementById('encyclopedia-main-container');
    if (!container) return;

    // Если есть поисковый запрос, фильтруем базу на лету
    const filtered = encyclopediaDatabase.filter(car => 
        car.name.toLowerCase().includes(filterText.toLowerCase())
    );

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 40px; color: #64748b;">
                <p>Ничего не найдено по запросу "${escapeHTML(filterText)}"</p>
                <button class="btn-main btn-small" style="margin-top:10px;" onclick="renderEncyclopediaList('')">Показать все модели</button>
            </div>`;
        return;
    }

    container.innerHTML = '';
    const gridWrapper = document.createElement('div');
    gridWrapper.className = 'db-promo-grid';

    filtered.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <div style="font-size: 30px; margin-bottom: 5px;">${car.imagePlaceholder}</div>
            <h3>${escapeHTML(car.name)}</h3>
            <p style="color: #64748b; font-size: 13px; margin-bottom: 10px;">Выпуск: ${car.years}</p>
            <p style="font-size: 14px; opacity: 0.8; min-height: 40px;">${escapeHTML(car.summary)}</p>
            <button class="btn-main btn-small" style="width: 100%; margin-top: 15px;" onclick="viewCarDetails('${car.id}')">Читать обзор →</button>
        `;
        gridWrapper.appendChild(carCard);
    });
    container.appendChild(gridWrapper);
}

// Перехват ввода в поисковой строке базы
function filterDatabase() {
    const text = document.getElementById('db-search').value;
    renderEncyclopediaList(text);
}


/**
 * 2. УПРАВЛЕНИЕ ОТОБРАЖЕНИЕМ (Переключение экранов)
 */
function switchScreen(screenName) {
    const mainCalculator = document.getElementById('analytics-section') || document.querySelector('.analytics-section'); 
    const promoDatabase = document.getElementById('promo-database-section');
    const newsSection = document.getElementById('news-section');
    const encyclopediaScreen = document.getElementById('encyclopedia-screen');
    const navMain = document.getElementById('nav-main');
    const navEncy = document.getElementById('nav-encyclopedia');

    if (screenName === 'encyclopedia') {
        if (mainCalculator) mainCalculator.classList.add('hidden');
        if (promoDatabase) promoDatabase.classList.add('hidden');
        if (newsSection) newsSection.classList.add('hidden');
        if (encyclopediaScreen) encyclopediaScreen.classList.remove('hidden');
        if (navMain) navMain.classList.remove('active');
        if (navEncy) navEncy.classList.add('active');
        
        const searchInput = document.getElementById('db-search');
        if (searchInput) searchInput.value = '';
        
        // По умолчанию при входе рендерим текущую выбранную вкладку плиткой
        renderEncyclopedia();
    } else {
        if (mainCalculator) mainCalculator.classList.remove('hidden');
        if (promoDatabase) promoDatabase.classList.remove('hidden');
        if (newsSection) newsSection.classList.remove('hidden');
        if (encyclopediaScreen) encyclopediaScreen.classList.add('hidden');
        if (navMain) navMain.classList.add('active');
        if (navEncy) navEncy.classList.remove('active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


/**
 * 3. РЕНДЕРИНГ 3-Х ПРОМО-КАРТОЧЕК НА ГЛАВНОЙ
 */
function renderPromoCards() {
    const container = document.getElementById('promo-database-container');
    if (!container) return;
    
    const popularCars = encyclopediaDatabase.filter(car => car.isPopular).slice(0, 3);
    
    container.innerHTML = popularCars.map(car => `
        <div class="car-card">
            <div style="font-size: 40px; text-align: center; margin-bottom: 10px;">${car.imagePlaceholder}</div>
            <h3>${escapeHTML(car.name)}</h3>
            <p style="color: #64748b; font-size: 13px;">Годы: ${car.years}</p>
            <p style="margin: 10px 0; font-size: 14px; color: var(--text); opacity: 0.8;">${escapeHTML(car.summary)}</p>
            <div style="margin-bottom: 15px; display: flex; gap: 8px; flex-wrap: wrap;">
                <span class="reliability-badge reliability-${car.body.rating}">Кузов: ${car.body.rating === 'high' ? 'Отличный' : 'Средний'}</span>
                <span class="reliability-badge reliability-${car.transmission.rating}">КПП: ${car.transmission.rating === 'high' ? 'Надежная' : car.transmission.rating === 'medium' ? 'Средняя' : 'Слабая'}</span>
            </div>
            <button class="btn-main btn-small" style="width: 100%;" onclick="viewCarDetails('${car.id}')">Читать обзор</button>
        </div>
    `).join('');
}


/**
 * 4. СТРАНИЦА КОНКРЕТНОЙ МАШИНЫ (ДЕТАЛЬНЫЙ ОБЗОР)
 */
function viewCarDetails(carId) {
    const encyclopediaScreen = document.getElementById('encyclopedia-screen');
    if (encyclopediaScreen && encyclopediaScreen.classList.contains('hidden')) {
        switchScreen('encyclopedia');
    }

    const car = encyclopediaDatabase.find(c => c.id === carId);
    if (!car) return;

    const container = document.getElementById('encyclopedia-main-container');
    if (!container) return;
    
    container.innerHTML = `
        <button class="btn-main btn-small db-back-btn" onclick="renderEncyclopedia()">← Вернуться к списку авто</button>
        
        <div class="section-header" style="text-align: left; margin-bottom: 25px;">
            <h2>${escapeHTML(car.name)} <span style="color: var(--primary);">⭐ ${car.rating}/10</span></h2>
            <p>Период выпуска: <strong>${car.years}</strong></p>
        </div>

        <div class="db-details-grid">
            <div class="db-details-card">
                <h3>🛡️ Стойкость кузова к коррозии</h3>
                <span class="reliability-badge reliability-${car.body.rating}">
                    ${car.body.rating === 'high' ? 'Отличная стойкость' : car.body.rating === 'medium' ? 'Средняя стойкость' : 'Слабая стойкость'}
                </span>
                <p style="margin-top: 15px; font-size: 15px; line-height: 1.5;">${escapeHTML(car.body.text)}</p>
            </div>

            <div class="db-details-card">
                <h3>⚙️ Transmission и коробки передач</h3>
                <span class="reliability-badge reliability-${car.transmission.rating}">
                    ${car.transmission.rating === 'high' ? 'Высокая надежность' : car.transmission.rating === 'medium' ? 'Есть нюансы / Средняя' : 'Зона риска / Требует внимания'}
                </span>
                <p style="margin-top: 15px; font-size: 15px; line-height: 1.5;">${escapeHTML(car.transmission.text)}</p>
            </div>

            <div class="db-details-card">
                <h3>🔧 Надежность линейки двигателей</h3>
                <p style="font-size: 15px; line-height: 1.5; margin-top: 10px;">${escapeHTML(car.engines)}</p>
            </div>

            <div class="db-details-card">
                <h3>⚠️ Частые болячки и слабые места</h3>
                <ul style="margin-top: 10px; padding-left: 20px; font-size: 15px; line-height: 1.6;">
                    ${car.weakPoints.map(point => `<li>${escapeHTML(point)}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


/**
 * ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
 */
document.addEventListener('DOMContentLoaded', () => {
    initEncyclopediaTabs();
    renderPromoCards();
    renderEncyclopedia(); 
});