import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { ThemeProvider } from '@mui/material/styles';
import Scrollbar from "./theme-styles/scollbar";
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import theme from './theme-styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Scrollbar/>
          <App />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
