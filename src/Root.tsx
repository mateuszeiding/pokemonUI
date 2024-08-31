import { Outlet } from 'react-router-dom';

import NavMenu from '@features/layout/NavMenu/NavMenu';
import TopBar from '@features/layout/TopBar';
import BottomDrawer from './features/layout/BottomDrawer/BottomDrawer';

export default function Root() {
    return (
        <>
            <TopBar />
            <main className='grid-main'>
                <aside className='grid-menu'>
                    <NavMenu />
                </aside>
                <section className='container-fluid overflow-hidden h-100'>
                    <Outlet />
                </section>
                <BottomDrawer />
            </main>
        </>
    );
}
