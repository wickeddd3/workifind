import { test, Page, Locator, expect } from "@playwright/test";
import { BasePage } from "@/tests/e2e/base/BasePage";

export class JobsPage extends BasePage {
  readonly pageLocator: Locator;

  constructor(page: Page) {
    super(page);

    this.pageLocator = page.getByTestId("jobs-page");
  }

  async goTo() {
    await test.step("Go to jobs page", async () => {
      await this.page.goto("/jobs");
      await expect(this.pageLocator, "Jobs page is loaded").toBeVisible();
    });
  }
}
