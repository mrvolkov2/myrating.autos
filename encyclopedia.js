/**
 * MyRating.autos — Логика Энциклопедии надежности
 */

// Вспомогательные функции для сборки агрегатов из DB_COMPONENTS
function generateEnginesListHTML(engineIds) {
    if (!engineIds || engineIds.length === 0) return '<p class="details-text">Нет данных</p>';
    return engineIds.map(id => {
        const eng = DB_COMPONENTS.engines[id];
        if (!eng) return '';
        const badgeClass = eng.reliability === 'high' ? 'reliability-high' : (eng.reliability === 'medium' ? 'reliability-medium' : 'reliability-low');
        const relText = eng.reliability === 'high' ? 'Высокая надежность' : (eng.reliability === 'medium' ? 'Средняя надежность' : 'Низкая надежность (Внимание!)');
        return `
            <div style="background: rgba(0,0,0,0.02); border: 1px solid var(--border); border-radius: 6px; padding: 10px; margin-bottom: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <strong>${escapeHTML(eng.name)}</strong>
                    <span class="reliability-badge ${badgeClass}" style="font-size: 11px; padding: 2px 6px;">${relText}</span>
                </div>
                <p class="details-text" style="margin: 4px 0 0 0; font-size: 13px; line-height: 1.4;">${escapeHTML(eng.desc)}</p>
            </div>
        `;
    }).join('');
}

function generateTransmissionsListHTML(transmissionIds) {
    if (!transmissionIds || transmissionIds.length === 0) return '<p class="details-text">Нет данных</p>';
    return transmissionIds.map(id => {
        const tr = DB_COMPONENTS.transmissions[id];
        if (!tr) return '';
        const badgeClass = tr.reliability === 'high' ? 'reliability-high' : (tr.reliability === 'medium' ? 'reliability-medium' : 'reliability-low');
        const relText = tr.reliability === 'high' ? 'Надежная КПП' : (tr.reliability === 'medium' ? 'Средний ресурс' : 'Капризная КПП');
        return `
            <div style="background: rgba(0,0,0,0.02); border: 1px solid var(--border); border-radius: 6px; padding: 10px; margin-bottom: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <strong>${escapeHTML(tr.name)}</strong>
                    <span class="reliability-badge ${badgeClass}" style="font-size: 11px; padding: 2px 6px;">${relText}</span>
                </div>
                <p class="details-text" style="margin: 4px 0 0 0; font-size: 13px; line-height: 1.4;"><em>Производитель: ${escapeHTML(tr.brand)} (${escapeHTML(tr.type)})</em>. ${escapeHTML(tr.desc)}</p>
            </div>
        `;
    }).join('');
}

// Константы UI управления экранами
const MAIN_PROMO_SECTIONS = ['promo-database-section', 'promo-news-section', 'promo-garage-section', 'garage-tools-panel', 'promo-garage-cards'];
const GARAGE_SHARED_UI = ['garage-tools-panel'];
const GARAGE_TAB_ONLY = ['garage-screen-intro', 'garage-screen'];
const APP_SCREENS = { encyclopedia: 'encyclopedia-screen', news: 'news-screen', garage: 'garage-screen' };

let currentEncTab = 'all';

