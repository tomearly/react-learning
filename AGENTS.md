# AGENTS.md

## Scope

- Use this file for this repo. Do not rely on wider conversation context unless the user explicitly refers to it.
- Inspect only files directly relevant to the current request. Expand search only when targeted inspection fails or the user asks for a broader audit.
- Prioritise: current request, this file, directly relevant files, nearby project conventions.

## Repo Context

- This is a React 19 learning app using Vite, TypeScript, Tailwind CSS, and shadcn/ui.
- Keep code simple and learnable. Prefer clear local state and props before reducers, context, or external state libraries.
- Do not add libraries unless requested or clearly justified by existing project patterns.

## React And TypeScript

- Use functional components, hooks, explicit prop types, and small focused components.
- Avoid `React.FC`, `any`, class components, premature abstractions, and multi-mode components.
- Prefer derived values over duplicated state.
- Use `useEffect` only for real side effects; prefer rendering, event handlers, or derived state when possible.
- Preserve accessibility: semantic HTML, labels, keyboard-friendly controls, visible focus states, and descriptive button text.

## Styling

- Follow existing Tailwind and shadcn/ui patterns.
- Prefer shadcn components/variants already in `src/components/ui`.
- Use readable Tailwind utility groupings.
- Do not install styling libraries unless asked.

## Exploration

- Start with files named by the user, nearby components/types/state, `package.json`, and relevant config.
- Use `rg` for searches.
- Avoid generated or dependency folders unless specifically relevant: `node_modules/`, `dist/`, `build/`, `coverage/`, `.cache/`, `.git/`.
- Do not repeatedly re-read files unless they may have changed.

## Changes

- Make small targeted edits only when the user asks for code changes. If the user asks for explanation or learning help, explain without editing.
- Preserve existing naming, formatting, and architecture unless the requested change requires otherwise.
- Do not revert unrelated user changes.
- Never create commits unless explicitly asked.
- Never modify secrets or environment files unless explicitly asked.

## Validation

- After code changes, run the smallest relevant existing check:
  - `npm run lint`
  - `npm run build`
  - specific tests if they exist and are relevant
- If a check cannot be run, explain why and provide the exact command.

## Output

- Be concise.
- For code changes, include what changed, files changed, and how it was validated.
- For learning questions, explain the mental model and the next smallest useful step.
- When stuck, summarize what was checked, the likely cause, and the next useful step.
