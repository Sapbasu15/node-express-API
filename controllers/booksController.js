function booksController(Book) {
  function post(req, res) {
    if (!req.body || !req.body.title) {
      res.status(400);
      return res.send("Title is required");
    }
    const book = new Book(req.body);
    book.save();
    res.status(201);
    return res.json(book);
  }

  function get(req, res) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.json(err);
      }
      const newBooks = books.map(book => {
        const newBook = book.toJSON();
        newBook.links = {};
        newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
        return newBook;
      });
      return res.json(newBooks);
    });
  }

  return { post, get };
}

module.exports = booksController;
