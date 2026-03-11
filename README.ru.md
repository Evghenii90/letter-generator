# Letter Generator

Фронтенд‑приложение для генерации сопроводительных писем и сохранения созданных заявок. UI работает через легкий BFF‑слой, который инкапсулирует эндпоинт генерации и упрощает логику клиента.

## Возможности

- Генерация письма по полям формы: `jobTitle`, `company`, `skills`, `details`.
- Предпросмотр результата с состоянием загрузки.
- Сохранение заявок в `localStorage`.
- Просмотр всех сохраненных заявок на главной странице.
- Копирование текста в буфер обмена.

## Легкий BFF‑слой

UI всегда обращается к относительному эндпоинту: `POST /api/generate`.

- Локальная разработка: Vite middleware в `vite.config.ts`.
- Продакшен (Vercel): serverless function в `api/generate.js`.

Формат ответа:

```json
{ "text": "..." }
```

## Маршруты

- `/` — список заявок (`Applications`)
- `/generations` — форма генерации (`Generators`)

## Хранение данных

Заявки сохраняются в `localStorage` под ключом:

```txt
messages-generate
```

## Технологии

- React 19
- TypeScript
- Vite
- React Router
- ESLint + Prettier

## Локальный запуск

```bash
npm install
npm run dev
```

Dev‑сервер: `http://localhost:5173`.

## Скрипты

- `npm run dev` — запуск dev‑сервера
- `npm run build` — проверка типов и production‑сборка
- `npm run preview` — предпросмотр production‑сборки
- `npm run lint` — запуск ESLint
- `npm run lint:fix` — автоисправление lint‑ошибок
- `npm run format` — форматирование Prettier
- `npm run format:check` — проверка форматирования

## Примечания

- Поле `details` поддерживает до `1200` символов.
- В интерфейсе подсвечивается прогресс по первым 5 заявкам, но создавать можно больше.
