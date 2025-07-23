import { test } from "./base";

test("checkly community", async ({ page }) => {
  await page.goto("https://www.checklyhq.com/");
  await page.getByRole("button", { name: "Resources" }).first().click();
  await page.getByRole("link", { name: "Community Slack" }).click();
  await page
    .locator("section")
    .filter({ hasText: "Join the Checkly" })
    .getByRole("link")
    .click();
});

test("broken resource", async ({ page }) => {
  await page.goto("https://danube-web.shop/");
});
