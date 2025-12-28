import { Page } from "@playwright/test";


export class CardDetailPage{
    readonly page: Page
 
    constructor(page: Page){
        this.page = page
    }

    async getValue(page: Page, label: string): Promise<string> {
        return await page.locator('.uk-grid').filter({ has: page.getByText(label) }).locator('> .uk-width-1-2.uk-text-bold').first().innerText();
    }
}