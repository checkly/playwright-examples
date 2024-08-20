import { test } from "./base"

test("simple search works", async ({ playwrightPage }) => {
  await playwrightPage.search()
})
