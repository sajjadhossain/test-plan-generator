'use strict'
const fs = require('fs')
const { prompt } = require('prompts')
const sprintFixtures = 'src/fixtures/sprints'
const questions = require('../fixtures/questions')
const projectsDir = '../fixtures/projects'
const absoluteJSONPath = sprintFixtures + '/'
const absoluteDataPath = projectsDir + '/'
let jsonFile
let responseObject

(async () => {
  const response = await prompt(questions)
  responseObject = {}
  responseObject.name = [ response.firstName, response.lastName ]
  responseObject.userName = response.email
  responseObject.testPlan = {
    type: response.testType[0].toUpperCase(),
    goal: response.testType[1],
    kind: response.testType[0] + ' ' + response.sprint + ' Regression',
    projectName: response.project[1],
    fileName: response.project[0].toLowerCase() + '-' + response.testType[0].toLowerCase() + '-' + response.sprint + '-test-plan',
    name: response.project[1] + ' - ' + response.testType[0] + ' ' + response.sprint + ' Test Plan',
    jiraSprint: response.project[0] + '-' + response.sprint,
    jiraProject: response.project[0],
    projectOverview: absoluteDataPath + response.project[0].toLowerCase() + '-overview.js',
    projectQATeam: absoluteDataPath + response.project[0].toLowerCase() + '-qa-team.js',
  }

  jsonFile = absoluteJSONPath + responseObject.testPlan.fileName + '.json'
  // console.log(responseObject)
  fs.writeFile(jsonFile, JSON.stringify(responseObject, null, 2), (err) => {
    if (err) throw err;
  })
})();
