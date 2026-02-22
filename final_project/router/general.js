const express = require('express');
const axios = require('axios');
const router = express.Router();

let books = {
    "1": { "title": "Things Fall Apart", "author": "Chinua Achebe", "reviews": {} },
    "2": { "title": "Harry Potter and the Sorcerer's Stone", "author": "J.K. Rowling", "reviews": {} },
    "3": { "title": "The Lord of the Rings", "author": "J.R.R. Tolkien", "reviews": {} },
    // ... add remaining books
};

// Get all books
router.get('/', async (req, res) => {
    try {
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// Get book by ISBN
router.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.json(books[isbn]);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Get books by author
router.get('/author/:author', async (req, res) => {
    const author = decodeURIComponent(req.params.author);
    let result = {};
    let counter = 1;
    for (let key in books) {
        if (books[key].author.toLowerCase() === author.toLowerCase()) {
            result[counter++] = books[key];
        }
    }
    res.json(result);
});

// Get books by title
router.get('/title/:title', async (req, res) => {
    const title = decodeURIComponent(req.params.title);
    let result = {};
    let counter = 1;
    for (let key in books) {
        if (books[key].title.toLowerCase() === title.toLowerCase()) {
            result[counter++] = books[key];
        }
    }
    res.json(result);
});

module.exports = router;
