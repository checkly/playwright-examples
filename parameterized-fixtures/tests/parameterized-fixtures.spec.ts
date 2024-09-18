import { test } from "./base"

// override the default user
test.use({ user: { email: "hello@checklyhq.com", password: "" } })

test("create check", async ({ dashboardPage }) => {
  await dashboardPage.createCheck()
})
