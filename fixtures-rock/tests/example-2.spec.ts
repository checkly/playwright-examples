import { test } from "./base";

test.use({ user: { email: "test@email.com", password: "..." } });

test("fixtures offer clean dependency and config management - part 1", async ({
  dashboardPage,
}) => {
  await dashboardPage.goto();
  await dashboardPage.login();
});

test("fixtures offer clean dependency and config management - part 2", async ({
  dashboardPage,
}) => {
  await dashboardPage.goto();
  await dashboardPage.createCheck();
});
