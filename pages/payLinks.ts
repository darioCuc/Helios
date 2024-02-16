import { Page } from '@playwright/test';

export enum PaymentTemplate {
    Next = 'Next',
    PreSellNFT = 'Pre-sell NFT collection Pre-',
    PhysicalProd = 'Physical product Physical',
    Subscription = 'Subscription Subscription',
    DynamicPricing = 'Developer Dynamic pricing',
    Discord = 'Discord membership Discord',
    Event = 'Event Event',
    Invoice = 'Invoice (0% fees) Invoice (0',
    SellLink = 'Sell a link/file Sell a link/',
    TradingView = 'TradingView TradingView',
    NFT = 'NFT - Private listing NFT -',
    Video = 'Video Video',
    WooCommerce = 'Woo Commerce Woo Commerce',
}


/// *** *** *** *** *** *** *** LOCATORS *** *** *** *** *** *** ***

/** Pay Links side menu button */
export const createPaymentButton = (page: Page) =>
    page.getByRole('button', { name: 'CREATE PAYMENT' });

/** Template button selector */
export const templateButton = (page: Page, buttonName: string) =>
    page.getByRole('button', { name: buttonName });

/** Input area - Product name */
export const productNameInput = (page: Page) =>
    page.getByPlaceholder('Please name your product or');

/** Create Payment -> Next button */
export const nextButton = (page: Page) =>
    page.getByRole('button', { name: 'Next' })

export const priceInput = (page: Page) =>
    page.getByLabel('Price*');

export const monthInput = (page: Page) =>
    page.getByPlaceholder('Months');

export const createButton = (page: Page) =>
    page.getByRole('button', { name: 'Create' });

export const allDoneButton = (page: Page) =>
    page.getByRole('button', { name: 'All Done!' });

export const createdPaymentsList = (page: Page) =>
    page.locator('section').filter({ hasText: 'Pay LinksPriceSalesVolume' });
    

// *** *** *** *** *** *** *** ACTIONS *** *** *** *** *** *** ***

export async function createPayment(
    page: Page, 
    payTemplate: PaymentTemplate, 
    productName: string, 
    ammount: number,) {
    
    await createPaymentButton(page).waitFor();
    await createPaymentButton(page).click();
    await templateButton(page, payTemplate).click();
    await productNameInput(page).fill(productName);
    await nextButton(page).click();
    await priceInput(page).fill(ammount.toString());
    await nextButton(page).click();
    await createButton(page).click();
    await allDoneButton(page).click();
}