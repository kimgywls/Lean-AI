class Config {
    private backendUrl: string;
    private frontendUrl: string;
    private adminName: string;
    private adminAccessCode: string;

    constructor({
        backendUrl,
        frontendUrl,
        adminName,
        adminAccessCode,
    }: {
        backendUrl: string;
        frontendUrl: string;
        adminName?: string;
        adminAccessCode?: string;
    }) {
        if (!backendUrl) {
            throw new Error("BACKEND_URL required");
        }

        if (!frontendUrl) {
            throw new Error("FRONTEND_URL required");
        }


        this.backendUrl = backendUrl;
        this.frontendUrl = frontendUrl;
        this.adminName = adminName ?? "admin_hjkim";
        this.adminAccessCode = adminAccessCode ?? "qwerqwer@@";
    }

    public getBackendUrl(): string {
        return this.backendUrl;
    }

    public getFrontendUrl() {
        return this.frontendUrl;
    }

    public getAdminName() {
        return this.adminName;
    }

    public getAdminAccessCode() {
        return this.adminAccessCode;
    }

}

let config: Config;

export function getConfig(): Config {
    if (!config) {
        config = new Config({
            backendUrl: process.env.BACKEND_URL ?? "http://localhost:8004",
            frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:3001",
            adminName: process.env.ADMIN_NAME,
            adminAccessCode: process.env.ADMIN_ACCESS_CODE,
        });
    }

    return config;
}
