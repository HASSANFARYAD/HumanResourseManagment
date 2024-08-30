// GlobalStyles.js
import { GlobalStyles } from '@mui/material';

const Scrollbar = () => (
  <GlobalStyles
    styles={{
      /* Global custom scrollbar for WebKit browsers */
      '::-webkit-scrollbar': {
        width: '12px',
      },
      '::-webkit-scrollbar-track': {
        background: '#f1f1f1',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '10px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#555',
      },

      /* Global custom scrollbar for Firefox */
      html: {
        scrollbarWidth: 'thin',
        scrollbarColor: '#888 #f1f1f1',
      },

      /* Global scrollbar styling for IE and Legacy Edge */
      body: {
        '-ms-overflow-style': 'scrollbar',
      },
    }}
  />
);

export default Scrollbar;
