import { expect, test } from "@playwright/test"

test("test with a type error", async ({ page }) => {
  await page.goto("https://playwright.dev/")

  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible()
})

test.skip("test with incorrect promise handling", async ({ page }) => {
  await page.goto("https://playwright.dev/")

  const button = await page.getByRole("link", { name: "Get started" })
  button.click()
})
