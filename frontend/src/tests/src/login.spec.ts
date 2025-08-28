import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { getConfig } from "../config";

const config = getConfig();
const adminId = config.getAdminName();
const adminPassword = config.getAdminAccessCode();

let loginPage: LoginPage;

test.describe("관리자 로그인 페이지", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("로그인 성공 시 대시보드 이동", async ({ page }) => {
    await loginPage.login(adminId, adminPassword);
    await expect(page).toHaveURL(/\/admin\/newsletter/);
    await expect(page.getByTestId("newsletter-page")).toBeVisible(); 
  });

  test("잘못된 로그인 시 에러 메시지 노출", async () => {
    await loginPage.login("wronguser", "wrongpass");
    await loginPage.expectLoginError();
  });

  test("비밀번호 보기 토글", async ({ page }) => {
    const pwInput = page.locator("#password");
    await expect(pwInput).toHaveAttribute("type", "password");

    await loginPage.toggleShowPassword();
    await expect(pwInput).toHaveAttribute("type", "text");
  });

  test("로그인 정보 기억하기 토글", async () => {
    await expect(loginPage.rememberToggle.locator("svg")).toHaveClass(/lucide-square/);
    await loginPage.toggleRememberMe();
    await expect(loginPage.rememberToggle.locator("svg")).toHaveClass(/lucide-square-check-big/);
  });
});
