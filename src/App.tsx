
import NavBar from './components/NavBar';
import { OpenSettingsButton } from './components/SettingsComponent/OpenSettingsButton';
import SettingsSidebar from './components/SettingsComponent/SettingsSidebar';
import SettingsSidebar2 from './components/SettingsComponent/SettingsSidebar2';
import { SettingsProvider } from './contexts/SettingContext';
import Games from './Games';

export default function App() {

    return (
        <SettingsProvider>
        <div className="bg-white dark:bg-black pt-5">

        <Games />
        {/* // <Nineteen_NinteenGrid /> */}
        <SettingsSidebar2 />
        <OpenSettingsButton />
        </div>
        </SettingsProvider>
    )
}
