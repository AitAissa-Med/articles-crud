const Article = require('../models/articleModel');

//get all articels
const index = (req, res, next) => {
    Article.find()
        .then(response => {
            const articles = response.map(obj => ({
                id: obj._id,
                Title: obj.Title,
                Author: obj.Author,
                Resume: truncateText(obj.Resume),
                createdAt: obj.createdAt,
                updatedAt: obj.updatedAt
            }));

            //Resume = truncateText(Resume);
            res.render(('index'), {
                articles
            });
        })
        .catch(error => {
            res.json({
                message: "An error Occured!"
            })
        })
}


//show an aticle
const show = (req, res, next) => {
    // get the article id
    let articleID = req.params.articleID;

    Article.findById(articleID)
        .then(article => {

            res.render('show', {
                article
            })

        })
        .catch(error => {
            res.json({
                message: "An error Occured!"
            })
        })
}


//show an aticle
const show1 = (req, res, next) => {
    // get the article id
    let articleID = req.params.articleID;

    Article.findById(articleID)
        .then(response => {a
            res.render('update', {
                article: response
            })

        })
        .catch(error => {
            res.json({
                message: "An error Occured!"
            })
        })
}

//add Article 
const store = (req, res, next) => {
    if (Object.keys(req.body).length === 0)
        res.json({
            message: "Data Required"
        })
    else {
        const {
            Title,
            Author,
            Resume,
            Content
        } = req.body;

        let article = new Article({
            Title,
            Author,
            Resume,
            Content
        })

        article.save()
            .then(response => {
                res.redirect('/api/articles/');
            })
            .catch(error => {
                res.json({
                    message: "An error Occured!"
                })
            })
    }
}


//update an Article
const update = (req, res, next) => {
    // get the article id
    const _id = req.body.id;

    const {
        Title,
        Author,
        Resume,
        Content
    } = req.body;

    const article = {
        Title,
        Author,
        Resume,
        Content
    }

    console.log(article)

    Article.findByIdAndUpdate(_id, {
            $set: article
        })
        .then(response => {
            res.json({
                message: "Article Updated Succesfully"
            })
        })
        .catch(error => {
            console.error(error)
            res.json({
                message: "An error Occured!"
            })
        })
}

//delete Article by id
const remove = (req, res, next) => {
    // get the article id
    let articleID = req.params.articleID;

    Article.findByIdAndRemove(articleID)
        .then(response => {
            res.redirect('/api/articles/');
        })
        .catch(error => {
            res.json({
                message: "An error Occured!"
            })
        })
}

function truncateText(text) {
    // Split the text into an array of words
    const words = text.split(' ');

    // Check if the text has more than 10 words
    if (words.length > 10) {
        // Return the first 10 words followed by an ellipsis
        return words.slice(0, 10).join(' ') + '...';
    } else {
        // Return the original text
        return text;
    }
}


module.exports = {
    show,
    store,
    update,
    index,
    remove,
    show1
}