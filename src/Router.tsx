import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from '@/Root';
import PokeList from '@/features/pokemon/pokeList/PokeList';
import PokeDetails from './features/pokemon/pokeDetails/PokeDetails';
import { pokeDetailsLoader } from './services/loaders/pokeDetails.loader';

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root />,
            children: [
                {
                    path: 'pokemon',
                    element: <PokeList />,
                    children: [
                        {
                            path: ':id',
                            element: <PokeDetails />,
                            loader: pokeDetailsLoader,
                        },
                    ],
                },
                {
                    path: 'types',
                    element: <div>PLease stand by.</div>,
                },
                {
                    path: 'pizza',
                    element: <div>It isn't pizza time yet! 😡</div>,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}
