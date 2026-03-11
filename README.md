# Letter Generator

Frontend app for generating cover letters and saving created applications. The UI talks to a lightweight BFF layer that abstracts the generation endpoint and keeps client logic thin.

## Features

- Generate a letter from form fields: `jobTitle`, `company`, `skills`, `details`.
- Preview the generated text with a loading state.
- Save generated applications in `localStorage`.
- View all saved applications on the main page.
- Copy application text to clipboard.

## Lightweight BFF Layer

The UI always calls a relative endpoint: `POST /api/generate`.

- Local dev: Vite middleware in `vite.config.ts` serves the endpoint.
- Production (Vercel): serverless function in `api/generate.js` serves the endpoint.

Response format:

```json
{ "text": "..." }
```

## Routes

- `/` - applications list (`Applications`)
- `/generations` - generation form (`Generators`)

## Data Storage

Applications are stored in `localStorage` under the key:

```txt
messages-generate
```

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- ESLint + Prettier

## Run Locally

```bash
npm install
npm run dev
```

Dev server: `http://localhost:5173`.

## Scripts

- `npm run dev` - start development server
- `npm run build` - type-check and production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
- `npm run lint:fix` - auto-fix lint issues
- `npm run format` - format with Prettier
- `npm run format:check` - check formatting

## Notes

- `details` supports up to `1200` characters.
- The UI highlights progress for the first 5 applications, but you can create more.
