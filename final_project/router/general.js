// router/general.js

const express = require('express');
const router = express.Router();
const axios = require('axios');

// Sample in-memory "database" of books
let books = {
  "1": {
    "title": "Things Fall Apart",
    "author": "Chinua Achebe",
    "reviews": {
      "user1": "Great classic!",
      "user2": "A must read"
    }
  },
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
    res.status(500).json({ error: "Unable to fetch books" });
  }
});

// Get book by ISBN
router.get('/isbn/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    if (books[isbn]) {
      res.json(books[isbn]);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch book" });
  }
});

// Get books by author
router.get('/author/:author', async (req, res) => {
  try {
    const authorQuery = req.params.author.toLowerCase();
    let result = {};
    Object.keys(books).forEach((isbn) => {
      if (books[isbn].author.toLowerCase() === authorQuery) {
        result[isbn] = books[isbn];
      }
    });
    if (Object.keys(result).length > 0) {
      res.json(result);
    } else {
      res.status(404).json({ message: "No books found by this author" });
    }
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch books" });
  }
});

// Get books by title
router.get('/title/:title', async (req, res) => {
  try {
    const titleQuery = req.params.title.toLowerCase();
    let result = {};
    Object.keys(books).forEach((isbn) => {
      if (books[isbn].title.toLowerCase() === titleQuery) {
        result[isbn] = books[isbn];
      }
    });
    if (Object.keys(result).length > 0) {
      res.json(result);
    } else {
      res.status(404).json({ message: "No books found with this title" });
    }
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch books" });
  }
});

// Get book reviews
router.get('/review/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    if (books[isbn]) {
      res.json({
        [isbn]: books[isbn]
      });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch review" });
  }
});

module.exports = router;
