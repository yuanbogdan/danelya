const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Quiz App Backend is running');
});

const courseRoutes = require('./routes/courses');
const userRoutes = require('./routes/users');

app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);

// TODO: Add routes for courses, quizzes, and user stats

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
