import { VersionSprites } from 'pokenode-ts';

export type GenerationGamePair<
    G extends keyof VersionSprites,
    Game extends keyof VersionSprites[G],
> = {
    generation: G;
    game: Game;
};

export default class CookieService {
    private static getCookie(name: string) {
        return document.cookie
            .split('; ')
            .find((row) => row.startsWith(name + '='))
            ?.split('=')[1];
    }

    static getSpriteConfig<
        Generation extends keyof VersionSprites,
        Game extends keyof VersionSprites[Generation],
    >() {
        const gen = (CookieService.getCookie('generation') ??
            'generation-i') as Generation;
        return {
            generation: gen,
            game: (CookieService.getCookie('game') ?? 'red-blue') as Game,
        } satisfies GenerationGamePair<Generation, Game>;
    }

    static setSpriteConfig(
        config: GenerationGamePair<
            keyof VersionSprites,
            keyof VersionSprites[keyof VersionSprites]
        >
    ) {
        document.cookie = `generation=${config.generation};`;
        document.cookie = `game=${config.game};`;
    }

    static clearSpriteConfig() {
        document.cookie = 'generation=generation-i;';
        document.cookie = 'game=red-blue;';
    }
}
