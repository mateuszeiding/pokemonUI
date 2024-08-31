import {
    GenerationIIISprites,
    GenerationIISprites,
    GenerationISprites,
    GenerationIVSprites,
    GenerationVIIISprites,
    GenerationVIISprites,
    GenerationVISprites,
    GenerationVSprites,
    VersionSprites,
} from 'pokenode-ts';
import { useRef } from 'react';

type SettingsPortal = {
    generation: keyof VersionSprites;
    game: keyof VersionSprites[keyof VersionSprites];
    setGeneration: (generation: keyof VersionSprites) => void;
    setGame: (game: keyof VersionSprites[keyof VersionSprites]) => void;
};

export default function SettingsPortal({
    game,
    generation,
    setGame,
    setGeneration,
}: Readonly<SettingsPortal>) {
    const generations: (keyof VersionSprites)[] = [
        'generation-i',
        'generation-ii',
        'generation-iii',
        'generation-iv',
        'generation-v',
        'generation-vi',
        'generation-vii',
        'generation-viii',
    ] as const;

    type Generations =
        | keyof GenerationISprites
        | keyof GenerationIISprites
        | keyof GenerationIIISprites
        | keyof GenerationIVSprites
        | keyof GenerationVSprites
        | keyof GenerationVISprites
        | keyof GenerationVIISprites
        | keyof GenerationVIIISprites;

    const games: Record<keyof VersionSprites, Generations[]> = {
        'generation-i': ['red-blue', 'yellow'],
        'generation-ii': ['gold', 'silver', 'crystal'],
        'generation-iii': ['ruby-sapphire', 'emerald'],
        'generation-iv': ['diamond-pearl', 'platinum'],
        'generation-v': ['black-white'],
        'generation-vi': ['x-y', 'omegaruby-alphasapphire'],
        'generation-vii': ['icons', 'ultra-sun-ultra-moon'],
        'generation-viii': ['icons'],
    };

    const generationRef = useRef<HTMLSelectElement>(null);
    const gameRef = useRef<HTMLSelectElement>(null);

    return (
        <div>
            <h1>Settings</h1>
            <div className='d-flex flex-column g-3 mb-5'>
                <label>Generation</label>
                <select
                    ref={generationRef}
                    value={generation}
                    onChange={(e) => {
                        const generation = e.target
                            .value as keyof VersionSprites;

                        const game = games[
                            generation
                        ][0] as keyof VersionSprites[keyof VersionSprites];
                        setGeneration(generation);
                        setGame(game);
                    }}>
                    {generations.map((generation) => (
                        <option
                            key={generation}
                            value={generation}>
                            {generation}
                        </option>
                    ))}
                </select>
            </div>
            <div className='d-flex flex-column g-3'>
                <label>Game</label>
                <select
                    ref={gameRef}
                    value={game}
                    onChange={(e) =>
                        setGame(
                            e.target
                                .value as keyof VersionSprites[keyof VersionSprites]
                        )
                    }>
                    {games[generation].map((game) => (
                        <option
                            key={game}
                            value={game}>
                            {game}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
