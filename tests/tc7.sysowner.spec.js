import { test, expect } from "@playwright/test";
import { baseURL, createValidVoucherPayload } from "../utils/testData";

test.describe('User Story 6: Voucher category and number API Tests', () => {
    const payLoad = createValidVoucherPayload()

    test('should return number of vouchers each customer has for each voucher category', async ({ request }) => {
        await request.post(`${baseURL}`+'/api/v1/hero/vouchers', {
            data: payLoad
        });
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