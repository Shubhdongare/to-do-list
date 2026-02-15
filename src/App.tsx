import { useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import ToDoList from "./components/ToDoList";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToDoList darkMode={darkMode} setDarkMode={setDarkMode} />
    </ThemeProvider>
  );
};

export default App;
