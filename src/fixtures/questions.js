let questions

questions = [
  {
    type: 'text',
    name: 'firstName',
    message: 'What is your first name?',
    initial: 'first'
  },
  {
    type: 'text',
    name: 'lastName',
    message: 'What is your last name?',
    initial: 'last'
  },
  {
    type: 'text',
    name: 'email',
    message: 'What is your MediaBrand email?',
    initial: 'first.last@mbww.com',
    format: v => v.match(/[A-z0-9]{1,}.[A-z0-9]{1,}@[A-z0-9]{1,}.[A-z0-9]{1,}/g)
  },
  {
    type: 'select',
    name: 'project',
    message: 'What JIRA Project is this?',
    choices: [
      { title: 'RC', value: ['RC', 'Reach Customization'] },
      { title: 'MOPT', value: ['MOPT', 'Modeling and Optimization'] }
    ]
  },
  {
    type: 'select',
    name: 'testType',
    message: 'What kind of test plan is this?',
    choices: [
      { title: 'sprint', value: ['Sprint', 'changes made to the application in this sprint are certifiable'] },
    ]
  },
  {
    type: prev => prev[0] === 'Sprint' ? 'number' : null,
    name: 'sprint',
    message: 'What JIRA sprint are you on?',
    initial: 101
  }
]

module.exports = questions
