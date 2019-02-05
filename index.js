const type = process.argv[2]

if (type === 'new:testPlan') {
  require('./src/prompts/testPlan')
}
else if (type === 'generate:testPlan') {
  require('./src/markdown/makePlans')
}
else {
  console.error('Please provide a valid script, like: "new:test" or "new:testPlan"')
}
