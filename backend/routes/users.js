const express = require('express');
const { db } = require('../firebase');
const router = express.Router();

router.get('/:id/stats', async (req, res) => {
  const userId = req.params.id;
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(userDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/quiz-results', (req, res) => {
  const userId = req.params.id;

  // TODO: Fetch quiz results from database
  const mockResults = [
    { courseName: 'Cosmos', score: 8, totalQuestions: 10 },
    { courseName: 'Physics', score: 7, totalQuestions: 10 },
  ];

  console.log(`Fetching quiz results for user ${userId}`);
  res.status(200).json(mockResults);
});

router.post('/:id/quiz-results', async (req, res) => {
  const userId = req.params.id;
  const { score, courseName } = req.body;

  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      await userRef.set({ coins: 0, quizzesCompleted: 0, quizResults: [] });
    }

    await userRef.update({
      coins: admin.firestore.FieldValue.increment(score),
      quizzesCompleted: admin.firestore.FieldValue.increment(1),
      quizResults: admin.firestore.FieldValue.arrayUnion({
        courseName,
        score,
        date: new Date().toISOString(),
      }),
    });

    res.status(200).json({ message: 'Quiz results saved successfully' });
  } catch (error) {
    console.error('Error saving quiz results:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
