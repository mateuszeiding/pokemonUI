import { useRef } from 'react';
import { SpriteConfig } from '../../SpriteConfig.model';

type SettingsPortal = {
    category: string;
    subcategory: string;
    setCategory: (generation: string) => void;
    setSubcategory: (game: string) => void;
};

export default function SettingsPorta({
    subcategory,
    category,
    setSubcategory,
    setCategory,
}: Readonly<SettingsPortal>) {
    const sprites = new SpriteConfig();

    const generationRef = useRef<HTMLSelectElement>(null);
    const gameRef = useRef<HTMLSelectElement>(null);
    const categories = Object.keys(sprites) as (keyof SpriteConfig)[];

    return (
        <div>
            <h1>Settings</h1>
            <div className='d-flex flex-column g-3 mb-5'>
                <label>Generation</label>
                <select
                    ref={generationRef}
                    value={category}
                    onChange={(e) => {
                        const category = e.target.value;
                        const sub = Object.keys(
                            sprites[category as keyof SpriteConfig]
                        )[0];
                        setCategory(category);
                        setSubcategory(sub);
                    }}>
                    {categories.map((category) => (
                        <option
                            key={category}
                            value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className='d-flex flex-column g-3'>
                <label>Game</label>
                <select
                    ref={gameRef}
                    value={subcategory}
                    onChange={(e) =>
                        setSubcategory(
                            e.target
                                .value as keyof SpriteConfig[keyof SpriteConfig]
                        )
                    }>
                    {Object.keys(sprites[category as keyof SpriteConfig]).map(
                        (subcategory) => (
                            <option
                                key={subcategory}
                                value={subcategory}>
                                {subcategory}
                            </option>
                        )
                    )}
                </select>
            </div>
        </div>
    );
}
