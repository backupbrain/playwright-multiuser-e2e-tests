import { test, expect, chromium } from "@playwright/test";

const waitFor = async (seconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};

test("Non-browsur tests", async () => {
  expect(1 + 1).toBe(2);
});

test.describe("Browser tests", () => {
  test("Single log in", async ({ page }) => {
    await page.goto("http://localhost:19006/");
    await page.locator("input").nth(0).fill("user1");
    await page.locator("input").nth(1).fill("pass");
    const button = page.locator('//div[@role="button"]/div');
    await button.click();
    await waitFor(1);
    const title = await page.title();
    expect(title).toBe("Authorized");
  });

  test("Logins from two browsers", async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    await page1.goto("http://localhost:19006/");
    await page1.locator("input").nth(0).fill("user1");
    await page1.locator("input").nth(1).fill("pass");
    await page1.locator('//div[@role="button"]/div').click();
    await waitFor(1);

    await page2.goto("http://localhost:19006/");
    await page2.locator("input").nth(0).fill("user2");
    await page2.locator("input").nth(1).fill("pass");
    await page2.locator('//div[@role="button"]/div').click();
    await waitFor(1);

    // wait for ui updates to settle
    await waitFor(2);

    const page1user1 = await page1.innerHTML(
      "//div[1]/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[4]/div/div[1]/div/div"
    );
    const page1user2 = await page1.innerHTML(
      "//div[1]/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[4]/div/div[2]/div/div"
    );
    expect(page1user1).toContain("user1");
    expect(page1user2).toContain("user2");

    const page2user1 = await page1.innerHTML(
      "//div[1]/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[4]/div/div[1]/div/div"
    );
    const page2user2 = await page1.innerHTML(
      "//div[1]/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[4]/div/div[2]/div/div"
    );
    expect(page2user1).toContain("user1");
    expect(page2user2).toContain("user2");
  });
});

// //div[1]/div/div/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div/div/div[1]/div/div[4]