function getEncyclopediaTabContent(car, tab) {
    if (tab === 'body') {
        return `
            <div class="tab-badge-row">
                <span class="reliability-badge reliability-high">Индекс: ${escapeHTML(car.bodyCode)}</span>
            </div>
            <p class="tab-preview-text">Доступные кузова: ${escapeHTML(car.bodyTypes)}</p>`;
    }
    if (tab === 'engines') {
        const enginesStr = car.engineIds.map(id => DB_COMPONENTS.engines[id]?.name || id).join(', ');
        return `
            <h4 class="tab-preview-title tab-preview-title--engines">🔧 Доступные моторы:</h4>
            <p class="tab-preview-text">${escapeHTML(enginesStr)}</p>`;
    }
    if (tab === 'transmissions') {
        const transStr = car.transmissionIds.map(id => DB_COMPONENTS.transmissions[id]?.name || id).join(', ');
        return `
            <h4 class="tab-preview-title tab-preview-title--engines">⚙️ Коробки передач:</h4>
            <p class="tab-preview-text">${escapeHTML(transStr)}</p>`;
    }
    if (tab === 'safety') {
        return `
            <h4 class="tab-preview-title tab-preview-title--safety">🚨 Безопасность:</h4>
            <p class="tab-preview-text">${escapeHTML(car.safetyLevel)} — ${escapeHTML(car.safetyText)}</p>`;
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
    const tabContent = options.searchMode ? `<p class="tab-preview-summary">${escapeHTML(car.summary)}</p>` : getEncyclopediaTabContent(car, tab);

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
    const filtered = query ? encyclopediaDatabase.filter(car => car.name.toLowerCase().includes(query)) : encyclopediaDatabase;

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
    const navMap = { main: 'nav-main', encyclopedia: 'nav-encyclopedia', news: 'nav-news', garage: 'nav-garage' };
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
                    <span class="reliability-badge reliability-high">Для души: ${car.soulScore}</span>
                    <span class="reliability-badge reliability-medium">Электрика: ${car.electricalReliability}</span>
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
                <h3>🌍 Происхождение и Рынок</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 10px;">
                    <tr style="border-bottom: 1px solid var(--border);"><td style="padding: 6px 0; color: #64748b;">Марка / Модель:</td><td style="padding: 6px 0; font-weight: 600;">${escapeHTML(car.brand)} ${escapeHTML(car.model)}</td></tr>
                    <tr style="border-bottom: 1px solid var(--border);"><td style="padding: 6px 0; color: #64748b;">Страна бренда:</td><td style="padding: 6px 0;">${escapeHTML(car.brandOrigin)}</td></tr>
                    <tr style="border-bottom: 1px solid var(--border);"><td style="padding: 6px 0; color: #64748b;">Откуда пригон:</td><td style="padding: 6px 0;">${escapeHTML(car.importCountry)}</td></tr>
                    <tr><td style="padding: 6px 0; color: #64748b;">Где эксплуатируется:</td><td style="padding: 6px 0;">${escapeHTML(car.operationCountry)}</td></tr>
                </table>
            </div>

            <div class="db-details-card">
                <h3>📐 Кузов и Поколение</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 10px;">
                    <tr style="border-bottom: 1px solid var(--border);"><td style="padding: 6px 0; color: #64748b;">Заводской индекс:</td><td style="padding: 6px 0; font-weight: 600; color: var(--primary);">${escapeHTML(car.bodyCode)}</td></tr>
                    <tr style="border-bottom: 1px solid var(--border);"><td style="padding: 6px 0; color: #64748b;">Типы кузова:</td><td style="padding: 6px 0;">${escapeHTML(car.bodyTypes)}</td></tr>
                    <tr style="border-bottom: 1px solid var(--border);"><td style="padding: 6px 0; color: #64748b;">Электрика (надежность):</td><td style="padding: 6px 0; font-weight: 600;">${escapeHTML(car.electricalReliability)}</td></tr>
                    <tr><td style="padding: 6px 0; color: #64748b;">Балл "Для души":</td><td style="padding: 6px 0; color: #f59e0b; font-weight: 600;">❤️ ${escapeHTML(car.soulScore)}</td></tr>
                </table>
            </div>

            <div class="db-details-card">
                <h3>🛡️ Безопасность</h3>
                <span class="reliability-badge reliability-high" style="margin-bottom: 8px; display: inline-block;">Уровень: ${escapeHTML(car.safetyLevel)}</span>
                <p class="details-text" style="font-size: 14px; line-height: 1.5;">${escapeHTML(car.safetyText)}</p>
            </div>

            <div class="db-details-card">
                <h3>🔧 Линейка двигателей</h3>
                <div style="margin-top: 10px;">
                    ${generateEnginesListHTML(car.engineIds)}
                </div>
            </div>

            <div class="db-details-card">
                <h3>⚙️ Коробки передач</h3>
                <div style="margin-top: 10px;">
                    ${generateTransmissionsListHTML(car.transmissionIds)}
                </div>
            </div>

            <div class="db-details-card">
                <h3>⚠️ Частые болячки и слабые места</h3>
                <ul class="details-list">${car.weakPoints.map(point => `<li>${escapeHTML(point)}</li>`).join('')}</ul>
            </div>
        </div>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initEncyclopediaApp() {
    initEncyclopediaTabs();
    renderPromoCards();
    renderEncyclopedia();
}