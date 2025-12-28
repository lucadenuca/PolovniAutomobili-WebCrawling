import { Page, Locator } from '@playwright/test'
import { appendFile, writeFile } from 'fs/promises';
import { CardDetailPage } from './cardDetailPage';

export class NavigationPage{
    readonly page : Page
    readonly listingCard : Locator

    constructor(page: Page){
        this.page = page
        this.listingCard = page.locator('.uk-width-large-1-6.uk-width-medium-1-2.uk-width-1-2.uk-padding-remove')
    }

    cardIndex(index: number): Locator{
        return this.listingCard.nth(index)
    }
    
    async getNumberOfListings(): Promise<number> {
        let total = await this.listingCard.count()
        return total
    }

    async dataCollection() {
        const numberOfListings = this.getNumberOfListings()
        
        await writeFile("results.csv",'index,Stanje,Marka,Model,Godiste,Kilometraza,Karoserija,Gorivo,Kubikaza,Snaga Motora Kw,Snaga Motora Ks\n')


        while(true){

            for(let i = 0 ; i < await numberOfListings ; i++){

                const [newPage] = await Promise.all([
                this.page.waitForEvent('popup'),
                this.cardIndex(i).click(),
                ])
      
                await newPage.waitForLoadState('domcontentloaded')
                const detailPage = new CardDetailPage(newPage)

                const stanje = await detailPage.getValue(detailPage.page,'Stanje:')
                
                const marka = await detailPage.getValue(detailPage.page,'Marka')
                
                const model = await detailPage.getValue(detailPage.page,'Model')
                
                const godisteText = await detailPage.getValue(detailPage.page,'Godište')
                const godiste = Number(godisteText.replace(/\D/g, ''))
                
                const kilometrazaText = await detailPage.getValue(detailPage.page,'Kilometraža')
                const kilometraza = Number(kilometrazaText.replace(/\D/g, ''))
                
                const karoserija = await detailPage.getValue(detailPage.page,'Karoserija')
                
                const gorivo = await detailPage.getValue(detailPage.page,'Gorivo')
                
                const kubikazaText = await detailPage.getValue(detailPage.page,'Kubikaža')
                const kubikaza = Number(kubikazaText.replace(/\D/g, ''))
                
                const snagaMotoraText = await detailPage.getValue(detailPage.page,'Snaga motora')
                const match = snagaMotoraText.match(/(\d+)\s*\/\s*(\d+)/)
                const snagaKw = match ? Number(match[1]) : null
                const snagaKs = match ? Number(match[2]) : null
            
                await appendFile("results.csv", `${i},${stanje},${marka},${model},${godiste},${kilometraza},${karoserija},${gorivo},${kubikaza},${snagaKw},${snagaKs}\n`)

                await newPage.close()
       
            }
            
            await Promise.all([
                    //this.page.waitForLoadState('networkidle'),  // or some element that changes
                    this.page.locator('.js-webpack-homepage-next').click(),
                    ]);

        }
        
        
    }
   

}