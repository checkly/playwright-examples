import { test as base } from "@playwright/test"
import { PlaywrightPage } from "./poms/playwright-page"

export const test = base.extend<{ playwrightPage: PlaywrightPage }>({
  playwrightPage: async ({ page }, use) => {
    const todoPage = new PlaywrightPage(page, "koooo")
    await todoPage.goto()
    await use(todoPage)
  },
})

export { expect } from "@playwright/test"

export function step(stepName?: string) {
  return function decorator(
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    return function replacementMethod(...args: any) {
      const name = `${stepName || (context.name as string)} (${this.name})`
      return test.step(name, async () => {
        return await target.call(this, ...args)
      })
    }
  }
}
