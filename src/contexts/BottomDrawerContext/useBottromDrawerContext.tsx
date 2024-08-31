import { useContext } from 'react';
import { BottomDrawerContext } from './BottomDrawerContext';

export function useBottomDrawerContext() {
    const context = useContext(BottomDrawerContext);
    if (!context) {
        throw new Error(
            'useBottomDrawerContext must be used within a BottomDrawerProvider'
        );
    }
    return context;
}
