import { QUESTIONS_DATA, CHAPTER_NAMES, type Question } from '../data/questions';

export interface LevelInfo {
  level: number;
  name: string;
  questionCount: number;
  unlocked: boolean;
  stars: number; // 0 to 3
}

export class QuestionService {
  /**
   * Get list of all chapters/levels metadata
   */
  static getChapters(): LevelInfo[] {
    return Object.keys(CHAPTER_NAMES).map((lvlStr) => {
      const lvl = parseInt(lvlStr, 10);
      const count = QUESTIONS_DATA.filter((q) => q.level === lvl).length;
      return {
        level: lvl,
        name: CHAPTER_NAMES[lvl],
        questionCount: count,
        unlocked: lvl === 1, // default level 1 unlocked
        stars: 0,
      };
    });
  }

  /**
   * Get all questions for a specific level
   */
  static getQuestionsByLevel(level: number): Question[] {
    return QUESTIONS_DATA.filter((q) => q.level === level);
  }

  /**
   * Get a random question for a specific level, excluding already used IDs
   */
  static getRandomQuestion(level: number, usedIds: number[] = []): Question | null {
    const available = QUESTIONS_DATA.filter(
      (q) => q.level === level && !usedIds.includes(q.id)
    );
    if (available.length === 0) {
      const allForLevel = QUESTIONS_DATA.filter((q) => q.level === level);
      if (allForLevel.length === 0) return null;
      const randIdx = Math.floor(Math.random() * allForLevel.length);
      return allForLevel[randIdx];
    }
    const randIdx = Math.floor(Math.random() * available.length);
    return available[randIdx];
  }

  /**
   * Validate answer for a question
   */
  static validateAnswer(
    questionId: number,
    selectedIndex: number
  ): {
    isCorrect: boolean;
    correctAnswer: number;
    explanation: string;
    question: Question | undefined;
  } {
    const question = QUESTIONS_DATA.find((q) => q.id === questionId);
    if (!question) {
      return {
        isCorrect: false,
        correctAnswer: -1,
        explanation: 'Không tìm thấy câu hỏi!',
        question: undefined,
      };
    }

    const isCorrect = selectedIndex === question.correctAnswer;
    return {
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      question,
    };
  }

  /**
   * Get chapter name by level index
   */
  static getChapterName(level: number): string {
    return CHAPTER_NAMES[level] || `Chương ${level}`;
  }
}
