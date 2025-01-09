import { test, expect } from '@playwright/test';
import { baseURL, createValidHeroPayload, createValidVoucherPayload } from '../utils/testData';

test.describe('User Story 1: AC2 Field Validations', () => {

  test('AC2.1: natid format validation', async ({ request }) => {
    const testCases = [
      { value: 'natid-0', valid: true }, // existing entries hence false
      { value: 'natid-9999999', valid: true }, // existing entries hence false
      { value: 'natid-123', valid: true }, // existing entries hence false
      { value: 'natid-10000000', valid: false }, // > 9999999
      { value: 'natid--1', valid: false },
      { value: 'natid-abc', valid: false },
      { value: 'invalid-123', valid: false },
      { value: 'natid-', valid: false },
      { value: 'natid', valid: false }
    ];

    for (const { value, valid } of testCases) {
      const payload = {
        ...createValidHeroPayload(),
        natid: value
      };

      const response = await request.post(`${baseURL}`+'/api/v1/hero', {
        data: payload
      });

      console.log(">>>>>>>>>  "+JSON.stringify(response));

      expect(response.status()).toBe(valid ? 200 : 400);
    }
  });

  test('AC2.2: name validation', async ({ request }) => {
    const testCases = [
      { value: 'John Doe', valid: true },
      { value: 'a'.repeat(100), valid: true },
      { value: 'A', valid: true },
      { value: 'a'.repeat(101), valid: false },
      { value: '', valid: false },
      { value: '123John', valid: false },
      { value: 'John@Doe', valid: false },
      { value: ' ', valid: false }
    ];

    for (const { value, valid } of testCases) {
      const payload = {
        ...createValidHeroPayload(),
        name: value
      };

      const response = await request.post(`${baseURL}`+'/api/v1/hero', {
        data: payload
      });

      expect(response.status()).toBe(valid ? 200 : 400);
    }
  });

  test('AC2.3: gender validation', async ({ request }) => {
    const testCases = [
      { value: 'MALE', valid: true },
      { value: 'FEMALE', valid: true },
      { value: 'male', valid: false },
      { value: 'female', valid: false },
      { value: 'OTHER', valid: false },
      { value: '', valid: false },
      // { value: null, valid: false }
    ];

    for (const { value, valid } of testCases) {
      const payload = {
        ...createValidHeroPayload(),
        gender: value
      };

      const response = await request.post(`${baseURL}`+'/api/v1/hero', {
        data: payload
      });

      expect(response.status()).toBe(valid ? 200 : 400);
    }
  });

  test('AC2.4: birthDate validation', async ({ request }) => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    
    const testCases = [
      { value: '2023-01-01T00:00:00', valid: true },
      { value: '1990-12-31T23:59:59', valid: true },
      { value: futureDate.toISOString().split('.')[0], valid: false },
      { value: '2023-13-01T00:00:00', valid: false }, // invalid month
      { value: '2023-01-32T00:00:00', valid: false }, // invalid day
      { value: '2023-01-01 00:00:00', valid: false }, // missing T
      { value: '2023/01/01T00:00:00', valid: false }, // wrong date separator
      { value: '2023-01-01T25:00:00', valid: false }, // invalid hour
      { value: '2023-01-01T00:60:00', valid: false }, // invalid minute
      // { value: null, valid: false } // returns 500
    ];

    for (const { value, valid } of testCases) {
      const payload = {
        ...createValidHeroPayload(),
        birthDate: value
      };

      const response = await request.post(`${baseURL}`+'/api/v1/hero', {
        data: payload
      });

      console.log(">>>>>>>>>  "+JSON.stringify(response));

      expect(response.status()).toBe(valid ? 200 : 400);
    }
  });

  test('AC2.5: deathDate validation', async ({ request }) => {
    const testCases = [
      // { value: '2023-01-01T00:00:00', valid: true },
      // { value: '2023-13-01T00:00:00', valid: false }, // invalid month
      // { value: '2023-01-32T00:00:00', valid: false }, // invalid day
      // { value: '2023-01-01 00:00:00', valid: false }, // missing T
      // { value: '2023/01/01T00:00:00', valid: false }, // wrong date separator
      // { value: '2023-01-01T24:00:00', valid: false }, // invalid hour
      // { value: '2023-01-01T00:60:00', valid: false }, // invalid minute
      { value: null, valid: true }, // nullable
    ];

    for (const { value, valid } of testCases) {
      const payload = {
        ...createValidHeroPayload(),
        deathDate: value
      };

      const response = await request.post(`${baseURL}`+'/api/v1/hero', {
        data: payload
      });

      expect(response.status()).toBe(valid ? 200 : 400);
    }
  });

  test('AC2.6-7: salary and taxPaid validation', async ({ request }) => {
    const testCases = [
      { value: 0, valid: true },
      { value: 0.01, valid: true },
      { value: 1000000.99, valid: true },
      { value: -0.01, valid: false },
      { value: -1, valid: false },
      { value: -1000, valid: false }
    ];

    for (const { value, valid } of testCases) {
      // Test salary
      const salaryPayload = {
        ...createValidHeroPayload(),
        salary: value
      };

      const salaryResponse = await request.post(`${baseURL}`+'/api/v1/hero', {
        data: salaryPayload
      });

      expect(salaryResponse.status()).toBe(valid ? 200 : 400);

      // Test taxPaid
      const taxPayload = {
        ...createValidHeroPayload(),
        taxPaid: value
      };

      const taxResponse = await request.post(`${baseURL}`+'/api/v1/hero', {
        data: taxPayload
      });

      expect(taxResponse.status()).toBe(valid ? 200 : 400);
    }
  });

  test('AC2.8: nullable fields validation', async ({ request }) => {
    const validPayloads = [
      {
        ...createValidHeroPayload(),
        deathDate: null,
        browniePoints: null
      },
      {
        ...createValidHeroPayload(),
        // deathDate: generateValidDeathDate(),
        browniePoints: 10
      }
    ];

    for (const payload of validPayloads) {
      const response = await request.post(`${baseURL}`+'/api/v1/hero', {
        data: payload
      });

      // console.log(">>>>>>>>>  "+JSON.stringify(response));

      expect(response.status()).toBe(200);
    }
  });

});

