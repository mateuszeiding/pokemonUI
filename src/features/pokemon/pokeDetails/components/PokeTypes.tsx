import { Type } from 'pokenode-ts';
import { Suspense } from 'react';
import { Await } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

export default function PokeTypes({ types }: { types: Type[] }) {
    console.log(types[0]);
    return (
        <div className='d-flex g-3 flex-wrap pb-5'>
            {types.map((type, index) => (
                <Fragment key={index}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Await resolve={type}>
                            {(type: Type) => (
                                <img
                                    height={20}
                                    src={
                                        type.sprites['generation-viii'][
                                            'sword-shield'
                                        ].name_icon
                                    }
                                    alt={type.name}
                                />
                            )}
                        </Await>
                    </Suspense>
                </Fragment>
            ))}
        </div>
    );
}
