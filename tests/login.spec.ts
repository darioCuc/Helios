import { test, expect } from '@playwright/test';
import * as auth from '../helpers/utils';
import * as dashboard from '../pages/dashboard';
import * as landingPage from '../pages/landingPage';

test.describe('Login tests', () => {

  test('Check Sign In button login options', async ({ page }) => {
    // Open Helio base URL
    await page.goto('/');
    await expect(page.getByRole('banner').getByLabel('Sign in')).toBeVisible();
    await landingPage.checkSignInButtonOptions(page);
  });

  test('Check Email Login flow', async ({ page }) => {
    // Open Helio base URL
    await page.goto('/');
    await landingPage.checkContinueWithEmail(page, 'test@helio.com');
  });

  test('Check Google Login flow', async ({ page }) => {
    // Open Helio base URL
    await page.goto('/');
    await landingPage.checkGoogleSignIn(page);
  });

  test('Check Web3 wallet login flow', async ({ page }) => {
    // Open Helio base URL
    await page.goto('/');
    await landingPage.checkWeb3SignIn(page);
  });

  test('Login to Helio platform using user token', async ({ page }) => {
    // Call the loginWithToken function with the user token
    await auth.loginWithToken(page, auth.token);

    await expect(page.getByRole('heading', { name: '👋 Welcome' })).toBeVisible();
    await expect(page.getByRole('banner').getByLabel('Sign in')).toBeHidden();

    await dashboard.invoicesMenu(page).click();
    await expect(page.getByRole('button', { name: 'CREATE INVOICE' })).toBeVisible();
  });


});