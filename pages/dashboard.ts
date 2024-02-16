import { Page } from "@playwright/test";

export enum SideMenu {
    Dashboard = 'Dashboard',
    PayLink = 'Pay Links',
    Invoices = 'Invoices',
    Transactions = 'Transactions',
    HelioWallet = 'Helio Wallet',
    AddressBook = 'Address book',
    Settings = 'Settings',
    HelioX = 'HelioX',
}

// *** *** *** *** *** *** *** LOCATORS *** *** *** *** *** *** ***

/** Pay Links side menu button */
export const payLinksMenu = (page: Page) =>
    page.getByRole('list').getByRole('link', { name: 'Pay Links' })

/** Invoices side menu button */
export const invoicesMenu = (page: Page) =>
    page.getByRole('list').getByRole('link', { name: 'Invoices' })

/** Transactions side menu button */
export const transactionsMenu = (page: Page) =>
    page.getByRole('list').getByRole('link', { name: 'Transactions' })

export const sideMenu = (page: Page, menu: string) =>
    page.getByRole('list') .getByRole('link', { name: menu });

// *** *** *** *** *** *** *** ACTIONS *** *** *** *** *** *** ***


export async function openMenu(page: Page, menu: SideMenu) {
    await sideMenu(page, menu).click();
}