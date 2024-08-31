import { useBottomDrawerContext } from '@/contexts/BottomDrawerContext/useBottromDrawerContext';
import { cls } from '@/utils/className';
import './SettingsButton.scss';
import { createPortal } from 'react-dom';
import Settings from '@/features/Settings/Settings';
import { useState } from 'react';
import CookieService from '@/utils/cookieService';

export default function SettingsButton() {
    const { isOpen, drawerBoxRef, toggle } = useBottomDrawerContext();
    const [settingsMounted, setSettingsMounted] = useState(false);
    const [saveDisabled, setSaveDisabled] = useState(
        !CookieService.cookiesEnabled()
    );

    const toggleSettings = () => {
        if (!isOpen) {
            setSettingsMounted(true);
        } else {
            setTimeout(() => {
                setSettingsMounted(false);
            }, 500);
        }

        toggle();
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
                        disabled={saveDisabled}
                        onClick={toggleSettings}>
                        Save
                    </button>
                </div>
            </div>
            {settingsMounted &&
                createPortal(
                    <Settings
                        enableSave={() => setSaveDisabled((prev) => !prev)}
                    />,
                    drawerBoxRef!
                )}
        </>
    );
}
