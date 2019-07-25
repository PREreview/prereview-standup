module.exports = reviews

async function reviews () {
	await nano.db.create('reviews')
	return nano.use('reviews')
}
