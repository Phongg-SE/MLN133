import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeaderHUD } from '../../components/HUD/HeaderHUD';
import { DialecticalWheel, type Sector } from '../../components/Wheel/DialecticalWheel';
import { TacticalCard, type CardItem } from '../../components/Card/TacticalCard';
import { InventoryBar, DEFAULT_INVENTORY_ITEMS, type InventoryItem } from '../../components/Inventory/InventoryBar';
import { GameButton } from '../../components/Button/GameButton';
import { PauseModal } from '../../components/Modal/PauseModal';
import { GuideModal } from '../../components/Modal/GuideModal';
import { QuestionService } from '../../services/QuestionService';
import type { Question } from '../../data/questions';
import { AudioService } from '../../services/AudioService';
import { Sparkles, CheckCircle2, XCircle, AlertTriangle, ArrowRight, Eye, Shield, Zap } from 'lucide-react';
import './GameplayScreen.css';

export interface GameplayScreenProps {
  level: number;
  onVictory: (stats: { xpGained: number; hpLeft: number; stars: number }) => void;
  onGameOver: () => void;
  onHomeClick: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
}

export type DynamicPanelType = 'welcome' | 'question' | 'lucky' | 'crisis';

export interface CrisisScenario {
  id: number;
  title: string;
  dilemma: string;
  option1: {
    label: string;
    outcomeTitle: string;
    outcomeText: string;
    effectText: string;
    isSuccess: boolean;
    xpDelta: number;
    hpDelta: number;
  };
  option2: {
    label: string;
    outcomeTitle: string;
    outcomeText: string;
    effectText: string;
    isSuccess: boolean;
    xpDelta: number;
    hpDelta: number;
  };
}

