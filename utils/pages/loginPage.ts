import { Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Selectors
    private readonly usernameInput = '[id="username-in"]';
    private readonly passwordInput = '[id="password-in"]';
    private readonly loginButton = '//input[@type="submit"]';
    private readonly clerkDashboard = 'div[class="col-md"] h1';
    private readonly bkDashboard = 'body > div.row.justify-content-md-center > div.col-md > h1'

    // Actions
    async navigate() {
        await this.page.goto('http://localhost:9997/login');
    }

    async login(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async verifySuccessfulLogin() {
        await expect(this.page.locator(this.clerkDashboard)).toBeVisible();
        await expect(this.page.locator(this.clerkDashboard)).toHaveText('Clerk Dashboard');
    }

    async verifybkSuccessfulLogin() {
        await expect(this.page.locator(this.bkDashboard)).toBeVisible();
        await expect(this.page.locator(this.bkDashboard)).toHaveText('Book Keeper Dashboard');
    }
}