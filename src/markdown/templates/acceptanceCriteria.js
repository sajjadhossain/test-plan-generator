const fs = require('fs')
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()
// Our test plan generator configuration
const htmlDir = './html'
const sectionsDir = htmlDir + '/sections/'
const getMilestones = require('../../../test-rails-support/api/test_rails/src/getMilestones')
const getTestRuns = require('../../../test-rails-support/api/test_rails/src/getTestRuns')
const getTestCases = require('../../../test-rails-support/api/test_rails/src/getTestCases')
let acceptanceCriteria
let risks
let milestones
let milestonesMarkdown
let testRuns
let testRunsMarkdown
let testCases
let testCasesMarkdown
let testRailsMarkdown
let jiraSection

const generateACSection = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(acceptanceCriteria)
  }, 8000)
})

const generateRisks = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(risks)
  }, 300)
})

const risksForPlan = []
const milestonesForPlan = []
const testRunsForPlan = []
const testCasesForPlan = []
const getAcceptanceCriteria = (planObject, projectOverview) => {
  let planName = planObject.plan.name.replace(/ /g, '-').toLowerCase()

  generateRisks.then((risks) => {
    risks = projectOverview.product.risks

    for(var key in risks) {
      risksForPlan.push(
        md.render(' * ' + risks[key] + ' \n')
      )
    }
  })
  getMilestones.then((body) => {
    milestones = body

    milestones.forEach((milestone) => {
      milestonesForPlan.push(
        '| [' + milestone.name + '](' + milestone.url + ') |  |\n'
      )
    })
  })
  getTestRuns.then((body) => {
    testRuns = body

    testRuns.forEach((testRun) => {
      testRunsForPlan.push(
        '| [' + testRun.name + '](' + testRun.url + ') |  |\n'
      )
    })
  })
  getTestCases.then((body) => {
    testCases = body

    testCases.forEach((testCasesForMilestone) => {
      testCasesForMilestone.forEach((testCase) => {
        testCasesForPlan.push(
          '| [' + testCase.title + '](' + 'http://testrail.cadreon.com/testrail/index.php?/cases/view/' + testCase.id + ') |  |\n'
        )
      })
    })
  })

  generateACSection.then((acceptanceCriteria) => {
    testRunsMarkdown =
      '| ID | Status |\n' +
      '| --- | --- |\n' +
      testRunsForPlan.join('')
    milestonesMarkdown =
      '| ID | Status |\n' +
      '| --- | --- |\n' +
      milestonesForPlan.join('')
    testCasesMarkdown =
      '| ID | Status |\n' +
      '| --- | --- |\n' +
      testCasesForPlan.join('')
    testRailsMarkdown =
      md.render('## Test Rails') +
      md.render('### Test Milestones') +
      md.render(milestonesMarkdown) +
      md.render('### Test Runs') +
      md.render(testRunsMarkdown) +
      md.render('### Test Cases') +
      md.render(testCasesMarkdown)
    acceptanceCriteria =
      md.render('# Acceptance Criteria') +
      md.render(
        '```gherkin' +
        '\nAs a tester' +
        '\nI want to ensure ' + planObject.plan.kind + ' for ' + planObject.project_name +
        '\nSo that I can verify ' + planObject.plan.goal +
        '\n```'
      ) +
      md.render('## Scope') +
      md.render('This test plan is a ' + planObject.plan.kind + ' for ' + planObject.project_name) +
      md.render('### Out of scope') +
      md.render(projectOverview.product.outOfScope) +
      md.render('### Known Defects') +
      '$JIRA_KNOWN_DEFECTS$' +
      md.render('### Stories') +
      '$JIRA_ACTIVE_STORIES$' +
      md.render('### Risks') +
      risksForPlan.join('') +
      testRailsMarkdown

    fs.writeFile(sectionsDir + planName + '-acceptance-criteria.html', acceptanceCriteria, (error) => {
      if (error) throw error
    })
  })
}

module.exports = getAcceptanceCriteria
