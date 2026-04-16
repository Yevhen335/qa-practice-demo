# Autotest Instruction

Use this instruction when asking Codex to add new automated tests to this repository.

## Reusable Prompt

```text
Role: Act as a Senior QA Automation Architect.

Context:
You are extending an existing Playwright + TypeScript automation framework. Before writing tests, inspect the current project structure, existing fixtures, page objects, builders, interfaces, and naming conventions. Reuse the established framework patterns instead of introducing a parallel structure.

Task:
1. Use Playwright MCP to analyze the target page or flow in the live application before implementing tests.
2. Design or update test cases for the requested functionality.
3. Implement automated tests in the existing framework.
4. Keep tests atomic and focused: one test = one user flow or business behavior.
5. Reuse and extend the current Page Object Model, fixtures, builders, interfaces, constants, and config where appropriate.
6. Run the relevant test suite and report the result.

Mandatory Rules:
- Use ES Modules only. Do not use CommonJS.
- Keep `"type": "module"` in `package.json`.
- Use TypeScript and existing project conventions.
- Use the Page Object Model pattern.
- Use Playwright fixtures.
- Use interfaces for classes and data models where appropriate.
- Use Builder pattern for flexible test data when the scenario needs configurable payloads.
- Tag tests appropriately with `@smoke` and/or `@regression`.
- Do not hardcode URLs or credentials in test code.
- Read runtime values from `.env` via the existing env config.
- Use explicit relative `.ts` extensions for all local imports.
- Do not create separate tests only to verify page opening or a single element visibility. These checks must be embedded into functional tests.
- Prefer extending existing files over duplicating framework layers.
- Preserve the current folder structure unless a change is clearly justified.

Implementation Guidance:
- First inspect the live DOM and flow with Playwright MCP.
- Then inspect the local codebase before editing.
- If a new page is needed, create or extend a POM class under `src/pages`.
- If a new data shape is needed, add/update interfaces in `src/interfaces` and models in `src/models`.
- If reusable data setup is needed, extend builders in `src/builders`.
- If reusable injection is needed, extend `tests/fixtures/test.fixture.ts`.
- Put specs under the appropriate `tests/...` area.
- Keep assertions business-focused and stable.
- Prefer accessible locators or resilient selectors.
- Avoid brittle timing logic; use Playwright waits and expectations.

Output Format:
1. Briefly list the affected directory structure.
2. Provide or update the test case table in Markdown.
3. Provide the code for changed or new files.
4. Summarize what was implemented.
5. Report the executed test command and result.
```

## Expected Repository Conventions

- Environment values live in `.env`
- Runtime env loader lives in `src/config/env.ts`
- Constants live in `src/constants`
- POM classes live in `src/pages`
- Interfaces live in `src/interfaces`
- Models live in `src/models`
- Builders live in `src/builders`
- Shared fixtures live in `tests/fixtures`
- Specs live in `tests/...`

## When To Use This

Use this instruction for:
- adding tests for a new page
- extending coverage of an existing page
- refactoring tests to match framework conventions
- adding new fixtures, builders, page objects, or models

## Notes

- The legacy site `https://qa-practice.netlify.app/` redirects to a moved page.
- The working live application currently used by the framework is configured through `.env`.
- Always verify the current live flow with Playwright MCP before implementing or changing tests.
