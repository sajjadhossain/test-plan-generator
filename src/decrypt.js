const CryptoJS = require('crypto-js')
const fs = require('fs')
const testRailsRoot = './test-rails-support/'
const accessFile = 'access.json'
const accessFilePath = testRailsRoot + accessFile
const encryptedFile = './decrypt.txt'
const readEncryptedFile = fs.readFileSync(encryptedFile, 'utf8')

// Encrypt
// const encryptText = (key) => {
//   const myMessage = JSON.stringify()
//   const cipher = CryptoJS.AES.encrypt(myMessage, key).toString()
//
//   return cipher
// }

const decryptText = (key) => {
  const bytes  = CryptoJS.AES.decrypt(readEncryptedFile, key)
  const original = bytes.toString(CryptoJS.enc.Utf8)

  return fs.writeFileSync(accessFilePath, original)
}

module.exports = decryptText
