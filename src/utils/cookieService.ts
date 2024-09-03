import { SpriteConfig } from '@/features/Settings/SpriteConfig.model';

export type GenerationGamePair<
    G extends keyof SpriteConfig,
    Game extends keyof SpriteConfig[G],
> = {
    config: G;
    subconfig: Game;
};

export default class CookieService {
    private static getCookie(name: string) {
        return document.cookie
            .split('; ')
            .find((row) => row.startsWith(name + '='))
            ?.split('=')[1];
    }

    static getSpriteConfig() {
        return {
            config: CookieService.getCookie('config') ?? 'generation-i',
            subconfig: CookieService.getCookie('subconfig') ?? 'red-blue',
        };
    }

    static setSpriteConfig(config: string, subconfig: string) {
        document.cookie = `config=${config};`;
        document.cookie = `subconfig=${subconfig};`;
    }

    static clearSpriteConfig() {
        document.cookie = 'generation=generation-i;';
        document.cookie = 'game=red-blue;';
    }
}
