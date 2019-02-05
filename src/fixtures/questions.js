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
    initial: 'last',
    required: true
  },
  {
    type: 'text',
    name: 'email',
    message: 'What is your MediaBrand email?',
    initial: 'first.last@mbww.com',
    format: v => v.match(/[A-z0-9]{1,}.[A-z0-9]{1,}@[A-z0-9]{1,}.[A-z0-9]{1,}/g)
  },
  {
    type: 'password',
    name: 'jira_password',
    hidden: true,
    message: 'What is your JIRA Password?',
    initial: 'BeverlyHills90210'
  },
  {
    type: 'password',
    name: 'test_rails_password',
    hidden: true,
    message: 'What is your Test Rails Password?',
    initial: 'NewYork10001'
  },
  {
    type: 'select',
    name: 'project',
    message: 'What JIRA Project do you work in?',
    choices: [
      { title: 'RC', value: ['RC', 'Reach Customization'] },
      { title: 'MOPT', value: ['MOPT', 'Modeling and Optimization'] }
    ]
  }
]

module.exports = questions
