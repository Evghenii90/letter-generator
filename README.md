# Letter Generator

Frontend app for generating a cover letter text and storing created applications.

## Features

- Generate a letter from form fields: `jobTitle`, `company`, `skills`, `details`.
- Show generation preview with a loading indicator.
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

Vite dev server usually runs on `http://localhost:5173`.

## Available Scripts

- `npm run dev` - start development server
- `npm run build` - type-check and production build
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

Generation currently uses a local template function:

`src/shared/lib/utils/generateCoverLetter.ts`

So generation is client-side only (no external AI API call).

## Notes

- `details` field supports up to `1200` characters.
- UI shows progress for the first 5 applications; creating more than 5 is allowed.