export const CRISIS_EVENTS_LIST: CrisisScenario[] = [
  {
    id: 1,
    title: '⚠️ THỬ THÁCH MÂU THUẪN PHƯƠNG THỨC SẢN XUẤT',
    dilemma: 'Phương thức sản xuất cũ xuất hiện mâu thuẫn đối kháng giữa Lực lượng sản xuất mới và Quan hệ sản xuất bất cập!',
    option1: {
      label: 'CẢI CÁCH TIẾN BỘ',
      outcomeTitle: '✅ CẢI CÁCH TIẾN BỘ THÀNH CÔNG',
      outcomeText: 'Nhờ giải quyết mâu thuẫn theo quy luật biện chứng, bạn đã mở đường cho lực lượng sản xuất phát triển bứt phá!',
      effectText: '+15 XP Tri thức',
      isSuccess: true,
      xpDelta: 15,
      hpDelta: 0,
    },
    option2: {
      label: 'DUY TRÌ TÀN DƯ',
      outcomeTitle: '❌ BẢO THỦ TÀN DƯ GÂY TỔN HẠI',
      outcomeText: 'Níu kéo quan hệ sản xuất cũ làm nảy sinh mâu thuẫn trịch thượng, gây cản trở sự phát triển!',
      effectText: '-15 HP Sinh lực',
      isSuccess: false,
      xpDelta: 0,
      hpDelta: -15,
    },
  },
  {
    id: 2,
    title: '⚠️ KHỦNG HOẢNG TƯ TƯỞNG TỰ PHÁT',
    dilemma: 'Phong trào đấu tranh của công nhân bùng nổ rầm rộ nhưng còn mang tính tự phát, thiếu hệ thống lý luận soi đường!',
    option1: {
      label: 'TRANG BỊ LÝ LUẬN MÁC-LÊNIN',
      outcomeTitle: '✅ GIẢI PHÁP TIÊN PHONG CHÍNH XÁC',
      outcomeText: 'Lý luận khoa học giúp phong trào chuyển biến từ tự phát sang tự giác, nâng cao bản lĩnh chiến đấu!',
      effectText: '+15 XP Tri thức',
      isSuccess: true,
      xpDelta: 15,
      hpDelta: 0,
    },
    option2: {
      label: 'ĐỂ PHONG TRÀO TỰ TÚC',
      outcomeTitle: '❌ THẤT BẠI DO THIẾU ĐỊNH HƯỚNG',
      outcomeText: 'Thiếu đội tiên phong và lý luận dẫn đường khiến phong trào dễ bị chia rẽ và tổn thất lực lượng!',
      effectText: '-15 HP Sinh lực',
      isSuccess: false,
      xpDelta: 0,
      hpDelta: -15,
    },
  },
  {
    id: 3,
    title: '⚠️ THỬ THÁCH LIÊN MINH GIAI CẤP',
    dilemma: 'Xuất hiện nguy cơ rạn nứt khối đại đoàn kết giữa Giai cấp Công nhân và Giai cấp Nông dân trong xây dựng kinh tế!',
    option1: {
      label: 'TĂNG CƯỜNG LIÊN MINH CÔNG - NÔNG',
      outcomeTitle: '✅ CỦNG CỐ KHỐI ĐẠI ĐOÀN KẾT',
      outcomeText: 'Gắn kết lợi ích kinh tế công - nông giúp tạo nên nền tảng chính trị - xã hội vững chắc!',
      effectText: '+15 XP Tri thức',
      isSuccess: true,
      xpDelta: 15,
      hpDelta: 0,
    },
    option2: {
      label: 'ÁP ĐẶT MỘT PHÍA',
      outcomeTitle: '❌ RẠN NỨT KHỐI LIÊN MINH',
      outcomeText: 'Vi phạm nguyên tắc hài hòa lợi ích làm suy giảm niềm tin và suy yếu khối đại đoàn kết toàn dân!',
      effectText: '-15 HP Sinh lực',
      isSuccess: false,
      xpDelta: 0,
      hpDelta: -15,
    },
  },
  {
    id: 4,
    title: '⚠️ THÁCH THỨC DÂN TỘC & TÔN GIÁO',
    dilemma: 'Các thế lực phản động âm mưu lợi dụng vấn đề sắc tộc và tôn giáo để kích động chia rẽ nhân dân!',
    option1: {
      label: 'THỰC HIỆN BÌNH ĐẲNG, ĐOÀN KẾT DÂN TỘC',
      outcomeTitle: '✅ BẢO VỆ KHỐI ĐẠI ĐOÀN KẾT DÂN TỘC',
      outcomeText: 'Chính sách dân tộc tôn trọng, bình đẳng, giúp đỡ nhau cùng phát triển đã đập tan âm mưu chia rẽ!',
      effectText: '+20 XP Tri thức',
      isSuccess: true,
      xpDelta: 20,
      hpDelta: 0,
    },
    option2: {
      label: 'ĐỒNG HÓA CƯỠNG BỨC',
      outcomeTitle: '❌ BẤT ỔN SẮC TỘC NÂY SINH',
      outcomeText: 'Đồng hóa cưỡng bức vi phạm nguyên tắc bình đẳng dân tộc, gây nên nguy cơ mâu thuẫn xã hội gay gắt!',
      effectText: '-20 HP Sinh lực',
      isSuccess: false,
      xpDelta: 0,
      hpDelta: -20,
    },
  },
  {
    id: 5,
    title: '⚠️ BIẾN ĐỔI GIA ĐÌNH TRONG KINH TẾ THỊ TRƯỜNG',
    dilemma: 'Mặt trái của kinh tế thị trường gây áp lực lớn, đứng trước nguy cơ gia tăng ly hôn và phai nhạt tình cảm gia đình!',
    option1: {
      label: 'XÂY DỰNG GIA ĐÌNH VĂN MINH, HẠNH PHÚC',
      outcomeTitle: '✅ NÂNG CAO GIÁ TRỊ GIA ĐÌNH XHCN',
      outcomeText: 'Kết hợp truyền thống hiếu thảo với tinh thần dân chủ hiện đại giúp xây dựng gia đình no ấm, tiến bộ!',
      effectText: '+15 XP Tri thức',
      isSuccess: true,
      xpDelta: 15,
      hpDelta: 0,
    },
    option2: {
      label: 'XEM XÂY DỰNG GIA ĐÌNH LÀ VIỆC RIÊNG',
      outcomeTitle: '❌ PHAI NHẠT TÌNH CẢM GIA ĐÌNH',
      outcomeText: 'Buông lỏng công tác giáo dục và chính sách an sinh làm phai nhạt nền tảng văn hóa gia đình!',
      effectText: '-15 HP Sinh lực',
      isSuccess: false,
      xpDelta: 0,
      hpDelta: -15,
    },
  },
  {
    id: 6,
    title: '⚠️ THỬ THÁCH THỜI KỲ QUÁ ĐỘ BỎ QUA TBCN',
    dilemma: 'Đất nước trong thời kỳ quá độ đứng trước nguy cơ đóng cửa cô lập hoặc tiếp thu thành tựu văn minh nhân loại!',
    option1: {
      label: 'KẾ THỪA THÀNH TỰU KHOA HỌC NHÂN LOẠI',
      outcomeTitle: '✅ ĐỘT PHÁ PHÁT TRIỂN NỀN KINH TẾ',
      outcomeText: 'Bỏ qua sự thống trị TBCN nhưng chủ động tiếp thu thành tựu khoa học công nghệ giúp tăng tốc hiện đại hóa!',
      effectText: '+20 XP Tri thức',
      isSuccess: true,
      xpDelta: 20,
      hpDelta: 0,
    },
    option2: {
      label: 'BÀI TRỪ CÔ LẬP NỀN KINH TẾ',
      outcomeTitle: '❌ NỀN KINH TẾ TRÌ TRỆ',
      outcomeText: 'Từ bỏ việc tiếp thu thành tựu công nghệ làm cho lực lượng sản xuất chậm phát triển và tụt hậu!',
      effectText: '-20 HP Sinh lực',
      isSuccess: false,
      xpDelta: 0,
      hpDelta: -20,
    },
  },
];

