import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './containers/App/App';

// import './styles/global.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
