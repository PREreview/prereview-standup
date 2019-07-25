var nano = require('nano')(`http://localhost:5984`)
nano.db.create('books')