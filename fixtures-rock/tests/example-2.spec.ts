import { expect, test } from "./base";

test("fixtues allow to create setup / teardowns", async ({ page }) => {
  const errors: Array<Error> = [];

  // listen to exceptions during the test sessions
  page.on("pageerror", (error) => {
    errors.push(error);
  });

  // test code
  // ...
  await page.goto("https://checklyhq.com");

  // assert that there haven’t been any errors
  expect(errors).toHaveLength(0);
});
