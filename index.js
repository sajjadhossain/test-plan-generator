const type = process.argv[2]

if (type === 'new:sprint') {
  require('./src/prompts/sprint')
}
else if (type === 'new:testPlan') {
  require('./src/markdown/makePlans')
}
else {
  console.error('Please provide a valid script, like: "new:sprint"')
}
