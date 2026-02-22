const express = require('express');
const axios = require('axios');
const router = express.Router();

let books = {
    "1": { "title": "Things Fall Apart", "author": "Chinua Achebe", "reviews": {"user1":"Great classic!","user2":"A must read"} },
    "2": { "title": "Harry Potter and the Sorcerer's Stone", "author": "J.K. Rowling", "reviews": {} },
    "3": { "title": "The Lord of the Rings", "author": "J.R.R. Tolkien", "reviews": {} },
    "4": { "title": "The Alchemist", "author": "Paulo Coelho", "reviews": {} },
    "5": { "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "reviews": {} },
    "6": { "title": "Pride and Prejudice", "author": "Jane Austen", "reviews": {} },
    "7": { "title": "1984", "author": "George Orwell", "reviews": {} },
    "8": { "title": "To Kill a Mockingbird", "author": "Harper Lee", "reviews": {} },
    "9": { "title": "Moby Dick", "author": "Herman Melville", "reviews": {} },
    "10": { "title": "War and Peace", "author": "Leo Tolstoy", "reviews": {} }
};

// Get all books
router.get('/', async (req, res) => {
    try {
        res.json(books);
    } catch (err) {
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
    const author = decodeURIComponent(req.params.author).toLowerCase();
    let result = {};
    let count = 1;
    for (let key in books) {
        if (books[key].author.toLowerCase() === author) {
            result[count++] = books[key];
        }
    }
    res.json(result);
});

// Get books by title
router.get('/title/:title', async (req, res) => {
    const title = decodeURIComponent(req.params.title).toLowerCase();
    let result = {};
    let count = 1;
    for (let key in books) {
        if (books[key].title.toLowerCase() === title) {
            result[count++] = books[key];
        }
    }
    res.json(result);
});

module.exports = router;
