import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from '@/Root';
import PokeList from '@/features/pokemon/pokeList/PokeList';

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root />,
            children: [
                {
                    path: 'pokemon',
                    element: <PokeList />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}
