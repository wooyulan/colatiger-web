
const isServer = typeof window === 'undefined';

export function getStorage(name: string) {
    if (isServer) return
    return localStorage.getItem(name);
}