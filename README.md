# test-rails-support

generate a test plan in markdown for your project with a few parameters and template

## Story

```gherkin
As a tester  
I want to generate a test plan  
So that I can upload to Confluence  
```

## Installation

* Clone repository and submodules: `git clone --recursive git@github.com:sajjadhossain/test-plan-generator.git` or if you've already cloned: `git submodule update --init --recursive`

## Caveats

* Currently, although we collect and store this data via a script, in v1.2 we still need a user module in project root. Create a `user.js` in the following schema:

  ```
  module.exports = {
    name: ['First', 'Last'],
    jiraUserName: 'First.Last@mbww.com',
    jiraPassword: 'YourPasswordForJIRA',
    testRailPassword: 'YourPasswordForTestRails'
  }
  ```
* Tester MUST be on VPN when using these tools
* Sprint must be kicked off
* Test cases must be created in a Sprint Milestone
* Due to slight flakiness in the way I wrote my asynchronous code, we may have to run `generate:testPlan` more than once to capture all test cases from test rails

## Steps

1. In `test-plan-generator`
  1. run `npm run new:testPlan` and submit the required information
  2. run `npm run generate:testPlan`
  3. run `npm run confluence:writeTestPlans` OR in `test-rails-support`, repository, run: `npm run confluence:pushTestPlans`

### Additionally:

* To clean the repository, in `test-plan-generator`, we can run `npm run plans:clean`

## TODO
- [x] confirm action items with project participants
- [x] update script to request jira/test-rail data
- [x] add environments
- [x] add compatibility
- [x] add teams
- [x] add risks
- [x] add test rails, test cases
- [x] add scope, JIRA stories
- [ ] documentation
  - [x] README
