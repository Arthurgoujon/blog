const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Blog = require('../models/Blog');

// @route     GET api/blogs
// @desc      Get all users blogs
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/blogs
// @desc      Add new blog
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'title is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, date } = req.body;

    try {
      const newBlog = new Blog({
        title,
        description,
        date,
        user: req.user.id
      });

      const blog = await newBlog.save();

      res.json(blog);
    } catch (err) {
      console.error(er.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT api/blog/:id
// @desc      Update blog
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { title, description, date } = req.body;

  // Build contact object
  const contactFields = {};
  if (title) contactFields.title = title;
  if (description) contactFields.description = description;
  if (date) contactFields.date = date;

  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: 'Blog not found' });

    // Make sure user owns contact
    if (blog.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(blog);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/blogs/:id
// @desc      Delete blog
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: 'Blog not found' });

    // Make sure user owns contact
    if (blog.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Blog.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Blog removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
