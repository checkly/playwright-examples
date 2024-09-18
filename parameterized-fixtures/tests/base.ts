import { test as base } from "@playwright/test"
import { DashboardPage, User } from "./poms/dashboard"

export type TestOptions = {
  user: User
  dashboardPage: DashboardPage
}

export const test = base.extend<TestOptions>({
  user: [
    // this is the default user if not specified otherwise
    // in playwright.config or the test itself
    { email: "stefan@checklyhq.com", password: "..." },
    { option: true },
  ],

  dashboardPage: async ({ page, user }, use) => {
    const dashboardPage = new DashboardPage(page, user)
    await dashboardPage.login()
    await use(dashboardPage)
  },
})

export { expect } from "@playwright/test"
