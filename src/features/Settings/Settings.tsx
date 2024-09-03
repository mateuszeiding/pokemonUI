import { useBottomDrawerContext } from '@/contexts/BottomDrawerContext/useBottromDrawerContext';
import CookieService from '@/utils/cookieService';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import SettingsPortal from './components/SettingsPortal/SettingsPortal';
import SettingsButtons from './components/SettingsButton/SettingsButtons';

export default function Settings() {
    const { drawerBoxRef } = useBottomDrawerContext();

    const [isSettingsMounted, setIsSettingsMounted] = useState(false);

    const [category, setCategory] = useState<string>(
        CookieService.getSpriteConfig().config
    );
    const [subcategory, setSubcategory] = useState<string>(
        CookieService.getSpriteConfig().subconfig
    );

    function saveSpriteConfig() {
        CookieService.setSpriteConfig(category, subcategory);
    }

    return (
        <>
            <SettingsButtons
                saveSpriteConfig={saveSpriteConfig}
                setIsSettingsMounted={setIsSettingsMounted}
            />
            {isSettingsMounted &&
                createPortal(
                    <SettingsPortal
                        {...{
                            category,
                            subcategory,
                            setCategory,
                            setSubcategory,
                        }}
                    />,
                    drawerBoxRef!
                )}
        </>
    );
}
