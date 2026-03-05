# Letter Generator

Frontend app for generating a cover letter text and storing created applications.

## Features

- Generate a letter from form fields: `jobTitle`, `company`, `skills`, `details`.
- Show generation preview with a loading state.
- Store generated applications in `localStorage`.
- Show all saved applications on the main page.
- Copy application text to clipboard.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- ESLint + Prettier

## Routes

- `/` - applications list (`Applications`)
- `/generations` - generation form (`Generators`)

## Run Locally

```bash
npm install
npm run dev
```

The Vite dev server usually runs on `http://localhost:5173`.

## Available Scripts

- `npm run dev` - start development server
- `npm run build` - run type-check and production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
- `npm run lint:fix` - auto-fix lint issues
- `npm run format` - format with Prettier
- `npm run format:check` - check formatting

## Data Storage

Applications are saved in `localStorage` under key:

```txt
messages-generate
```

Data is restored automatically after page reload.

## Current Generation Logic

Generation uses an API endpoint (`POST /api/generate`) instead of direct local template rendering in the UI.

- Local development (`npm run dev`): the endpoint is served by Vite middleware in `vite.config.ts`.
- Vercel production: the endpoint is served by a Serverless Function in `api/generate.js`.
- Frontend always calls a relative URL: `/api/generate`.

The response format is:

```json
{ "text": "..." }
```

## Notes

- `details` field supports up to `1200` characters.
- The UI shows progress for the first 5 applications; creating more than 5 is allowed.
