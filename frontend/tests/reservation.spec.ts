import { test, expect } from "@playwright/test";

test("editReservationTime", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("heading", { name: "Jul 14 - Jul 20," }).isVisible();
  await page.getByRole("button", { name: "Previous Week" }).click();
  await page.getByText("Backup Verification").click();
  await page.getByText("Sunday, 13. July09:00 - 10:00").isVisible();
  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByRole("textbox").nth(3).click();
  await page.getByRole("textbox").nth(3).fill("10:30");
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByText("Backup Verification09:00 - 10:30").click();
  await page.getByText("Sunday, 13. July09:00 - 10:30").isVisible();
  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByRole("textbox").nth(3).click();
  await page.getByRole("textbox").nth(3).fill("10:00");
  await page.getByRole("button", { name: "Save" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Backup Verification09:00 - 10:00$/ })
    .locator("div")
    .isVisible();
});
