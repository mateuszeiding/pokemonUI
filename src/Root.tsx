import { Outlet } from 'react-router-dom';

import NavMenu from '@features/layout/NavMenu';
import TopBar from '@features/layout/TopBar';

export default function Root() {
    return (
        <>
            <TopBar />
            <main className='grid-main'>
                <aside className='grid-menu'>
                    <NavMenu />
                </aside>
                <section className='container-fluid pb-9 overflow-hidden h-100'>
                    <Outlet />
                </section>
            </main>
        </>
    );
}
