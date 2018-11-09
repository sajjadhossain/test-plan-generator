const type = process.argv[2]

if (type === 'new:tester') {
  require('./src/prompts/tester')
}
else if (type === 'new:testPlan') {
  require('./src/markdown/makePlans')
}
else {
  console.error('Please provide a valid script, like: "new:tester" or "new:testPlan"')
}
