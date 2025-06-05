import { test as base, expect } from "@playwright/test";
import { DashboardPage, User } from "./poms/dashboard";

export type TestOptions = {
  dashboardPage: DashboardPage;
  user: User;
};

export const test = base.extend<TestOptions>({
  dashboardPage: async ({ page, user }, use) => {
    const dashboard = new DashboardPage(page, user);
    console.log("POM");
    await use(dashboard);
  },

  page: async ({ page }, use) => {
    const errors: Array<Error> = [];

    // listen to exceptions during the test sessions
    page.on("pageerror", (error) => {
      errors.push(error);
    });

    console.log("page");
    await use(page);

    expect(errors).toHaveLength(0);
  },

  user: [
    {
      email: "your@email.com",
      password: "your-password",
    },
    { option: true },
  ],
});

export { expect } from "@playwright/test";
