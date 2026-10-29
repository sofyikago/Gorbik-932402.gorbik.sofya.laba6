# Лабораторная работа №6

Введение в Node.js и базовый сервер на Express. Вариант 1 — «Приветствие с локализацией».

## Запуск
```
npm install
npm start
```
Сервер запускается на http://localhost:3000

## Реализовано
- Проект инициализирован через `npm init`, установлен Express
- Статика (HTML, CSS, JS, изображения) раздаётся из папки `public`
- Маршруты: `GET /` (главная), `GET /about` (о себе), `GET /api/greet/:name`
- `?lang=ru` переключает язык приветствия, по умолчанию — английский
- Ответ: `{ message, timestamp, lang }`, `timestamp` в формате ISO
- Валидация `:name`: не пустой, без спецсимволов; иначе `400` и `{ error: "Invalid name" }`
- Неизвестный маршрут — `404` и `{ error: "Not found" }`
- Каждый запрос логируется в консоль
- `manifest.json` с иконками 192×192 и 512×512 подключён в HTML
- Service worker (`sw.js`) кеширует статику и обеспечивает работу офлайн, регистрируется в `script.js`

## Пример работы
- `/api/greet/Sofya` → `{ "message": "Hello, Sofya!", "timestamp": "...", "lang": "en" }`
- `/api/greet/Софья?lang=ru` → `{ "message": "Привет, Софья!", "timestamp": "...", "lang": "ru" }`
- `/api/greet/So!fya` → `400 { "error": "Invalid name" }`
- `/api/unknown` → `404 { "error": "Not found" }`

## Автор
Горбик Софья Алексеевна, 2026
