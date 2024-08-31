export function cls(...args: (string | undefined | boolean)[]): string {
    return args.filter(Boolean).join(' ');
}
