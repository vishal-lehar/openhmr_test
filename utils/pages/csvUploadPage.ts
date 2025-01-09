import { Page, expect } from '@playwright/test';

export class CsvUploadPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Selectors
    private readonly uploadMenu = '[id="dropdownMenuButton2"]';
    private readonly uploadButton = '.dropdown-item[href="/clerk/upload-csv"]';
    private readonly fileInput = '#upload-csv-file';
    private readonly createButton = "body > div.container > div.p-2.row.text-start.align-items-xl > div:nth-child(3) > button";
    private readonly uploadStatus = '#notification-block > div > h3';
    private readonly errorMessage = '#notification-block > div > h3';
    private readonly uploadLoading = '[data-testid="upload-loading"]';
    private readonly heroesList = '[data-testid="heroes-list"]';

    // Actions
    async navigateToUpload() {
        await this.page.click(this.uploadMenu);
        await this.page.click(this.uploadButton);
    }

    async uploadFile(filePath: string) {
        const fileInput = await this.page.locator(this.fileInput);
        await fileInput.setInputFiles(filePath);
        await this.page.click(this.createButton);
    }

    async verifySuccessfulUpload() {
        await expect(this.page.locator(this.uploadStatus)).toBeVisible();
        await expect(this.page.locator(this.uploadStatus)).toHaveText('Created Successfully!');
    }

    async verifyErrorMessage(message: string) {
        await expect(this.page.locator(this.errorMessage)).toBeVisible();
        await expect(this.page.locator(this.errorMessage)).toContainText(message);
    }

    async verifyLoadingState() {
        await expect(this.page.locator(this.uploadLoading)).toBeVisible();
    }
}