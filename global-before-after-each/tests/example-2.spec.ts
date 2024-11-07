import { expect, test } from "./base"

test("example page loads", async ({ page }) => {
  await page.goto(
    `data:text/html,
      <h1>Hello World</h1>
      <script>throw new Error("Boooooh!")</script>
      <script>throw new Error("Boooooh again!")</script>`
  )
  await expect(page.getByRole("heading", { name: "Hello World" })).toBeVisible()
})
