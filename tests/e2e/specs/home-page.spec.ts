import { test } from "@playwright/test";
import { HomePage } from "@/tests/e2e/pages/home-page/HomePage";

test.describe("Home page", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("should search for jobs and navigate to the jobs page", async () => {
    const { homeJobFilter } = homePage;

    await homeJobFilter.checkIfVisible();
    await homeJobFilter.searchJobs({
      keywords: "developer",
      locationType: "Remote",
      jobType: "Full-time",
      jobSalary: "80000",
    });
  });
});
