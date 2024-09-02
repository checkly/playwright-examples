import { test } from "./base"

test("base features work", async ({ playwrightPage }) => {
  await playwrightPage.goto()
  await playwrightPage.search("getting started")
  await playwrightPage.openGitHub()
  await playwrightPage.toggleDarkMode()
})
