import { Page, expect } from "@playwright/test";


// *** *** *** *** *** *** *** LOCATORS *** *** *** *** *** *** ***

/** Sign In button */
export const signInButton = (page: Page) =>
    page.getByRole('banner').getByLabel('Sign in');

/** Sign In button dropdwon */
export const signInDropdown = (page: Page) =>
    page.locator('[id="__next"]').getByRole('button').nth(1);

/** Sign In button dropdown option - Web3 */
export const signInDropdownWeb3 = (page: Page) =>
    page.getByRole('button', { name: 'Web3 wallet' });

/** Sign In button dropdown option - Email */
export const signInButtonEmail = (page: Page) =>
    page.getByRole('button', { name: 'Email' });

/** Wallet modal */
export const walletModal = (page: Page) =>
    page.getByTestId('ModalContainer').locator('div').filter({ hasText: 'You\'ll need a wallet to' }).nth(2);

/** Wallet modal - close button */
export const closeWalletModal = (page: Page) =>
    walletModal(page).getByLabel('Close modal');

/** Wallet modal - Phantom authentication option */
export const phantomWalletAuthOption = (page: Page) =>
    walletModal(page).getByRole('button', { name: 'Phantom Phantom Recommended' })

/** Register modal */
export const registerModal = (page: Page) =>
    page.getByTestId('ModalContainer').locator('div').filter({ hasText: 'Register or sign in to' }).nth(2);

/** Register modal - Continue With Email - button */
export const continueWithEmail = (page: Page) =>
    registerModal(page).getByRole('button', { name: 'CONTINUE WITH EMAIL' });

/** Register modal - Google - button */
export const googleButton = (page: Page) =>
    registerModal(page).getByRole('button', { name: 'Google' });

/** Register modal - Web3 Wallet - button */
export const web3WalletButton = (page: Page) =>
    registerModal(page).getByLabel('Web3 Wallet');

/** Register modal - Close - button */
export const closeRegisterModal = (page: Page) =>
    registerModal(page).getByLabel('Close modal');

/** Email authentication popup window root locator */
export const emailAuthenticationWindow = (page: Page) =>
    page.locator('.auth0-lock-center');

/** Input email form submit button */
export const inputEmailAuth = (page: Page) =>
    emailAuthenticationWindow(page).getByPlaceholder('yours@example.com');

/** Input email form submit button */
export const submitEmailAuth = (page: Page) =>
    emailAuthenticationWindow(page).getByLabel('Submit');

/** Input email form submit button */
export const didYouGetTheCode = (page: Page) =>
    emailAuthenticationWindow(page).getByRole('link', { name: 'Did not get the code?' });

// *** *** *** *** *** *** *** ACTIONS *** *** *** *** *** *** ***

export async function checkSignInButtonOptions(page: Page) {
    // First checking we actually get options upon hovering
    await signInDropdown(page).hover();
    await expect(signInDropdownWeb3(page)).toBeVisible();
    await expect(signInButtonEmail(page)).toBeVisible();

    // Verify Web3 wallet modal opens and closes
    await signInDropdownWeb3(page).click();
    await expect(walletModal(page)).toBeVisible();
    await closeWalletModal(page).click();
    await expect(walletModal(page)).toBeHidden();

    // Verify Sign button opens Register modal
    await signInButton(page).click();
    await expect(registerModal(page)).toBeVisible();
    await closeRegisterModal(page).click();
    await expect(registerModal(page)).toBeHidden();

    // Verify Email modal opens and closes
    await signInDropdown(page).hover();
    // await signInButtonEmail(page).click();

    const [newPage] = await Promise.all([        
        page.waitForEvent('popup'),
        signInButtonEmail(page).click(),
        page.waitForLoadState('domcontentloaded'),
    ]);
    
    // Wait for the new page URL to appear
    await newPage.waitForURL(new RegExp(`https://auth0.hel.io/`));

    await expect(await newPage.url().toLowerCase()).toContain("https://auth0.hel.io/login?state=");
    
    // Close the new page
    await newPage.close();
}

export async function openRegisterModal(page: Page) {
    await signInButton(page).click();
    await expect(registerModal(page)).toBeVisible();
}

export async function checkContinueWithEmail(page: Page, email: string) {
    await openRegisterModal(page);
    await continueWithEmail(page).click();

    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.waitForLoadState('domcontentloaded'),
    ]);

    // Wait for the new page URL to appear
    await newPage.waitForURL(new RegExp(`https://auth0.hel.io/`));

    await expect(await newPage.url().toLowerCase()).toContain("https://auth0.hel.io/login?state=");


    await checkEmptyInputEmailValidation(newPage);
    await checkInvalidInputEmailValidation(newPage);
    await checkEmailSubmit(newPage, email);

    // Close the new page
    await newPage.close();
}

export async function checkEmptyInputEmailValidation(page: Page) {
    await submitEmailAuth(page).waitFor();
    await submitEmailAuth(page).click();
    await expect(await page.locator('.auth0-lock-center').getByText('Email can\'t be blank')).toBeVisible();;
}

export async function checkInvalidInputEmailValidation(page: Page) {
    await inputEmailAuth(page).fill('jscbaj');
    await submitEmailAuth(page).click();
    await expect(await page.locator('.auth0-lock-center').getByText('Email is invalid')).toBeVisible();;
    await inputEmailAuth(page).clear();
}

export async function checkEmailSubmit(page: Page, email: string) {
    await inputEmailAuth(page).fill(email);
    await submitEmailAuth(page).click();
    await expect(didYouGetTheCode(page)).toBeVisible();
}

export async function checkGoogleSignIn(page: Page) {
    await openRegisterModal(page);
    await googleButton(page).click();

    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.waitForLoadState('domcontentloaded'),
    ]);

    // Wait for the new page URL to appear
    await newPage.waitForURL(new RegExp(`https://accounts.google.com/`));
    await expect(await newPage.url().toLowerCase()).toContain("https://accounts.google.com/v3/signin/identifier?opparams=");

    // Close the new page
    await newPage.close();
}


export async function checkWeb3SignIn(page: Page) {
    await openRegisterModal(page);
    await web3WalletButton(page).click();

    await expect(walletModal(page)).toBeVisible();

    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        phantomWalletAuthOption(page).click(),
    ]);

    // Wait for the new tab to load its content
    await newPage.waitForLoadState('domcontentloaded');

    // Check the URL of the new tab to ensure it's the expected Phantom Wallet download page
    await expect(newPage).toHaveURL('https://phantom.app/download');

    // Close the new tab if necessary
    await newPage.close();
}
