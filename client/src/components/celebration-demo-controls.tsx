import React, { useState } from 'react';
import { Calendar, RotateCcw } from 'lucide-react';
import { religiousCelebrations, defaultWelcomeMessage } from '../data/religious-celebrations';

interface CelebrationDemoControlsProps {
  onCelebrationChange: (celebration: any) => void;
  isDemoMode: boolean;
  onToggleDemoMode: (enabled: boolean) => void;
}

export const CelebrationDemoControls: React.FC<CelebrationDemoControlsProps> = ({
  onCelebrationChange,
  isDemoMode,
  onToggleDemoMode
}) => {
  const [selectedCelebration, setSelectedCelebration] = useState<string>('default');

  const handleCelebrationSelect = (celebrationId: string) => {
    setSelectedCelebration(celebrationId);
    
    if (celebrationId === 'default') {
      onCelebrationChange(null);
    } else {
      const celebration = religiousCelebrations.find(c => c.id === celebrationId);
      onCelebrationChange(celebration);
    }
  };

  const handleAutoDemo = () => {
    let currentIndex = 0;
    const allCelebrations = [null, ...religiousCelebrations];
    
    const interval = setInterval(() => {
      const celebration = allCelebrations[currentIndex];
      onCelebrationChange(celebration);
      currentIndex = (currentIndex + 1) % allCelebrations.length;
    }, 3000);

    // Stop after one full cycle
    setTimeout(() => {
      clearInterval(interval);
      onCelebrationChange(null);
    }, allCelebrations.length * 3000);
  };

  if (!isDemoMode) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => onToggleDemoMode(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center space-x-2"
          title="Demo Religious Celebrations"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Demo Celebrations</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-xl p-4 border max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Celebration Demo</h3>
        <button
          onClick={() => onToggleDemoMode(false)}
          className="text-gray-500 hover:text-gray-700"
          title="Close demo"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-3">
        <select
          value={selectedCelebration}
          onChange={(e) => handleCelebrationSelect(e.target.value)}
          className="w-full p-2 border rounded text-sm"
        >
          <option value="default">Welcome Message</option>
          <optgroup label="Christianity">
            <option value="new-year">New Year</option>
            <option value="christmas">Christmas</option>
            <option value="christmas-eve">Christmas Eve</option>
            <option value="easter-2025">Easter</option>
          </optgroup>
          <optgroup label="Islam">
            <option value="ramadan-2025">Ramadan</option>
            <option value="eid-fitr-2025">Eid al-Fitr</option>
            <option value="eid-adha-2025">Eid al-Adha</option>
          </optgroup>
          <optgroup label="Judaism">
            <option value="rosh-hashanah-2025">Rosh Hashanah</option>
            <option value="yom-kippur-2025">Yom Kippur</option>
            <option value="hanukkah-2025">Hanukkah</option>
          </optgroup>
          <optgroup label="Other Religions">
            <option value="diwali-2025">Diwali (Hindu)</option>
            <option value="vesak-2025">Vesak Day (Buddhist)</option>
            <option value="vaisakhi-2025">Vaisakhi (Sikh)</option>
          </optgroup>
        </select>
        
        <button
          onClick={handleAutoDemo}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Auto Cycle (3s each)</span>
        </button>
        
        <p className="text-xs text-gray-600">
          Select celebrations to preview how they appear throughout the year
        </p>
      </div>
    </div>
  );
};

export default CelebrationDemoControls;