# AGENTS.md

## Primary instruction

Use this `AGENTS.md` file and only inspect files directly relevant to the task. Do not use wider conversation context unless the user explicitly mentions it.

---

## Goal

Help with this repository efficiently while using as little unnecessary context as possible.

Prioritise:

1. The current user request.
2. This `AGENTS.md` file.
3. Files directly relevant to the requested task.
4. Existing project conventions discovered from nearby files.
5. Wider repository search only when needed.

Do not assume information from unrelated previous conversations is relevant unless the user explicitly refers to it.

---

## Token-saving behaviour

Before reading lots of files, first identify the smallest useful set of files for the task.

Prefer targeted inspection over broad exploration.

Avoid reading the whole repository unless:

- the task is architectural,
- the user asks for a full audit,
- the relevant files cannot be identified from filenames,
- or the first targeted search fails.

When searching, use narrow searches first:

- exact component/function/class names,
- filenames mentioned by the user,
- route names,
- error messages,
- test names,
- package scripts.

Do not repeatedly re-read files that have already been inspected in the current task unless they may have changed.

If context is getting large, summarise the important findings and continue from that summary.

---

## Conversation context

Do not rely on broad previous conversation history by default.

Use previous conversation context only when:

- the user explicitly says “as discussed”, “from earlier”, “same project”, or similar,
- the current task clearly depends on a previous decision,
- or the user provides no project details and past context is necessary to avoid asking again.

When previous context is used, keep it minimal and state the assumption briefly.

Example:

> I’m assuming this is the same React 19 learning app you mentioned earlier.

---

## React 19 decisions

When this repository uses React 19, prefer modern React patterns but keep the code simple and learnable.

### Default React style

Use:

- functional components,
- TypeScript,
- hooks,
- clear prop types,
- small reusable components,
- simple local state before introducing global state.

Avoid:

- class components,
- unnecessary abstraction,
- premature context usage,
- over-complicated custom hooks,
- large component files,
- adding state libraries unless already used.

---

### React 19 features

Use React 19 features only when they clearly improve the code.

Prefer stable, understandable code over using a new feature just because it exists.

Use these when appropriate:

- `useActionState` for form submissions with async actions.
- `useOptimistic` for optimistic UI updates.
- `use` only where the project already supports the relevant Suspense/data-fetching pattern.
- Server Components only if the framework supports them and the project already uses them.
- Actions only when the existing framework/build setup supports them.

Do not introduce experimental or framework-specific React 19 patterns unless the repository already uses them.

---

### Forms

For simple forms, prefer controlled components or `FormData`, depending on existing project style.

For React 19 form actions:

- keep action functions small,
- handle pending and error states clearly,
- avoid hiding business logic inside components,
- keep validation readable.

Do not add a form library unless the project already uses one or the form is complex enough to justify it.

---

### State

Prefer this order:

1. Local component state.
2. Derived state.
3. URL/search params.
4. Context for shared app-level state.
5. External state libraries only if already used.

Avoid duplicating state that can be derived from props, server data, or the URL.

---

### Effects

Do not use `useEffect` for everything.

Before adding an effect, check whether the logic can be handled by:

- rendering,
- event handlers,
- derived values,
- framework loaders,
- server data,
- form actions.

When using `useEffect`:

- include the correct dependencies,
- clean up subscriptions, timers, and event listeners,
- avoid infinite render loops,
- avoid fetching in effects if the project has a better data-loading pattern.

---

### Components

Keep components focused.

Prefer:

- one responsibility per component,
- readable names,
- props that describe intent,
- accessible markup,
- composition over configuration-heavy components.

Avoid very generic components unless there is a clear repeated use case.

---

### TypeScript with React

Prefer explicit types for component props.

Use:

```ts
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};
```

Avoid `React.FC` unless the repository already uses it.

Avoid `any`.

Use `unknown` when the value genuinely needs narrowing.

---

### Accessibility

When touching React UI, preserve or improve accessibility.

Prefer:

- semantic HTML,
- proper labels,
- keyboard-accessible controls,
- visible focus states,
- descriptive button/link text,
- correct heading order.

