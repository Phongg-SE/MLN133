import { QUESTIONS_DATA, LEVEL_NAMES, type Question } from '../data/questions';

export class QuestionService {
  /**
   * Get level metadata (1, 2, or 3)
   */
  static getLevelMetadata(level: number) {
    return LEVEL_NAMES[level] || LEVEL_NAMES[1];
  }

  /**
   * Get random question for a specific level (1, 2, 3) excluding used questions
   */
  static getRandomQuestion(level: number, usedIds: number[] = []): Question | null {
    const levelQuestions = QUESTIONS_DATA.filter(
      (q) => q.level === level && !usedIds.includes(q.id)
    );

    if (levelQuestions.length === 0) {
      // If all questions in this level were used, reset pool for this level
      const allLevelQuestions = QUESTIONS_DATA.filter((q) => q.level === level);
      if (allLevelQuestions.length === 0) return null;
      const randIdx = Math.floor(Math.random() * allLevelQuestions.length);
      return allLevelQuestions[randIdx];
    }

    const randomIndex = Math.floor(Math.random() * levelQuestions.length);
    return levelQuestions[randomIndex];
  }

  /**
   * Validate user selected answer option
   */
  static validateAnswer(questionId: number, selectedIndex: number): {
    isCorrect: boolean;
    correctAnswer: number;
    explanation: string;
    advisor?: string;
  } {
    const question = QUESTIONS_DATA.find((q) => q.id === questionId);
    if (!question) {
      return {
        isCorrect: false,
        correctAnswer: 0,
        explanation: 'Không tìm thấy thông tin câu hỏi.',
      };
    }

    const isCorrect = selectedIndex === question.correctAnswer;

    return {
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      advisor: question.advisor,
    };
  }

  /**
   * Get total number of questions for level
   */
  static getTotalQuestionsCount(level?: number): number {
    if (level) {
      return QUESTIONS_DATA.filter((q) => q.level === level).length;
    }
    return QUESTIONS_DATA.length;
  }
}
