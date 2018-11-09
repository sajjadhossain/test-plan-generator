const fs = require('fs')
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()
const todaysDate = require('./date')
const generateOverviewSection = require('./templates/overview')
const sprintsDirectory = 'src/fixtures/sprints'
const plansDirectory = 'src/plans'
const plans = []
let testPlans
let planJson
let planObject
let planContent
let projectOverview
let projectQATeam

// TODO environments
// TODO test rails, test cases via API
// TODO JIRA queries and widgets via API
// TODO push to confluence via API

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
    md.render('---\n') +
    md.render('\`Confluence Page Name:\` ' + planJson.testPlan.name) +
    md.render('---\n') +
    md.render('\`Insert TOC from Confluence\`') +
    md.render('---\n') +
    generateOverviewSection(planJson, projectOverview) +
    md.render('# Acceptance Criteria') +
    md.render(
      '```gherkin' +
      '\nAs a tester' +
      '\nI want to ensure ' + planJson.testPlan.kind + ' for ' + planJson.testPlan.projectName +
      '\nSo that I can verify ' + planJson.testPlan.goal +
      '\n```'
    ) +
    md.render('## Scope') +
    md.render('This test plan is a ' + planJson.testPlan.kind + ' for ' + planJson.testPlan.projectName) +
    md.render('### Out of scope') +
    md.render(projectOverview.product.outOfScope) +
    md.render('### Known Defects') +
    md.render('Add a Issue Filter with the below query:') +
    md.render('```') +
    md.render(projectOverview.product.knownDefects) +
    md.render('```') +
    md.render('### JIRA stories') +
    md.render('Add a Issue Filter with the below query:') +
    md.render('```') +
    md.render(projectOverview.product.inScope) +
    md.render('```') +
    md.render('## Test Rails') +
    md.render('### Test Runs') +
    md.render('⚛	 *TODO:* Get Test Runs from API and collect on script run, currently the above is manually updated every sprint. 😢') +
    md.render('### Test Cases') +
    md.render('⚛	 *TODO:* Get Test Cases for Test Runs from API and collect on script run, currently the above is manually updated every sprint. 😢')

  fs.writeFile(planObject.testPlanAbsolutePath, planContent, (err) => {
    if (err) throw err;
  })
})
