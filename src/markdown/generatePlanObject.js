const fs = require('fs')
// User
const user = require('../../test-rails-support/user.json')
const access = require('../../test-rails-support/access.json')
// Get active JIRA board sprints
const getActiveSprints = require('../../test-rails-support/api/jira/src/activeSprints')
// Project
const projectFile = 'plans/project.json'
const project = require('../../' + projectFile)
const testRailsProject = require('../../test-rails-support/api/test_rails/fixtures/projects')
let testRailsID

if (project.project === 'RC') {
  testRailsID = testRailsProject[1]
} else if (project.project === 'MOPT') {
  testRailsID = testRailsProject[0]
}

getActiveSprints.then((sprint) => {
  planObject = {
    user: {
      name: user.name,
      email: user.email
    },
    access: access,
    project: project.project,
    test_rails_project_ID: testRailsID,
    project_name: project.project_name,
    sprint_name: sprint.name,
    sprint_number: sprint.name.replace(/[A-z\-]{1,}/g, ''),
    sprint_ID: sprint.id,
    plan: {
      type: 'SPRINT',
      goal: 'changes made to the application in this sprint are certifiable',
      kind: 'Sprint ' + sprint.name.replace(/[A-z\-]{1,}/g, '') + ' Regression',
      name: project.project_name + ' Sprint ' + sprint.name.replace(/[A-z\-]{1,}/g, '') + ' Regression',
      overview: '../fixtures/projects/' + project.project.toLowerCase() + '-overview.js',
      qa_team: '../fixtures/projects/' + project.project.toLowerCase() + '-qa-team.js'
    }
  }

  // Overwrite our old plan.json with our new one
  fs.writeFile(projectFile, JSON.stringify(planObject), (error) => {
    if (error) throw error
  })
})
