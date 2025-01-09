import { Page, expect } from '@playwright/test';

export class TaxReliefPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private readonly generateButton = '#tax_relief_btn';
    private readonly successMessage = '[data-testid="success-message"]';
    private readonly errorMessage = '[data-testid="error-message"]';
    private readonly downloadProgress = '#tax_relief_status_id';

    async clickGenerateButton() {
        await this.page.click(this.generateButton);
    }

    async verifySuccessMessage() {
        await expect(this.page.locator(this.successMessage)).toBeVisible();
        await expect(this.page.locator(this.successMessage)).toHaveText('Tax relief file generated successfully');
    }

    async verifyErrorMessage(message: string) {
        await expect(this.page.locator(this.errorMessage)).toBeVisible();
        await expect(this.page.locator(this.errorMessage)).toContainText(message);
    }

    async verifyFileDownload(downloadPromise: Promise<any>) {
        const download = await downloadPromise;
        expect(download.suggestedFilename()).toBe('tax_relief_file.txt');
        
        // Verify file is not empty
        const fileContent = await download.readAsString();
        expect(fileContent.length).toBeGreaterThan(0);
        
        // Optional: Verify file format/content structure
        expect(fileContent).toMatch(/^[\w\s,.-]+$/); // Basic content format check
    }
}