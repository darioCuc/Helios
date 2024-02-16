import { test, expect } from '@playwright/test';
import * as auth from '../helpers/utils';
import * as dashboard from '../pages/dashboard';
import * as paylink from '../pages/payLinks';
import * as util from '../helpers/utils';

test.describe('Pay Link menu tests', () => {

    test('User can Create Payment', async ({ page }) => {
        const productName = util.generateRandomName();
        // Call the loginWithToken function with the user token
        await auth.loginWithToken(page, auth.token);

        await expect(page.getByRole('heading', { name: '👋 Welcome' })).toBeVisible();
        await expect(page.getByRole('banner').getByLabel('Sign in')).toBeHidden();

        await dashboard.openMenu(page, dashboard.SideMenu.PayLink);
        await page.waitForLoadState('domcontentloaded');
        await expect(page.url()).toContain('/paylinks');

        await paylink.createPayment(
            page, 
            paylink.PaymentTemplate.Next, 
            productName, 
            20);

        await expect(paylink.createdPaymentsList(page).getByRole('cell', { name: productName })).toBeVisible();
    });

});