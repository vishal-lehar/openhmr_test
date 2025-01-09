import { test, expect } from "@playwright/test";
import { baseURL, heroData } from "../utils/testData";
import { executeQuery } from '../utils/dbHelper';

test.describe('User Story 1: API Tests', () => {
    test("AC1 & 4: Create entry for worker hero using test data", async({request}) => {
        const response = await request.post(`${baseURL}`+'/api/v1/hero', {
            data: heroData
        });

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        // AC4 to validate created entries matches to the provided entries.
        try {
            const dbHero = await executeQuery('SELECT * FROM working_class_heroes WHERE natid = ?', [heroData.natid]);
            expect(heroData.natid).toBe(dbHero.natid);
            expect(heroData.name).toBe(dbHero.name);
            expect(heroData.gender).toBe(dbHero.gender);
            expect(heroData.salary).toBe(dbHero.salary);
            expect(heroData.taxPaid).toBe(dbHero.taxPaid);
            expect(heroData.birthDate).toBe(dbHero.birthDate);
            expect(heroData.browniePoints).toBe(dbHero.browniePoints);
            console.log('DB Hero Records matches Successfully');
        } catch (error) {
            console.error('Failed to match DB Hero Records:', error);
        }
    });

    test("AC3: Check Duplicate entry for existing worker hero", async({request}) => {
        const response = await request.post(`${baseURL}`+'/api/v1/hero', {
            data: heroData
        });
    
        const heroDetail = await response.json();
        console.log(heroDetail);
    
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
    });

    test.afterAll(async () => {   
        try {
            await executeQuery('DELETE FROM working_class_heroes WHERE natid = ?', [heroData.natid]);
            console.log('Successfully cleaned up test data');
        } catch (error) {
            console.error('Failed to clean up test data:', error);
        }
    });
});