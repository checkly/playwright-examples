import { test as base, expect, Page } from "@playwright/test";
import { DashboardPage, User } from "./poms/dashboard";

export type TestOptions = {
  page: Page;
  dashboardPage: DashboardPage;
  user: User;
  failOnJSError: boolean;
};

export const test = base.extend<TestOptions>({
  dashboardPage: async ({ page, user }, use) => {
    const dashboard = new DashboardPage(page, user);
    await use(dashboard);
  },

  user: [
    { email: "your@email.com", password: "your-password" },
    { option: true },
  ],

  failOnJSError: [true, { option: true }],

  page: async ({ page, failOnJSError }, use) => {
    const errors: Array<Error> = [];

    // listen to exceptions during the test sessions
    page.on("pageerror", (error) => {
      errors.push(error);
    });

    await use(page);

    if (failOnJSError) {
      expect(errors).toHaveLength(0);
    }
  },
});

export { expect } from "@playwright/test";
