const checkGoogleSignIn = require('./checkGoogleSignIn')
const isAdmin = require('./isAdmin')
const jwtValidator = require('./jwtValidator')
const checkFilesExists = require('./checkFilesExist')
const userValidator = require('./userValidator')
const isAllowedCollection = require('./isAllowedCollection')
const isAllowedExtension = require('./isAllowedExtension')

module.exports = {
  ...checkFilesExists,
  ...checkGoogleSignIn,
  ...isAdmin,
  ...userValidator,
  ...jwtValidator,
  ...isAllowedCollection,
  ...isAllowedExtension
}
