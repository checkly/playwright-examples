import { type Locator, type Page } from "@playwright/test"
import { step } from "../base"

export class PlaywrightPage {
  public name = "Playwright Page POM"
  readonly page: Page
  readonly searchBtn: Locator
  readonly searchInput: Locator

  constructor(page: Page, name = "Playwright Page POM") {
    this.name = name
    this.page = page
    this.searchBtn = page.getByLabel("Search")
    this.searchInput = page.getByPlaceholder("Search docs")
  }

  async goto() {
    await this.page.goto("https://playwright.dev")
  }

  @step()
  async search() {
    await this.searchBtn.click()
    await this.searchInput.fill("getting started")
    await this.page.getByRole("link", { name: "Writing tests" }).click()
    await this.page.getByRole("heading", { name: "Writing tests" }).click()
  }
}
