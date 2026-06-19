import { useSettings } from "../../contexts/SettingContext";


export function OpenSettingsButton() {
  const { setIsSideBarOpen } = useSettings();
  
  return (
    <button 
      onClick={() => setIsSideBarOpen(true)}
      className="p-2 bg-mint-500 rounded absolute top-5 left-5"
    >
      ⚙️ Settings
    </button>
  );
}