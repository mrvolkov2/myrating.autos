// База данных популярных моделей (20 штук) для анализа
const carDatabase = [
    { brand: "Toyota", model: "Camry", avgPrice: 2500000, reliability: 9 },
    { brand: "Hyundai", model: "Solaris", avgPrice: 1200000, reliability: 7 },
    { brand: "Kia", model: "Rio", avgPrice: 1150000, reliability: 7 },
    { brand: "Volkswagen", model: "Polo", avgPrice: 1300000, reliability: 7 },
    { brand: "Skoda", model: "Octavia", avgPrice: 1800000, reliability: 8 },
    { brand: "BMW", model: "5 Series", avgPrice: 4500000, reliability: 6 },
    { brand: "Mercedes-Benz", model: "E-Class", avgPrice: 5000000, reliability: 6 },
    { brand: "Lada", model: "Vesta", avgPrice: 900000, reliability: 6 },
    { brand: "Mazda", model: "CX-5", avgPrice: 2800000, reliability: 8 },
    { brand: "Nissan", model: "Qashqai", avgPrice: 2100000, reliability: 7 },
    { brand: "Renault", model: "Duster", avgPrice: 1400000, reliability: 8 },
    { brand: "Toyota", model: "RAV4", avgPrice: 3200000, reliability: 9 },
    { brand: "Lexus", model: "RX", avgPrice: 5500000, reliability: 9 },
    { brand: "Ford", model: "Focus", avgPrice: 1000000, reliability: 7 },
    { brand: "Honda", model: "CR-V", avgPrice: 2900000, reliability: 9 },
    { brand: "Mitsubishi", model: "Outlander", avgPrice: 2300000, reliability: 7 },
    { brand: "Audi", model: "A4", avgPrice: 3500000, reliability: 6 },
    { brand: "Geely", model: "Coolray", avgPrice: 2100000, reliability: 7 },
    { brand: "Haval", model: "Jolion", avgPrice: 1950000, reliability: 7 },
    { brand: "Chery", model: "Tiggo 7 Pro", avgPrice: 2200000, reliability: 6 }
];

// Функция для автозаполнения средней цены (можно вызвать при выборе модели)
function suggestMarketPrice(modelName) {
    const car = carDatabase.find(c => c.model.toLowerCase() === modelName.toLowerCase());
    if (car) {
        document.getElementById('market-price').value = car.avgPrice;
        showToast(`Установлена средняя цена для ${car.brand} ${car.model}`);
    }
}


function calculate() {
    // Сбор данных
    const carData = {
        year: parseInt(document.getElementById('car-year').value),
        mileage: parseInt(document.getElementById('car-mileage').value),
        owners: parseInt(document.getElementById('car-owners').value),
        accidents: parseInt(document.getElementById('car-accidents').value),
        price: parseInt(document.getElementById('car-price').value),
        marketPrice: parseInt(document.getElementById('market-price').value),
        region: document.getElementById('region-type').value
    };

    if (!carData.year || !carData.mileage) {
        showToast("Пожалуйста, заполните основные поля");
        return;
    }

    let score = 10;
    let warnings = [];
    const yearsOld = new Date().getFullYear() - carData.year;

    // --- УМНЫЕ ПРОВЕРКИ ---

    // 1. Владельцы vs Возраст
    if (yearsOld < 3 && carData.owners > 2) {
        score -= 2.5;
        warnings.push("❌ Подозрительно частая смена владельцев для свежего авто");
    }

    // 2. Пробег vs Возраст
    const avgYearlyMileage = carData.mileage / (yearsOld || 1);
    if (avgYearlyMileage > 35000) {
        score -= 1.5;
        warnings.push("⚠️ Пробег выше среднего (вероятно, такси или коммерция)");
    }

    // 3. Анализ цены
    if (carData.marketPrice) {
        const priceDiff = (carData.price / carData.marketPrice) - 1;
        if (priceDiff < -0.20) {
            score -= 3;
            warnings.push("❌ Цена подозрительно низкая! Возможны скрытые проблемы или юр. ограничения");
        } else if (priceDiff > 0.20) {
            warnings.push("ℹ️ Цена выше рынка. Проверьте комплектацию");
        }
    }

    // 4. ДТП
    if (carData.accidents > 0) {
        score -= (carData.accidents * 2);
        warnings.push(`⚠️ Зафиксировано ДТП: ${carData.accidents} шт.`);
    }

    // 5. Регион
    if (carData.region === 'salt' && yearsOld > 5) {
        score -= 0.5;
        warnings.push("ℹ️ Эксплуатация в соли: проверьте арки и днище");
    }

    // Финализация
    score = Math.max(0, Math.min(10, score)).toFixed(1);
    displayResult(score, warnings);
}

function displayResult(score, warnings) {
    const section = document.getElementById('result-section');
    const scoreElement = document.getElementById('final-score');
    const warningBox = document.getElementById('warning-list');
    
    section.classList.remove('hidden');
    scoreElement.innerText = score;
    
    // Красим балл
    scoreElement.className = '';
    if (score >= 8) scoreElement.style.color = "#22c55e";
    else if (score >= 5) scoreElement.style.color = "#eab308";
    else scoreElement.style.color = "#ef4444";

    warningBox.innerHTML = warnings.length ? 
        warnings.map(w => `<span class="warning-item">${w}</span>`).join('') :
        '<span class="warning-item">✅ Критических проблем по указанным данным не найдено</span>';
}

function addToBookmarks() {
    showToast("Нажмите Ctrl + D для сохранения сайта!");
}

function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast-notification';
    t.innerText = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

// Автоматическое заполнение выпадающего списка из базы
const selector = document.getElementById('db-selector');
carDatabase.forEach(car => {
    let option = document.createElement('option');
    option.value = car.model;
    option.text = `${car.brand} ${car.model}`;
    selector.appendChild(option);
});