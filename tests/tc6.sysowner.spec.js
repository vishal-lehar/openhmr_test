import { test, expect } from "@playwright/test";
import { baseURL } from "../utils/testData";

test.describe('User Story 5: Hero Money Owed API Tests', () => {
    const apiURL = `${baseURL}`+'/api/v1/hero/owe-money?';

    test('AC1: should return correct response for hero who owes money', async ({ request }) => {
        const response = await request.get(`${apiURL}`+'natid=11');

        const responseBody = await response.json();
        // console.log(">>>>>>>>>  "+JSON.stringify(responseBody));

        // Verify response
        expect(response.status()).toBe(200);
        
        expect(responseBody).toHaveProperty('data', 'natid-11');
        expect(responseBody).toHaveProperty('status', 'Mr. Ram Lal');
    });

    test('AC2: Validate url accepts only number', async ({ request }) => {
        const response = await request.get(`${apiURL}`+'natid=abc');

        const responseBody = await response.json();
        // console.log(">>>>>>>>>  "+JSON.stringify(responseBody));

        // Verify response
        expect(response.status()).toBe(500);
        expect(response.ok()).toBeFalsy();
    });


});