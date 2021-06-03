const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection failed'));
db.once('open', () => {
    console.info("Connection Successful");
});

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Blog = new mongoose.model('blog', blogSchema);
exports.Blog = Blog;

// const blog = new Blogs({
//     name: 'Lorem',
//     blog: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
// });

// blog.save().then(() => {
//     console.log("successfully added")
//     mongoose.connection.close();
// });

exports.newBlog = (title, content) => {

    const blog = new Blog({
        title: title,
        content: content
    });

    blog.save().then(() => {
        console.log("Successfully added");
    });
};

