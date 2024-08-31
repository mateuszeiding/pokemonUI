import CookieService from '@/utils/cookieService';

export default function Settings({ enableSave }: { enableSave: () => void }) {
    document.cookie = 'cookies=true';
    document.cookie = 'generation=generation-i;';
    document.cookie = 'game=red-blue;';

    return (
        <div>
            <input
                type='checkbox'
                defaultChecked={CookieService.cookiesEnabled() ?? false}
                onChange={enableSave}
            />
        </div>
    );
}
