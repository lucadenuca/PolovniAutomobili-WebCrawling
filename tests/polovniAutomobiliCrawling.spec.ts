import { test, expect } from '@playwright/test'
import { NavigationPage } from '../page-object-model/navigationPage.ts';
import { appendFile, writeFile } from 'fs/promises';
test.beforeEach(async({page}) =>{
  await page.goto('https://www.polovniautomobili.com/')
})

test('Data Crawling', async ({ page }) => {
  const navCard = new NavigationPage(page)
  
  await navCard.dataCollection()

});
