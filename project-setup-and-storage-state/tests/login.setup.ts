import { expect, test as setup } from "@playwright/test"

const authFile = ".auth/user.json"

setup("authenticate", async ({ page }) => {
  await page.goto("https://app.checklyhq.com")
  await page.getByPlaceholder("yours@example.com").fill(process.env.USER)
  await page.getByPlaceholder("your password").fill(process.env.PW)
  await page.getByLabel("Log In").click()
  await expect(page.getByLabel("Home")).toBeVisible()
  await page.context().storageState({ path: authFile })
})
