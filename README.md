# QA Practice Demo

Playwright + TypeScript automation framework for the **Forms** section of the QA Practice training website.

The framework is built with:
- Playwright Test
- TypeScript
- ES Modules
- Page Object Model
- Playwright fixtures
- Builder pattern for test data
- GitHub Actions CI

## Project Goal

This repository contains a scalable UI automation framework for the following Forms flows:
- Login
- Register
- Recover Password

The suite is designed to keep tests **atomic**, **readable**, and **maintainable**:
- one test = one user flow / business behavior
- page-opening checks are embedded into functional tests, not split into artificial visibility tests
- URLs and credentials are loaded from `.env`

## Target Application

Configured target:
- `BASE_URL=https://qa-practice.razvanvancea.ro`

Important note:
- the legacy address `https://qa-practice.netlify.app/` currently redirects to a "We've Moved" page
- for that reason, the executable automation uses the live site hosted at `qa-practice.razvanvancea.ro`

## Tech Stack

- Node.js
- Playwright
- TypeScript
- dotenv
- GitHub Actions

## Architecture

```text
qa-practice-demo/
├── .github/workflows/
│   └── playwright.yml
├── src/
│   ├── builders/
│   ├── config/
│   ├── constants/
│   ├── interfaces/
│   ├── models/
│   └── pages/
├── tests/
│   ├── fixtures/
│   └── forms/
├── .env.example
├── package.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```

### Layer Responsibilities

- `src/config`
  Loads and validates environment variables.

- `src/constants`
  Stores reusable application routes and static UI messages.

- `src/interfaces`
  Defines contracts for pages, config, and test-data factories.

- `src/models`
  Stores TypeScript data models for credentials and form payloads.

- `src/builders`
  Creates flexible test data using the Builder pattern.

- `src/pages`
  Contains Page Object Model classes for Forms pages.

- `tests/fixtures`
  Centralizes Playwright fixtures and dependency injection for page objects and test data.

- `tests/forms`
  Holds the actual atomic functional test specs.

## Environment Variables

Project settings are stored in `.env`.

Example:

```env
BASE_URL=https://qa-practice.razvanvancea.ro
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=admin123
```

Setup:

1. Copy [.env.example](/Users/halitsy.y/WebstormProjects/qa-practice-demo/.env.example) to `.env`
2. Adjust values if needed

## Installation

```bash
npm install
npx playwright install chromium
```

## Available Scripts

```bash
npm test
npm run test:forms
npm run test:headed
npm run test:debug
npm run report
```

### What They Do

- `npm test`
  Runs the full Playwright suite.

- `npm run test:forms`
  Runs only the Forms tests.

- `npm run test:headed`
  Runs tests in headed mode for debugging.

- `npm run test:debug`
  Opens Playwright Inspector.

- `npm run report`
  Opens the HTML report after execution.

## Test Coverage

### Forms

Covered user flows:
- successful login with valid admin credentials
- failed login with invalid credentials
- successful registration with valid data
- registration blocked when required credentials are missing
- successful password recovery for a registered email

Tags used:
- `@smoke`
- `@regression`

## Design Decisions

### 1. ES Modules Only

The framework uses:
- `"type": "module"` in `package.json`
- `module: "ESNext"` in `tsconfig.json`

No CommonJS is used.

### 2. Strict Relative `.ts` Imports

All local relative imports use the `.ts` extension explicitly.

Example:

```ts
import { LoginPage } from '../../src/pages/login.page.ts';
```

### 3. Page Object Model

Each Forms page has its own class encapsulating:
- locators
- user actions
- business assertions

This reduces duplication and keeps specs focused on behavior.

### 4. Builder Pattern

Builders are used for:
- valid login credentials
- invalid login credentials
- registration payloads
- recover-password payloads

This makes data setup flexible and keeps specs concise.

### 5. Fixtures

Playwright fixtures provide:
- prebuilt page objects
- a reusable test data factory

That keeps test files small and readable.

## Playwright Configuration

The framework is configured with:
- parallel execution enabled
- HTML reporter
- retained traces on failure
- screenshots on failure
- video on failure

See:
[playwright.config.ts](/Users/halitsy.y/WebstormProjects/qa-practice-demo/playwright.config.ts)

## Continuous Integration

GitHub Actions workflow:
[.github/workflows/playwright.yml](/Users/halitsy.y/WebstormProjects/qa-practice-demo/.github/workflows/playwright.yml)

The CI pipeline:
- installs dependencies with `npm ci`
- creates a runtime `.env`
- installs Playwright Chromium and required Linux dependencies
- runs the Forms suite
- uploads the Playwright HTML report and test results as artifacts

### Recommended GitHub Settings

Repository Variables:
- `BASE_URL`

Repository Secrets:
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## Local Run Example

```bash
npm run test:forms -- --workers=1
```

## Current Validation Result

Latest local verification in this workspace:
- `5 passed`

Command used:

```bash
npm run test:forms -- --workers=1
```

## Known Application Behavior

One real behavior of the target application is worth noting:
- the Register page does not enforce strong business validation in its own JavaScript
- the stable negative test therefore relies on native required-field validation for empty credentials

This is intentional and reflects the actual application behavior rather than an idealized form design.

## Useful Files

- [package.json](/Users/halitsy.y/WebstormProjects/qa-practice-demo/package.json)
- [tsconfig.json](/Users/halitsy.y/WebstormProjects/qa-practice-demo/tsconfig.json)
- [playwright.config.ts](/Users/halitsy.y/WebstormProjects/qa-practice-demo/playwright.config.ts)
- [.env.example](/Users/halitsy.y/WebstormProjects/qa-practice-demo/.env.example)
- [src/config/env.ts](/Users/halitsy.y/WebstormProjects/qa-practice-demo/src/config/env.ts)
- [tests/fixtures/test.fixture.ts](/Users/halitsy.y/WebstormProjects/qa-practice-demo/tests/fixtures/test.fixture.ts)

## Next Improvements

- add linting and formatting
- add matrix execution for multiple browsers
- add scheduled nightly regression
- add README badge for GitHub Actions status
- extend coverage beyond Forms to Buttons, Tables, Dropdowns, and API sections
