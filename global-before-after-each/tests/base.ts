import { test as base } from "@playwright/test";

export const test = base.extend<{
  exceptionLogger: void;
  timeLogger: void;
}>({
  page: async ({ page }, use) => {
    await use(page);
  },
  timeLogger: [
    async ({}, use) => {
      // before test
      test.info().annotations.push({
        type: "Start",
        description: new Date().toISOString(),
      });

      await use();

      // after test
      test.info().annotations.push({
        type: "End",
        description: new Date().toISOString(),
      });
    },
    { auto: true },
  ],
  exceptionLogger: [
    async ({ page }, use) => {
      // before test
      const errors: Error[] = [];
      page.on("pageerror", (error) => errors.push(error));

      await use();

      // after test
      if (errors.length > 0) {
        await test.info().attach("frontend-exceptions", {
          body: errors
            .map((error) => `${error.message}\n${error.stack}`)
            .join("\n-----\n"),
        });

        throw new Error("Something went wrong in JS land");
      }
    },
    { auto: true },
  ],
});

export { expect } from "@playwright/test";
