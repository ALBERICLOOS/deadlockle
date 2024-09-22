import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {CssBaseline} from "@mui/material";

// Create a custom MUI theme with the default font
const theme = createTheme({
    typography: {
        fontFamily: '"Orbitron", sans-serif', // Set Orbitron as the default font
    },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
      </ThemeProvider>
  </React.StrictMode>
);


