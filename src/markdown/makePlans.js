// Libraries
const fs = require('fs')
const _cliProgress = require('cli-progress')
// User
const user = require('../../test-rails-support/user.json')
const access = require('../../test-rails-support/access.json')
// Project
const projectFile = 'plans/project.json'
const project = require('../../' + projectFile)
// Get active JIRA board sprints
const getActiveSprints = require('../../test-rails-support/api/jira/src/activeSprints')
// Test plan
const generateOverviewSection = require('./templates/overview')
const generateAcceptanceCriteria = require('./templates/acceptanceCriteria')
const plansDirectory = 'html'
let planObject
let planContent
// Our CLI progress bar
const progress = new _cliProgress.Bar(
  { format: 'Progress: [{bar}] {percentage}%' },
  _cliProgress.Presets.shades_classic
)
// Start progress bar
progress.start(100, 0)
progress.update(25)

getActiveSprints.then((sprints) => {
  sprints.forEach((sprint) => {
    progress.update(35)

    let openSprints = JSON.parse(sprint)
    let projectShortName = openSprints.values[0].name.replace(/[0-9\-]{1,}/g, '')

    if (project.project === projectShortName) {
      planObject = {
        user: {
          name: user.name,
          email: user.email
        },
        access: access,
        project: project.project,
        project_name: project.project_name,
        sprint_name: openSprints.values[0].name,
        sprint_number: openSprints.values[0].name.replace(/[A-z\-]{1,}/g, ''),
        sprint_ID: openSprints.values[0].id,
        plan: {
          type: 'SPRINT',
          goal: 'changes made to the application in this sprint are certifiable',
          kind: 'Sprint ' + openSprints.values[0].name.replace(/[A-z\-]{1,}/g, '') + ' Regression',
          name: project.project_name + ' Sprint ' + openSprints.values[0].name.replace(/[A-z\-]{1,}/g, '') + ' Regression',
          overview: '../fixtures/projects/' + projectShortName.toLowerCase() + '-overview.js',
          qa_team: '../fixtures/projects/' + projectShortName.toLowerCase() + '-qa-team.js'
        }
      }

      let projectOverview = require(planObject.plan.overview)
      let projectQATeam = require(planObject.plan.qa_team)
      let planName = planObject.plan.name.replace(/ /g, '-').toLowerCase()

      // Overwrite our old plan.json with our new one
      fs.writeFile(projectFile, JSON.stringify(planObject), (error) => {
        if (error) throw error
      })

      generateOverviewSection(planObject, projectOverview)
      progress.update(45)

      generateAcceptanceCriteria(planObject, projectOverview)
      progress.update(60)

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
    }
  })
})
