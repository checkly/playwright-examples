import { test as base } from "@playwright/test"

export const test = base.extend<{ exceptionLogger: void; timeLogger: void }>({
  timeLogger: [
    async ({}, use) => {
      // before test
      // ...
      test.info().attach("Start time", { body: `${new Date().toISOString()}` })

      // kick off test
      await use()

      // after test
      // ...
      test.info().attach("End time", { body: `${new Date().toISOString()}` })
    },
    { auto: true },
  ],
  exceptionLogger: [
    async ({ page }, use) => {
      // before test
      // ...
      const exceptions: Error[] = []
      page.on("pageerror", (exception) => {
        exceptions.push(exception)
      })

      // kick off test
      await use()

      // after test
      // ...
      if (exceptions.length > 0) {
        await test.info().attach("frontend-exceptions", {
          body: exceptions
            .map((error) => `${error.message}\n${error.stack}`)
            .join("\n-----\n"),
        })
        throw new Error("Frontend exceptions occurred (check attachments)")
      }
    },
    { auto: true },
  ],
})

export { expect } from "@playwright/test"
