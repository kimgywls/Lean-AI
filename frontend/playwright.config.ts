import { defineConfig } from "@playwright/test";
import * as dotenv from "dotenv";

// 반드시 환경 변수 로드
dotenv.config();

export default defineConfig({
    testDir: "./src/tests",
    timeout: 30000,
    webServer: {
        command: "npm run dev",
        port: 3001,
        timeout: 180 * 1000,
        reuseExistingServer: !process.env.CI,
    },
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        baseURL: process.env.FRONTEND_URL || "http://localhost:3001", // 명시적으로 설정
    },
});
