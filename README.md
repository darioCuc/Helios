# Helios Automated Testing

This repository contains automated tests for the Helios web application, accessible at [https://app.helios.io/](https://app.helios.io/). These tests, built with Playwright, ensure the application's critical functionalities perform as expected across various browsers.

## Installation

Follow these steps to set up the testing environment:

1. **Clone the Repository**

   ```sh
   git clone https://github.com/darioCuc/Helios.git
    ```

2. **Navigate to the Project Directory**

```sh
    cd Helios
```

3. **Install Dependencies**

Ensure Node.js is installed, then run:

```sh
    npm install
```

This command installs Playwright and other necessary dependencies.

4. **Set Up Browsers**

Download and install the required browser binaries with Playwright:

```sh
    npx playwright install
```

## Project Structure

- **`tests/`**: Contains Playwright test scripts (`*.spec.ts`) for various features like user authentication and payment link operations.

- **`pages/`**: Houses page object models for the web application's pages, improving test maintainability. Key files include:
- `dashboard.ts`: Interactions with the dashboard page.
- `landingPage.ts`: Interactions with the landing page.
- `payLinks.ts`: Functions related to managing payment links.

- **`helpers/`**: Contains utility files that provide general usage functions and other data essential for the tests. The main file here is:
- `utils.ts`: Includes general utility functions that support various testing scenarios across the project.

- **`playwright.config.ts`**: Configures Playwright settings, such as test environments, browsers, and global test options.

## Running Tests

Execute all tests with the following command:

```sh
npx playwright test
```

To run a specific test file:

```sh
npx playwright test tests/login.spec.ts
```

Filter tests by tags:

```sh
npx playwright test --grep @tagname
```

## Tests and Page Objects

- **Tests**: Located in the `tests/` directory. For example, see `login.spec.ts` for login tests and `payLinks.spec.ts` for tests related to payment links.

- **Page Objects**: Found in the `pages/` directory. These include `dashboard.ts` for dashboard page actions, `landingPage.ts` for landing page interactions, and `payLinks.ts` for operations on the payment links page.
