# NOIR AUTO

Демонстрационный проект студии детейлинга для портфолио KALLISTO IT-AGENCY. React + Vite + TypeScript, Motion for React, локальные шрифты и дизайн-система. Реализованы кинематографичная Hero-секция с Porsche 911 GT3 RS, PHILOSOPHY, SERVICES с шестью карточками и интерактивное сравнение BEFORE / AFTER. «Наши услуги» и навигация ведут к секциям плавными якорными переходами. Кнопка «Рассчитать стоимость» ведёт к локальному демонстрационному конфигуратору: 3 класса автомобиля, 6 услуг, мгновенный расчёт и сброс. Комплекс выбирается отдельно от услуг.

## Запуск

```bash
cd "/Users/dmitrij61/Desktop/KALLISTO/NOIR AUTO"
npm install
npm run dev
```

После первой установки достаточно `npm run dev`. Адрес печатает Vite (обычно http://127.0.0.1:5173).

## Проверки

- `npm run typecheck` — TypeScript.
- `npm run build` — проверка типов и production-сборка в dist.
- `npm run preview` — локальный просмотр production-сборки.

## Структура

- src/App.tsx — подключение Hero-секции.
- src/components/SiteHeader.tsx — логотип и минимальная навигация.
- src/sections/Hero.tsx — первый экран, последовательность анимаций и демонстрационные уведомления.
- src/sections/Philosophy.tsx и Services.tsx — философия студии и каталог услуг.
- src/components/SectionReveal.tsx — однократное появление блоков с поддержкой reduced motion.
- src/components/BeforeAfterSlider.tsx — сравнение с Pointer Events и доступным range input.
- src/sections/BeforeAfter.tsx — секция сравнения после услуг.
- src/styles — шрифты, токены, глобальные и адаптивные стили.
- public/images — неизменённые оригиналы.
- public/fonts — локальные шрифты и лицензии.
- docs/images-audit.md — проверка исходных изображений.
- PRODUCT.md, DESIGN.md, AGENTS.md — контекст и правила проекта.

Цены конфигуратора условные и предоставлены пользователем. Рабочих форм записи, платных API и 3D нет. Страница помечена noindex/nofollow. Существующий предварительный аудит описывает состояние до подготовки проекта.

## Проверка расчётов конфигуратора

```bash
node --test tests/configurator.test.mjs
```

Тесты используют встроенную поддержку TypeScript в Node.js (проверено на Node.js 26.13.0). Формула: сумма условных стартовых цен × коэффициент класса. Комплекс взаимоисключён с отдельными услугами.

## Структура завершённого лендинга

Hero → 01 Philosophy → 02 Services → 03 Before/After → 04 Process → 05 Detailing Configurator → Final CTA → Footer. PROCESS содержит четыре этапа; финальный CTA ведёт к услугам, футер — к существующим разделам.

Новые компоненты: src/sections/Process.tsx, src/sections/FinalCta.tsx, src/components/SiteFooter.tsx. Стили: src/styles/completion.css. Финальный CTA повторно использует исходный кадр Porsche без изменения PNG. Контакты и действующая запись не предусмотрены.
