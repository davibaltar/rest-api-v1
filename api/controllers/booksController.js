
const booksCollection = require('../models/booksModel')


/*******/
/* GET */
/*******/

// Returns all books
exports.get = (req, res, next) => {
	try {
		booksCollection.find({}).lean().exec((err, docs) => {
			if (err)
				return res.status(400).json({ status: 'fail', message: err.toString(), data: null })
			return res.status(200).json({ status: 'success', message: null, data: docs })
		})
	} catch (err) {
		return res.status(500).json({ status: 'fail', message: err.toString(), data: null })
	}
}

// Returns a book by ID
exports.getById = (req, res, next) => {
	try {
		booksCollection.findById(req.params.id, (err, book) => {
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
		booksCollection.findById(req.params.id, (err, book) => {
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
		var body = req.body
		if (!body.title || !body.author)
			return res.status(400).json({ status: 'fail', message: "Missing parameter", data: null })
		booksCollection.create({ title: body.title, author: body.author }, (err, newBook) => {
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
		var body = req.body
		booksCollection.findByIdAndUpdate(req.params.id, {
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
		booksCollection.findByIdAndRemove(req.params.id).then(book => {
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