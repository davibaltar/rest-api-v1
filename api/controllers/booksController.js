
const Books = require('../models/booksModel')
const redis = require('redis')
const cache = redis.createClient(process.env.REDIS_PORT || 6379, process.env.REDIS_HOST || '127.0.0.1')


cache.on('connect', () => {
	console.log('REDIS connected!')
})

cache.on('error', (err) => {
	console.log('REDIS error:', err)
})

/*******/
/* GET */
/*******/

// Returns all books
exports.get = (req, res, next) => {
	try {
		cache.get('allbooks', function (err, data) {
			if (data) {		// found in cache (redis)
				return res.status(200).json({ status: 'success', message: null, data: JSON.parse(data) })
			} else {
				Books.find({}).lean().exec((err, books) => {
					if (err)
						return res.status(400).json({ status: 'fail', message: err.toString(), data: null })

					cache.set('allbooks', JSON.stringify(books))
					cache.expire('allbooks', 5)	// 5 seconds

					return res.status(200).json({ status: 'success', message: null, data: books })
				})
			}
		})
	} catch (err) {
		return res.status(500).json({ status: 'fail', message: err.toString(), data: null })
	}
}

// Returns a book by ID
exports.getById = (req, res, next) => {
	try {
		Books.findById(req.params.id, (err, book) => {
			if (err)
				return res.status(400).json({ status: 'fail', message: err.toString(), data: null })
			return res.status(200).json({ status: 'success', message: null, data: book })
		})
	} catch (err) {
		return res.status(500).json({ status: 'fail', message: err.toString(), data: null })
	}
}

// Returns a book title by ID
exports.getTitleById = (req, res, next) => {
	try {
		Books.findById(req.params.id, (err, book) => {
			if (err)
				return res.status(400).json({ status: 'fail', message: err.toString(), data: null })
			return res.status(200).json({ status: 'success', message: null, data: book ? book.title : null })
		})
	} catch (err) {
		return res.status(500).json({ status: 'fail', message: err.toString(), data: null })
	}
}

/********/
/* POST */
/********/

// Create a new book
exports.post = (req, res, next) => {
	try {
		const body = req.body
		if (!body.title || !body.author)
			return res.status(400).json({ status: 'fail', message: "Missing parameter", data: null })
		Books.create({ title: body.title, author: body.author }, (err, newBook) => {
			if (err)
				return res.status(400).json({ status: 'fail', message: err.toString(), data: null })
			return res.status(201).json({ status: 'success', message: null, data: newBook })
		})
	} catch (err) {
		return res.status(500).json({ status: 'fail', message: err.toString(), data: null })
	}
}

/**********/
/* UPTADE */
/**********/

// Update a book by ID
exports.put = (req, res, next) => {
	try {
		const body = req.body
		Books.findByIdAndUpdate(req.params.id, {
			title: body.title || '',
			author: body.author || ''
		}, { new: true }).then(book => {
			if (!book)
				return res.status(200).json({ status: 'fail', message: null, data: null })
			return res.status(200).json({ status: 'success', message: null, data: book })
		}).catch(err => {
			if (err.kind === 'ObjectId')
				return res.status(200).json({ status: 'fail', message: null, data: null })
			return res.status(400).json({ status: 'fail', message: err.toString(), data: null })
		});
	} catch (err) {
		return res.status(500).json({ status: 'fail', message: err.toString(), data: null })
	}
}

/**********/
/* DELETE */
/**********/

// Delete a book by ID
exports.delete = (req, res, next) => {
	try {
		Books.findByIdAndRemove(req.params.id).then(book => {
			if (!book)
				return res.status(200).json({ status: 'fail', message: null, data: null })
			return res.status(200).json({ status: 'success', message: null, data: book })
		}).catch(err => {
			if (err.kind === 'ObjectId')
				return res.status(200).json({ status: 'fail', message: null, data: null })
			return res.status(400).json({ status: 'fail', message: err.toString(), data: null })
		});
	} catch (err) {
		return res.status(500).json({ status: 'fail', message: err.toString(), data: null })
	}
}