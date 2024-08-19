import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

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
