import { test, expect } from "@playwright/test";
import { baseURL } from "../utils/testData";

test.describe('User Story 6: Voucher category and number API Tests', () => {
    test('should return number of vouchers each customer has for each voucher category', async ({ request }) => {
        const response = await request.get(`${baseURL}`+'/api/v1/voucher/by-person-and-type');

        const responseBody = await response.json();
        // console.log(">>>>>>>>>  "+JSON.stringify(responseBody));

        // Verify response
        expect(response.status()).toBe(200);
        expect(responseBody).not.toBe({});
        expect(responseBody.data[0].voucherType).toBe('TRAVEL');
        expect(responseBody.data[0].count).toBeGreaterThan(0);
    });
});