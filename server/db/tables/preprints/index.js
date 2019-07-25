module.exports = preprints

async function preprints () {
	await nano.db.create('preprints')
	return nano.use('preprints')
}
