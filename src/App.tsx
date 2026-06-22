
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import { OpenSettingsButton } from './components/SettingsComponent/OpenSettingsButton';
import SettingsSidebar from './components/SettingsComponent/SettingsSidebar';
import SettingsSidebar2 from './components/SettingsComponent/SettingsSidebar2';
import { SettingsProvider } from './contexts/SettingContext';
import Games from './Games';
import GamesMenuPage from './pages/GameMenuPage';
import GamePlayPage from './pages/GamePlayPage';

export default function App() {

    return (
        <SettingsProvider>
        <BrowserRouter>
        <SettingsSidebar2 />
        <OpenSettingsButton />
        <Routes>
        <Route path="/" element={<GamesMenuPage />} />
        <Route path="/games/:gameId" element={<GamePlayPage />} />


        {/* // <Nineteen_NinteenGrid /> */}
        {/* <SettingsSidebar2 /> */}
        </Routes>
        </BrowserRouter>
        </SettingsProvider>
    )
}
