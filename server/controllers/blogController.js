const Blog = require("../models/Blog");
const colors = require("colors");

// @description:    Get all blogs by user id
// @route:   '/api/blogs'
// @access:  Private
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ user: req.user.id });
        res.json(blogs);
    } catch (error) {
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send("Server Error");
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!blog)
            return res.status(404).json([
                {
                    message: "Blog not found",
                    type: "error",
                },
            ]);

        res.json(blog);
    } catch (error) {
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send("Server Error");
    }
};

const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newBlog = new Blog({
            title,
            content,
            user: req.user.id,
        });

        await newBlog.save();

        if (!newBlog)
            return res
                .status(400)
                .json([{ message: "Couldn't create blog", type: "error" }]);

        res.json(newBlog);
    } catch (error) {
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send("Server Error");
    }
};

const updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { title, content },
            { new: true }
        );
        res.json(blog);
    } catch (error) {
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send("Server Error");
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });
        res.json({
            blogId: req.params.id,
            toasts: [{ message: "Blog deleted", type: "success" }],
        });
    } catch (error) {
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send("Server Error");
    }
};

module.exports = { getBlogs, createBlog, updateBlog, deleteBlog, getBlogById };
