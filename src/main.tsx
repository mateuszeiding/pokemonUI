import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import Router from './Router.tsx';
import ContextProvider from './contexts/ContextProvider.tsx';

const root = document.getElementById('root');
if (root === null) {
    throw new Error('No root element found');
}

createRoot(root).render(
    <StrictMode>
        <ContextProvider>
            <Router />
        </ContextProvider>
    </StrictMode>
);
