import { expect, type Locator, type Page } from "@playwright/test"
import { step } from "../base"

export class PlaywrightPage {
  public name = "Playwright Page POM"
  readonly page: Page
  readonly searchBtn: Locator
  readonly searchInput: Locator
  readonly gitHubLink: Locator
  readonly themeSwitch: Locator

  constructor(page: Page, name = "Playwright Page POM") {
    this.name = name
    this.page = page
    this.searchBtn = page.getByLabel("Search")
    this.searchInput = page.getByPlaceholder("Search docs")
    this.gitHubLink = page.getByLabel("GitHub repository")
    this.themeSwitch = page.getByLabel("Switch between dark and light")
  }

  async goto() {
    await this.page.goto("https://playwright.dev")
  }

  @step('Search for "Writing tests"')
  async search() {
    await this.searchBtn.click()
    await this.searchInput.fill("getting started")
    await this.page.getByRole("link", { name: "Writing tests" }).click()
    await this.page.getByRole("heading", { name: "Writing tests" }).click()
  }

  @step("Check GitHub link")
  async openGitHub() {
    const gitHubPromise = this.page.waitForEvent("popup")
    await this.gitHubLink.click()
    const gitHubPage = await gitHubPromise
    await expect(gitHubPage).toHaveURL(/github.com/)
  }

  @step("Toggle dark mode")
  async toggleDarkMode() {
    await this.themeSwitch.click()
    await expect(this.page).toHaveScreenshot("dark-mode.png")
    await this.themeSwitch.click()
    await expect(this.page).toHaveScreenshot("light-mode.png")
  }
}
