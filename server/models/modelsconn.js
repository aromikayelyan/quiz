import User from './user.js';
import Quiz from './quiz.js';
import QuizHistory from './quizhistory.js';

// 1. Many-to-Many через таблицу UserQuizzes

// 2. One-to-Many: User → QuizHistory
User.hasMany(QuizHistory, { foreignKey: 'useruid', sourceKey: 'uid' });
// QuizHistory.belongsTo(User, { foreignKey: 'useruid', targetKey: 'uid' });





// 3. One-to-Many: Quiz → QuizHistory

export { User, Quiz, QuizHistory }