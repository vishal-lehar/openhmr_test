import { test, expect } from "@playwright/test";
import { baseURL, createValidVoucherPayload } from "../utils/testData";
import { executeQuery } from '../utils/dbHelper';

test.describe('User Story 4: API Tests', () => {
    const payLoad = createValidVoucherPayload()
    // console.log(payLoad);

    test("AC1 & 4: Create entry for voucher using test data.", async({request}) => {
        const response = await request.post(`${baseURL}`+'/api/v1/hero/vouchers', {
            data: payLoad
        });

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        // console.log(">>>>>>>>>  "+JSON.stringify(response.json()));
        // AC4 to validate created vouchers entries matches to the provided entries.
        try {
            const dbVoucher = await executeQuery('SELECT t1.name as heroName, t2.name as voucherName FROM working_class_heroes t1 JOIN vouchers t2 ON t1.id = t2.working_class_hero_id WHERE natid = ?', [payLoad.natid]);
            // console.log(dbVoucher);
            expect(dbVoucher[0].heroName).toBe(payLoad.name);
            expect(dbVoucher[0].voucherName).toBe(payLoad.vouchers[0].voucherName);
            console.log('DB Hero Vouchers Records matches Successfully');
        } catch (error) {
            console.error('Failed to match DB Vouchers Records:', error);
        }
    });

    test("AC3:Test with null or empty vouchers", async({request}) => {
        const invalidPayload = [{
            ...createValidVoucherPayload(),
            vouchers:null
            },
            {
            ...createValidVoucherPayload(),
            vouchers:[]
            },
        ]

        for (const payload of invalidPayload) {
            const response = await request.post(`${baseURL}`+'/api/v1/hero/vouchers', {
                data: payload
            });

            expect(response.status()).toBe(400);
            expect(response.ok()).toBeFalsy();
            // console.log(">>>>>>>>>  "+JSON.stringify(response.json()));
        }
    });


    test.afterAll(async () => {   
        try {
            await executeQuery('DELETE FROM vouchers');
            await executeQuery('DELETE FROM working_class_heroes WHERE natid = ?', [payLoad.natid]);
            console.log('Successfully cleaned up test data');
        } catch (error) {
            console.error('Failed to clean up test data:', error);
        }
    });
});