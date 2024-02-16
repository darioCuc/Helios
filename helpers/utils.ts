import { Page } from 'playwright';
import 'dotenv/config';

export const token = process.env.ACCESS_TOKEN as string;


export async function loginWithToken(page: Page, token: string) {
    // Navigate to the Helio platform
    await page.goto('https://app.hel.io');

    // Set the user token in local storage
    await page.evaluate((token) => {
        localStorage.setItem('HELIO_AUTH_TOKEN', token);
    }, token);

    // Refresh the page to authenticate
    await page.reload();
}


export function generateRandomName() {
    const nameStarts = ["Qui-", "Obi-", "Mace", "Lumi", "Kit", "Plo", "Aayla", "Anakin", "Yoda", "Luke"];
    const nameEnds = ["Gon Jinn", "Wan Kenobi", "Windu", "nara Unduli", "Fisto", "Koon", "Secura", "Skywalker", "Secura", "Skywalker"];

    // Generate random indices for first and last names
    const randomStart = nameStarts[Math.floor(Math.random() * nameStarts.length)];
    const randomEnd = nameEnds[Math.floor(Math.random() * nameEnds.length)];

    // Combine them to form a full name
    return `${randomStart}${randomEnd}`;
}

