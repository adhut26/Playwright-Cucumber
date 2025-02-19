import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import {  expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)
When("user search for a {string}", async function (book) {

    await pageFixture.page.locator("input[type='search']").type(book)
    await pageFixture.page.waitForTimeout(20000);
    await pageFixture.page.locator("mat-option[role='option'] span").click();
});

When("user add the book to the cart", async function () {
    await pageFixture.page.locator("(//button[@color='primary'])[2]").click();

});

Then("the cart badge should get updated", async function () {
    const badgeCount = await pageFixture.page.locator("(//span[@class='mat-mdc-button-touch-target'])[3]").textContent();
    expect(Number(badgeCount)).toBeGreaterThan(0);
});
