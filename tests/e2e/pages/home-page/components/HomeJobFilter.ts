import { test, Page, Locator, expect } from "@playwright/test";
import { BaseComponent } from "@/tests/e2e/base/BaseComponent";

export class HomeJobFilterComponent extends BaseComponent {
  private readonly pageLocator: Locator;
  private readonly searchForm: {
    jobTypeSelect: Locator;
    jobSalarySelect: Locator;
    locationTypeSelect: Locator;
    keywordsInput: Locator;
    searchButton: Locator;
  };

  constructor(page: Page) {
    super(page);

    this.pageLocator = page.getByTestId("home-job-filter");

    this.searchForm = {
      jobTypeSelect: this.pageLocator.getByTestId("job-type-select"),
      jobSalarySelect: this.pageLocator.getByTestId("job-salary-select"),
      locationTypeSelect: this.pageLocator.getByTestId("location-type-select"),
      keywordsInput: this.pageLocator.getByTestId("keywords-input"),
      searchButton: this.pageLocator.getByTestId("search-button"),
    };
  }

  async checkIfVisible(): Promise<void> {
    await test.step("Check if home job filter is visible", async () => {
      await expect(
        this.pageLocator,
        "Home job filter is visible",
      ).toBeVisible();
    });
  }

  async fillSearchForm(values: {
    jobType?: string;
    jobSalary?: string;
    locationType?: string;
    keywords?: string;
  }): Promise<void> {
    await test.step("Fill search form", async () => {
      const { jobType, jobSalary, locationType, keywords } = values;

      if (jobType) {
        await this.searchForm.jobTypeSelect.selectOption(jobType);
      }
      if (jobSalary) {
        await this.searchForm.jobSalarySelect.selectOption(jobSalary);
      }
      if (locationType) {
        await this.searchForm.locationTypeSelect.selectOption(locationType);
      }
      if (keywords) {
        await this.searchForm.keywordsInput.fill(keywords);
      }
    });
  }

  async clickSearchButton(): Promise<void> {
    await test.step("Click search button", async () => {
      await this.searchForm.searchButton.click();
    });
  }

  async checkIfRedirectedToJobsPage(searchQuery: {
    jobType?: string;
    jobSalary?: string;
    locationType?: string;
    keywords?: string;
  }): Promise<void> {
    await test.step("Check if redirected to jobs page with correct query parameters", async () => {
      await this.page.waitForLoadState("domcontentloaded");

      const params = new URLSearchParams();

      if (searchQuery.keywords) params.set("q", searchQuery.keywords);
      if (searchQuery.jobType)
        params.set("employmentType", searchQuery.jobType);
      if (searchQuery.jobSalary) params.set("salary", searchQuery.jobSalary);
      if (searchQuery.locationType)
        params.set("locationType", searchQuery.locationType);

      const expectedQuery = params.toString();

      await expect(
        this.page,
        "Should redirect to jobs page with correct query",
      ).toHaveURL(new RegExp(`/jobs\\?${expectedQuery}`));
    });
  }

  async searchJobs(searchQuery: {
    jobType?: string;
    jobSalary?: string;
    locationType?: string;
    keywords?: string;
  }): Promise<void> {
    await test.step("Search jobs", async () => {
      await this.fillSearchForm(searchQuery);
      await this.clickSearchButton();
      await this.checkIfRedirectedToJobsPage(searchQuery);
    });
  }
}
