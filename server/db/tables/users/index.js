module.exports = users

async function users () {
	await nano.db.create('users')
	return nano.use('users')
}
