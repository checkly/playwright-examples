import { Locator, Page, expect } from "@playwright/test"

export type User = {
  email: string
  password: string
}

export class DashboardPage {
  readonly page: Page
  readonly user: User
  readonly $email: Locator
  readonly $password: Locator
  readonly $login: Locator
  readonly $homeDashboard: Locator

  constructor(page: Page, user: User) {
    this.user = user
    this.page = page
    this.$email = page.getByPlaceholder("yours@example.com")
    this.$password = page.getByPlaceholder("your password")
    this.$login = page.getByLabel("Log In")
    this.$homeDashboard = this.page.getByTestId("home-dashboard-table")
  }

  public async login() {
    // set you login URL
    await this.page.goto("...")
    await this.$email.fill(this.user.email)
    await this.$password.fill(this.user.password)
    await this.$login.click()
    await expect(this.$homeDashboard).toBeVisible()
  }

  public async createCheck() {
    await this.page.getByRole("button", { name: "Create new entity" }).click()
    await expect(
      this.page.getByRole("heading", { name: "Create from scratch" })
    ).toBeVisible()
  }
}
