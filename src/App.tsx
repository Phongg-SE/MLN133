import React, { useState } from 'react';
import { SplashScreen } from './screens/Splash/SplashScreen';
import { MainMenuScreen } from './screens/MainMenu/MainMenuScreen';
import { LevelSelectScreen } from './screens/LevelSelect/LevelSelectScreen';
import { GameplayScreen } from './screens/Gameplay/GameplayScreen';
import { VictoryScreen } from './screens/Victory/VictoryScreen';
import { GameOverScreen } from './screens/GameOver/GameOverScreen';
import { AmbientParticles } from './components/Particles/AmbientParticles';
import { AudioService } from './services/AudioService';
import './styles/global.css';

export type ScreenState = 'splash' | 'menu' | 'levelSelect' | 'gameplay' | 'victory' | 'gameOver';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('splash');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]); // Empty initial completed levels
  const [levelStars, setLevelStars] = useState<Record<number, number>>({}); // Empty initial stars
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);

  const [victoryStats, setVictoryStats] = useState<{
    xpGained: number;
    hpLeft: number;
    stars: number;
  }>({
    xpGained: 150,
    hpLeft: 80,
    stars: 3,
  });

  const toggleAudio = () => {
    const muted = AudioService.toggleMute();
    setIsAudioMuted(muted);
  };

  const handleSelectLevel = (lvl: number) => {
    setSelectedLevel(lvl);
    setCurrentScreen('gameplay');
  };

  const handleVictory = (stats: { xpGained: number; hpLeft: number; stars: number }) => {
    setVictoryStats(stats);
    if (!completedLevels.includes(selectedLevel)) {
      setCompletedLevels((prev) => [...prev, selectedLevel]);
    }
    setLevelStars((prev) => ({ ...prev, [selectedLevel]: stats.stars }));
    setCurrentScreen('victory');
  };

  const handleGameOver = () => {
    setCurrentScreen('gameOver');
  };

  return (
    <div className="app-container">
      {/* Universal Ambient Particle Background */}
      <AmbientParticles />

      {/* Screen Router */}
      {currentScreen === 'splash' && (
        <SplashScreen onFinish={() => setCurrentScreen('menu')} />
      )}

      {currentScreen === 'menu' && (
        <MainMenuScreen
          onStartGame={() => setCurrentScreen('levelSelect')}
          onQuickPlay={() => handleSelectLevel(1)}
          isAudioMuted={isAudioMuted}
          onToggleAudio={toggleAudio}
        />
      )}

      {currentScreen === 'levelSelect' && (
        <LevelSelectScreen
          completedLevels={completedLevels}
          levelStars={levelStars}
          onSelectLevel={handleSelectLevel}
          onBackToMenu={() => setCurrentScreen('menu')}
        />
      )}

      {currentScreen === 'gameplay' && (
        <GameplayScreen
          level={selectedLevel}
          onVictory={handleVictory}
          onGameOver={handleGameOver}
          onHomeClick={() => setCurrentScreen('menu')}
          isAudioMuted={isAudioMuted}
          onToggleAudio={toggleAudio}
        />
      )}

      {currentScreen === 'victory' && (
        <VictoryScreen
          level={selectedLevel}
          stats={victoryStats}
          onNextLevel={() => handleSelectLevel(Math.min(selectedLevel + 1, 7))}
          onRetry={() => setCurrentScreen('gameplay')}
          onHomeClick={() => setCurrentScreen('menu')}
        />
      )}

      {currentScreen === 'gameOver' && (
        <GameOverScreen
          level={selectedLevel}
          onRetry={() => setCurrentScreen('gameplay')}
          onHomeClick={() => setCurrentScreen('menu')}
        />
      )}
    </div>
  );
};

export default App;
