// Libraries
const fs = require('fs')
const _cliProgress = require('cli-progress')
// User
const user = require('../../test-rails-support/user.json')
const access = require('../../test-rails-support/access.json')
// Project
const projectFile = 'plans/project.json'
const planObject = require('../../' + projectFile)
// Get active JIRA board sprints
const getActiveSprints = require('../../test-rails-support/api/jira/src/activeSprints')
// Test plan
const generateOverviewSection = require('./templates/overview')
const generateAcceptanceCriteria = require('./templates/acceptanceCriteria')
const plansDirectory = 'html'
let planContent
// Our CLI progress bar
const progress = new _cliProgress.Bar(
  { format: 'Progress: [{bar}] {percentage}%' },
  _cliProgress.Presets.shades_classic
)
// Start progress bar
progress.start(100, 0)

let projectOverview = require(planObject.plan.overview)
let projectQATeam = require(planObject.plan.qa_team)
let planName = planObject.plan.name.replace(/ /g, '-').toLowerCase()

progress.update(25)

generateOverviewSection(planObject, projectOverview)
progress.update(50)

generateAcceptanceCriteria(planObject, projectOverview)
progress.update(75)

setTimeout(() => {
  progress.update(80)

  planContent =
    fs.readFileSync('./html/sections/' + planName + '-overview.html') +
    fs.readFileSync('./html/sections/' + planName + '-acceptance-criteria.html')

  progress.update(90)

  fs.writeFile(plansDirectory + '/' + planName + '.html', planContent, (error) => {
    if (error) throw error
  })

  // Update and end stop progress
  progress.update(100)
  progress.stop()
}, 20000)
