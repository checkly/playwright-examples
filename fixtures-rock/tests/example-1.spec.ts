import { test } from "./base";

test("fixtures are easy to use", async ({ page }) => {
  await page.goto("https://checklyhq.com");
});
