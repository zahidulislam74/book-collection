const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let books = [];

// parse JSON request bodies
app.use(express.json());

// Route for getting the list of books
app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  // Generate a unique ID for the book
  const id = Date.now().toString();

  // Extract book information from the request body
  const { title, author, publishedDate } = req.body;

  // Create a new book object and add it to the collection
  const book = { id, title, author, publishedDate };
  books.push(book);

  // Send the book object as a response
  res.json(book);
});

// Route for deleting a book from the collection
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  // Find the book with the specified ID
  const bookIndex = books.findIndex((book) => book.id === req.params.id);

  // If the book was found, remove it from the collection and send a success message
  if (bookIndex >= 0) {
    books.splice(bookIndex, 1);
    res.json({ message: `Book with ID: ${id} deleted successfully` });
  }
  // Otherwise, send an error message
  else {
    res.status(404).json({ message: `Book with ID: ${id} not  found` });
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log(`Server started on port ${port}`);
});
