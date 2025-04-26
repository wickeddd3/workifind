import { test, Page, Locator, expect } from "@playwright/test";
import { BasePage } from "@/tests/e2e/base/BasePage";
import { HomeJobFilterComponent } from "@/tests/e2e/pages/home-page/components/HomeJobFilter";

export class HomePage extends BasePage {
  readonly pageLocator: Locator;

  readonly homeJobFilter: HomeJobFilterComponent;

  constructor(page: Page) {
    super(page);

    this.pageLocator = page.getByTestId("home-page");

    this.homeJobFilter = new HomeJobFilterComponent(page);
  }

  async goto() {
    await test.step("Go to home page", async () => {
      await this.page.goto("/");
      await expect(this.pageLocator, "Home page is loaded").toBeVisible();
    });
  }
}
