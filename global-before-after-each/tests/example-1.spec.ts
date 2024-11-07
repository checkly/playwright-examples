import { expect, test } from "./base"

test("example page loads", async ({ page }) => {
  await page.goto(`data:text/html,<h1>Hello world!</h1>`)
  await expect(page.getByRole("heading", { name: "Hello World" })).toBeVisible()
})
