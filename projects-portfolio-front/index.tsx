import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './styles/reset.css';
import './styles/vars.css';
import './styles/fonts.css';
import './styles/forms.css';
import './styles/global.css';

import { BrowserRouter } from 'react-router-dom';
import Root from './src/Root';
import Providers from './src/components/contexts/Providers';

const container = document.getElementById('react-root');
if (container != null) {
  const root = createRoot(container);
  root.render(<BrowserRouter><Providers><Root /></Providers></BrowserRouter>);
}