export default function Settings() {
    const getCookie = (name: string) =>
        document.cookie
            .split('; ')
            .find((row) => row.startsWith(name + '='))
            ?.split('=')[1];
    document.cookie = 'generation=generation-i;';
    document.cookie = 'game=red-blue;';

    console.log(getCookie('generation'));
    console.log(getCookie('game'));
    return <div>lol</div>;
}
