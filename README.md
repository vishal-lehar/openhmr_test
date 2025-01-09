Project: OPENHMR_TEST

.
├── BugReport.txt
├── README.md
├── package-lock.json
├── package.json
├── playwright-report
│   └── index.html
├── playwright.config.js
├── test-report
│   ├── ClerkCSVUploadTest.mov
│   └── full-test-report.pdf
├── test-results
├── tests
│   ├── tc1.spec.js
│   ├── tc2.fields.spec.js
│   ├── tc3.clerk.spec.ts
│   ├── tc4.book.spec.ts
│   ├── tc5.sysowner.spec.js
│   ├── tc6.sysowner.spec.js
│   └── tc7.sysowner.spec.js
└── utils
    ├── dbHelper.js
    ├── invalidtestHero.csv
    ├── invalidtestherofile.pdf
    ├── pages
    │   ├── csvUploadPage.ts
    │   ├── loginPage.ts
    │   └── taxReliefPage.ts
    ├── testData.js
    └── testHero.csv



Commands:
===========

start colima: `colima start`
start docker compose: `docker-compose -f local-docker-compose.yml up -d`
start java: `java -Dspring.profiles.active=prd -jar OppenheimerProjectDev.jar`
install playwright: `npm install playwright`
create / start project: `npm init playwright`
create testData, utils:
create testcases
Run Tests: 
Create Bug Report
Create Test Report