/**
 * База данных энциклопедии надежности (MyRating.autos)
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

const MAIN_PROMO_SECTIONS = [
    'promo-database-section',
    'promo-news-section',
    'promo-garage-section',
    'garage-tools-panel',
    'promo-garage-cards'
];

const GARAGE_SHARED_UI = ['garage-tools-panel'];
const GARAGE_TAB_ONLY = ['garage-screen-intro', 'garage-screen'];

const APP_SCREENS = {
    encyclopedia: 'encyclopedia-screen',
    news: 'news-screen',
    garage: 'garage-screen'
};

const BODY_RELIABILITY_LABEL = { high: 'Отличный', medium: 'Средний', low: 'Слабый' };
const TRANSMISSION_RELIABILITY_LABEL = { high: 'Надежная', medium: 'Средняя', low: 'Слабая' };
const BODY_STRENGTH_LABEL = { high: 'Отличная стойкость', medium: 'Средняя стойкость', low: 'Слабая стойкость' };
const TRANSMISSION_STRENGTH_LABEL = { high: 'Высокая надежность', medium: 'Есть нюансы / Средняя', low: 'Зона риска / Требует внимания' };

let currentEncTab = 'all';

function getEncyclopediaTabContent(car, tab) {
    if (tab === 'body') {
        return `
            <div class="tab-badge-row">
                <span class="reliability-badge reliability-${car.body.rating}">Кузов: ${BODY_RELIABILITY_LABEL[car.body.rating] || 'Средний'}</span>
            </div>
            <p class="tab-preview-text">${escapeHTML(car.body.text)}</p>`;
    }
    if (tab === 'engines') {
        return `
            <h4 class="tab-preview-title tab-preview-title--engines">🔧 Двигатели:</h4>
            <p class="tab-preview-text">${escapeHTML(car.engines)}</p>`;
    }
    if (tab === 'transmissions') {
        return `
            <div class="tab-badge-row">
                <span class="reliability-badge reliability-${car.transmission.rating}">КПП: ${TRANSMISSION_RELIABILITY_LABEL[car.transmission.rating] || 'Средняя'}</span>
            </div>
            <p class="tab-preview-text">${escapeHTML(car.transmission.text)}</p>`;
    }
    if (tab === 'safety') {
        return `
            <h4 class="tab-preview-title tab-preview-title--safety">🚨 Безопасность:</h4>
            <p class="tab-preview-text">${escapeHTML(car.safety || 'Информация обновляется...')}</p>`;
    }
    if (tab === 'weak-points') {
        const points = car.weakPoints.slice(0, 2).map(point => `<li>${escapeHTML(point)}</li>`).join('');
        const more = car.weakPoints.length > 2 ? '<li>и другие нюансы...</li>' : '';
        return `
            <h4 class="tab-preview-title tab-preview-title--danger">⚠️ Известные проблемы:</h4>
            <ul class="tab-preview-list">${points}${more}</ul>`;
    }
    return `<p class="tab-preview-summary">${escapeHTML(car.summary)}</p>`;
}

function buildEncyclopediaCardHTML(car, options = {}) {
    const tab = options.searchMode ? 'all' : currentEncTab;
    const tabContent = options.searchMode
        ? `<p class="tab-preview-summary">${escapeHTML(car.summary)}</p>`
        : getEncyclopediaTabContent(car, tab);

    return `
        <div class="car-card">
            <div class="card-emoji">${car.imagePlaceholder}</div>
            <h3>${escapeHTML(car.name)}</h3>
            <p class="card-meta">Выпуск: ${car.years}</p>
            <div class="tab-card-preview">${tabContent}</div>
            <button class="btn-main btn-small btn-card-full" onclick="viewCarDetails('${car.id}')">Читать обзор →</button>
        </div>`;
}

function renderEncyclopedia(filterText = '') {
    const container = document.getElementById('encyclopedia-main-container');
    if (!container) return;

    const query = filterText.trim().toLowerCase();
    const filtered = query
        ? encyclopediaDatabase.filter(car => car.name.toLowerCase().includes(query))
        : encyclopediaDatabase;

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-message">
                <p>Ничего не найдено${query ? ` по запросу «${escapeHTML(filterText)}»` : ''}.</p>
                <button class="btn-main btn-small" onclick="clearDatabaseSearch()">Показать все модели</button>
            </div>`;
        return;
    }

    container.innerHTML = `<div class="db-promo-grid">${filtered.map(car => buildEncyclopediaCardHTML(car, { searchMode: Boolean(query) })).join('')}</div>`;
}

function clearDatabaseSearch() {
    const searchInput = document.getElementById('db-search');
    if (searchInput) searchInput.value = '';
    renderEncyclopedia();
}

function filterDatabase() {
    const text = document.getElementById('db-search')?.value || '';
    renderEncyclopedia(text);
}

function initEncyclopediaTabs() {
    document.querySelectorAll('.enc-tab-btn[data-tab]').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.enc-tab-btn[data-tab]').forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentEncTab = e.currentTarget.getAttribute('data-tab');
            renderEncyclopedia(document.getElementById('db-search')?.value || '');
        });
    });
}

function setNavActive(screenName) {
    const navMap = {
        main: 'nav-main',
        encyclopedia: 'nav-encyclopedia',
        news: 'nav-news',
        garage: 'nav-garage'
    };
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.getElementById(navMap[screenName])?.classList.add('active');
}

function switchScreen(screenName) {
    MAIN_PROMO_SECTIONS.forEach(id => document.getElementById(id)?.classList.add('hidden'));
    Object.values(APP_SCREENS).forEach(id => document.getElementById(id)?.classList.add('hidden'));
    GARAGE_SHARED_UI.forEach(id => document.getElementById(id)?.classList.add('hidden'));
    GARAGE_TAB_ONLY.forEach(id => document.getElementById(id)?.classList.add('hidden'));
    document.getElementById('main-vin-banner')?.classList.add('hidden');

    if (screenName === 'main') {
        MAIN_PROMO_SECTIONS.forEach(id => document.getElementById(id)?.classList.remove('hidden'));
        document.getElementById('main-vin-banner')?.classList.remove('hidden');
        setNavActive('main');
    } else if (screenName === 'encyclopedia') {
        document.getElementById(APP_SCREENS.encyclopedia)?.classList.remove('hidden');
        setNavActive('encyclopedia');
        const searchInput = document.getElementById('db-search');
        if (searchInput) searchInput.value = '';
        renderEncyclopedia();
    } else if (screenName === 'news') {
        document.getElementById(APP_SCREENS.news)?.classList.remove('hidden');
        setNavActive('news');
        renderNewsScreen();
    } else if (screenName === 'garage') {
        GARAGE_TAB_ONLY.forEach(id => document.getElementById(id)?.classList.remove('hidden'));
        GARAGE_SHARED_UI.forEach(id => document.getElementById(id)?.classList.remove('hidden'));
        setNavActive('garage');
        filterCars();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPromoCards() {
    const container = document.getElementById('promo-database-container');
    if (!container) return;

    container.innerHTML = encyclopediaDatabase
        .filter(car => car.isPopular)
        .slice(0, 3)
        .map(car => `
            <div class="car-card">
                <div class="card-emoji card-emoji--large">${car.imagePlaceholder}</div>
                <h3>${escapeHTML(car.name)}</h3>
                <p class="card-meta">Годы: ${car.years}</p>
                <p class="tab-preview-summary">${escapeHTML(car.summary)}</p>
                <div class="promo-badges">
                    <span class="reliability-badge reliability-${car.body.rating}">Кузов: ${BODY_RELIABILITY_LABEL[car.body.rating] || 'Средний'}</span>
                    <span class="reliability-badge reliability-${car.transmission.rating}">КПП: ${TRANSMISSION_RELIABILITY_LABEL[car.transmission.rating] || 'Средняя'}</span>
                </div>
                <button class="btn-main btn-small btn-card-full" onclick="viewCarDetails('${car.id}')">Читать обзор</button>
            </div>`)
        .join('');
}

function viewCarDetails(carId) {
    const encyclopediaScreen = document.getElementById('encyclopedia-screen');
    if (encyclopediaScreen?.classList.contains('hidden')) {
        switchScreen('encyclopedia');
    }

    const car = encyclopediaDatabase.find(c => c.id === carId);
    const container = document.getElementById('encyclopedia-main-container');
    if (!car || !container) return;

    container.innerHTML = `
        <button class="btn-main btn-small db-back-btn" onclick="renderEncyclopedia()">← Вернуться к списку авто</button>
        <div class="section-header section-header--left">
            <h2>${escapeHTML(car.name)} <span class="rating-highlight">⭐ ${car.rating}/10</span></h2>
            <p>Период выпуска: <strong>${car.years}</strong></p>
        </div>
        <div class="db-details-grid">
            <div class="db-details-card">
                <h3>🛡️ Стойкость кузова к коррозии</h3>
                <span class="reliability-badge reliability-${car.body.rating}">${BODY_STRENGTH_LABEL[car.body.rating] || 'Средняя стойкость'}</span>
                <p class="details-text">${escapeHTML(car.body.text)}</p>
            </div>
            <div class="db-details-card">
                <h3>⚙️ Transmission и коробки передач</h3>
                <span class="reliability-badge reliability-${car.transmission.rating}">${TRANSMISSION_STRENGTH_LABEL[car.transmission.rating] || 'Средняя'}</span>
                <p class="details-text">${escapeHTML(car.transmission.text)}</p>
            </div>
            <div class="db-details-card">
                <h3>🔧 Надежность линейки двигателей</h3>
                <p class="details-text">${escapeHTML(car.engines)}</p>
            </div>
            <div class="db-details-card">
                <h3>⚠️ Частые болячки и слабые места</h3>
                <ul class="details-list">${car.weakPoints.map(point => `<li>${escapeHTML(point)}</li>`).join('')}</ul>
            </div>
        </div>`;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initEncyclopediaApp() {
    initEncyclopediaTabs();
    renderPromoCards();
    renderEncyclopedia();
}