export const SAMPLE_LUCKY_CARDS: CardItem[] = [
  {
    id: 'card1',
    title: 'Hồi Phục Sinh Lực',
    subtitle: 'Năng lượng Biện chứng',
    description: 'Hồi ngay +20 điểm HP sinh lực cho người chơi.',
    type: 'buff',
    icon: <Shield size={32} color="#66BB6A" />,
    valueEffect: '+20 HP',
  },
  {
    id: 'card2',
    title: 'Tích Lũy Tri Thức',
    subtitle: 'Lượng biến đổi Chất',
    description: 'Thưởng nhẹ +15 điểm XP kinh nghiệm lý luận.',
    type: 'special',
    icon: <Zap size={32} color="#FFD700" />,
    valueEffect: '+15 XP',
  },
  {
    id: 'card3',
    title: 'Kế Thừa Tiến Bộ',
    subtitle: 'Phủ định của Phủ định',
    description: 'Tặng 1 thẻ Gợi ý 50/50 vào khay vật phẩm.',
    type: 'buff',
    icon: <Eye size={32} color="#00E5FF" />,
    valueEffect: '+1 ITEM',
  },
];

export const GameplayScreen: React.FC<GameplayScreenProps> = ({
  level,
  onVictory,
  onGameOver,
  onHomeClick,
  isAudioMuted,
  onToggleAudio,
}) => {
  // Game Stats
  const [hp, setHp] = useState<number>(100);
  const maxHp = 100;
  const [xp, setXp] = useState<number>(0);
  const maxXp = 100;
  const [timer, setTimer] = useState<number>(120);
  const maxTimer = 120;
  const [score, setScore] = useState<number>(0);

  // Pause State & Modals
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Dynamic Panel State
  const [panelState, setPanelState] = useState<DynamicPanelType>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerResult, setAnswerResult] = useState<{
    isCorrect: boolean;
    correctAnswer: number;
    explanation: string;
  } | null>(null);

  // Crisis Scenario & Outcome State
  const [currentCrisis, setCurrentCrisis] = useState<CrisisScenario>(CRISIS_EVENTS_LIST[0]);
  const [crisisOutcome, setCrisisOutcome] = useState<{
    title: string;
    text: string;
    effectText: string;
    isSuccess: boolean;
  } | null>(null);

  // Cards State
  const [flippedCardIdx, setFlippedCardIdx] = useState<number | null>(null);

  // Inventory State
  const [inventory, setInventory] = useState<InventoryItem[]>(DEFAULT_INVENTORY_ITEMS);
  const [active5050, setActive5050] = useState<boolean>(false);
  const [activeShield, setActiveShield] = useState<boolean>(false);
  const [activeDoubleXp, setActiveDoubleXp] = useState<boolean>(false);

  const chapterTitle = QuestionService.getChapterName(level);

  // Pause Countdown Timer when paused or answering / viewing popup (ONLY run when panelState === 'welcome' and !isPaused)
  useEffect(() => {
    if (panelState !== 'welcome' || isPaused) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [panelState, isPaused, onGameOver]);

  // Handle Wheel Spin Result
  const handleSpinComplete = (sector: Sector) => {
    setSelectedOption(null);
    setAnswerResult(null);
    setFlippedCardIdx(null);
    setActive5050(false);
    setCrisisOutcome(null);

    if (sector.type === 'question' || sector.type === 'buff') {
      const q = QuestionService.getRandomQuestion(level, usedQuestionIds);
      if (q) {
        setCurrentQuestion(q);
        setUsedQuestionIds((prev) => [...prev, q.id]);
        setPanelState('question');
      } else {
        setPanelState('lucky');
      }
    } else if (sector.type === 'lucky') {
      setPanelState('lucky');
    } else if (sector.type === 'crisis') {
      // Pick a random crisis scenario from CRISIS_EVENTS_LIST
      const randomCrisis = CRISIS_EVENTS_LIST[Math.floor(Math.random() * CRISIS_EVENTS_LIST.length)];
      setCurrentCrisis(randomCrisis);
      setPanelState('crisis');
    }
  };

  // Option Select Handler
  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null || !currentQuestion) return;

    setSelectedOption(idx);
    const result = QuestionService.validateAnswer(currentQuestion.id, idx);
    setAnswerResult(result);

    if (result.isCorrect) {
      AudioService.playCorrect();
      const xpEarned = activeDoubleXp ? 50 : 25;
      const newXp = xp + xpEarned;
      setXp(newXp);
      setScore((prev) => prev + 100);
      setActiveDoubleXp(false);

      if (newXp >= maxXp) {
        setTimeout(() => {
          onVictory({ xpGained: newXp, hpLeft: hp, stars: 3 });
        }, 1500);
      }
    } else {
      AudioService.playWrong();
      if (activeShield) {
        setActiveShield(false);
      } else {
        const newHp = Math.max(hp - 20, 0);
        setHp(newHp);
        if (newHp <= 0) {
          setTimeout(() => {
            onGameOver();
          }, 1500);
        }
      }
    }
  };

  // Card Flip Handler
  const handleCardFlip = (index: number) => {
    if (flippedCardIdx !== null) return;
    setFlippedCardIdx(index);
    const card = SAMPLE_LUCKY_CARDS[index];

    if (card.id === 'card1') {
      setHp((prev) => Math.min(prev + 20, maxHp));
    } else if (card.id === 'card2') {
      const newXp = xp + 15;
      setXp(newXp);
      if (newXp >= maxXp) {
        setTimeout(() => {
          onVictory({ xpGained: newXp, hpLeft: hp, stars: 3 });
        }, 1500);
      }
    } else if (card.id === 'card3') {
      setInventory((prev) =>
        prev.map((item) =>
          item.id === 'hint5050' ? { ...item, count: item.count + 1 } : item
        )
      );
    }
  };

  // Crisis Choice Handler
  const handleCrisisChoice = (choice: 'opt1' | 'opt2') => {
    if (crisisOutcome !== null) return;
    const choiceData = choice === 'opt1' ? currentCrisis.option1 : currentCrisis.option2;

    if (choiceData.isSuccess) {
      AudioService.playCorrect();
      const newXp = Math.min(xp + choiceData.xpDelta, maxXp);
      setXp(newXp);
      setCrisisOutcome({
        title: choiceData.outcomeTitle,
        text: choiceData.outcomeText,
        effectText: choiceData.effectText,
        isSuccess: true,
      });

      if (newXp >= maxXp) {
        setTimeout(() => {
          onVictory({ xpGained: newXp, hpLeft: hp, stars: 3 });
        }, 1500);
      }
    } else {
      AudioService.playWrong();
      const newHp = Math.max(hp + choiceData.hpDelta, 0);
      setHp(newHp);
      setCrisisOutcome({
        title: choiceData.outcomeTitle,
        text: choiceData.outcomeText,
        effectText: choiceData.effectText,
        isSuccess: false,
      });

      if (newHp <= 0) {
        setTimeout(() => {
          onGameOver();
        }, 1500);
      }
    }
  };

  // Use Item from Inventory
  const handleUseItem = (itemId: string) => {
    if (itemId === 'hint5050' && panelState === 'question' && currentQuestion) {
      setActive5050(true);
    } else if (itemId === 'hpShield') {
      setActiveShield(true);
    } else if (itemId === 'doubleXp') {
      setActiveDoubleXp(true);
    }

    setInventory((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, count: Math.max(item.count - 1, 0) } : item
      )
    );
  };

  return (
    <div className="gameplay-screen">
      {/* Top HUD */}
      <HeaderHUD
        hp={hp}
        maxHp={maxHp}
        xp={xp}
        maxXp={maxXp}
        timer={timer}
        maxTimer={maxTimer}
        level={level}
        chapterTitle={chapterTitle}
        score={score}
        onHomeClick={onHomeClick}
        onPauseClick={() => setIsPaused(true)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={onToggleAudio}
      />

      {/* Main Center Area */}
      <main className="gameplay-main">
        {/* Left Panel: Dialectical Wheel - ONLY enabled when panelState is 'welcome' and !isPaused */}
        <section className="gameplay-wheel-section">
          <DialecticalWheel
            onSpinComplete={handleSpinComplete}
            disabled={panelState !== 'welcome' || isPaused}
          />
        </section>

        {/* Right Panel: Dynamic Panel (Question / Lucky / Crisis) */}
        <section className="gameplay-dynamic-section glass-panel">
          <AnimatePresence mode="wait">
            {/* WELCOME / IDLE STATE */}
            {panelState === 'welcome' && (
              <motion.div
                key="welcome"
                className="dynamic-panel dynamic-panel--welcome"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="dynamic-panel__icon-ring">
                  <Sparkles size={48} color="#FFD700" />
                </div>
                <h2>SẴN SÀNG QUAY VÒNG QUAY BIỆN CHỨNG</h2>
                <p>
                  Nhấn nút <strong>QUAY BIỆN CHỨNG</strong> phía bên trái để kích hoạt các quy luật lý luận,
                  trả lời câu hỏi và tích lũy 100 XP để hoàn thành Màn {level}!
                </p>
                {activeShield && <div className="active-buff-badge">🛡️ KHIÊN BIỆN CHỨNG ĐANG KÍCH HOẠT</div>}
                {activeDoubleXp && <div className="active-buff-badge">⚡ NHÂN 2 XP ĐANG KÍCH HOẠT</div>}
              </motion.div>
            )}

            {/* QUESTION POPUP PANEL */}
            {panelState === 'question' && currentQuestion && (
              <motion.div
                key="question"
                className="dynamic-panel dynamic-panel--question"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <div className="question-header">
                  <span className="question-category">{currentQuestion.category}</span>
                  <span className="question-number font-number">Câu hỏi #{currentQuestion.id}</span>
                </div>

                <h3 className="question-text">{currentQuestion.question}</h3>

                {/* 4 Answer Options */}
                <div className="question-options">
                  {currentQuestion.options.map((opt, idx) => {
                    const optionLetter = String.fromCharCode(65 + idx);
                    let optionStatus: 'idle' | 'correct' | 'wrong' | 'hidden' = 'idle';

                    if (active5050 && idx !== currentQuestion.correctAnswer && idx === (currentQuestion.correctAnswer + 1) % 4) {
                      optionStatus = 'hidden';
                    }

                    if (selectedOption !== null && answerResult) {
                      if (idx === answerResult.correctAnswer) {
                        optionStatus = 'correct';
                      } else if (idx === selectedOption) {
                        optionStatus = 'wrong';
                      }
                    }

                    if (optionStatus === 'hidden') return null;

                    return (
                      <motion.button
                        key={idx}
                        className={`question-opt question-opt--${optionStatus} ${selectedOption === idx ? 'question-opt--selected' : ''}`}
                        whileHover={{ scale: selectedOption === null ? 1.02 : 1 }}
                        whileTap={{ scale: selectedOption === null ? 0.98 : 1 }}
                        onClick={() => handleSelectOption(idx)}
                        disabled={selectedOption !== null}
                      >
                        <span className="question-opt__letter font-number">{optionLetter}</span>
                        <span className="question-opt__text">{opt}</span>
                        {optionStatus === 'correct' && <CheckCircle2 size={22} color="#66BB6A" />}
                        {optionStatus === 'wrong' && <XCircle size={22} color="#EF5350" />}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Detailed Explanation Popup */}
                {answerResult && (
                  <motion.div
                    className={`explanation-box explanation-box--${answerResult.isCorrect ? 'correct' : 'wrong'}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <div className="explanation-title">
                      {answerResult.isCorrect ? '✅ ĐÁP ÁN CHÍNH XÁC!' : '❌ RẤT TIẾC, ĐÁP ÁN CHƯA ĐÚNG!'}
                    </div>
                    <p className="explanation-text">{answerResult.explanation}</p>
                    {currentQuestion.pageRef && (
                      <span className="explanation-page font-number">
                        📖 Giáo trình tham khảo: Trang {currentQuestion.pageRef}
                      </span>
                    )}

                    <div className="explanation-actions">
                      <GameButton
                        variant="primary"
                        size="md"
                        icon={<ArrowRight size={18} />}
                        onClick={() => setPanelState('welcome')}
                      >
                        TIẾP TỤC QUAY
                      </GameButton>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* LUCKY CARD PANEL */}
            {panelState === 'lucky' && (
              <motion.div
                key="lucky"
                className="dynamic-panel dynamic-panel--lucky"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <h3>🃏 THẺ MAY MẮN BIỆN CHỨNG</h3>
                <p>Hãy chọn lật 1 trong 3 lá bài để nhận hiệu ứng và phần thưởng tri thức!</p>

                <div className="lucky-cards-grid">
                  {SAMPLE_LUCKY_CARDS.map((card, idx) => (
                    <TacticalCard
                      key={card.id}
                      card={card}
                      isFlipped={flippedCardIdx === idx}
                      onFlip={() => handleCardFlip(idx)}
                      disabled={flippedCardIdx !== null}
                    />
                  ))}
                </div>

                {flippedCardIdx !== null && (
                  <motion.div
                    className="lucky-card-continue"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <GameButton
                      variant="primary"
                      size="md"
                      onClick={() => setPanelState('welcome')}
                    >
                      NHẬN PHẦN THƯỞNG & QUAY TIẾP
                    </GameButton>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* CRISIS EVENT PANEL (Randomized Scenarios) */}
            {panelState === 'crisis' && (
              <motion.div
                key="crisis"
                className="dynamic-panel dynamic-panel--crisis"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="crisis-icon-wrap">
                  <AlertTriangle size={48} color="#FF5252" />
                </div>
                <h3>{currentCrisis.title}</h3>
                <p>{currentCrisis.dilemma}</p>

                {crisisOutcome === null ? (
                  <div className="crisis-options">
                    <GameButton
                      variant="primary"
                      size="md"
                      onClick={() => handleCrisisChoice('opt1')}
                    >
                      {currentCrisis.option1.label}
                    </GameButton>

                    <GameButton
                      variant="danger"
                      size="md"
                      onClick={() => handleCrisisChoice('opt2')}
                    >
                      {currentCrisis.option2.label}
                    </GameButton>
                  </div>
                ) : (
                  <motion.div
                    className={`explanation-box explanation-box--${crisisOutcome.isSuccess ? 'correct' : 'wrong'}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <div className="explanation-title">{crisisOutcome.title}</div>
                    <p className="explanation-text">{crisisOutcome.text}</p>
                    <span className="explanation-page font-number">{crisisOutcome.effectText}</span>
                    <div className="explanation-actions">
                      <GameButton
                        variant="primary"
                        size="md"
                        icon={<ArrowRight size={18} />}
                        onClick={() => setPanelState('welcome')}
                      >
                        TIẾP TỤC QUAY
                      </GameButton>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Footer Inventory */}
      <InventoryBar
        items={inventory}
        onUseItem={handleUseItem}
        disabled={panelState !== 'question' && panelState !== 'welcome'}
      />

      {/* Pause Modal */}
      <PauseModal
        isOpen={isPaused}
        level={level}
        hp={hp}
        xp={xp}
        timer={timer}
        onResume={() => setIsPaused(false)}
        onOpenGuide={() => {
          setIsPaused(false);
          setIsGuideOpen(true);
        }}
        onHomeClick={onHomeClick}
      />

      {/* Guide Modal */}
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
};
