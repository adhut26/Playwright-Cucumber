import { Before, After, BeforeAll, AfterAll, Status} from "@cucumber/cucumber";
import { chromium, Page, Browser, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../env/env";


let browser:Browser
let context:BrowserContext

BeforeAll(async function() {
    getEnv()
    browser = await invokeBrowser()
})

Before( async function () {
    context = await browser.newContext();
    const page = await browser.newPage();
    pageFixture.page = page 

})
After( async function({pickle, result}) {
    console.log(result?.status)

    if(result?.status == Status.FAILED){
    const img = await pageFixture.page.screenshot({path:`./test-results/screenshots/${pickle.name}.png`, type:'png'})

    await this.attach(img, "img/png")
    }

    await pageFixture.page.close()
    await context.close()
})

AfterAll(async function(){
    await browser.close()
})