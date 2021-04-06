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
	Post.findById(req.params.id).then((post) => {
		if (post) {
			res.status(200).json(post);
		} else {
			res
				.status(404)
				.json({ message: 'The post with the specified ID does not exist' });
		}
	});
});

router.post('/', (req, res) => {
	//
});

router.put('/:id', (req, res) => {
	//
});

router.delete('/:id', (req, res) => {
	//
});

router.get('/:id/comments', (req, res) => {
	//
});

module.exports = router;
