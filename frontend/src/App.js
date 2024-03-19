import "./styles/App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        // потом нужно будет добавить 404 страницу
        <Route path="*" element={<HomePage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
