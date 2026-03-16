/** * CONSTANTS & CONFIG 
 */
const DEFAULT_CARS = [
    { name: "Porsche 911 GT3", price: 195000, rating: 9.9, region: "eu" },
    { name: "Tesla Model S", price: 85000, rating: 8.5, region: "usa" },
    { name: "Lada Vesta Sport", price: 18000, rating: 7.5, region: "ru" }
];

const STORAGE_KEY = 'myrating_v3_db';
const THEME_KEY = 'myrating_theme';

/**
 * STATE MANAGEMENT
 */
const AppState = {
    cars: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [...DEFAULT_CARS],
    compareList: [],
    currentRegion: 'all',
    searchQuery: '',

    save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cars));
    },

    getFilteredCars() {
        return this.cars.filter(car => {
            const matchesRegion = this.currentRegion === 'all' || car.region === this.currentRegion;
            const matchesSearch = car.name.toLowerCase().includes(this.searchQuery.toLowerCase());
            return matchesRegion && matchesSearch;
        });
    }
};

/**
 * CORE LOGIC
 */
const CarLogic = {
    calculateRating({ year, mileage, condition }) {
        const currentYear = new Date().getFullYear();
        let score = 10;
        
        const age = currentYear - year;
        score -= (age * 0.3);
        
        const avgAnnualMileage = 18;
        const expectedMileage = age * avgAnnualMileage;
        if (mileage > expectedMileage) {
            score -= (mileage - expectedMileage) / 50;
        }
        
        score *= condition;
        return Math.max(0, Math.min(10, score)).toFixed(1);
    }
};

/**
 * UI CONTROLLER
 */
const UI = {
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.applyTheme();
        this.render();
    },

    cacheDOM() {
        this.list = document.getElementById('car-list');
        this.searchInput = document.getElementById('search-input');
        this.compareBar = document.getElementById('compare-float-bar');
        this.compareText = document.getElementById('compare-text');
        this.themeIcon = document.getElementById('theme-icon');
    },

    bindEvents() {
        // Поиск и фильтры
        this.searchInput.addEventListener('input', (e) => {
            AppState.searchQuery = e.target.value;
            this.render();
        });

        document.getElementById('region-filters').addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                AppState.currentRegion = e.target.dataset.region;
                this.render();
            }
        });

        // Форма добавления
        document.getElementById('add-car-btn').addEventListener('click', () => this.handleAddCar());
        
        // Тема
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());

        // Сброс и восстановление
        document.getElementById('restore-btn').addEventListener('click', () => {
            AppState.cars = [...DEFAULT_CARS];
            AppState.save();
            this.render();
        });
    },

    render() {
        const filtered = AppState.getFilteredCars();
        this.list.innerHTML = filtered.map((car, index) => this.createCarCard(car, index)).join('');
        this.updateDashboard();
        this.updateCompareBar();
        
        document.getElementById('empty-state').style.display = filtered.length === 0 ? 'block' : 'none';
    },

    createCarCard(car, index) {
        const isComparing = AppState.compareList.some(c => c.name === car.name);
        return `
            <div class="car-card">
                <div class="region-badge">${car.region.toUpperCase()}</div>
                <h2>${car.name}</h2>
                <p>Цена: <strong>$${car.price.toLocaleString()}</strong></p>
                <div class="card-footer">
                    <span class="rating-value">${car.rating}</span>
                    <div class="card-actions">
                        <button class="btn-compare ${isComparing ? 'active' : ''}" data-index="${index}">⚖️</button>
                        <button class="btn-delete" data-index="${index}">✕</button>
                    </div>
                </div>
            </div>
        `;
    },

    handleAddCar() {
        const data = {
            name: document.getElementById('car-name').value,
            price: Number(document.getElementById('car-price').value),
            year: Number(document.getElementById('car-year').value),
            mileage: Number(document.getElementById('car-mileage').value),
            condition: Number(document.getElementById('car-condition').value),
            region: document.getElementById('car-region').value
        };

        if (data.name && data.price) {
            const rating = CarLogic.calculateRating(data);
            AppState.cars.push({ ...data, rating: Number(rating) });
            AppState.save();
            this.render();
        }
    },

    updateDashboard() {
        const total = AppState.cars.reduce((sum, c) => sum + c.price, 0);
        document.getElementById('total-value').innerText = `$${total.toLocaleString()}`;
        // Добавь остальные статы по аналогии
    },

    toggleTheme() {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
        this.themeIcon.src = isDark ? 'theme_light.png' : 'theme_night.png';
    },

    applyTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === 'dark') document.body.classList.add('dark-theme');
    }
};

// Запуск приложения
document.addEventListener('DOMContentLoaded', () => UI.init());