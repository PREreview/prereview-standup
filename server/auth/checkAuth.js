// redirect unauthenticated user to login page
// TODO: only redirect if they don't have permission to see the page
//       otherwise just annotate the user
module.exports = function checkAuth (req, res, next) {
  if (!req.isAuthenticated()) res.redirect('/login-redirect')
  return next()
}