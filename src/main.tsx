import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import Router from './Router.tsx';

const root = document.getElementById('root');
if (root === null) {
    throw new Error('No root element found');
}

createRoot(root).render(
    <StrictMode>
        <Router />
    </StrictMode>
);
