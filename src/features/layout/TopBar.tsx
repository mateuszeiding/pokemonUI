import Switch from '@features/_shared/form/Switch';

export default function TopBar() {
    function changeUIMode(value: boolean) {
        document.documentElement.setAttribute(
            'thank-you-for-saving-my-eyes',
            value.toString()
        );
    }

    return (
        <div className='px-5 py-3 border-bottom bg-gray-000 d-flex justify-content-between'>
            <h1 className='fs-5 tx-uppercase'>PokeApp</h1>
            <Switch
                label='Dark mode'
                initialValue={true}
                onChange={changeUIMode}
            />
        </div>
    );
}
