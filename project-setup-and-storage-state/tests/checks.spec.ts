import { expect, test } from "@playwright/test"

test("has table", async ({ page }) => {
  await page.goto("https://app.checklyhq.com/")
  await expect(page.getByTestId("home-dashboard-table")).toBeVisible()
})