Avoid:

- clickable `<div>` elements,
- icon-only buttons without accessible names,
- fake buttons,
- removing outlines without replacement focus styles.

---

### Styling

Follow the repository’s existing styling approach.

If Tailwind is used, prefer readable utility groupings.

If shadcn/ui is used, use existing components and variants rather than creating inconsistent one-off styles.

Do not install a styling library unless requested.

---

## Clarifying questions

Avoid asking questions if a sensible default can be inferred from the repository.

Ask a clarifying question only when:

- the task could be implemented in two meaningfully different ways,
- the wrong choice would cause rework,
- credentials, secrets, or deployment details are needed,
- or the user explicitly asks for a decision before proceeding.

If a question is needed, ask one focused question rather than several.

---

## Working style

Make small, targeted changes.

Prefer incremental edits over large rewrites.

Preserve existing code style, naming, formatting, and architecture unless the user asks to improve them.

Do not introduce new libraries unless:

- the user asks for one,
- the existing stack already uses it,
- or there is a clear and worthwhile benefit.

When adding code, keep it understandable for a developer learning the stack.

---

## Output style

Be concise.

Start with the answer or change summary.

Avoid long explanations unless the user asks for detail.

For code changes, include:

- what changed,
- which files changed,
- how to test it.

Do not include large pasted files unless requested.

Prefer patches, snippets, or summaries over dumping entire files.

---

## Testing

Before suggesting a task is complete, look for existing test, lint, typecheck, or build commands.

Use the smallest relevant verification command first.

Examples:

- `npm test -- <specific test>`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `composer test`
- `phpunit --filter <test name>`

Do not run expensive commands unless needed.

If tests cannot be run, explain why and give the user the exact command to run.

---

## Repository exploration rules

Start with:

- `README.md`
- `package.json`
- framework config files
- files directly named in the request
- nearby tests
- nearby components/services/modules

Only expand to broader searches after that.

Useful commands:

- `rg "<exact error or symbol>"`
- `rg "<component name>"`
- `find . -maxdepth 3 -type f | sort`
- `git diff --stat`
- `git status --short`

Avoid:

- reading generated folders,
- reading `node_modules`,
- reading build output,
- reading lockfiles unless dependency versions matter.

Ignore these unless specifically relevant:

- `node_modules/`
- `vendor/`
- `dist/`
- `build/`
- `.next/`
- `.nuxt/`
- `.output/`
- `coverage/`
- `.cache/`
- `.git/`

---

## Project assumptions

Do not assume the framework until confirmed from files.

When detected, follow these preferences:

### JavaScript / TypeScript

Prefer TypeScript-safe code.

Avoid `any` unless there is a clear reason.

Prefer small pure functions where practical.

### Vue

Follow the style already used in the repo.

If both Options API and Composition API exist, match the nearby file.

For Vue 2.7, do not assume every Vue 3-only feature is available.

### React

Prefer simple functional components.

Use hooks carefully and clean up side effects where needed.

For React 19, follow the React 19 decisions in this file.

### PHP / Symfony

Match the project’s Symfony and PHP version.

Do not use modern syntax if the project version does not support it.

Check existing service, entity, controller, and config patterns before adding new ones.

### Accessibility

When touching UI, preserve or improve accessibility.

Prefer semantic HTML.

Do not add click handlers to non-interactive elements unless keyboard support and ARIA are handled correctly.

---

## Safety and secrets

Never print, expose, or commit secrets.

Do not modify `.env`, deployment credentials, API keys, or production configuration unless explicitly asked.

If a task requires a secret, explain what is needed without asking the user to paste it into the repo.

---

## Git behaviour

Do not create commits unless the user explicitly asks.

Before editing, check the working tree when appropriate.

Do not overwrite user changes.

If existing changes are present, work around them carefully and mention anything that looks unrelated.

---

## When stuck

Do not keep searching endlessly.

After a reasonable targeted attempt:

1. Summarise what was checked.
2. Explain the most likely cause.
3. Suggest the next smallest useful step.

Prefer a useful partial answer over a broad investigation.