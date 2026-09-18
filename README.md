# QA Automation Portfolio

QA automation portfolio demonstrating Playwright UI automation, API testing, test design, reusable automation framework practices, authentication/session reuse, and CI-based test execution.

## Tech Stack

* Playwright
* JavaScript
* Node.js
* REST API Testing
* AJV Schema Validation
* Page Object Model (POM)
* Playwright Fixtures
* Authentication & Session Reuse
* Git & GitHub
* GitHub Actions

## Project Overview

This project demonstrates a structured QA automation framework built with Playwright and JavaScript. It includes UI automation, REST API testing, reusable Page Object Models, custom fixtures, test data management, API schema validation, authentication state reuse, and automated test execution through GitHub Actions.

The project is designed to demonstrate practical automation framework design, maintainability, reusable test components, browser coverage, API testing, and CI-based test execution.

## Project Structure

```text
qa-automation-portfolio/

├── pages/                       # Page Object Models
├── fixtures/                    # Custom Playwright fixtures
├── tests/
│   ├── ui/
│   │   ├── authenticated/       # Tests using saved authentication state
│   │   └── unauthenticated/     # Tests for login and unauthenticated flows
│   ├── api/                     # API automation tests
│   └── auth.setup.js            # Authentication setup and storage state
├── test-data/                   # Test data
├── api/                         # API client utilities
├── schemas/                     # API schemas for validation
├── playwright.config.js
├── package.json
└── .github/
    └── workflows/               # GitHub Actions CI workflow
```

## UI Automation

The UI automation suite uses Playwright with JavaScript and follows the Page Object Model pattern.

### Covered UI Workflows

* Login validation
* Product selection
* Add to cart
* Cart validation
* Checkout workflow
* Customer information validation
* Order completion

### UI Framework Practices

* Page Object Model (POM)
* Custom Playwright fixtures
* Reusable page methods
* Test data separation
* Playwright role, text, placeholder, and attribute-based locators
* Web-first assertions
* Cross-browser UI testing with Chromium, Firefox, and WebKit

## Authentication & Session Reuse

The project uses Playwright's `storageState` functionality to reuse authenticated browser state across UI tests.

The authentication setup:

1. Logs in once using the SauceDemo test account.
2. Saves the authenticated browser context state to `playwright/.auth/user.json`.
3. Authenticated UI projects reuse the saved state instead of performing the login steps before every test.

UI tests are separated into authenticated and unauthenticated areas:

```text
tests/ui/
├── authenticated/
│   ├── products.spec.js
│   ├── cart.spec.js
│   └── checkout.spec.js
└── unauthenticated/
    └── login.spec.js
```

The login tests continue to test the actual authentication functionality, while authenticated tests start with the saved authentication state.

The authentication state file is excluded from Git and is not committed to the repository.

## API Automation

The API automation suite uses Playwright's API testing capabilities to validate REST API behavior.

### API Test Scope

The API tests currently use ReqRes demo `/api/users` and `/api/login` endpoints. These endpoints provide fixture-based test data and are used to validate API contract behavior, including HTTP methods, status codes, response headers, response structures, error responses, and schema validation.

The create and update tests validate the expected API responses and contract behavior; they are not intended to verify persistent database changes.

### Covered API Scenarios

* GET user validation
* POST user creation
* PUT user update
* PATCH user update
* DELETE user validation
* API response headers and status codes
* Response body validation
* Negative API testing and error response validation
* API schema validation using AJV
* API workflow and request chaining
* Data-driven API testing

### API Framework Practices

* Dedicated API client
* Custom API fixtures
* API test data separation
* Reusable API context
* Schema-based response validation
* Environment variable-based API authentication

API tests run independently from the browser projects and are executed once rather than being repeated across Chromium, Firefox, and WebKit.

## Test Projects

The Playwright configuration separates test execution into dedicated projects:

* `setup` — prepares authenticated browser state
* `api` — runs API tests independently
* `chromium-authenticated` — authenticated UI tests on Chromium
* `chromium-unauthenticated` — login tests on Chromium
* `firefox-authenticated` — authenticated UI tests on Firefox
* `firefox-unauthenticated` — login tests on Firefox
* `webkit-authenticated` — authenticated UI tests on WebKit
* `webkit-unauthenticated` — login tests on WebKit

## Continuous Integration

The project uses GitHub Actions to automatically execute the Playwright test suite when changes are pushed to the `main` branch.

### CI Workflow

* Checkout the repository
* Set up Node.js
* Install project dependencies
* Install Playwright browsers
* Run the complete Playwright test suite
* Upload the Playwright HTML report as a GitHub Actions artifact

The API authentication key is stored securely as a GitHub Actions secret and is not committed to the repository.

## How to Run

### Prerequisites

* Node.js installed
* Git installed
* A ReqRes API key

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/saudtester/qa-automation-portfolio.git

cd qa-automation-portfolio

npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

### Environment Setup

The API tests require a ReqRes API key.

1. Create a ReqRes account and generate your API key from the ReqRes API Keys page.
2. Create a `.env` file in the project root.
3. Add your API key:

```env
REQRES_API_KEY=your_api_key_here
```

The `.env` file is excluded from Git through `.gitignore` and must never be committed to the repository.

### Run Tests

Run the complete test suite:

```bash
npx playwright test
```

Run UI tests:

```bash
npx playwright test tests/ui
```

Run API tests:

```bash
npx playwright test tests/api
```

Run authenticated Chromium tests:

```bash
npx playwright test --project=chromium-authenticated
```

Run unauthenticated Chromium tests:

```bash
npx playwright test --project=chromium-unauthenticated
```

List all discovered tests and projects:

```bash
npx playwright test --list
```

### View HTML Report

After running the tests, open the Playwright HTML report with:

```bash
npx playwright show-report
```

### GitHub Actions

For GitHub Actions, add your ReqRes API key as a repository secret named:

```text
REQRES_API_KEY
```

The workflow uses this secret during CI execution without exposing the API key in the repository.
