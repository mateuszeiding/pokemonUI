import { useBottomDrawerContext } from '@/contexts/BottomDrawerContext/useBottromDrawerContext';
import { cls } from '@/utils/className';
import './SettingsButtons.scss';

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

    return (
        <>
            <div className={cls('settings-button', isOpen && 'settings-open')}>
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
