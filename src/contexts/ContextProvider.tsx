import { PropsWithChildren } from 'react';
import { BottomDrawerProvider } from './BottomDrawerContext/BottomDrawerContext';

export default function ContextProvider({ children }: PropsWithChildren) {
    return <BottomDrawerProvider>{children}</BottomDrawerProvider>;
}
