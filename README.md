# test-rails-support

generate a test plan in markdown for your project with a few parameters and template

## Story

```gherkin
As a tester  
I want to generate a test plan  
So that I can upload to Confluence  
```

## Installation

### Notes
1. MUST be on VPN when using these tools
2. Sprint must be kicked off, active
3. Tester must ask test lead: @sajjadhossain, for key

### Steps
1. Clone repository and submodules: `git clone --recursive git@github.com:sajjadhossain/test-plan-generator.git` or if you've already cloned: `git submodule update --init --recursive`
2. From `test-plan-generator`, run `npm run project:init`
3. Then, run `npm run decrypt:key <key>`
4. Then, run `npm run new:testPlan` and submit the required information
5. Then, run `npm run generate:planObject`
6. Then, run `npm run testRails:createTestCases`
6. Then, run `npm run generate:testPlan`
7. Then, run `npm run confluence:writeTestPlans` OR in `test-rails-support`, repository, run: `npm run confluence:pushTestPlans`

### Additionally:

* To clean the repository, in `test-plan-generator`, we can run `npm run plans:clean`

## TODO
- [x] Get ticket for sprint
  - [x] Create test cases for each ticket
    - [x] link to JIRA
    - [x] link test runs
