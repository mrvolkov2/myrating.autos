/**
 * CONSTANTS & CONFIG
 */
const DEFAULT_CARS = [
    { name: "Porsche 911 GT3", price: 195000, year: 2024, mileage: 5, condition: "1.0", rating: 9.9, region: "eu" },
    { name: "BMW M5 F90", price: 105000, year: 2021, mileage: 45, condition: "0.85", rating: 8.7, region: "eu" },
    { name: "Tesla Model S Plaid", price: 95000, year: 2023, mileage: 12, condition: "1.0", rating: 9.5, region: "usa" },
    { name: "Toyota Camry XV70", price: 32000, year: 2022, mileage: 38, condition: "1.0", rating: 9.1, region: "asia" },
    { name: "Audi RS6 Avant", price: 125000, year: 2023, mileage: 15, condition: "1.0", rating: 9.6, region: "eu" },
    { name: "Mercedes G63 AMG", price: 210000, year: 2022, mileage: 22, condition: "1.0", rating: 9.4, region: "eu" },
    { name: "Nissan GT-R R35", price: 115000, year: 2020, mileage: 40, condition: "0.85", rating: 8.2, region: "asia" },
    { name: "VW Golf R", price: 48000, year: 2022, mileage: 25, condition: "1.0", rating: 9.0, region: "eu" },
    { name: "Ford Mustang GT", price: 45000, year: 2019, mileage: 65, condition: "0.85", rating: 7.5, region: "usa" },
    { name: "Mazda CX-5", price: 29000, year: 2021, mileage: 50, condition: "1.0", rating: 8.8, region: "asia" },
    { name: "Hyundai Tucson", price: 31000, year: 2023, mileage: 10, condition: "1.0", rating: 9.2, region: "asia" },
    { name: "Kia Stinger GT", price: 42000, year: 2021, mileage: 35, condition: "0.85", rating: 8.4, region: "asia" },
    { name: "Lexus RX 350", price: 65000, year: 2022, mileage: 28, condition: "1.0", rating: 9.3, region: "asia" },
    { name: "Dodge Challenger", price: 55000, year: 2020, mileage: 45, condition: "0.85", rating: 7.9, region: "usa" },
    { name: "Chevrolet Corvette", price: 85000, year: 2023, mileage: 8, condition: "1.0", rating: 9.7, region: "usa" },
    { name: "Range Rover Sport", price: 95000, year: 2021, mileage: 55, condition: "0.6", rating: 6.2, region: "eu" },
    { name: "Volvo XC90", price: 72000, year: 2022, mileage: 32, condition: "1.0", rating: 9.0, region: "eu" },
    { name: "Honda Civic Type R", price: 45000, year: 2023, mileage: 5, condition: "1.0", rating: 9.8, region: "asia" },
    { name: "Subaru WRX STI", price: 38000, year: 2021, mileage: 30, condition: "0.85", rating: 8.1, region: "asia" },
    { name: "Lada Vesta Sport", price: 18000, year: 2023, mileage: 15, condition: "1.0", rating: 7.8, region: "ru" }
];

const STORAGE_KEY = 'myrating_v3_db';

/**
 * STATE MANAGEMENT
 */
const AppState = {
    cars: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [...DEFAULT_CARS],
    currentRegion: 'all',
    searchQuery: '',

    save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cars));
    },

    clearAll() {
        if (confirm("Удалить все данные и очистить гараж?")) {
            this.cars = [];
            this.save();
            UI.render();
        }
    }
};

/**
 * CORE LOGIC
 */
const CarLogic = {
    conditionLabels: {
        '1.0': '💎 Идеал',
        '0.85': '🎨 Косметика',
        '0.6': '🔨 Бит/Крашен',
        '0.3': '💀 Тотал'
    },

    calculateRating({ year, mileage, condition }) {
        const currentYear = 2026;
        let score = 10;
        const age = currentYear - year;
        
        // Минус 0.3 балла за каждый год возраста
        score -= (age * 0.3);
        
        // Штраф за пробег выше нормы (18к в год)
        const expectedMileage = age * 18;
        if (mileage > expectedMileage) {
            score -= (mileage - expectedMileage) / 50;
        }
        
        // Множитель состояния
        score *= Number(condition);
        
        return Math.max(0, Math.min(10, score)).toFixed(1);
    },

    getRatingColor(rating) {
        if (rating >= 8.5) return '#10b981'; // Зеленый
        if (rating >= 6.0) return '#f59e0b'; // Желтый
        return '#ef4444'; // Красный
    }
};

