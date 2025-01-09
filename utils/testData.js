import { faker } from '@faker-js/faker';

const generateValidNatId = () => `natid-${faker.number.int({ min: 10000, max: 9999999 })}`;
const generateValidName = () => faker.person.fullName().slice(0, 100);
const generateValidBirthDate = () => {
  const pastDate = faker.date.past();
  return pastDate.toISOString().split('.')[0];
};
const generateSalary = () => faker.number.int({ min: 10000, max: 9999999 });
const generateTax = () => faker.number.int({ min: 1000, max: 9999 });
const generatePoints = () => faker.number.int({ min: 100, max: 999 });


export const createValidHeroPayload = () => ({
  natid: generateValidNatId(),
  name: generateValidName(),
  gender: 'MALE',
  birthDate: generateValidBirthDate(),
  deathDate: null,
  salary: generateSalary(),
  taxPaid: generateTax(),
  browniePoints: generatePoints()
});

export const baseURL = 'http://localhost:9997'

export const heroData = {
    "natid":'natid-11',
    "name":'Mr Ram Lal',
    "gender":'MALE',
    "birthDate":'1965-07-30T18:00:00',
    "deathDate":null,
    "salary":11.00,
    "taxPaid":1,
    "browniePoints":9
}

export const createValidVoucherPayload = () => ({
  natid: generateValidNatId(),
  name: generateValidName(),
  gender: 'MALE',
  birthDate: generateValidBirthDate(),
  deathDate: null,
  salary: generateSalary(),
  taxPaid: generateTax(),
  browniePoints: generatePoints(),
  vouchers: [
    {
      voucherName: "VOUCHER 1",
      voucherType: "TRAVEL"
    }
  ]
});