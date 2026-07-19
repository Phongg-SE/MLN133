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
import { Sparkles, CheckCircle2, XCircle, AlertTriangle, ArrowRight, Eye, Shield, Zap, UserCheck } from 'lucide-react';
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
    title: '⚠️ KHỦNG HOẢNG MÂU THUẪN PHƯƠNG THỨC SẢN XUẤT',
    dilemma: 'Tại Đông Dương Quốc, quan hệ sản xuất cũ bất cập cản trở lực lượng sản xuất mới bứt phá!',
    option1: {
      label: 'CẢI CÁCH PHƯƠNG THỨC SẢN XUẤT TIẾN BỘ',
      outcomeTitle: '✅ CẢI CÁCH TIẾN BỘ THÀNH CÔNG',
      outcomeText: 'Vận dụng đúng quy luật mâu thuẫn biện chứng, mở đường cho lực lượng sản xuất bứt phá!',
      effectText: '+30 XP Tri thức',
      isSuccess: true,
      xpDelta: 30,
      hpDelta: 0,
    },
    option2: {
      label: 'DUY TRÌ TÀN DƯ CŨ',
      outcomeTitle: '❌ NÍU KÉO BẢO THỦ GÂY TỔN HẠI',
      outcomeText: 'Níu kéo mô hình cũ làm nảy sinh mâu thuẫn gay gắt, làm suy yếu ổn định xã hội!',
      effectText: '-20 HP Sinh lực',
      isSuccess: false,
      xpDelta: 0,
      hpDelta: -20,
    },
  },
  {
    id: 2,
    title: '⚠️ KHỦNG HOẢNG TƯ TƯỞNG TỰ PHÁT',
    dilemma: 'Phong trào quần chúng nổ ra tự phát, chưa có hệ thống lý luận Mác - Lênin soi đường!',
    option1: {
      label: 'TRANG BỊ LÝ LUẬN KHOA HỌC',
      outcomeTitle: '✅ GIẢI PHÁP TIÊN PHONG CHÍNH XÁC',
      outcomeText: 'Lý luận khoa học giúp phong trào chuyển từ tự phát sang tự giác, nâng cao bản lĩnh!',
      effectText: '+30 XP Tri thức',
      isSuccess: true,
      xpDelta: 30,
      hpDelta: 0,
    },
    option2: {
      label: 'ĐỂ PHONG TRÀO TỰ TÚC',
      outcomeTitle: '❌ THẤT BẠI DO THIẾU ĐỊNH HƯỚNG',
      outcomeText: 'Thiếu đội tiên phong và lý luận dẫn đường khiến phong trào tổn thất lực lượng!',
      effectText: '-20 HP Sinh lực',
      isSuccess: false,
      xpDelta: 0,
      hpDelta: -20,
    },
  },
  {
    id: 3,
    title: '⚠️ THỬ THÁCH LIÊN MINH GIAI CẤP',
    dilemma: 'Nguy cơ rạn nứt khối đại đoàn kết giữa Giai cấp Công nhân và Giai cấp Nông dân!',
    option1: {
      label: 'TĂNG CƯỜNG LIÊN MINH CÔNG - NÔNG - TRÍ',
      outcomeTitle: '✅ CỦNG CỐ KHỐI ĐẠI ĐOÀN KẾT',
      outcomeText: 'Gắn kết lợi ích kinh tế công - nông - trí tạo nên nền tảng chính trị - xã hội vững chắc!',
      effectText: '+30 XP Tri thức',
      isSuccess: true,
      xpDelta: 30,
      hpDelta: 0,
    },
    option2: {
      label: 'ÁP ĐẶT MỘT PHÍA',
      outcomeTitle: '❌ RẠN NỨT KHỐI LIÊN MINH',
      outcomeText: 'Vi phạm nguyên tắc hài hòa lợi ích làm suy giảm niềm tin toàn dân!',
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
    subtitle: 'Ổn định Xã hội (HP)',
    description: 'Hồi ngay +25 điểm HP sinh lực cho Đông Dương Quốc.',
    type: 'buff',
    icon: <Shield size={32} color="#66BB6A" />,
    valueEffect: '+25 HP',
  },
  {
    id: 'card2',
    title: 'Giác Ngộ Tri Thức',
    subtitle: 'Điểm Giác Ngộ (XP)',
    description: 'Thưởng ngay +30 điểm XP kinh nghiệm lý luận.',
    type: 'special',
    icon: <Zap size={32} color="#FFD700" />,
    valueEffect: '+30 XP',
  },
  {
    id: 'card3',
    title: 'Kiên Định Tư Tưởng',
    subtitle: 'Khiên Chặn HP (Passive)',
    description: 'Tặng 1 thẻ Kiên Định Tư Tưởng phòng vệ vào khay vật phẩm.',
    type: 'buff',
    icon: <Eye size={32} color="#00E5FF" />,
    valueEffect: '+1 THẺ KHIÊN',
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
  // GDD Level Target XP & Timer Configuration
  const levelMeta = QuestionService.getLevelMetadata(level);
  const maxXp = levelMeta.targetXp; // 300 (Lvl 1), 600 (Lvl 2), 1000 (Lvl 3)
  const baseTimer = levelMeta.timerPerQ * 5; // Total countdown per level session

  // Game Stats
  const [hp, setHp] = useState<number>(100);
  const maxHp = 100;
  const [xp, setXp] = useState<number>(0);
  const [timer, setTimer] = useState<number>(baseTimer);
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
    advisor?: string;
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

  // Inventory & Card Active Statuses
  const [inventory, setInventory] = useState<InventoryItem[]>(DEFAULT_INVENTORY_ITEMS);
  const [active5050, setActive5050] = useState<boolean>(false);
  const [activeDoubleXp, setActiveDoubleXp] = useState<boolean>(false);

  // Countdown Timer Effect (Only run when panelState === 'welcome' and !isPaused)
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
      // GDD Card "Liên minh Công - Nông": xpMultiplier = 2 (+100 XP or +200 XP)
      const xpEarned = activeDoubleXp ? 100 : 50;
      const newXp = xp + xpEarned;
      setXp(newXp);
      setScore((prev) => prev + (activeDoubleXp ? 200 : 100));
      setActiveDoubleXp(false);

      if (newXp >= maxXp) {
        setTimeout(() => {
          onVictory({ xpGained: newXp, hpLeft: hp, stars: 3 });
        }, 1500);
      }
    } else {
      AudioService.playWrong();
      // GDD Card "Kiên định tư tưởng": Passive Shield blocks HP loss!
      const kienDinhCard = inventory.find((item) => item.id === 'kienDinhTuTuong');
      if (kienDinhCard && kienDinhCard.count > 0) {
        // Consume 1 passive shield card to block HP loss (HP -= 0)
        setInventory((prev) =>
          prev.map((item) =>
            item.id === 'kienDinhTuTuong' ? { ...item, count: item.count - 1 } : item
          )
        );
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
      setHp((prev) => Math.min(prev + 25, maxHp));
    } else if (card.id === 'card2') {
      const newXp = xp + 30;
      setXp(newXp);
      if (newXp >= maxXp) {
        setTimeout(() => {
          onVictory({ xpGained: newXp, hpLeft: hp, stars: 3 });
        }, 1500);
      }
    } else if (card.id === 'card3') {
      setInventory((prev) =>
        prev.map((item) =>
          item.id === 'kienDinhTuTuong' ? { ...item, count: item.count + 1 } : item
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
      // Check passive shield for crisis penalty
      const kienDinhCard = inventory.find((item) => item.id === 'kienDinhTuTuong');
      let actualHpDelta = choiceData.hpDelta;

      if (kienDinhCard && kienDinhCard.count > 0 && actualHpDelta < 0) {
        actualHpDelta = 0; // Block HP loss
        setInventory((prev) =>
          prev.map((item) =>
            item.id === 'kienDinhTuTuong' ? { ...item, count: item.count - 1 } : item
          )
        );
      }

      const newHp = Math.max(hp + actualHpDelta, 0);
      setHp(newHp);
      setCrisisOutcome({
        title: choiceData.outcomeTitle,
        text: choiceData.outcomeText,
        effectText: actualHpDelta === 0 ? '🛡️ THẺ KIÊN ĐỊNH TƯ TƯỞNG ĐÃ CHẶN TRỪ HP!' : choiceData.effectText,
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
    if (itemId === 'giacNgoLyLuan' && panelState === 'question' && currentQuestion) {
      setActive5050(true);
    } else if (itemId === 'keHoachHoa') {
      // GDD Card "Kế hoạch hóa tập trung": timer += 10s
      setTimer((prev) => prev + 10);
    } else if (itemId === 'lienMinhCongNong') {
      // GDD Card "Liên minh Công - Nông": xpMultiplier = 2
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
        maxTimer={baseTimer}
        level={level}
        chapterTitle={levelMeta.name}
        score={score}
        onHomeClick={onHomeClick}
        onPauseClick={() => setIsPaused(true)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={onToggleAudio}
      />

      {/* Main Center Area */}
      <main className="gameplay-main">
        {/* Left Panel: Dialectical Wheel */}
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
                <h2>CHÈO LÁI ĐÔNG DƯƠNG QUỐC — MÀN {level}</h2>
                <p>
                  Nhấn <strong>QUAY BIỆN CHỨNG</strong> phía bên trái để kích hoạt các sự kiện lý luận và tích lũy đủ <strong>{maxXp} XP Điểm Giác Ngộ</strong> để chiến thắng Màn {level}!
                </p>
                {activeDoubleXp && <div className="active-buff-badge">⚡ LIÊN MINH CÔNG - NÔNG: NHÂN 2 XP (x2) ĐANG KÍCH HOẠT</div>}
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
                  {currentQuestion.advisor && (
                    <span className="question-advisor font-number">
                      <UserCheck size={14} color="#FFD700" /> Cố vấn: {currentQuestion.advisor}
                    </span>
                  )}
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
                <p>Hãy chọn lật 1 trong 3 lá bài để bổ sung vào khay vật phẩm chiến thuật của bạn!</p>

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

            {/* CRISIS EVENT PANEL */}
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
