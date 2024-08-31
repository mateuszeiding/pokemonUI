import { cls } from '@/utils/className';
import './BottomDrawer.scss';
import { useBottomDrawerContext } from '@/contexts/BottomDrawerContext/useBottromDrawerContext';

export default function BottomDrawer() {
    const { isOpen, setRef } = useBottomDrawerContext();
    return (
        <div className={cls('drawer', isOpen && 'open')}>
            <div
                ref={setRef}
                className='drawer-box'></div>
        </div>
    );
}
