import { expect, test } from "@playwright/test"

test("home dashboard loads", async ({ page }) => {
  await page.goto("https://app.checklyhq.com")
  await expect(page.getByTestId("home-dashboard-table")).toBeVisible()
  // more test instructions
  // ...
})
