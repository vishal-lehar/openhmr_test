import { test } from '@playwright/test';
import { LoginPage } from '../utils/pages/loginPage';
import { CsvUploadPage } from '../utils/pages/csvUploadPage';
import * as path from 'path';
import { executeQuery } from '../utils/dbHelper';

test.describe.configure({ mode: 'serial' });
test.describe('User Story 2: Clerk CSV Upload Functionality', () => {
    let loginPage: LoginPage;
    let csvUploadPage: CsvUploadPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        csvUploadPage = new CsvUploadPage(page);

        // Login setup
        await loginPage.navigate();
        await loginPage.login('clerk', 'clerk');
        await loginPage.verifySuccessfulLogin();
    });

    test('AC1,2&3: should successfully upload CSV file to create multiple heroes', async () => {
        test.slow();
        const csvFilePath = path.join(__dirname, '../utils/testHero.csv');
        
        await csvUploadPage.navigateToUpload();
        await csvUploadPage.uploadFile(csvFilePath);
        await csvUploadPage.verifySuccessfulUpload();
    });

    test('AC4: should show error message for invalid CSV format', async () => {
        test.slow();
        const invalidCsvPath = path.join(__dirname, '../utils/invalidtestHero.csv');
        
        await csvUploadPage.navigateToUpload();
        await csvUploadPage.uploadFile(invalidCsvPath);
        await csvUploadPage.verifyErrorMessage('Unable to create hero!');
    });

    test('AC4: should prevent upload of non-CSV files', async () => {
        test.slow();
        const nonCsvPath = path.join(__dirname, '../utils/invalidtestherofile.pdf');
        
        await csvUploadPage.navigateToUpload();
        await csvUploadPage.uploadFile(nonCsvPath);
        await csvUploadPage.verifyErrorMessage('Unable to create hero!');
    });

    test.afterAll(async () => {   
        try {
            await executeQuery('DELETE FROM working_class_heroes WHERE natid LIKE ?', ['%natid-2%']);
            console.log('Successfully cleaned up test data');
        } catch (error) {
            console.error('Failed to clean up test data:', error);
        }
    });
});
