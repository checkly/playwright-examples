import test, { expect } from "@playwright/test"

const TIMEZONES = [
  {
    name: "Berlin, Germany",
    timezoneId: "Europe/Berlin",
    expectedTime: "Friday, October 25, 2024 at 4:00 PM",
  },
  {
    name: "NYC, USA",
    timezoneId: "America/New_York",
    expectedTime: "Friday, October 25, 2024 at 10:00 AM",
  },
  {
    name: "Sydney, Australia",
    timezoneId: "Australia/Sydney",
    expectedTime: "Saturday, October 26, 2024 at 1:00 AM",
  },
]

TIMEZONES.forEach(({ name, timezoneId, expectedTime }) => {
  test.describe(`Test from ${name}`, () => {
    test.use({
      timezoneId: timezoneId,
    })

    test(`Event time is correct`, async ({ page }) => {
      await page.goto("/timezone.html")
      await expect(page.getByRole("heading")).toHaveText(expectedTime)
    })
  })
})
