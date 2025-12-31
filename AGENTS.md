# Repository Guidelines

## Project Structure & Module Organization
This Next.js App Router workspace keeps most code under `src`: `src/app` owns routes, layout, and globals; `src/components` stores reusable UI with matching `.module.scss`; `src/features` holds domain slices such as `Board/components`, `Board/hooks`, `Board/types`, and `board.reducer.ts`. Static assets stay in `public/`. Use the `@/` alias for imports (for example `@/features/Board/components/Board`).

## Build, Test, and Development Commands
Run all commands from the repo root (`trello-clone/`).  
```bash
npm run dev    # start the Next.js dev server on http://localhost:3000
npm run build  # create an optimized production bundle in .next/
npm start      # serve the production build locally
npm run lint   # apply the Next + TypeScript ESLint rules
```
Commit the updated `package-lock.json` whenever dependencies change.

## Coding Style & Naming Conventions
TypeScript is strictly typed per `tsconfig.json`; keep the `strict` invariant intact. Components, hooks, and reducers use PascalCase file names (`List.tsx`, `useBoard.ts`), while functions/variables use camelCase. Keep indentation at two spaces and prefer descriptive prop names over abbreviations. Co-locate SCSS modules with their components and rely on `clsx` for dynamic classes instead of string concatenation. Do not introduce global styles outside `src/app/globals.css` without discussing the impact on the App Router.

## Testing Guidelines
No automated tests exist yet, so every feature should introduce coverage alongside the change. Place component tests next to the source (e.g., `List.test.tsx`) or inside a feature-level `__tests__` folder. Favor Jest or Vitest with React Testing Library for UI behavior and add reducer tests for `board.reducer.ts` to guard drag-and-drop flows. Document any intentional gaps in the pull request and run `npm run lint` before review.

## Commit & Pull Request Guidelines
Follow the existing history's short, action-focused commit messages (`finilizing the version 1.0.0`, `refining the whole structure...`). Keep the first line under 72 characters, start with a verb, and describe the scope (`add List drag limits`). Each PR should include: a concise summary, linked issue or task ID, screenshots/gifs for UI changes, a checklist of tests/lint results, and notes on migration or data considerations. Merge only after securing one approval and resolving all review feedback.
