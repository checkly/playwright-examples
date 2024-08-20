import { expect, type Locator, type Page } from "@playwright/test"
import { step } from "../base"

export class PlaywrightPage {
  public name = "Playwright Page POM"
  readonly page: Page
  readonly getStartedLink: Locator
  readonly gettingStartedHeader: Locator
  readonly pomLink: Locator
  readonly tocList: Locator

  constructor(page: Page, name = "Playwright Page POM") {
    this.name = name
    this.page = page
    this.getStartedLink = page.locator("a", { hasText: "Get started" })
    this.gettingStartedHeader = page.locator("h1", { hasText: "Installation" })
    this.pomLink = page
      .locator("li", {
        hasText: "Guides",
      })
      .locator("a", {
        hasText: "Page Object Model",
      })
    this.tocList = page.locator("article div.markdown ul > li > a")
  }

  async goto() {
    await this.page.goto("https://playwright.dev")
  }

  @step("Search something")
  async getStarted() {
    await this.getStartedLink.first().click()
    await expect(this.gettingStartedHeader).toBeVisible()
  }
}
