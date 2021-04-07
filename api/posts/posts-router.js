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
	Post.findById(req.params.id)
		.then((post) => {
			if (post) {
				res.status(200).json(post);
			} else {
				res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist' });
			}
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'The post information could not be retrieved' });
		});
});

router.post('/', (req, res) => {
	const { title, contents } = req.body;
	if (!title || !contents) {
		res
			.status(400)
			.json({ message: 'Please provide title and contents for the post' });
	} else {
		Post.insert({ title, contents })
			.then(({ id }) => {
				return Post.findById(id);
			})
			.then((post) => {
				res.status(201).json(post);
			})
			.catch(() => {
				res.status(500).json({
					message: 'There was an error while saving the post to the database',
				});
			});
	}
});

router.put('/:id', (req, res) => {
	//
});

// router.put('/:id', (req, res) => {
// 	const changes = req.body;
// 	if (!changes.title || !changes.contents) {
// 		res
// 			.status(400)
// 			.json({ message: 'Please provide title and contents for the post' });
// 	} else {
// 		Post.update(req.params.id, changes)
// 			.then((post) => {
// 				if (post) {
// 					res.status(200).json(changes);
// 				} else {
// 					res
// 						.status(404)
// 						.json({ message: 'The post with the specified ID does not exist' });
// 				}
// 			})
// 			.catch(() => {
// 				res
// 					.status(500)
// 					.json({ message: 'The post information could not be modified' });
// 			});
// 	}
// });

router.delete('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			res
				.status(404)
				.json({ message: 'The post with the specified ID does not exist' });
		} else {
			await Post.remove(req.params.id);
			res.status(200).json(post);
		}
	} catch (err) {
		res.status(500).json({ message: 'The post could not be removed' });
	}
});

router.get('/:id/comments', (req, res) => {
	Post.findPostComments(req.params.id)
		.then((comments) => {
			if (!comments) {
				res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist' });
			} else {
				res.status(200).json(comments);
			}
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'The comments information could not be retrieved' });
		});
});

module.exports = router;
