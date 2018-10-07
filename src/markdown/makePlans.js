const fs = require('fs')
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()
const todaysDate = require('./date')
const sprintsDirectory = 'src/fixtures/sprints'
const plansDirectory = 'src/plans'
const plans = []
let testPlans
let planJson
let planObject
let planContent
let projectOverview
let projectQATeam

testPlans = fs.readdirSync(sprintsDirectory)

testPlans.forEach((plan) => {
  planJson = require('../fixtures/sprints/' + plan)
  projectOverview = require(planJson.testPlan.projectOverview)
  projectQATeam = require(planJson.testPlan.projectQATeam)
  planObject = {}

  planObject.testPlanFile = planJson.testPlan.fileName + '.md'
  planObject.testPlanAbsolutePath = plansDirectory + '/' + planJson.testPlan.fileName + '.html'

  plans.push(planObject)

  planContent =
    md.render('# ' + planJson.testPlan.name) +
    md.render('## Overview') +
    md.render('### Authors') +
    md.render(
      '| Name | Email |\n' +
      '| --- | --- |\n' +
      '| ' + planJson.name[0] + ', ' + planJson.name[1] + ' | ' +  planJson.userName[0] + ' |\n'
    ) +
    md.render('### Versions') +
    md.render('#### Document') +
    md.render(
      '| Date | Version |\n' +
      '| --- | --- |\n' +
      '| ' + todaysDate + ' | 0.0.1 |\n'
    ) +
    md.render('### Abstract') +
    md.render(projectOverview.product.abstract) +
    md.render('[Read More...](' + projectOverview.product.overviewLink + ')') +
    md.render('### Scope') +
    md.render('This test plan is a ' + planJson.testPlan.kind + ' for ' + planJson.testPlan.projectName) +
    md.render('### Tools') +
    md.render('See [here](https://wiki.mbww.com/display/AS/On-Boarding+Resources+for+QA).') +
    md.render('#### Additionally') +
    md.render('##### Dependencies') +
    md.render(' * [core-ui-test-library](' + projectOverview.product.devDependencies['core-ui-test-library'] + ')') +
    md.render(' * [core-api-test-library](' + projectOverview.product.devDependencies['core-api-test-library'] + ')') +
    md.render('##### Pages') +
    md.render(' * [Test Rails](' + projectOverview.product.projectPages.testRails + ')')  +
    md.render(' * [JIRA Agile Board](' + projectOverview.product.projectPages.jiraAgileBoard + ')') +
    md.render(' * [Confluence Page](' + projectOverview.product.projectPages.confluencePage + ')') +
    md.render('### Acceptance Criteria') +
    md.render(
      '```gherkin' +
      '\nAs a tester' +
      '\nI want to ensure ' + planJson.testPlan.kind + ' for ' + planJson.testPlan.projectName +
      '\nSo that I can verify ' + planJson.testPlan.goal +
      '\n```'
    ) +
    md.render('#### Out of scope') +
    md.render(projectOverview.product.outOfScope) +
    md.render('#### Known Defects') +
    md.render('### Scope') +
    md.render('#### JIRA stories') +
    md.render('### Test Rails') +
    md.render('#### Test Runs') +
    md.render('#### Test Cases')

    // TODO environments
    // TODO QA Team
    // TODO environments
    // TODO risks
    // TODO test rails, test cases
    // TODO scope, JIRA stories

  fs.writeFile(planObject.testPlanAbsolutePath, planContent, (err) => {
    if (err) throw err;
  })
})
