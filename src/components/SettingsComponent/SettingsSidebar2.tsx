import React from "react";
import { useSettings } from "../../contexts/SettingContext";

export default function SettingsSidebar2() {
  const {
    activeGame,
    setActiveGame,
    isGameEnded,
    setIsGameEnded,
    isDarkMode,
    setIsDarkMode,
    masterVolume,
    setMasterVolume,
    soundEffectsVolume,
    setSoundEffectsVolume,
    language,
    setLanguage,
    isSideBarOpen,
    setIsSideBarOpen,
    gameMode,
    setGameMode,
    showHints,
    setShowHints,
    colorTheme,
    setColorTheme
  } = useSettings();

  return (
    <>
      {/* Backdrop */}
      {isSideBarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsSideBarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 z-50 
          shadow-2xl transform transition-all duration-300 ease-in-out
          ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"}
          overflow-y-auto
          ${isDarkMode 
            ? "bg-gray-900 text-gray-100 border-r border-gray-700" 
            : "bg-gray-100 text-gray-900 border-r border-gray-300"
          }`}
      >
        {/* Header */}
        <div className={`flex justify-between items-center p-5 border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-300"
        }`}>
          <h2 className="text-2xl font-bold dark:text-mint-500 text-mint-800">
            Settings
          </h2>
          <button
            onClick={() => setIsSideBarOpen(false)}
            className={`text-2xl transition-colors ${
              isDarkMode 
                ? "text-gray-400 hover:text-red-500" 
                : "text-gray-600 hover:text-red-500"
            }`}
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Game Section */}
          <Section title="Game" isDarkMode={isDarkMode}>
            <Select
              label="Active Game"
              value={activeGame}
              onChange={setActiveGame}
              isDarkMode={isDarkMode}
              options={[
                { value: "bargees", label: "Bargees" },
                { value: "chess", label: "Chess" },
                { value: "memoryGame", label: "Memory Game" },
              ]}
            />
          <Select
              label="Color Theme"
              value={colorTheme}
              onChange={setColorTheme}
              isDarkMode={isDarkMode}
              options={[
                { value: "blackAndWhite", label: "Black and white" },
                { value: "wooden", label: "Wooden" },
                { value: "glass", label: "Glass" },
              ]}
            /> 

            {/* <Select
              label="Game Mode"
              value={gameMode}
              onChange={setGameMode}
              isDarkMode={isDarkMode}
              options={[
                { value: "singlePlayer", label: "Single Player" },
                { value: "playWithPerson", label: "Play with Person" },
                { value: "playWithComputer", label: "Play with Computer" },
              ]}
            /> */}
            {/* <Toggle
              label="Game Ended"
              checked={isGameEnded}
              onChange={setIsGameEnded}
              isDarkMode={isDarkMode}
            /> */}
          </Section>

          {/* Display Section */}
          <Section title="Display" isDarkMode={isDarkMode}>
            <Toggle
              label="Dark Mode"
              checked={isDarkMode}
              onChange={setIsDarkMode}
              isDarkMode={isDarkMode}
            />
            {/* <Toggle
              label="Show Hints"
              checked={showHints}
              onChange={setShowHints}
              isDarkMode={isDarkMode}
            /> */}
            {/* <Select
              label="Language"
              value={language}
              onChange={setLanguage}
              isDarkMode={isDarkMode}
              options={[
                { value: "en", label: "English" },
                { value: "de", label: "Deutsch" },
              ]}
            /> */}
          </Section>

          {/* Audio Section */}
          <Section title="Audio" isDarkMode={isDarkMode}>
            <Slider
              label="Master Volume"
              value={masterVolume}
              onChange={setMasterVolume}
              isDarkMode={isDarkMode}
            />
            <Slider
              label="Sound Effects"
              value={soundEffectsVolume}
              onChange={setSoundEffectsVolume}
              isDarkMode={isDarkMode}
            />
          </Section>
        </div>
      </aside>
    </>
  );
}

// --- Reusable Sub-Components ---

function Section({ 
  title, 
  children, 
  isDarkMode 
}: { 
  title: string; 
  children: React.ReactNode;
  isDarkMode: boolean;
}) {
  return (
    <div className="space-y-3">
      <h3 className={`text-xs uppercase tracking-wider font-semibold border-b pb-1 ${
        isDarkMode 
          ? "text-gray-400 border-gray-700" 
          : "text-gray-500 border-gray-300"
      }`}>
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Toggle({ 
  label, 
  checked, 
  onChange, 
  isDarkMode 
}: { 
  label: string; 
  checked: boolean; 
  onChange: (v: boolean) => void;
  isDarkMode: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className={`text-sm ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
        {label}
      </span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked 
            ? "bg-mint-500" 
            : isDarkMode ? "bg-gray-600" : "bg-gray-400"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

function Select({ 
  label, 
  value, 
  onChange, 
  options, 
  isDarkMode 
}: { 
  label: string; 
  value: string; 
  onChange: (v: string) => void; 
  options: { value: string; label: string }[];
  isDarkMode: boolean;
}) {
  return (
    <div className="space-y-1">
      <label className={`text-sm block ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded px-2 py-1.5 text-sm outline-none transition-colors ${
          isDarkMode 
            ? "bg-gray-800 text-gray-100 border border-gray-700 focus:border-mint-500" 
            : "bg-white text-gray-900 border border-gray-300 focus:border-mint-500"
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Slider({ 
  label, 
  value, 
  onChange, 
  isDarkMode 
}: { 
  label: string; 
  value: number; 
  onChange: (v: number) => void;
  isDarkMode: boolean;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>{label}</span>
        <span className="dark:text-mint-500 text-mint-800 font-medium">{Math.round(value * 100)}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-mint-500"
      />
    </div>
  );
}