/**
 * UI CONTROLLER
 */
const UI = {
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.render();
    },

    cacheDOM() {
        this.list = document.getElementById('car-list');
        this.searchInput = document.getElementById('search-input');
        this.statsCount = document.getElementById('stats-count');
    },

    bindEvents() {
        this.searchInput.addEventListener('input', (e) => {
            AppState.searchQuery = e.target.value;
            this.render();
        });

        document.getElementById('add-car-btn').addEventListener('click', () => this.handleAddCar());

        document.getElementById('region-filters').addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                AppState.currentRegion = e.target.dataset.region;
                this.render();
            }
        });
        
        document.getElementById('restore-btn').addEventListener('click', () => {
            AppState.cars = [...DEFAULT_CARS];
            AppState.save();
            this.render();
        });
    },

    createCarCard(car, index) {
        const condLabel = CarLogic.conditionLabels[car.condition] || '—';
        const ratingColor = CarLogic.getRatingColor(car.rating);
        const progressWidth = (car.rating * 10) + '%';

        return `
            <div class="car-card">
                <div class="region-badge">${car.region.toUpperCase()}</div>
                <h2>${car.name}</h2>
                <p class="price-text">$${car.price.toLocaleString()}</p>
                
                <div class="car-params">
                    <div class="param-item">📅 <span>${car.year} г.в.</span></div>
                    <div class="param-item">🛣️ <span>${car.mileage} тыс. км</span></div>
                    <div class="param-item">🛠️ <span>${condLabel}</span></div>
                </div>

                <div class="rating-section">
                    <div class="rating-header">
                        <span>СОСТОЯНИЕ</span>
                        <span>${car.rating}/10</span>
                    </div>
                    <div class="rating-bar-container">
                        <div class="rating-fill" style="width: ${progressWidth}; background: ${ratingColor};"></div>
                    </div>
                </div>

                <div class="card-footer">
                    <span class="rating-value" style="color:${ratingColor}">${car.rating}</span>
                    <button class="delete-link" onclick="UI.deleteCar(${index})">✕ Удалить</button>
                </div>
            </div>
        `;
    },

    render() {
        const filtered = AppState.cars.filter(car => {
            const mRegion = AppState.currentRegion === 'all' || car.region === AppState.currentRegion;
            const mSearch = car.name.toLowerCase().includes(AppState.searchQuery.toLowerCase());
            return mRegion && mSearch;
        });

        this.list.innerHTML = filtered.map((car, index) => this.createCarCard(car, index)).join('');
        this.statsCount.innerText = `Авто в списке: ${filtered.length}`;
        
        const emptyState = document.getElementById('empty-state');
        if (emptyState) emptyState.style.display = filtered.length === 0 ? 'block' : 'none';
        
        this.updateDashboard();
    },

    updateDashboard() {
        if (AppState.cars.length === 0) return;
        
        const total = AppState.cars.reduce((sum, c) => sum + c.price, 0);
        const avg = Math.round(total / AppState.cars.length);
        const top = [...AppState.cars].sort((a, b) => b.rating - a.rating)[0];

        document.getElementById('total-value').innerText = `$${total.toLocaleString()}`;
        document.getElementById('avg-price').innerText = `$${avg.toLocaleString()}`;
        document.getElementById('top-car').innerText = top ? top.name : '—';
    },

    handleAddCar() {
        const fields = ['car-name', 'car-price', 'car-year', 'car-mileage', 'car-condition', 'car-region'];
        const values = fields.reduce((acc, id) => {
            const el = document.getElementById(id);
            acc[id.replace('car-', '')] = el.value;
            return acc;
        }, {});

        if (values.name && values.price && values.year) {
            const numericData = {
                ...values,
                price: Number(values.price),
                year: Number(values.year),
                mileage: Number(values.mileage)
            };
            
            const rating = CarLogic.calculateRating(numericData);
            AppState.cars.push({ ...numericData, rating: Number(rating) });
            AppState.save();
            this.render();
            
            // Очистка полей
            fields.forEach(id => { if(id !== 'car-condition' && id !== 'car-region') document.getElementById(id).value = ''; });
        }
    },

    deleteCar(index) {
        AppState.cars.splice(index, 1);
        AppState.save();
        this.render();
    }
};

document.addEventListener('DOMContentLoaded', () => UI.init());