// implement your posts router here
const express = require('express');
const router = express.Router();

const Post = require('./posts-model');

router.get('/', (req, res) => {
	Post.find(req.query)
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((err) => {
			res
				.status(500)
				.json({ message: 'The posts information could not be retrieved' });
		});
});

router.get('/:id', (req, res) => {
	//
});

module.exports = router;
