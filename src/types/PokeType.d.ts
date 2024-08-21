import { Type as TypeBase } from 'pokenode-ts';

declare module 'pokenode-ts' {
    type name_icon = {
        name_icon: string;
    };

    export interface Type extends TypeBase {
        sprites: {
            ['generation-iii']: {
                emerald: name_icon;
                ['firered-leafgreen']: name_icon;
                ['ruby-saphire']: name_icon;
            };
            ['generation-v']: {
                ['black-2-white-2']: name_icon;
                ['black-white']: name_icon;
            };
            ['generation-vii']: {
                ['sun-moon']: name_icon;
            };
            ['generation-viii']: {
                ['brilliant-diamond-and-shining-pearl']: name_icon;
                ['sword-shield']: name_icon;
            };
        };
    }
}
