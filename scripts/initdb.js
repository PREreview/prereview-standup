require('../config')

var tables = [
	'users',
	'preprints',
	'prereviews'
]

var creators = tables.map(table => require(`../server/db/tables/${table}/schema`)())

Promise.all(creators).then(
	() => console.log('DB tables created')
).catch(
	e => console.error('DB table creation failed', e)
)
