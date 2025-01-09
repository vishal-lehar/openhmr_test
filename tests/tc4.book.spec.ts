import { test } from '@playwright/test';
import { LoginPage } from '../utils/pages/loginPage';
import { TaxReliefPage } from '../utils/pages/taxReliefPage';
import * as path from 'path';

test.describe.configure({ mode: 'serial' });
test.describe('User Story 3:Book Keeper Download Functionality', () => {
    let loginPage: LoginPage;
    let TaxReliefPage: TaxReliefPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        TaxReliefPage = new TaxReliefPage(page);

        // Login setup
        await loginPage.navigate();
        await loginPage.login('bk', 'bk');
        await loginPage.verifybkSuccessfulLogin();
    });

    test('AC1: should successfully generate tax relief file', async () => {
        test.slow();

        await TaxReliefPage.clickGenerateButton();
        await TaxReliefPage.verifyFileDownload();
    });


});