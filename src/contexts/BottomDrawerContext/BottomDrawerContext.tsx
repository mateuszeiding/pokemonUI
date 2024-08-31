import { createContext, PropsWithChildren, useCallback, useState } from 'react';

type BottomDrawerContextType = {
    isOpen: boolean;
    drawerBoxRef: HTMLDivElement | null;
    toggle: () => void;
    setRef: (ref: HTMLDivElement) => void;
};

export const BottomDrawerContext = createContext<
    BottomDrawerContextType | undefined
>(undefined);

export function BottomDrawerProvider({ children }: PropsWithChildren) {
    const [isOpen, setIsOpen] = useState(false);
    const [drawerBoxRef, setDrawerBoxRef] = useState<HTMLDivElement | null>(
        null
    );

    const toggle = () => setIsOpen((prev) => !prev);
    const setRef = useCallback((node: Node) => {
        if (node instanceof HTMLDivElement) setDrawerBoxRef(node);
    }, []);

    return (
        <BottomDrawerContext.Provider
            value={{ isOpen, drawerBoxRef, toggle, setRef }}>
            {children}
        </BottomDrawerContext.Provider>
    );
}
