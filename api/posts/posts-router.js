// implement your posts router here
const express = require('express');
const router = express.Router();

const Post = require('./posts-model');

router.get('/', (req, res) => {
	Post.find(req.query)
		.then((post) => {
			res.status(200).json(post);
		})
		.catch(() => {
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
	const newPost = req.body;
	if (!newPost.title || !newPost.contents) {
		res
			.status(400)
			.json({ message: 'Please provide title and contents for the post' });
	} else {
		Post.insert(req.body)
			.then((post) => {
				const id = post.id;
				res.status(201).json(id);
			})
			.catch(() => {
				res.status(500).json({
					message: 'There was an error while saving the post to the database',
				});
			});
	}
});

router.put('/:id', (req, res) => {
	const changes = req.body;
	if (!changes.title || !changes.contents) {
		res
			.status(400)
			.json({ message: 'Please provide title and contents for the post' });
	} else {
		Post.update(req.params.id, changes)
			.then((post) => {
				if (post) {
					res.status(200).json(changes);
				} else {
					res
						.status(404)
						.json({ message: 'The post with the specified ID does not exist' });
				}
			})
			.catch(() => {
				res
					.status(500)
					.json({ message: 'The post information could not be modified' });
			});
	}
});

router.delete('/:id', (req, res) => {
	Post.remove(req.params.id).then((count) => {
		if (count > 0) {
			res.status(200).json({});
		} else {
			res
				.status(404)
				.json({ message: 'The post with the specified ID does not exist' });
		}
	});
});

router.get('/:id/comments', (req, res) => {
	Post.findCommentById(req.params.id)
		.then((comments) => {
			if (comments.length > 0) {
				// res.status(200).json(res.body);
			} else {
				res
					.status(404)
					.status({ message: 'The post with the specified ID does not exist' });
			}
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'The comments information could not be retrieved' });
		});
});

module.exports = router;
