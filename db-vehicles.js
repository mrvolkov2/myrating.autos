/**
 * MyRating.autos — Реальная база данных автомобилей для рабочей версии сайта
 * Каталог популярных б/у в бюджете $10,000 - $20,000 + топ-премиум
 */
const encyclopediaDatabase = [
    // ==========================================
    // СЕГМЕНТ: БЮДЖЕТ И СРЕДНИЙ КЛАСС ($10,000 - $20,000)
    // ==========================================
    {
        id: "mazda-6-gj",
        name: "Mazda 6 (III поколение / GJ)",
        brand: "Mazda", brandOrigin: "Япония", operationCountry: "РБ, РФ", importCountry: "РФ / ЕС / США",
        model: "6", bodyCode: "GJ", bodyTypes: "Седан, Универсал",
        years: "2012 — 2018", rating: "8.5", isPopular: true, imagePlaceholder: "🚗",
        summary: "Стильный и надежный японский седан среднего класса. Популярен на вторичном рынке благодаря отличной управляемости и беспроблемным моторам SkyActiv.",
        engineIds: ["mazda_20_sky"], transmissionIds: ["mt_6", "mazda_6at"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Высокие оценки защиты пассажиров при столкновениях. Встроенные системы i-Activesense в богатых версиях.",
        soulScore: "7/10", electricalReliability: "8/10",
        weakPoints: ["Тонкое лакокрасочное покрытие (быстро появляются сколы)", "Сравнительно слабая шумоизоляция колесных арок", "Нежный кожаный салон"]
    },
    {
        id: "mazda-cx5-ke",
        name: "Mazda CX-5 (I поколение)",
        brand: "Mazda", brandOrigin: "Япония", operationCountry: "РБ, РФ", importCountry: "РФ / ЕС / США",
        model: "CX-5", bodyCode: "KE", bodyTypes: "Кроссовер",
        years: "2011 — 2017", rating: "8.4", isPopular: true, imagePlaceholder: "🚙",
        summary: "Ликвидный и востребованный городской кроссовер. Обладает высоким клиренсом и надежным тандемом мотора 2.0 SkyActiv и автомата FW6A.",
        engineIds: ["mazda_20_sky"], transmissionIds: ["mazda_6at"],
        safetyLevel: "5/5", safetyText: "Прочный кузов с высоким содержанием сверхвысокопрочной стали, хорошая фронтальная защита.",
        soulScore: "6/10", electricalReliability: "8/10",
        weakPoints: ["Возможные течи датчика давления масла", "Быстрый износ передних тормозных дисков", "Слабый механизм складывания боковых зеркал"]
    },
    {
        id: "honda-civic-10",
        name: "Honda Civic (X поколение)",
        brand: "Honda", brandOrigin: "Япония", operationCountry: "РБ, РФ", importCountry: "США / ЕС",
        model: "Civic", bodyCode: "FC/FK", bodyTypes: "Седан, Хэтчбек, Купе",
        years: "2015 — 2021", rating: "8.6", isPopular: true, imagePlaceholder: "🏎️",
        summary: "Хит пригона из США в бюджете $12,000 - $16,000. Отличный молодежный дизайн, азартное шасси и надежные моторы.",
        engineIds: ["honda_15_l15", "honda_18_r18"], transmissionIds: ["mt_6", "honda_cvt"],
        safetyLevel: "5/5 (NHTSA)", safetyText: "Фирменный комплекс безопасности Honda Sensing (удержание полосы, адаптивный круиз) на большинстве американских версий.",
        soulScore: "8/10", electricalReliability: "9/10",
        weakPoints: ["Низкий дорожный просвет (клиренс всего 125 мм)", "Тонкий слой краски на капоте и переднем бампере", "Ограниченное пространство над головой задних пассажиров"]
    },
    {
        id: "honda-accord-9",
        name: "Honda Accord (IX поколение)",
        brand: "Honda", brandOrigin: "Япония", operationCountry: "РБ, РФ", importCountry: "РФ / США",
        model: "Accord", bodyCode: "CR", bodyTypes: "Седан",
        years: "2012 — 2017", rating: "8.5", isPopular: false, imagePlaceholder: "🚗",
        summary: "Большой, солидный и комфортный седан. Настоящий долгожитель с огромным ресурсом подвески и агрегатов.",
        engineIds: ["toy_25_ar"], transmissionIds: ["aisin_6at", "honda_cvt"],
        safetyLevel: "5/5", safetyText: "Один из лучших седанов своего сегмента по прочности кузова при косых ударах (испытания IIHS).",
        soulScore: "6/10", electricalReliability: "9/10",
        weakPoints: ["Быстрый износ распределительного вала при редкой замене масла", "Слабые оригинальные тормозные механизмы", "Проседание задних пружин при полной нагрузке"]
    },
    {
        id: "nissan-qashqai-j11",
        name: "Nissan Qashqai (II поколение / J11)",
        brand: "Nissan", brandOrigin: "Япония", operationCountry: "РБ, РФ", importCountry: "РФ / ЕС",
        model: "Qashqai", bodyCode: "J11", bodyTypes: "Кроссовер",
        years: "2013 — 2021", rating: "8.1", isPopular: true, imagePlaceholder: "🚙",
        summary: "Практичный европейский кроссовер. Очень популярен с дизелем 1.5 dCi из Европы на механике и бензиновым 2.0 локальной сборки.",
        engineIds: ["ren_16_h4m", "niss_20_mr20", "ren_15_dci"], transmissionIds: ["mt_6", "jatco_jf016e"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Высокая оценка пассивной безопасности, активные системы торможения в топовых комплектациях.",
        soulScore: "4/10", electricalReliability: "8/10",
        weakPoints: ["Ресурс вариатора Jatco сильно зависит от чистоты масла и прогревов", "Скрипы пластика в районе лобового стекла", "Слабый замок багажной двери"]
    },
    {
        id: "nissan-rogue-t32",
        name: "Nissan Rogue / X-Trail (III поколение / T32)",
        brand: "Nissan", brandOrigin: "Япония", operationCountry: "РБ, РФ", importCountry: "США / РФ",
        model: "Rogue", bodyCode: "T32", bodyTypes: "Кроссовер",
        years: "2013 — 2020", rating: "8.2", isPopular: true, imagePlaceholder: "🚙",
        summary: "Большой семейный кроссовер. Версия Rogue поставляется из США по привлекательным ценам, предлагая просторный багажник и мягкий ход.",
        engineIds: ["niss_20_mr20"], transmissionIds: ["jatco_jf016e"],
        safetyLevel: "4/5", safetyText: "Хорошие показатели при боковых ударах, но у американских версий часто отсутствуют некоторые ассистенты в простых комплектациях.",
        soulScore: "5/10", electricalReliability: "8/10",
        weakPoints: ["Вариатор боится буксования в грязи и снегу", "Тонкий слой хромированного покрытия кузовных деталей", "Скрип сайлентблоков передних рычагов при низких температурах"]
    },
    {
        id: "mitsubishi-outlander-3",
        name: "Mitsubishi Outlander (III поколение)",
        brand: "Mitsubishi", brandOrigin: "Япония", operationCountry: "РБ, РФ", importCountry: "РФ / США",
        model: "Outlander", bodyCode: "GF", bodyTypes: "Кроссовер",
        years: "2012 — 2021", rating: "8.0", isPopular: true, imagePlaceholder: "🚙",
        summary: "Один из самых вместительных кроссоверов в бюджете до $16,000. Простой, надежный, неприхотливый в эксплуатации.",
        engineIds: ["mitsu_20_4b11"], transmissionIds: ["jatco_jf016e"],
        safetyLevel: "5/5", safetyText: "Хороший уровень защиты при лобовом столкновении, жесткая передняя часть рамы.",
        soulScore: "4/10", electricalReliability: "8/10",
        weakPoints: ["Очень тонкое лакокрасочное покрытие", "Скромный дизайн и дешевые материалы отделки салона", "Долго прогревается салон в сильный мороз"]
    },
    {
        id: "ford-fusion-2",
        name: "Ford Fusion (США) / Mondeo V",
        brand: "Ford", brandOrigin: "США", operationCountry: "РБ, РФ", importCountry: "США",
        model: "Fusion", bodyCode: "CD4", bodyTypes: "Седан",
        years: "2012 — 2020", rating: "8.3", isPopular: true, imagePlaceholder: "🚗",
        summary: "Лидер пригона из США в бюджете $11,000 - $15,000. Огромный комфортный седан с внешностью спорткара и отличной плавностью хода.",
        engineIds: ["ford_15_ecob"], transmissionIds: ["aisin_6at"],
        safetyLevel: "5/5", safetyText: "Тяжелый и прочный автомобиль, отличная жесткость кузова на кручение.",
        soulScore: "6/10", electricalReliability: "8/10",
        weakPoints: ["Риск повреждения блока цилиндров 1.5 EcoBoost из-за перегрева", "Низко висящая «губа» переднего бампера", "Капризные ручки бесключевого доступа"]
    },
    {
        id: "peugeot-3008-2",
        name: "Peugeot 3008 (II поколение)",
        brand: "Peugeot", brandOrigin: "Франция", operationCountry: "РБ, РФ", importCountry: "ЕС",
        model: "3008", bodyCode: "P84", bodyTypes: "Кроссовер",
        years: "2016 — 2020", rating: "8.2", isPopular: true, imagePlaceholder: "🇫🇷",
        summary: "Стильный французский кроссовер с футуристичным салоном i-Cockpit. Очень востребован в бюджете $15,000 - $19,000 с экономичным дизелем 1.5 HDi.",
        engineIds: ["ren_15_dci", "psa_16_ep6"], transmissionIds: ["mt_6", "aisin_6at"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Богатый набор систем помощи водителю, автоматическое торможение перед препятствиями.",
        soulScore: "7/10", electricalReliability: "7/10",
        weakPoints: ["Проблемный бензиновый мотор 1.6 THP (EP6) требует постоянного внимания", "Отсутствие версий с классическим полным приводом (только передний с Grip Control)", "Специфичная эргономика с маленьким рулем"]
    },
    {
        id: "chevrolet-malibu-9",
        name: "Chevrolet Malibu (IX поколение)",
        brand: "Chevrolet", brandOrigin: "США", operationCountry: "РБ, РФ", importCountry: "США",
        model: "Malibu", bodyCode: "V300", bodyTypes: "Седан",
        years: "2015 — 2022", rating: "8.4", isPopular: false, imagePlaceholder: "🇺🇸",
        summary: "Комфортабельный представительский седан из США. Отличный дизайн, надежный цепной турбомотор 1.5 и мягкая подвеска.",
        engineIds: ["gm_15_lfv"], transmissionIds: ["gm_6at"],
        safetyLevel: "5/5 (NHTSA)", safetyText: "10 подушек безопасности в базовой комплектации, отличные результаты боковых тестов.",
        soulScore: "6/10", electricalReliability: "8/10",
        weakPoints: ["Достаточно хрупкие пластиковые элементы подкапотного пространства", "Низкий клиренс для загородных дорог", "Проблемный клапан продувки абсорбера (EVAP)"]
    },
    {
        id: "opel-astra-k",
        name: "Opel Astra K",
        brand: "Opel", brandOrigin: "Германия", operationCountry: "РБ, РФ", importCountry: "ЕС",
        model: "Astra", bodyCode: "K", bodyTypes: "Хэтчбек, Универсал",
        years: "2015 — 2021", rating: "8.1", isPopular: false, imagePlaceholder: "🚗",
        summary: "Европейский хэтчбек/универсал. Компактный снаружи, просторный внутри, оснащен отличной светодиодной оптикой IntelliLux LED.",
        engineIds: ["gm_14_net", "ren_15_dci"], transmissionIds: ["mt_6", "gm_6at"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Высокая плотность подушек безопасности, современные ассистенты удержания дистанции.",
        soulScore: "5/10", electricalReliability: "8/10",
        weakPoints: ["Капризная система охлаждения бензинового 1.4 Turbo", "Жесткие оригинальные амортизаторы", "Небольшой багажник в кузове хэтчбек"]
    },
    {
        id: "subaru-forester-sj",
        name: "Subaru Forester (IV поколение / SJ)",
        brand: "Subaru", brandOrigin: "Япония", operationCountry: "РБ, РФ", importCountry: "РФ / США",
        model: "Forester", bodyCode: "SJ", bodyTypes: "Кроссовер",
        years: "2012 — 2018", rating: "8.3", isPopular: true, imagePlaceholder: "🚙",
        summary: "Настоящий кроссовер для активного отдыха с легендарной системой полного привода Symmetrical AWD и отличным клиренсом 220 мм.",
        engineIds: ["sub_20_fb20"], transmissionIds: ["mt_6", "sub_lineartronic"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Исключительная обзорность с места водителя и фирменная система камер помощи водителю EyeSight.",
        soulScore: "7/10", electricalReliability: "8/10",
        weakPoints: ["Расход масла (масложор) на угар у мотора FB20 после 120-150к км пробега", "Высокая стоимость обслуживания оппозитного двигателя", "Шумоизоляция салона требует доработки"]
    },

    // ==========================================
    // БЮДЖЕТ ДО $10,000 (ИСПРАВЛЕННЫЕ ДЛЯ РАБОЧЕГО САЙТА)
    // ==========================================
    {
        id: "vw-polo-sedan-1",
        name: "Volkswagen Polo Седан (I поколение)",
        brand: "Volkswagen", brandOrigin: "Германия", operationCountry: "РБ, РФ", importCountry: "РФ (локальная сборка)",
        model: "Polo", bodyCode: "6R", bodyTypes: "Седан",
        years: "2010 — 2015", rating: "7.8", isPopular: true, imagePlaceholder: "🚗",
        summary: "Народный хит в бюджете ~$8,000. Простой, надежный, долговечный кузов и крепкая подвеска.",
        engineIds: ["vag_16_cfna"], transmissionIds: ["mt_5", "aisin_6at"],
        safetyLevel: "4/5 (ARCAP)", safetyText: "Обеспечивает достаточный уровень базовой пассивной безопасности пассажиров.",
        soulScore: "3/10", electricalReliability: "8/10",
        weakPoints: ["Стук поршневой на холодную (мотор CFNA)", "Трещины выпускного коллектора", "Слабая шумоизоляция арок"]
    },
    {
        id: "vw-polo-sedan-rest",
        name: "Volkswagen Polo Седан (Рестайлинг)",
        brand: "Volkswagen", brandOrigin: "Германия", operationCountry: "РБ, РФ", importCountry: "РФ",
        model: "Polo", bodyCode: "6R FL", bodyTypes: "Седан",
        years: "2015 — 2020", rating: "8.2", isPopular: true, imagePlaceholder: "🚗",
        summary: "Обновленный Поло с исправленными моторами серии EA211 (ременной ГРМ) и динамичной турбо-версией 1.4 TSI.",
        engineIds: ["vag_16_cwva", "vag_14_tsi"], transmissionIds: ["mt_5", "aisin_6at", "vag_dq200"],
        safetyLevel: "4/5", safetyText: "Улучшены подушки безопасности, добавлены задние дисковые тормоза.",
        soulScore: "4/10", electricalReliability: "9/10",
        weakPoints: ["Расход масла (масложор) мотора 1.6 CWVA с завода", "Скрип оригинальных втулок стабилизатора", "Достаточно нежное лобовое стекло"]
    },
    {
        id: "vw-polo-liftback",
        name: "Volkswagen Polo (Лифтбек)",
        brand: "Volkswagen", brandOrigin: "Германия", operationCountry: "РБ, РФ", importCountry: "РФ",
        model: "Polo New", bodyCode: "CK", bodyTypes: "Лифтбек",
        years: "2020 — 2022", rating: "8.4", isPopular: true, imagePlaceholder: "🚗",
        summary: "Переезд модели в кузов лифтбек. Просторный багажник, современная мультимедиа-система и светодиодная оптика.",
        engineIds: ["vag_16_cwva", "vag_14_tsi"], transmissionIds: ["mt_5", "aisin_6at", "vag_dq200"],
        safetyLevel: "5/5", safetyText: "Современные системы стабилизации ESC установлены во всех комплектациях.",
        soulScore: "4/10", electricalReliability: "8/10",
        weakPoints: ["Тонкий металл внешних панелей кузова", "Замерзание замков дверей в сильные морозы", "Высокая стоимость оригинальных светодиодных фар"]
    },
    {
        id: "skoda-rapid-1",
        name: "Skoda Rapid (I поколение)",
        brand: "Skoda", brandOrigin: "Чехия", operationCountry: "РБ, РФ", importCountry: "РФ / Чехия",
        model: "Rapid", bodyCode: "NH3", bodyTypes: "Лифтбек",
        years: "2012 — 2020", rating: "8.3", isPopular: true, imagePlaceholder: "🚗",
        summary: "Сбалансированный семейный автомобиль. Кузов лифтбек предлагает рекордный объем багажного отделения в своем классе.",
        engineIds: ["vag_16_cfna", "vag_16_cwva", "vag_14_tsi"], transmissionIds: ["mt_5", "aisin_6at", "vag_dq200"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Высокие оценки пассивной безопасности по европейской методике, прочный силовой каркас.",
        soulScore: "4/10", electricalReliability: "9/10",
        weakPoints: ["Жесткие настройки задней подвески", "Слабое ЛКП на стыках крыльев и порогов", "Быстро забиваются дренажные отверстия под лобовым стеклом"]
    },
    {
        id: "skoda-octavia-a5",
        name: "Skoda Octavia (A5 Рестайлинг)",
        brand: "Skoda", brandOrigin: "Чехия", operationCountry: "РБ, РФ", importCountry: "РФ / Чехия",
        model: "Octavia", bodyCode: "1Z", bodyTypes: "Лифтбек, Универсал",
        years: "2008 — 2013", rating: "8.0", isPopular: true, imagePlaceholder: "🚗",
        summary: "Популярный представитель C-класса. Просторный салон, качественные материалы отделки, отличная управляемость.",
        engineIds: ["ren_16_h4m", "vag_14_caxa"], transmissionIds: ["mt_5", "aisin_6at", "vag_dq200"],
        safetyLevel: "5/5", safetyText: "Высокая жесткость кузова, качественный металл, эффективная работа систем активной безопасности.",
        soulScore: "5/10", electricalReliability: "7/10",
        weakPoints: ["Растяжение цепи ГРМ на ранних турбомоторах 1.4 TSI (CAXA)", "Склонность к коррозии на колесных арках и порогах", "Износ сцепления робота DSG-7 в городском режиме"]
    },
    {
        id: "skoda-octavia-a7",
        name: "Skoda Octavia (A7)",
        brand: "Skoda", brandOrigin: "Чехия", operationCountry: "РБ, РФ", importCountry: "РФ / Чехия",
        model: "Octavia", bodyCode: "5E", bodyTypes: "Лифтбек, Универсал",
        years: "2013 — 2020", rating: "8.6", isPopular: true, imagePlaceholder: "🚗",
        summary: "Эталон практичности в C-классе. Новое поколение моторов EA211 избавилось от старых проблем с цепями ГРМ.",
        engineIds: ["vag_16_cwva", "vag_14_tsi", "vag_18_tsi"], transmissionIds: ["mt_5", "aisin_6at", "vag_dq200"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Высокий уровень пассивной безопасности, современные ассистенты предотвращения столкновений.",
        soulScore: "6/10", electricalReliability: "8/10",
        weakPoints: ["Расход масла на угар у атмосферных двигателей 1.6", "Закисание актуатора вестгейта турбины", "Слабое стекло фар головного света"]
    },
    {
        id: "hyundai-solaris-1",
        name: "Hyundai Solaris (I поколение)",
        brand: "Hyundai", brandOrigin: "Южная Корея", operationCountry: "РБ, РФ", importCountry: "РФ",
        model: "Solaris", bodyCode: "RB", bodyTypes: "Седан, Хэтчбек",
        years: "2011 — 2017", rating: "8.0", isPopular: true, imagePlaceholder: "🚗",
        summary: "Один из самых надежных и недорогих в содержании автомобилей на вторичном рынке СНГ. Простые и ресурсные двигатели Gamma.",
        engineIds: ["kia_14_g4fa", "kia_16_g4fc"], transmissionIds: ["mt_5", "kia_4at", "kia_6at"],
        safetyLevel: "4/5 (ARCAP)", safetyText: "Конструкция кузова была доработана и усилена в ходе рестайлинга 2014 года.",
        soulScore: "2/10", electricalReliability: "9/10",
        weakPoints: ["Мягкие амортизаторы на ранних выпусках (нестабильность на трассе)", "Разрушение катализатора с риском попадания крошки в цилиндры", "Тонкое лакокрасочное покрытие"]
    },
    {
        id: "hyundai-solaris-2",
        name: "Hyundai Solaris (II поколение)",
        brand: "Hyundai", brandOrigin: "Южная Корея", operationCountry: "РБ, РФ", importCountry: "РФ",
        model: "Solaris", bodyCode: "HC", bodyTypes: "Седан",
        years: "2017 — 2022", rating: "8.3", isPopular: true, imagePlaceholder: "🚗",
        summary: "Существенно улучшенная управляемость, энергоемкая подвеска, надежные шестиступенчатые трансмиссии.",
        engineIds: ["kia_14_g4fa", "kia_16_g4fg"], transmissionIds: ["mt_6", "kia_6at"],
        safetyLevel: "5/5 (ARCAP)", safetyText: "Широкое применение высокопрочных сталей в конструкции кузова, хорошая отработка фронтального удара.",
        soulScore: "3/10", electricalReliability: "9/10",
        weakPoints: ["Быстрый износ оплетки рулевого колеса", "Недостаточная шумоизоляция салона", "Скромный ресурс оригинального ступичного подшипника"]
    },
    {
        id: "kia-rio-3",
        name: "Kia Rio (III поколение)",
        brand: "Kia", brandOrigin: "Южная Корея", operationCountry: "РБ, РФ", importCountry: "РФ",
        model: "Rio", bodyCode: "UB", bodyTypes: "Седан, Хэтчбек",
        years: "2011 — 2017", rating: "8.0", isPopular: true, imagePlaceholder: "🚗",
        summary: "Платформенный аналог Solaris с более жесткой, европейской настройкой подвески и оригинальным дизайном кузова.",
        engineIds: ["kia_14_g4fa", "kia_16_g4fc"], transmissionIds: ["mt_5", "kia_4at", "kia_6at"],
        safetyLevel: "4/5 (ARCAP)", safetyText: "Прочная силовая структура, надежные фронтальные подушки безопасности в стандартном оснащении.",
        soulScore: "3/10", electricalReliability: "9/10",
        weakPoints: ["Быстрое затирание пластиковых стекол фар", "Появление скрипов пластика в салоне в зимний период", "Сравнительно жесткий ход на неровных дорогах"]
    },
    {
        id: "hyundai-elantra-md",
        name: "Hyundai Elantra (V поколение)",
        brand: "Hyundai", brandOrigin: "Южная Корея", operationCountry: "РБ, РФ", importCountry: "РФ / Корея",
        model: "Elantra", bodyCode: "MD", bodyTypes: "Седан",
        years: "2011 — 2016", rating: "7.9", isPopular: false, imagePlaceholder: "🚗",
        summary: "Просторный седан С-класса. Версии с мотором 1.6 литра очень надежны, варианты с мотором 2.0 требуют внимания перед покупкой.",
        engineIds: ["kia_16_g4fc", "kia_20_g4kd"], transmissionIds: ["mt_6", "kia_6at"],
        safetyLevel: "5/5 (IIHS)", safetyText: "Высокие оценки пассивной безопасности по американской методике проведения краш-тестов.",
        soulScore: "4/10", electricalReliability: "8/10",
        weakPoints: ["Склонность к образованию задиров в цилиндрах на моторах 2.0 (G4KD)", "Небольшой дорожный просвет", "Проседание задних пружин при частой загрузке"]
    },
    {
        id: "hyundai-tucson-3",
        name: "Hyundai Tucson (III поколение)",
        brand: "Hyundai", brandOrigin: "Южная Корея", operationCountry: "РБ, РФ", importCountry: "РФ / Корея",
        model: "Tucson", bodyCode: "TL", bodyTypes: "Кроссовер",
        years: "2015 — 2020", rating: "8.1", isPopular: true, imagePlaceholder: "🚙",
        summary: "Популярный городской кроссовер. Наиболее надежным и ресурсным в линейке считается дизельный двигатель 2.0 CRDi.",
        engineIds: ["kia_20_g4na", "kia_20_crdi"], transmissionIds: ["kia_6at", "aisin_8at"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Отличные показатели защиты пассажиров, наличие систем экстренного автоматического торможения.",
        soulScore: "5/10", electricalReliability: "8/10",
        weakPoints: ["Задиры поршневой группы на бензиновых моторах 2.0 G4NA", "Необходимость регулярной профилактики шлицевых соединений полного привода", "Жесткий пластик обшивки багажного отделения"]
    },
    {
        id: "kia-sportage-4",
        name: "Kia Sportage (IV поколение)",
        brand: "Kia", brandOrigin: "Южная Корея", operationCountry: "РБ, РФ", importCountry: "РФ / Словакия",
        model: "Sportage", bodyCode: "QL", bodyTypes: "Кроссовер",
        years: "2015 — 2022", rating: "8.2", isPopular: true, imagePlaceholder: "🚙",
        summary: "Популярный среднеразмерный кроссовер. Отличается хорошим качеством сборки, комфортным салоном и ликвидностью на рынке.",
        engineIds: ["kia_20_g4na", "kia_20_crdi"], transmissionIds: ["kia_6at", "aisin_8at"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Отличная прочность силовой капсулы салона при боковых ударах.",
        soulScore: "5/10", electricalReliability: "8/10",
        weakPoints: ["Риск повреждения стенок цилиндров бензинового двигателя 2.0", "Износ шлицев раздаточной коробки", "Скромный клиренс под защитой картера для кроссовера"]
    },
    {
        id: "lada-vesta-1",
        name: "Lada Vesta (I поколение)",
        brand: "Lada", brandOrigin: "РФ", operationCountry: "РБ, РФ, СНГ", importCountry: "РФ",
        model: "Vesta", bodyCode: "GFL", bodyTypes: "Седан, Универсал",
        years: "2015 — 2022", rating: "7.7", isPopular: true, imagePlaceholder: "🚗",
        summary: "Популярный представитель сегмента B+. Обладает отличной подвеской для плохих дорог, хорошим клиренсом и доступным обслуживанием.",
        engineIds: ["vaz_21129", "ren_16_h4m"], transmissionIds: ["mt_5", "jatco_jf015e"],
        safetyLevel: "4/5 (ARCAP)", safetyText: "Высокий для отечественного автомобиля уровень пассивной безопасности, прочные лонжероны.",
        soulScore: "4/10", electricalReliability: "7/10",
        weakPoints: ["Быстрый износ элементов выхлопной системы (гофры глушителя)", "Вой механической коробки передач ВАЗ", "Скрип оригинальных втулок стабилизатора"]
    },
    {
        id: "renault-duster-1",
        name: "Renault Duster (I поколение)",
        brand: "Renault", brandOrigin: "Франция", operationCountry: "РБ, РФ", importCountry: "РФ",
        model: "Duster", bodyCode: "HS", bodyTypes: "Кроссовер",
        years: "2012 — 2021", rating: "7.9", isPopular: true, imagePlaceholder: "🚙",
        summary: "Настоящий внедорожник среди бюджетных кроссоверов. Практически неубиваемая длинноходная подвеска и надежная система полного привода.",
        engineIds: ["ren_16_k4m", "ren_15_dci"], transmissionIds: ["mt_5", "mt_6", "dp2_dp8"],
        safetyLevel: "3/5", safetyText: "Удовлетворительная прочность кузова, базовые комплектации имеют скромный набор систем безопасности.",
        soulScore: "4/10", electricalReliability: "8/10",
        weakPoints: ["Повышенный расход топлива бензиновых моторов", "Ограниченная эргономика салона", "Быстрый износ ЛКП в зоне задних арок (пескоструй)"]
    },

    // ==========================================
    // СЕГМЕНТ: ПРЕДСТАВИТЕЛЬСКИЙ И ЛЮКС-КЛАСС ($20,000+)
    // ==========================================
    {
        id: "toyota-camry-xv50",
        name: "Toyota Camry (XV50)",
        brand: "Toyota", brandOrigin: "Япония", operationCountry: "РБ, РФ", importCountry: "РФ (завод в Шушарах)",
        model: "Camry", bodyCode: "XV50", bodyTypes: "Седан",
        years: "2011 — 2017", rating: "8.9", isPopular: true, imagePlaceholder: "🚗",
        summary: "Настоящий бестселлер бизнес-класса. Известен своей феноменальной надежностью, плавностью хода и минимальной потерей стоимости.",
        engineIds: ["toy_25_ar"], transmissionIds: ["aisin_6at"],
        safetyLevel: "5/5 (IIHS)", safetyText: "Высокие баллы при фронтальных ударах с малым перекрытием по стандартам США.",
        soulScore: "5/10", electricalReliability: "9/10",
        weakPoints: ["Быстрый износ обивки сидений на пробегах до 100 тыс. км", "Склонность к биению передних тормозных дисков при интенсивных торможениях", "Слабое лакокрасочное покрытие капота"]
    },
    {
        id: "geely-coolray-1",
        name: "Geely Coolray / Belgee X50 (I поколение)",
        brand: "Geely", brandOrigin: "Китай", operationCountry: "РБ, РФ", importCountry: "РБ (завод БелДжи)",
        model: "Coolray", bodyCode: "SX11", bodyTypes: "Кроссовер",
        years: "2020 — н.в.", rating: "8.3", isPopular: true, imagePlaceholder: "🚙",
        summary: "Яркий и динамичный городской кроссовер, построенный на совместной с Volvo платформе BMA. Пользуется высоким спросом.",
        engineIds: ["geely_15_3g15t"], transmissionIds: ["vag_dq250"],
        safetyLevel: "5/5 (C-NCAP)", safetyText: "Современная силовая конструкция кузова с программируемыми зонами деформации.",
        soulScore: "6/10", electricalReliability: "8/10",
        weakPoints: ["Необходимость дополнительной антикоррозийной обработки скрытых полостей", "Небольшой объём топливного бака", "Маркий глянцевый пластик в отделке интерьера"]
    },
    {
        id: "volvo-xc90-2",
        name: "Volvo XC90 (II поколение)",
        brand: "Volvo", brandOrigin: "Швеция", operationCountry: "РБ, РФ", importCountry: "США / ЕС",
        model: "XC90", bodyCode: "SPA", bodyTypes: "Кроссовер",
        years: "2015 — н.в.", rating: "8.7", isPopular: true, imagePlaceholder: "🚙",
        summary: "Ориентир в области безопасности и скандинавской эргономики. Построен на модульной платформе SPA.",
        engineIds: ["vag_20_tdi"], transmissionIds: ["aisin_8at"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Один из самых безопасных автомобилей в мире. Системы City Safety предотвращают ДТП на городских скоростях.",
        soulScore: "7/10", electricalReliability: "7/10",
        weakPoints: ["Глюки мультимедиа Sensus на машинах ранних годов выпуска", "Сложный привод компрессора на двухнаддувных версиях", "Высокая стоимость кузовных деталей"]
    },
    {
        id: "volvo-xc60-2",
        name: "Volvo XC60 (II поколение)",
        brand: "Volvo", brandOrigin: "Швеция", operationCountry: "РБ, РФ", importCountry: "США / ЕС",
        model: "XC60", bodyCode: "SPA", bodyTypes: "Кроссовер",
        years: "2017 — н.в.", rating: "8.8", isPopular: true, imagePlaceholder: "🚙",
        summary: "Среднеразмерный кроссовер премиум-класса. Сбалансированный вариант для пригона из стран Европы и США.",
        engineIds: ["vag_20_tdi"], transmissionIds: ["aisin_8at"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Прочная капсула салона из борсодержащей стали, отличные ассистенты превентивной защиты.",
        soulScore: "7/10", electricalReliability: "8/10",
        weakPoints: ["Течи патрубков интеркулера на дизельных версиях", "Скромный ресурс оригинальных пневмобаллонов подвески", "Возникновение скрипов пластика в салоне зимой"]
    },
    {
        id: "ford-explorer-5",
        name: "Ford Explorer (V поколение)",
        brand: "Ford", brandOrigin: "США", operationCountry: "РБ, РФ", importCountry: "США",
        model: "Explorer", bodyCode: "U502", bodyTypes: "Кроссовер",
        years: "2010 — 2019", rating: "8.2", isPopular: true, imagePlaceholder: "🚙",
        summary: "Большой семейный кроссовер с трехрядной компоновкой салона и солидным внешним видом.",
        engineIds: ["toy_25_ar"], transmissionIds: ["aisin_6at"],
        safetyLevel: "5/5 (NHTSA)", safetyText: "Массивная рамоподобная конструкция кузова, обеспечивающая хорошую защиту при боковом ударе.",
        soulScore: "6/10", electricalReliability: "7/10",
        weakPoints: ["Сложный и дорогой процесс замены водяной помпы охлаждения двигателя", "Отказы электроусилителя рулевой рейки", "Растрескивание пластиковых накладок кузова"]
    },
    {
        id: "ford-mustang-6",
        name: "Ford Mustang (VI поколение)",
        brand: "Ford", brandOrigin: "США", operationCountry: "РБ, РФ", importCountry: "США",
        model: "Mustang", bodyCode: "S550", bodyTypes: "Купе, Кабриолет",
        years: "2014 — 2023", rating: "8.6", isPopular: true, imagePlaceholder: "🐎",
        summary: "Культовый американский маслкар. Обладает великолепным внешним видом и отличными динамическими показателями.",
        engineIds: ["geely_20_turbo"], transmissionIds: ["mt_6", "aisin_8at"],
        safetyLevel: "5/5 (NHTSA)", safetyText: "Высокая крутильная жесткость кузова, эффективные современные тормозные механизмы.",
        soulScore: "10/10", electricalReliability: "8/10",
        weakPoints: ["Прогар прокладки ГБЦ на форсированных версиях EcoBoost", "Шумность работы МКПП", "Коррозия передней кромки капота из-за особенностей стыковки материалов"]
    },
    {
        id: "bmw-x5-g05",
        name: "BMW X5 (G05)",
        brand: "BMW", brandOrigin: "Германия", operationCountry: "РБ, РФ", importCountry: "США / ЕС",
        model: "X5", bodyCode: "G05", bodyTypes: "Кроссовер",
        years: "2018 — н.в.", rating: "9.0", isPopular: true, imagePlaceholder: "🚙",
        summary: "Высокотехнологичный спортивный кроссовер премиум-сегмента. Сочетание дизельных двигателей и КПП ZF считается эталонным.",
        engineIds: ["vag_20_tdi"], transmissionIds: ["aisin_8at"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Передовые лазерные фары головного света, комплекс интеллектуальных ассистентов водителя.",
        soulScore: "8/10", electricalReliability: "8/10",
        weakPoints: ["Быстрое загрязнение каналов системы впуска EGR на дизелях", "Выход из строя электропривода активных жалюзи радиатора", "Крайне высокая стоимость оригинальных узлов и обслуживания"]
    },
    {
        id: "audi-a6-c8",
        name: "Audi A6 (C8)",
        brand: "Audi", brandOrigin: "Германия", operationCountry: "РБ, РФ", importCountry: "ЕС / РФ",
        model: "A6", bodyCode: "C8", bodyTypes: "Седан, Универсал",
        years: "2018 — н.в.", rating: "8.5", isPopular: true, imagePlaceholder: "🚗",
        summary: "Технологичный седан бизнес-класса с полностью цифровым управлением и инновационным полным приводом Quattro Ultra.",
        engineIds: ["vag_14_tsi"], transmissionIds: ["vag_dq250"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Облегченный алюминиево-стальной кузов, передовая пассивная и активная защита.",
        soulScore: "6/10", electricalReliability: "6/10",
        weakPoints: ["Программные сбои мультимедийной системы MMI", "Отказ системы мягкого гибрида (генератор-стартер)", "Рывки роботизированной трансмиссии в плотном городском трафике"]
    },
    {
        id: "porsche-cayenne-3",
        name: "Porsche Cayenne (III поколение)",
        brand: "Porsche", brandOrigin: "Германия", operationCountry: "РБ, РФ", importCountry: "ЕС / США",
        model: "Cayenne", bodyCode: "PO536", bodyTypes: "Кроссовер",
        years: "2017 — н.в.", rating: "9.1", isPopular: false, imagePlaceholder: "🚙",
        summary: "Выдающийся кроссовер с повадками спортивного болида. Сочетает люксовый комфорт с отличной управляемостью.",
        engineIds: ["geely_20_turbo"], transmissionIds: ["aisin_8at"],
        safetyLevel: "5/5 (Euro NCAP)", safetyText: "Композитные тормозные материалы, высочайшая жесткость структуры кузова.",
        soulScore: "9/10", electricalReliability: "7/10",
        weakPoints: ["Расход масла при агрессивной эксплуатации", "Быстрый износ элементов пневмоподвески на плохих дорогах", "Дорогие регламентные работы у официальных дилеров"]
    }
];