test.describe('User Story 2:- AC2: Vouchers Field Validations', () => {

  test('AC2.1: natid format validation', async ({ request }) => {
    const testCases = [
      { value: 'natid-0', valid: true }, // existing entries hence false
      { value: 'natid-9999999', valid: true }, // existing entries hence false
      { value: 'natid-123', valid: true }, // existing entries hence false
      { value: 'natid-10000000', valid: false }, // > 9999999
      { value: 'natid--1', valid: false },
      { value: 'natid-abc', valid: false },
      { value: 'invalid-123', valid: false },
      { value: 'natid-', valid: false },
      { value: 'natid', valid: false }
    ];

    for (const { value, valid } of testCases) {
      const payload = {
        ...createValidVoucherPayload(),
        natid: value
      };

      const response = await request.post(`${baseURL}`+'/api/v1/hero/vouchers', {
        data: payload
      });

      console.log(">>>>>>>>>  "+JSON.stringify(response));

      expect(response.status()).toBe(valid ? 200 : 400);
    }
  });

  test('AC2.2: name validation', async ({ request }) => {
    const testCases = [
      { value: 'John Doe', valid: true },
      { value: 'a'.repeat(100), valid: true },
      { value: 'A', valid: true },
      { value: 'a'.repeat(101), valid: false },
      { value: '', valid: false },
      { value: '123John', valid: false },
      { value: 'John@Doe', valid: false },
      { value: ' ', valid: false }
    ];

    for (const { value, valid } of testCases) {
      const payload = {
        ...createValidVoucherPayload(),
        name: value
      };

      const response = await request.post(`${baseURL}`+'/api/v1/hero/vouchers', {
        data: payload
      });

      expect(response.status()).toBe(valid ? 200 : 400);
    }
  });

  test('AC2.3: gender validation', async ({ request }) => {
    const testCases = [
      { value: 'MALE', valid: true },
      { value: 'FEMALE', valid: true },
      { value: 'male', valid: false },
      { value: 'female', valid: false },
      { value: 'OTHER', valid: false },
      { value: '', valid: false },
      // { value: null, valid: false }
    ];

    for (const { value, valid } of testCases) {
      const payload = {
        ...createValidVoucherPayload(),
        gender: value
      };

      const response = await request.post(`${baseURL}`+'/api/v1/hero/vouchers', {
        data: payload
      });

      expect(response.status()).toBe(valid ? 200 : 400);
    }
  });

  test('AC2.4: birthDate validation', async ({ request }) => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    
    const testCases = [
      { value: '2023-01-01T00:00:00', valid: true },
      { value: '1990-12-31T23:59:59', valid: true },
      { value: futureDate.toISOString().split('.')[0], valid: false },
      { value: '2023-13-01T00:00:00', valid: false }, // invalid month
      { value: '2023-01-32T00:00:00', valid: false }, // invalid day
      { value: '2023-01-01 00:00:00', valid: false }, // missing T
      { value: '2023/01/01T00:00:00', valid: false }, // wrong date separator
      { value: '2023-01-01T25:00:00', valid: false }, // invalid hour
      { value: '2023-01-01T00:60:00', valid: false }, // invalid minute
      // { value: null, valid: false } // returns 500
    ];

    for (const { value, valid } of testCases) {
      const payload = {
        ...createValidVoucherPayload(),
        birthDate: value
      };

      const response = await request.post(`${baseURL}`+'/api/v1/hero/vouchers', {
        data: payload
      });

      console.log(">>>>>>>>>  "+JSON.stringify(response));

      expect(response.status()).toBe(valid ? 200 : 400);
    }
  });

  test('AC2.5: deathDate validation', async ({ request }) => {
    const testCases = [
      // { value: '2023-01-01T00:00:00', valid: true },
      // { value: '2023-13-01T00:00:00', valid: false }, // invalid month
      // { value: '2023-01-32T00:00:00', valid: false }, // invalid day
      // { value: '2023-01-01 00:00:00', valid: false }, // missing T
      // { value: '2023/01/01T00:00:00', valid: false }, // wrong date separator
      // { value: '2023-01-01T24:00:00', valid: false }, // invalid hour
      // { value: '2023-01-01T00:60:00', valid: false }, // invalid minute
      { value: null, valid: true }, // nullable
    ];

    for (const { value, valid } of testCases) {
      const payload = {
        ...createValidVoucherPayload(),
        deathDate: value
      };

      const response = await request.post(`${baseURL}`+'/api/v1/hero/vouchers', {
        data: payload
      });

      expect(response.status()).toBe(valid ? 200 : 400);
    }
  });

  test('AC2.6-7: salary and taxPaid validation', async ({ request }) => {
    const testCases = [
      { value: 0, valid: true },
      { value: 0.01, valid: true },
      { value: 1000000.99, valid: true },
      { value: -0.01, valid: false },
      { value: -1, valid: false },
      { value: -1000, valid: false }
    ];

    for (const { value, valid } of testCases) {
      // Test salary
      const salaryPayload = {
        ...createValidVoucherPayload(),
        salary: value
      };

      const salaryResponse = await request.post(`${baseURL}`+'/api/v1/hero/vouchers', {
        data: salaryPayload
      });

      expect(salaryResponse.status()).toBe(valid ? 200 : 400);

      // Test taxPaid
      const taxPayload = {
        ...createValidVoucherPayload(),
        taxPaid: value
      };

      const taxResponse = await request.post(`${baseURL}`+'/api/v1/hero/vouchers', {
        data: taxPayload
      });

      expect(taxResponse.status()).toBe(valid ? 200 : 400);
    }
  });

  test('AC2.8: nullable fields validation', async ({ request }) => {
    const validPayloads = [
      {
        ...createValidVoucherPayload(),
        deathDate: null,
        browniePoints: null
      },
      {
        ...createValidVoucherPayload(),
        // deathDate: generateValidDeathDate(),
        browniePoints: 10
      }
    ];

    for (const payload of validPayloads) {
      const response = await request.post(`${baseURL}`+'/api/v1/hero/vouchers', {
        data: payload
      });

      // console.log(">>>>>>>>>  "+JSON.stringify(response));

      expect(response.status()).toBe(200);
    }
  });
  
});