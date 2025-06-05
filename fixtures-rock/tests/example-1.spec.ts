import { test } from "./base";

test.use({
  user: {
    email: "test@email.com",
    password: "...",
  },
});

test("clear dependency and config management", async ({
  dashboardPage,
}) => {
  await dashboardPage.goto();
  await dashboardPage.login();
});

test("clear dependency and config management - part 2", async ({
  dashboardPage,
}) => {
  await dashboardPage.goto();
  await dashboardPage.createCheck();
});
