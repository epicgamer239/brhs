# AGENTS.md

## Cursor Cloud specific instructions

### Project overview
This is a **Next.js 16** (App Router) web application for the Code4Community club at Broad Run High School. It provides student-built tools (Grade Calculator, Yearbook Formatting, Seating Chart) served as a single Next.js app. There is no monorepo structure or backend service beyond Firebase (cloud-hosted).

### Running the app
- **Dev server:** `npm run dev` (starts on `http://localhost:3000`)
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- Scripts are defined in `package.json`.

### Firebase credentials
The app requires a `keys.dev.js` file (gitignored) at the repo root for development Firebase config. Without real credentials, Firebase Auth and Firestore features will not work, but the app still renders and client-side tools (Grade Calculator, Yearbook Formatting, Seating Chart) function without authentication.

### Known issues
- **ESLint fails** with a circular structure error due to `eslint-config-next@16` + `@eslint/eslintrc` FlatCompat + ESLint 9 incompatibility. This is a pre-existing issue in the repo. `npm run lint` will exit with code 2.
- Firebase App Check is disabled in development mode (`NODE_ENV=development`), so no ReCaptcha key is needed for local dev.

### Testing notes
There are no automated tests configured in this repository (no test runner, no test scripts in `package.json`). Validation is done by running the dev server and manually interacting with the tools.
