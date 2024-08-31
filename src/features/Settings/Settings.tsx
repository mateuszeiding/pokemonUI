import { useBottomDrawerContext } from '@/contexts/BottomDrawerContext/useBottromDrawerContext';
import CookieService from '@/utils/cookieService';
import { VersionSprites } from 'pokenode-ts';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import SettingsPortal from './components/SettingsPortal/SettingsPortal';
import SettingsButtons from './components/SettingsButton/SettingsButtons';

export default function Settings() {
    const { drawerBoxRef } = useBottomDrawerContext();

    const [isSettingsMounted, setIsSettingsMounted] = useState(false);

    const [generation, setGeneration] = useState<keyof VersionSprites>(
        CookieService.getSpriteConfig().generation
    );
    const [game, setGame] = useState<
        keyof VersionSprites[keyof VersionSprites]
    >(CookieService.getSpriteConfig().game);

    function saveSpriteConfig() {
        CookieService.setSpriteConfig({
            game,
            generation,
        });
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
                        {...{ generation, game, setGeneration, setGame }}
                    />,
                    drawerBoxRef!
                )}
        </>
    );
}
