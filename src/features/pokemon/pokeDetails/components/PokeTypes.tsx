import { imageSourcePromise } from '@/utils/imageSourcePromise';
import { Type } from 'pokenode-ts';
import { Suspense } from 'react';
import { Await } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

export default function PokeTypes({ types }: { types: Type[] }) {
    return (
        <div className='d-flex g-3 flex-wrap'>
            {types.map((type, index) => (
                <Fragment key={index}>
                    <Suspense
                        fallback={
                            <div
                                className='skeleton'
                                style={{ height: 20, width: 90 }}></div>
                        }>
                        <Await resolve={type}>
                            {(type: Type) => (
                                <Suspense
                                    fallback={
                                        <div
                                            className='skeleton'
                                            style={{
                                                height: 20,
                                                width: 90,
                                            }}></div>
                                    }>
                                    <Await
                                        resolve={imageSourcePromise(
                                            type.sprites['generation-viii'][
                                                'sword-shield'
                                            ].name_icon
                                        )}>
                                        {(src: string) => (
                                            <img
                                                height={20}
                                                width={90}
                                                src={src}
                                                alt={type.name}
                                            />
                                        )}
                                    </Await>
                                </Suspense>
                            )}
                        </Await>
                    </Suspense>
                </Fragment>
            ))}
        </div>
    );
}
