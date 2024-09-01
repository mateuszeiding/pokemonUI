import { useEffect, useRef } from 'react';

export function useWabamButtonEffect() {
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (buttonRef.current) {
            const controller = new AbortController();
            buttonRef.current.addEventListener(
                'click',
                () => {
                    const node = document.createElement('div');
                    node.classList.add('wabam-effect');
                    buttonRef.current?.appendChild(node);

                    setTimeout(() => {
                        node.remove();
                    }, 500);
                },
                { signal: controller.signal }
            );

            return () => {
                controller.abort();
            };
        }
    }, []);

    return { settingsButtonRef: buttonRef };
}
