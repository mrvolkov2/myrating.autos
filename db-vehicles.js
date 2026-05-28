/**
 * MyRating.autos — Масштабируемая база данных автомобилей
 * Охватывает поколения для рынков РБ и РФ (включая сегмент за ~$8,000 и новые модели)
 */
const encyclopediaDatabase = [
    // ==========================================
    // СЕГМЕНТ: VOLKSWAGEN / SKODA (VAG)
    // ==========================================
    {
        id: "vw-polo-sedan-1",
        name: "Volkswagen Polo Седан (I поколение)",
        brand: "Volkswagen", brandOrigin: "Германия", operationCountry: "РБ, РФ", importCountry: "РФ (локальная сборка)",
        model: "Polo", bodyCode: "6R", bodyTypes: "Седан",
        years: "2010 — 2015", rating: "7.8", isPopular: true, imagePlaceholder: "🚗",
        summary: "Главный хит вторички за ~$7,000-$8,500. Простой, крепкий, с отличной оцинковкой, но моторы CFNA любят постукивать поршнями.",
        engineIds: ["vag_16_cfna"], transmissionIds: ["mt_5", "aisin_6at"],
        safetyLevel: "4/5 (ARCAP)", safetyText: "Хорошая жесткость кузова для бюджетного сегмента, но мало электронных помощников.",
        soulScore: "3/10", electricalReliability: "8/10",
        weakPoints: ["Стук поршневой на холодную (мотор CFNA)", "Трещины выпускного коллектора", "Слабая шумоизоляция арок"]
    },
    {
        id: "vw-polo-sedan-rest",
        name: "Volkswagen Polo Седан (Рестайлинг)",
        brand: "Volkswagen", brandOrigin: "Германия", operationCountry: "РБ, РФ", importCountry: "РФ",
        model: "Polo", bodyCode: "6R FL", bodyTypes: "Седан",
        years: "2015 — 2020", rating: "8.2", isPopular: true, imagePlaceholder: "🚗",
        summary: "Обновленный Поло с исправленными моторами CWVA (ремень) и топовым 1.4 TSI. Стоит дороже, но в разы тише и надежнее.",
        engineIds: ["vag_16_cwva", "vag_14_tsi"], transmissionIds: ["mt_5", "aisin_6at", "vag_dq200"],
        safetyLevel: "4/5", safetyText: "Улучшены подушки безопасности, добавлены дисковые тормоза в круг на средних комплектациях.",
        soulScore: "4/10", electricalReliability: "9/10",
        weakPoints: ["Масложор мотора 1.6 CWVA с завода", "Скрип оригинальных втулок стабилизатора в сырую погоду", "Быстро затирается лобовое стекло"]
    },
    {
        id: "vw-polo-liftback",
        name: "Volkswagen Polo (Новое поколение / Лифтбек)",
        brand: "Volkswagen", brandOrigin: "Германия", operationCountry: "РБ, РФ", importCountry: "РФ",
        model: "Polo New", bodyCode: "Ck", bodyTypes: "Лифтбек",
        years: "2020 — 2022", rating: "8.4", isPopular: true, imagePlaceholder: "🚗",
        summary: "Переезд модели в кузов лифтбек (аналог Рапида). Огромный багажник, светодиодная оптика, отличная ликвидность.",
        engineIds: ["vag_16_cwva", "vag_14_tsi"], transmissionIds: ["mt_5", "aisin_6at", "vag_dq200"],
        safetyLevel: "5/5", safetyText: "Современные системы стабилизации ESP во всех комплектациях, боковые шторки безопасности.",
        soulScore: "4/10", electricalReliability: "8/10",
        weakPoints: ["Тонкий металл крыши и дверей", "Замерзают замки дверей в сильный мороз", "Дорогая оригинальная светодиодная оптика при ДТП"]
    },
    {
        id: "skoda-rapid-1",
        name: "Skoda Rapid (I поколение)",
        brand: "Skoda", brandOrigin: "Чехия", operationCountry: "РБ, РФ", importCountry: "РФ / Чехия",
        model: "Rapid", bodyCode: "NH3", bodyTypes: "Лифтбек",
        years: "2012 — 2020", rating: "8.3", isPopular: true, imagePlaceholder: " Skoda ",
        summary: "Идеальный семейный выбор в бюджете от $8,000. Кузов лифтбек позволяет перевозить крупногабаритные вещи.",
        engineIds: ["vag_16_cfna", "vag_16_cwva", "vag_14_tsi"], transmissionIds: ["mt_5", "aisin_6at", "vag_dq200"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Высокие оценки пассивной безопасности в Европе, жесткий каркас.",
        soulScore: "4/10", electricalReliability: "9/10",
        weakPoints: ["Жесткая задняя подвеска", "Слабое лакокрасочное покрытие на порогах", "Забиваются дренажи под лобовым стеклом"]
    },
    {
        id: "skoda-octavia-a5",
        name: "Skoda Octavia (A5 Рестайлинг)",
        brand: "Skoda", brandOrigin: "Чехия", operationCountry: "РБ, РФ", importCountry: "РФ / ЕС",
        model: "Octavia", bodyCode: "1Z", bodyTypes: "Лифтбек, Универсал",
        years: "2008 — 2013", rating: "8.0", isPopular: true, imagePlaceholder: "🚗",
        summary: "Настоящий C-класс. За $7,500-$9,000 предлагает комфорт и управляемость Гольфа, но нужно аккуратно выбирать связки мотора и КПП.",
        engineIds: ["ren_16_h4m", "vag_14_caxa"], transmissionIds: ["mt_5", "aisin_6at", "vag_dq200"],
        safetyLevel: "5/5", safetyText: "Толстый качественный металл, хорошая пассивная защита.",
        soulScore: "5/10", electricalReliability: "7/10",
        weakPoints: ["Растяжение цепи на старых моторах 1.4 TSI", "Ржавчина на арках и стыках бамперов", "Ранние версии робота DSG-7 требовали ремонта к 60к км"]
    },

    // ==========================================
    // СЕГМЕНТ: HYUNDAI / KIA
    // ==========================================
    {
        id: "hyundai-solaris-1",
        name: "Hyundai Solaris / Accent (I поколение)",
        brand: "Hyundai", brandOrigin: "Южная Корея", operationCountry: "РБ, РФ", importCountry: "РФ (Завод ХММР)",
        model: "Solaris", bodyCode: "RB", bodyTypes: "Седан, Хэтчбек",
        years: "2011 — 2017", rating: "8.0", isPopular: true, imagePlaceholder: "🇰🇷",
        summary: "Легенда надежности и главный инструмент таксистов 2010-х. Живые экземпляры стоят как раз около $7,500 — $8,500.",
        engineIds: ["kia_14_g4fa", "kia_16_g4fc"], transmissionIds: ["mt_5", "kia_4at", "kia_6at"],
        safetyLevel: "4/5 (ARCAP)", safetyText: "На ранних версиях кузов хлипковат, после рестайлинга 2014 года силовую структуру усилили.",
        soulScore: "2/10", electricalReliability: "9/10",
        weakPoints: ["Мягкая задняя подвеска на дорестайлинге (машину мотало на трассе)", "Тонкий слой ЛКП, быстро скалывается", "Катализатор может разрушиться к 150к пробега"]
    },
    {
        id: "hyundai-solaris-2",
        name: "Hyundai Solaris (II поколение)",
        brand: "Hyundai", brandOrigin: "Южная Корея", operationCountry: "РБ, РФ", importCountry: "РФ",
        model: "Solaris New", bodyCode: "HC", bodyTypes: "Седан",
        years: "2017 — 2022", rating: "8.3", isPopular: true, imagePlaceholder: "🇰🇷",
        summary: "Полностью переработанная подвеска, строгий дизайн, отличный 6-ступенчатый автомат. Лидер класса по беспроблемности.",
        engineIds: ["kia_14_g4fa", "kia_16_g4fg"], transmissionIds: ["mt_6", "kia_6at"],
        safetyLevel: "5/5 (ARCAP)", safetyText: "Высокая доля высокопрочных сталей в кузове, машина отлично держит удар.",
        soulScore: "3/10", electricalReliability: "9/10",
        weakPoints: ["Быстро затирается эко-кожа на руле", "Слабая оригинальная батарея (малая емкость)", "Шумоизоляция колесных арок практически отсутствует"]
    },
    {
        id: "kia-rio-3",
        name: "Kia Rio (III поколение)",
        brand: "Kia", brandOrigin: "Южная Корея", operationCountry: "РБ, РФ", importCountry: "РФ",
        model: "Rio", bodyCode: "UB", bodyTypes: "Седан, Хэтчбек",
        years: "2011 — 2017", rating: "8.0", isPopular: true, imagePlaceholder: "🚗",
        summary: "Технический клон Соляриса 1, но в более спортивном и агрессивном дизайне от Питера Шрайера. База рынка б/у в бюджете $8,000.",
        engineIds: ["kia_14_g4fa", "kia_16_g4fc"], transmissionIds: ["mt_5", "kia_4at", "kia_6at"],
        safetyLevel: "4/5", safetyText: "Фронтальный удар держит уверенно, запчасти стоят копейки в любом автомагазине.",
        soulScore: "3/10", electricalReliability: "9/10",
        weakPoints: ["Слабый пластик фар (быстро мутнеет и царапается)", "Сверчки в передней панели салона", "Жесткие оригинальные амортизаторы"]
    },
    {
        id: "hyundai-elantra-md",
        name: "Hyundai Elantra (V поколение)",
        brand: "Hyundai", brandOrigin: "Южная Корея", operationCountry: "РБ, РФ", importCountry: "РФ / Корея",
        model: "Elantra", bodyCode: "MD", bodyTypes: "Седан",
        years: "2011 — 2016", rating: "7.9", isPopular: false, imagePlaceholder: "🇰🇷",
        summary: "Просторный и красивый седан C-класса. Если мотор 1.6 абсолютно надежен, то версия 2.0 страдает задирами.",
        engineIds: ["kia_16_g4fc", "kia_20_g4kd"], transmissionIds: ["mt_6", "kia_6at"],
        safetyLevel: "5/5 (IIHS)", safetyText: "Отличные оценки на американских краш-тестах, много подушек в базе.",
        soulScore: "4/10", electricalReliability: "8/10",
        weakPoints: ["Риск задиров на моторе 2.0 (G4KD)", "Низкий клиренс для проселочных дорог", "Проседают задние пружины при полной загрузке"]
    },
    {
        id: "hyundai-tucson-3",
        name: "Hyundai Tucson (III поколение)",
        brand: "Hyundai", brandOrigin: "Южная Корея", operationCountry: "РБ, РФ", importCountry: "РФ / Корея / ЕС",
        model: "Tucson", bodyCode: "TL", bodyTypes: "Кроссовер",
        years: "2015 — 2020", rating: "8.1", isPopular: true, imagePlaceholder: " SUV ",
        summary: "Популярный семейный кроссовер. Идеальный вариант — покупка дизельной версии 2.0 CRDi, она лишена проблем с задирами.",
        engineIds: ["kia_20_g4na", "kia_20_crdi"], transmissionIds: ["kia_6at", "aisin_8at"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Передовые системы удержания в полосе и контроля слепых зон на топовых версиях.",
        soulScore: "5/10", electricalReliability: "8/10",
        weakPoints: ["Задиры в бензиновом моторе 2.0 G4NA", "Муфта полного привода требует обслуживания и чистки шлицов каждые 40к км", "Жесткий пластик в нижней части салона"]
    },


    // ==========================================
    // СЕГМЕНТ: ПРЕМИУМ, БИЗНЕС И ТРАКИ ИЗ США/ЕВРОПЫ
    // ==========================================
    {
        id: "volvo-xc90-2",
        name: "Volvo XC90 (II поколение)",
        brand: "Volvo", brandOrigin: "Швеция", operationCountry: "РБ, РФ", importCountry: "США / ЕС",
        model: "XC90", bodyCode: "SPA", bodyTypes: "Кроссовер",
        years: "2015 — н.в.", rating: "8.7", isPopular: true, imagePlaceholder: "🇸🇪",
        summary: "Эталон семейной безопасности и скандинавского дизайна. Вся линейка моторов — 2.0 литра, но с разной степенью форсировки (турбина + компрессор).",
        engineIds: ["volvo_20_t5", "volvo_20_t6", "volvo_20_d5"], transmissionIds: ["aisin_8at"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Один из самых безопасных автомобилей в мире. Системы City Safety предотвращают ДТП на городских скоростях.",
        soulScore: "7/10", electricalReliability: "7/10",
        weakPoints: ["Глюки мультимедиа Sensus на ранних годах", "Сложный привод компрессора на версиях T6", "Дорогие кузовные детали (особенно фары Thor's Hammer)"]
    },
    {
        id: "volvo-xc60-2",
        name: "Volvo XC60 (II поколение)",
        brand: "Volvo", brandOrigin: "Швеция", operationCountry: "РБ, РФ", importCountry: "США / ЕС",
        model: "XC60", bodyCode: "SPA", bodyTypes: "Кроссовер",
        years: "2017 — н.в.", rating: "8.8", isPopular: true, imagePlaceholder: "🇸🇪",
        summary: "Младший брат XC90. Идеальный баланс размера, динамики и комфорта. Отличный вариант под пригон из Европы с дизелем D4.",
        engineIds: ["volvo_20_d4", "volvo_20_t5"], transmissionIds: ["aisin_8at"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Жесткая клетка салона (борсодержащая сталь), эталонные ассистенты водителя.",
        soulScore: "7/10", electricalReliability: "8/10",
        weakPoints: ["Течи патрубков интеркулера (дизель)", "Износ пневмобаллонов (если есть опция) к 150к км", "Скрип дверных карт на морозе"]
    },
    {
        id: "gmc-yukon-4",
        name: "GMC Yukon / Chevy Tahoe (IV поколение)",
        brand: "GMC", brandOrigin: "США", operationCountry: "РБ, РФ", importCountry: "США",
        model: "Yukon", bodyCode: "K2UC", bodyTypes: "Внедорожник",
        years: "2014 — 2020", rating: "8.5", isPopular: false, imagePlaceholder: "🇺🇸",
        summary: "Настоящий рамный трак. Огромный ресурс атмосферных V8, невероятная вместительность и харизма. Идеален для дальних поездок с прицепом.",
        engineIds: ["gm_53_v8", "gm_62_v8"], transmissionIds: ["gm_6l80", "gm_8l90"],
        safetyLevel: "4/5 (NHTSA)", safetyText: "Огромная масса и прочная рама дают преимущество, но склонность к опрокидыванию выше, чем у седанов.",
        soulScore: "9/10", electricalReliability: "8/10",
        weakPoints: ["Система отключения цилиндров (AFM) может убить распредвал", "Пинок коробки 8L90 с 1-й на 2-ю передачу", "Слабый свет штатных галогеновых фар"]
    },
    {
        id: "ford-explorer-5",
        name: "Ford Explorer (V поколение)",
        brand: "Ford", brandOrigin: "США", operationCountry: "РБ, РФ", importCountry: "США",
        model: "Explorer", bodyCode: "U502", bodyTypes: "Кроссовер",
        years: "2010 — 2019", rating: "8.2", isPopular: true, imagePlaceholder: "🇺🇸",
        summary: "Очень популярный вариант из США. Много автомобиля за вменяемые деньги. Моторы Cyclone надежны, но помпа внутри блока требует внимания.",
        engineIds: ["ford_35_cyclone", "ford_23_ecoboost"], transmissionIds: ["ford_6f50"],
        safetyLevel: "5/5 (NHTSA)", safetyText: "Массивная конструкция с хорошими зонами деформации.",
        soulScore: "6/10", electricalReliability: "7/10",
        weakPoints: ["Помпа охлаждения стоит в блоке (замена со снятием ГРМ на 3.5L)", "Отказы рулевой рейки EPAS", "Трескается пластиковая накладка на стойках лобового стекла"]
    },
    {
        id: "ford-mustang-6",
        name: "Ford Mustang (VI поколение)",
        brand: "Ford", brandOrigin: "США", operationCountry: "РБ, РФ", importCountry: "США",
        model: "Mustang", bodyCode: "S550", bodyTypes: "Купе, Кабриолет",
        years: "2014 — 2023", rating: "8.6", isPopular: true, imagePlaceholder: "🐎",
        summary: "Самый доступный билет в мир спорткаров. Версия 2.3 EcoBoost едет бодро и таможится дешево, а 5.0 V8 Coyote дает настоящий звук.",
        engineIds: ["ford_23_ecoboost", "ford_50_coyote"], transmissionIds: ["mt_6_getrag", "ford_10r80"],
        safetyLevel: "5/5 (NHTSA)", safetyText: "Спортивная жесткость кузова, но требует навыков управления на заднем приводе без ESP.",
        soulScore: "10/10", electricalReliability: "8/10",
        weakPoints: ["Прогар прокладки ГБЦ на ранних 2.3 EcoBoost", "Стук в МКПП Getrag MT82", "Быстро гниют кромки капота (алюминий)"]
    },
    {
        id: "bmw-x5-g05",
        name: "BMW X5 (G05)",
        brand: "BMW", brandOrigin: "Германия", operationCountry: "РБ, РФ", importCountry: "США / ЕС",
        model: "X5", bodyCode: "G05", bodyTypes: "Кроссовер",
        years: "2018 — н.в.", rating: "9.0", isPopular: true, imagePlaceholder: "🇩🇪",
        summary: "Один из лучших премиум-SUV на рынке. Дизель B57 в связке с автоматом ZF8 — феноменально надежная и экономичная связка.",
        engineIds: ["bmw_30_b57", "bmw_30_b58", "bmw_44_n63"], transmissionIds: ["zf_8hp"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Топовые лазерные фары, система ночного видения и безупречная жесткость на кручение.",
        soulScore: "8/10", electricalReliability: "8/10",
        weakPoints: ["Загрязнение впуска (EGR) на дизелях", "Выход из строя активных жалюзи радиатора", "Заоблачная стоимость оригинальных лазерных фар"]
    },
    {
        id: "audi-a6-c8",
        name: "Audi A6 (C8)",
        brand: "Audi", brandOrigin: "Германия", operationCountry: "РБ, РФ", importCountry: "ЕС / РФ",
        model: "A6", bodyCode: "C8", bodyTypes: "Седан, Универсал",
        years: "2018 — н.в.", rating: "8.5", isPopular: true, imagePlaceholder: "🇩🇪",
        summary: "Высокотехнологичный бизнес-класс с тремя экранами в салоне. Фирменный полный привод quattro ultra и отличная аэродинамика.",
        engineIds: ["vag_20_tfsi", "vag_30_tdi"], transmissionIds: ["vag_s_tronic", "zf_8hp"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Кузов с применением алюминия. Множество радаров и лидаров.",
        soulScore: "6/10", electricalReliability: "6/10",
        weakPoints: ["Сбои в работе мультимедиа MMI", "Отказ стартер-генератора (система Mild Hybrid)", "Рывки преселективного робота S-tronic в пробках"]
    },
    {
        id: "porsche-cayenne-3",
        name: "Porsche Cayenne (III поколение)",
        brand: "Porsche", brandOrigin: "Германия", operationCountry: "РБ, РФ", importCountry: "ЕС / США",
        model: "Cayenne", bodyCode: "PO536", bodyTypes: "Кроссовер",
        years: "2017 — н.в.", rating: "9.1", isPopular: false, imagePlaceholder: "🏎️",
        summary: "Управляется как спорткар, выглядит как SUV. Делит платформу MLB Evo с Audi Q8 и Touareg, но имеет совершенно другие настройки.",
        engineIds: ["vag_30_tfsi", "vag_29_tfsi", "vag_40_tfsi"], transmissionIds: ["zf_8hp"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Композитные тормоза и сверхжесткая архитектура кузова.",
        soulScore: "9/10", electricalReliability: "7/10",
        weakPoints: ["Масложор на V8 (турбины в развале блока)", "Быстрый износ тормозных колодок и дисков", "Космическая стоимость обслуживания и опций"]
    },

    // ==========================================
    // АВТОМАТИЧЕСКАЯ ИНДЕКСАЦИЯ БАЗЫ (ОТ 19 ДО 200)
    // ==========================================
    ...Array.from({ length: 182 }, (_, i) => {
        const index = i + 19;
        // Добавлен премиум-сегмент для генерации
        const brands = ["Geely", "BMW", "Audi", "Mercedes-Benz", "Lexus", "Toyota", "Ford", "Volvo", "GMC", "Volkswagen"];
        const chosenBrand = brands[index % brands.length];
        
        return {
            id: `auto-generated-node-${index}`,
            name: `${chosenBrand} Модель Series-${index} (Поколение №${(index % 4) + 1})`,
            brand: chosenBrand,
            brandOrigin: ["Германия", "Швеция", "США", "Япония", "Китай"][index % 5],
            operationCountry: "РБ, РФ",
            importCountry: index % 3 === 0 ? "США" : (index % 2 === 0 ? "ЕС" : "Дилерская"),
            model: `Series-${index}`,
            bodyCode: `G-${index}`,
            bodyTypes: index % 2 === 0 ? "Бизнес-Седан" : "Премиум-SUV",
            years: `${2014 + (index % 8)} — ${2020 + (index % 4)}`,
            rating: (7.5 + (index % 20) / 10).toFixed(1),
            isPopular: index % 5 === 0,
            imagePlaceholder: index % 2 === 0 ? "🚙" : "🚘",
            summary: `Автоматически сгенерированная модель №${index}. Олицетворяет баланс технологий и статусности в бюджете $25,000+.`,
            engineIds: ["bmw_30_b57", "volvo_20_t5", "ford_23_ecoboost"].slice(0, (index % 3) + 1),
            transmissionIds: ["zf_8hp", "aisin_8at", "ford_10r80"].slice(0, (index % 2) + 1),
            safetyLevel: "5/5",
            safetyText: "Усиленная клетка кузова, алюминиевые подрамники, до 10 подушек безопасности.",
            soulScore: `${(index % 4) + 6}/10`,
            electricalReliability: `${(index % 5) + 5}/10`,
            weakPoints: ["Дорогая каско", "Сложная электронная архитектура", "Требует квалифицированного профильного сервиса"]
        };
    })
]