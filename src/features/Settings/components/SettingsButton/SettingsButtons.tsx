import { useBottomDrawerContext } from '@/contexts/BottomDrawerContext/useBottromDrawerContext';
import { cls } from '@/utils/className';
import './SettingsButtons.scss';
import { useEffect, useRef } from 'react';

type SettingsButtons = {
    setIsSettingsMounted: (mounted: boolean) => void;
    saveSpriteConfig: () => void;
};

export default function SettingsButtons({
    setIsSettingsMounted,
    saveSpriteConfig,
}: Readonly<SettingsButtons>) {
    const { isOpen, toggle } = useBottomDrawerContext();

    const toggleSettings = () => {
        if (!isOpen) {
            setIsSettingsMounted(true);
        } else {
            setTimeout(() => {
                setIsSettingsMounted(false);
            }, 500);
        }

        toggle();
    };

    const saveSettings = () => {
        saveSpriteConfig();
        toggleSettings();
    };

    const settingsButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (settingsButtonRef.current) {
            const controller = new AbortController();
            settingsButtonRef.current.addEventListener(
                'click',
                () => {
                    const node = document.createElement('div');
                    node.classList.add('wabam-effect');
                    settingsButtonRef.current?.appendChild(node);

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

    return (
        <>
            <div
                ref={settingsButtonRef}
                className={cls('settings-button', isOpen && 'settings-open')}>
                <button
                    id='first'
                    className={cls(
                        'btn btn-link theme-green btn-justified',
                        'tx-uppercase align-self-end'
                    )}
                    onClick={toggleSettings}>
                    Settings
                </button>
                <div id='second'>
                    <button
                        className={cls(
                            'btn btn-link theme-red btn-justified',
                            'r-top-right-0 r-bottom-right-0',
                            'tx-uppercase align-self-end'
                        )}
                        onClick={toggleSettings}>
                        Cancel
                    </button>
                    <button
                        className={cls(
                            'btn btn-link theme-blue btn-justified',
                            'r-top-left-0 r-bottom-left-0',
                            'tx-uppercase align-self-end'
                        )}
                        onClick={saveSettings}>
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}
