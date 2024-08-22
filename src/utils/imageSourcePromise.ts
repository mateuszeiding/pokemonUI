export function imageSourcePromise(src: string): Promise<string> {
    return new Promise<string>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            resolve(img.src);
        };
    });
}
