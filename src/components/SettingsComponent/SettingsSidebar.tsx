// import React from "react";
// import { useSettings } from "../../contexts/SettingContext";
// import {
//   Drawer,
//   Box,
//   Typography,
//   IconButton,
//   Switch,
//   FormControl,
//   InputLabel,
//   Select as MuiSelect,
//   MenuItem,
//   Slider as MuiSlider,
//   Divider,
//   ThemeProvider,
//   createTheme,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// export default function SettingsSidebar() {
//   const {
//     activeGame,
//     setActiveGame,
//     isGameEnded,
//     setIsGameEnded,
//     isDarkMode,
//     setIsDarkMode,
//     masterVolume,
//     setMasterVolume,
//     soundEffectsVolume,
//     setSoundEffectsVolume,
//     language,
//     setLanguage,
//     isSideBarOpen,
//     setIsSideBarOpen,
//     gameMode,
//     setGameMode,
//     showHints,
//     setShowHints,
//   } = useSettings();

//   // Create MUI theme based on dark mode setting
//   const theme = React.useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode: isDarkMode ? "dark" : "light",
//           primary: {
//             main: "#4db6ac", // mint-500
//           },
//           secondary: {
//             main: "#ef5350", // red-500
//           },
//           background: {
//             default: isDarkMode ? "#1a1a1a" : "#f5f5f5",
//             paper: isDarkMode ? "#2d2d2d" : "#ffffff",
//           },
//           text: {
//             primary: isDarkMode ? "#e0f2f1" : "#212121",
//             secondary: isDarkMode ? "#b2dfdb" : "#757575",
//           },
//         },
//         components: {
//           MuiDrawer: {
//             styleOverrides: {
//               paper: {
//                 width: 320,
//                 backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
//               },
//             },
//           },
//           MuiSwitch: {
//             styleOverrides: {
//               switchBase: {
//                 color: "#9e9e9e",
//                 "&.Mui-checked": {
//                   color: "#4db6ac",
//                 },
//               },
//               track: {
//                 backgroundColor: "#616161",
//                 opacity: 0.7,
//               },
//             },
//           },
//           MuiSlider: {
//             styleOverrides: {
//               root: {
//                 color: "#4db6ac",
//                 "& .MuiSlider-thumb": {
//                   backgroundColor: "#4db6ac",
//                 },
//               },
//             },
//           },
//           MuiSelect: {
//             styleOverrides: {
//               root: {
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: isDarkMode ? "#424242" : "#e0e0e0",
//                 },
//                 "&:hover .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#4db6ac",
//                 },
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#4db6ac",
//                 },
//               },
//             },
//           },
//         },
//       }),
//     [isDarkMode]
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <Drawer
//         anchor="left"
//         open={isSideBarOpen}
//         onClose={() => setIsSideBarOpen(false)}
//       >
//         <Box sx={{ p: 3 }}>
//           {/* Header */}
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//             <Typography variant="h5" fontWeight="bold" color="primary">
//               Settings
//             </Typography>
//             <IconButton onClick={() => setIsSideBarOpen(false)} color="secondary">
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           <Divider sx={{ mb: 3 }} />

//           {/* Game Section */}
//           <Section title="Game">
//             <FormControl fullWidth size="small" sx={{ mb: 2 }}>
//               <InputLabel>Active Game</InputLabel>
//               <MuiSelect
//                 value={activeGame}
//                 label="Active Game"
//                 onChange={(e) => setActiveGame(e.target.value)}
//               >
//                 <MenuItem value="bargees">Bargees</MenuItem>
//                 <MenuItem value="chess">Chess</MenuItem>
//                 <MenuItem value="memoryGame">Memory Game</MenuItem>
//               </MuiSelect>
//             </FormControl>

//             <FormControl fullWidth size="small" sx={{ mb: 2 }}>
//               <InputLabel>Game Mode</InputLabel>
//               <MuiSelect
//                 value={gameMode}
//                 label="Game Mode"
//                 onChange={(e) => setGameMode(e.target.value)}
//               >
//                 <MenuItem value="singlePlayer">Single Player</MenuItem>
//                 <MenuItem value="playWithPerson">Play with Person</MenuItem>
//                 <MenuItem value="playWithComputer">Play with Computer</MenuItem>
//               </MuiSelect>
//             </FormControl>

//             <SettingRow label="Game Ended">
//               <Switch checked={isGameEnded} onChange={(e) => setIsGameEnded(e.target.checked)} />
//             </SettingRow>
//           </Section>

//           {/* Display Section */}
//           <Section title="Display">
//             <SettingRow label="Dark Mode">
//               <Switch checked={isDarkMode} onChange={(e) => setIsDarkMode(e.target.checked)} />
//             </SettingRow>

//             <SettingRow label="Show Hints">
//               <Switch checked={showHints} onChange={(e) => setShowHints(e.target.checked)} />
//             </SettingRow>

//             <FormControl fullWidth size="small" sx={{ mb: 2 }}>
//               <InputLabel>Language</InputLabel>
//               <MuiSelect
//                 value={language}
//                 label="Language"
//                 onChange={(e) => setLanguage(e.target.value)}
//               >
//                 <MenuItem value="en">English</MenuItem>
//                 <MenuItem value="de">Deutsch</MenuItem>
//               </MuiSelect>
//             </FormControl>
//           </Section>

//           {/* Audio Section */}
//           <Section title="Audio">
//             <Box sx={{ mb: 3 }}>
//               <Typography variant="body2" color="text.secondary" gutterBottom>
//                 Master Volume: {Math.round(masterVolume * 100)}%
//               </Typography>
//               <MuiSlider
//                 value={masterVolume}
//                 onChange={(_, value) => setMasterVolume(value as number)}
//                 min={0}
//                 max={1}
//                 step={0.01}
//               />
//             </Box>

//             <Box>
//               <Typography variant="body2" color="text.secondary" gutterBottom>
//                 Sound Effects: {Math.round(soundEffectsVolume * 100)}%
//               </Typography>
//               <MuiSlider
//                 value={soundEffectsVolume}
//                 onChange={(_, value) => setSoundEffectsVolume(value as number)}
//                 min={0}
//                 max={1}
//                 step={0.01}
//               />
//             </Box>
//           </Section>
//         </Box>
//       </Drawer>
//     </ThemeProvider>
//   );
// }

// // --- Reusable Sub-Components ---

// function Section({ title, children }: { title: string; children: React.ReactNode }) {
//   return (
//     <Box sx={{ mb: 3 }}>
//       <Typography
//         variant="overline"
//         color="primary"
//         fontWeight="bold"
//         sx={{ mb: 1.5, display: "block" }}
//       >
//         {title}
//       </Typography>
//       <Box>{children}</Box>
//     </Box>
//   );
// }

// function SettingRow({ label, children }: { label: string; children: React.ReactNode }) {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         mb: 2,
//       }}
//     >
//       <Typography variant="body1">{label}</Typography>
//       {children}
//     </Box>
//   );
// }