module.exports = function sanitizeID (id) {
  return id.replace(/[^a-zA-Z]+/g, '-')
}
