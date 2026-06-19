import { createContext, useContext, useState } from "react";

type SettingsContextType ={
    activeGame: string;
    setActiveGame: (value: string) => void;
    isGameEnded: boolean;
    setIsGameEnded: (value: boolean) => void;
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
    masterVolume: number;
    setMasterVolume: (value: number) => void;
    soundEffectsVolume: number;
    setSoundEffectsVolume: (value: number) => void;
    language: string;
    setLanguage: (value: string) => void;
    isSideBarOpen: boolean;
    setIsSideBarOpen: (value: boolean) => void;
    gameMode: string;
    setGameMode: (value: string) => void;
    showHints: boolean;
    setShowHints: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({children}: {children: React.ReactNode})
{
    const [activeGame, setActiveGame] = useState("bargees"); // "bargees" | "chess" | "memoryGame"
    const [isGameEnded, setIsGameEnded] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [masterVolume, setMasterVolume] = useState(0.5);
    const [soundEffectsVolume, setSoundEffectsVolume] = useState(0.5);
    const [language, setLanguage] = useState("en"); // "en" | "de"
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [gameMode, setGameMode] = useState("singlePlayer"); // "playWithPerson" | "playWithComputer"
    const [showHints, setShowHints] = useState(true);

    return(
        <SettingsContext.Provider value={{
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
            setShowHints
        }}>
            {children}
        </SettingsContext.Provider>
    )
}

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}