import { expect, test as setup } from "@playwright/test"

const AUTH_FILE = ".auth/user.json"

setup("authenticate", async ({ page }) => {
  await page.goto("https://app.checklyhq.com")
  await page
    .getByPlaceholder("yours@example.com")
    .fill(process.env.USER as string)
  await page.getByPlaceholder("your password").fill(process.env.PW as string)
  await page.getByLabel("Log In").click()
  await expect(page.getByLabel("Home")).toBeVisible()
  await page.context().storageState({ path: AUTH_FILE })
})
