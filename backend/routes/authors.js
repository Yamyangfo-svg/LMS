// routes/authors.js
import express from 'express';
import Author from '../models/author.js'; // Adjust the path if needed

const router = express.Router();

/// CREATE — POST /api/authors
router.post('/', async (req, res) => {
  const { firstName, lastName, description } = req.body;

  try {
    const author = new Author({ firstName, lastName, description }); // ✅ Fixed line
    const newAuthor = await author.save(); // ✅ Save to DB
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/// READ ALL — GET /api/authors
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/// READ ONE — GET /api/authors/:id
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/// UPDATE — PUT /api/authors/:id
router.put('/:id', async (req, res) => {
  const { firstName, lastName, description } = req.body;

  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, description },
      { new: true }
    );
    if (!updatedAuthor) return res.status(404).json({ message: 'Author not found' });
    res.json(updatedAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/// DELETE — DELETE /api/authors/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) return res.status(404).json({ message: 'Author not found' });
    res.json({ message: 'Author deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
