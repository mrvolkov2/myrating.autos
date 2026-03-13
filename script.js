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