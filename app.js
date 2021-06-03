const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require(__dirname + "/dbConfig");
require('ejs');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));


const contactContent = "The word “Calligraphy” is derived from Greek, meaning “beautiful writing”. Calligraphy or the art of fancy writing has thousands of years in its history and development.";
const homeContent = "They are of aesthetics, refinement, creativity and pure beauty. For different scripts, for example, Chinese or Arabic, they have developed their own way of calligraphy.";
const aboutContent = "Calligraphy fonts resemble elegant handwriting. They often look as if they were drawn with flat-tipped pens or brushes.";
const posts = [];

app.get("/", (request, response) => {

    dbConfig.Blog.find((err, blogs) => {
        // console.log(posts);
        response.render("home", {
            posts: blogs
        });
    });
});

app.get("/about", (request, response) => {
    response.render("about", {
        content: aboutContent
    });
});

app.get("/contact", (request, response) => {
    response.render("contact", {
        content: contactContent
    });
});

app.get("/compose", (request, response) => {
    response.render("compose");
});

app.get("/posts/:postId", (request, response) => {
    const requestedPostId = request.params.postId;

    dbConfig.Blog.findOne({
        _id: requestedPostId
    }, (err, post) => {
        if (!err) {
            // console.log("match found");
            response.render("post", {
                title: post.title,
                content: post.content
            });
        } else response.redirect('/');
    });
});

app.post("/compose", (request, response) => {
    let title = request.body.blogTitle;
    let blog = request.body.blog;

    dbConfig.newBlog(title, blog);

    response.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("blog project started at 3000");
});