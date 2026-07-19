import { QUESTIONS_DATA, type Question } from '../data/questions';

export interface ChapterMeta {
  id: number;
  stageId: number;
  stageName: string;
  chapterTitle: string;
  subTitle: string;
  targetXp: number;
  timerPerQ: number;
}

export const CHAPTER_METADATA: Record<number, ChapterMeta> = {
  1: {
    id: 1,
    stageId: 1,
    stageName: "GIAI ĐOẠN 1: CÔNG XƯỞNG THẾ KỶ XIX",
    chapterTitle: "Chương 1: Nhập môn CNXH Khoa học",
    subTitle: "Sự ra đời và các phát kiến vĩ đại của CNXH Khoa học",
    targetXp: 150,
    timerPerQ: 30,
  },
  2: {
    id: 2,
    stageId: 1,
    stageName: "GIAI ĐOẠN 1: CÔNG XƯỞNG THẾ KỶ XIX",
    chapterTitle: "Chương 2: Sứ mệnh Giai cấp Công nhân",
    subTitle: "Địa vị kinh tế - xã hội và vai trò đại công nghiệp",
    targetXp: 300,
    timerPerQ: 30,
  },
  3: {
    id: 3,
    stageId: 2,
    stageName: "GIAI ĐOẠN 2: NGHỊ TRƯỜNG CÁCH MẠNG",
    chapterTitle: "Chương 3: CNXH & Thời kỳ Quá độ",
    subTitle: "Đặc trưng CNXH & con đường quá độ gián tiếp",
    targetXp: 450,
    timerPerQ: 20,
  },
  4: {
    id: 4,
    stageId: 2,
    stageName: "GIAI ĐOẠN 2: NGHỊ TRƯỜNG CÁCH MẠNG",
    chapterTitle: "Chương 4: Dân chủ & Nhà nước XHCN",
    subTitle: "Bản tính dân chủ XHCN & Nhà nước pháp quyền",
    targetXp: 600,
    timerPerQ: 20,
  },
  5: {
    id: 5,
    stageId: 3,
    stageName: "GIAI ĐOẠN 3: BẢN LÀNG & MÁI ẤM HIỆN ĐẠI",
    chapterTitle: "Chương 5: Cơ cấu Xã hội - Giai cấp",
    subTitle: "Khối liên minh Công - Nông - Trí thức",
    targetXp: 750,
    timerPerQ: 15,
  },
  6: {
    id: 6,
    stageId: 3,
    stageName: "GIAI ĐOẠN 3: BẢN LÀNG & MÁI ẤM HIỆN ĐẠI",
    chapterTitle: "Chương 6: Vấn đề Dân tộc & Tôn giáo",
    subTitle: "Cương lĩnh dân tộc & chính sách tự do tôn giáo",
    targetXp: 900,
    timerPerQ: 15,
  },
  7: {
    id: 7,
    stageId: 3,
    stageName: "GIAI ĐOẠN 3: BẢN LÀNG & MÁI ẤM HIỆN ĐẠI",
    chapterTitle: "Chương 7: Vấn đề Gia đình XHCN",
    subTitle: "Chế độ hôn nhân tiến bộ & xây dựng gia đình hạnh phúc",
    targetXp: 1000,
    timerPerQ: 15,
  },
};

export class QuestionService {
  /**
   * Get metadata for a specific chapter (1 to 7)
   */
  static getChapterMeta(chapterId: number): ChapterMeta {
    return CHAPTER_METADATA[chapterId] || CHAPTER_METADATA[1];
  }

  /**
   * Get random question for a specific chapter (1 to 7) excluding used questions
   */
  static getRandomQuestion(chapterId: number, usedIds: number[] = []): Question | null {
    const chapterQuestions = QUESTIONS_DATA.filter(
      (q) => q.chapter === chapterId && !usedIds.includes(q.id)
    );

    if (chapterQuestions.length === 0) {
      const allChapterQuestions = QUESTIONS_DATA.filter((q) => q.chapter === chapterId);
      if (allChapterQuestions.length === 0) {
        // Fallback to any question
        const fallbackIdx = Math.floor(Math.random() * QUESTIONS_DATA.length);
        return QUESTIONS_DATA[fallbackIdx];
      }
      const randIdx = Math.floor(Math.random() * allChapterQuestions.length);
      return allChapterQuestions[randIdx];
    }

    const randomIndex = Math.floor(Math.random() * chapterQuestions.length);
    return chapterQuestions[randomIndex];
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
   * Get chapter name string
   */
  static getChapterName(chapterId: number): string {
    return CHAPTER_METADATA[chapterId]?.chapterTitle || `Chương ${chapterId}`;
  }
}
