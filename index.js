const type = process.argv[2]

if (type === 'new:testPlan') {
  require('./src/prompts/testPlan')
}
else if (type === 'generate:testPlan') {
  require('./src/markdown/makePlans')
}
else if (type === 'decrypt:key') {
  const decrypt = require('./src/decrypt')
  const key = process.argv[3]

  if(!process.argv[3]) {
    console.error('Need to provide a key.')
  } else {
    decrypt(key)
  }
}
else {
  console.error('Please provide a valid script, like: "new:testPlan" or "generate:testPlan"')
}
