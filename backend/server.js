import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authorsRouter from './routes/authors.js';
 
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Connection error:', err));

// Routes
app.use('/api/authors', authorsRouter);

// Test route
app.get('/', (req, res) => {
  console.log('Test route hit');
  res.send('Backend is running');
});

// Log for request body and incoming data
app.use((req, res, next) => {
  console.log('Request body:', req.body);
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
