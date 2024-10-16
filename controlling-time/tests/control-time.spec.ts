import { expect, test } from "@playwright/test"

test("control time", async ({ page }) => {
  await page.clock.install()

  await page.goto("/")
  const button = page.getByRole("button", { name: "Start session" })
  await button.click()
  await expect(button).toBeDisabled()

  const timeDisplay = page.getByTestId("elapsed-time")

  await page.clock.fastForward(60_000)
  await expect(timeDisplay).toContainText(/3m 5\ds/)

  await page.clock.fastForward(240_000)
  await expect(timeDisplay).toBeHidden()
  await expect(button).not.toBeDisabled()
})
