import { Page } from "@playwright/test";

export type User = {
  email: string;
  password: string;
};

export class DashboardPage {
  readonly page: Page;
  readonly user: User;

  constructor(page: Page, user: User) {
    this.user = user;
    this.page = page;
  }

  public async goto() {
    await this.page.goto("https://checklyhq.com");
  }

  public async login() {
    // ...
    console.log("login called with:", this.user);
  }

  public async createCheck() {
    // ...
    console.log("createCheck called");
  }
}
