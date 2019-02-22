// Libraries
const fs = require('fs')
const { prompt } = require('prompts')
// Prompt questions
const questions = require('../fixtures/questions')
// Response objects
let user
let access
let plan
// Test plan
const testRailsRoot = './test-rails-support/'
const axs = require(testRailsRoot.replace('./', '../../') + 'access.json')
const htmlDirectory = 'html/'
const plansDirectory = 'plans/'
const userPath = testRailsRoot + 'user.json'
const plansPath = plansDirectory + 'project.json'
let projectOverview
let projectQATeam
let planContent

(async() => {
  const response = await prompt(questions)
  user = {}
  plan = {}
  user.global = {}

  user.global.marketplace = {
    user: axs.marketplace[0],
    password: axs.marketplace[1]
  }
  user.global.test_rails = {
    user: axs.test_rails.user,
    password: axs.test_rails.password
  }
  user.name = response.lastName + ', ' + response.firstName
  user.email = response.email[0]
  user.test_rails = {
    user: response.email[0],
    password: response.test_rails_password
  }
  user.atlassian = {
    user: response.email[0],
    password: response.jira_password
  }
  // Append to our plan
  plan.project = response.project[0]
  plan.project_name = response.project[1]

  // Write out user.json in test-rails-support
  fs.writeFile(userPath, JSON.stringify(user), (error) => {
    if (error) throw error
  })
  // Write out plan.json in plans/
  fs.writeFile(plansPath, JSON.stringify(plan), (error) => {
    if (error) throw error
  })
})()
