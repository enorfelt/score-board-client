# Copilot Instructions

## Commands

```bash
npm start           # Angular dev server (port 4200) + mock Express backend (port 3000)
npm test            # Run all tests with Jest
npm run build       # Production build
npm run build:esp   # Build targeting embedded board output path (../score-board/data/)
```

Run a single test file:
```bash
npx jest src/app/core/state/score-board.store.spec.ts
```

Run tests matching a name:
```bash
npx jest --testNamePattern="should increase outs"
```

## Architecture

This is an Angular 18 app that controls a physical scoreboard (likely ESP32-based). The UI lets users update scores, innings, and outs — changes are synced to the backend via HTTP.

**Data flow:**
1. On startup, `AppConfigService` loads initial state from `/api/score-board/load` via `APP_INITIALIZER`
2. `ScoreBoardStore` (singleton, signal-based) holds state and exposes it as a readonly signal
3. User interactions call store methods → state is updated optimistically via Angular Signals → a debounced (250ms) Subject batches HTTP POSTs to `/api/score-board/update`
4. On HTTP error, state is rolled back to the pre-update value

**Key files:**
- `src/app/core/state/score-board.store.ts` — central state, all business logic
- `src/app/core/state/score-board.service.ts` — HTTP client for the API
- `src/app/core/ui/ui.service.ts` — loading/error state for interceptors
- `src/app/app.component.ts` — root component, wires store to UI components
- `dev-server.js` — local mock Express server that stubs the backend API

**Dev proxy:** Angular dev server proxies `/api/*` to `localhost:3000` (defined in `proxy.conf.js`).

## Conventions

**Angular patterns:**
- All components are **standalone** (no NgModules)
- All components use `ChangeDetectionStrategy.OnPush`
- The app uses **zoneless change detection** (`provideExperimentalZonelessChangeDetection`)
- Services use the `inject()` function, not constructor injection
- Signals are preferred for reactive state; `computed()` is used for derived values in components

**State management:**
- The store's `private update()` helper always takes a function `(state) => Partial<ScoreBoardState>` and handles optimistic updates + debouncing
- `writableState` is private; consumers use the readonly `state` signal

**Testing:**
- Component tests use `@testing-library/angular` with `userEvent` for interactions
- Service tests use Angular `TestBed` with `@hirez_io/observer-spy` for Observable assertions
- Test files use a local factory function pattern (`createStore(partialState?)`, `renderComponent()`) instead of `beforeEach`
- `ng generate` is configured with `skipTests: true` — tests are written manually
- Tests live alongside source files as `*.spec.ts`

**Styling:**
- Global styles: normalize.css + PureCSS grid + `src/styles.scss`
- Components use SCSS (inline styles from generator default, but existing components use `styleUrls`)
- The DSEG7-Classic font (from the `dseg` package) is used to render 7-segment display numbers
