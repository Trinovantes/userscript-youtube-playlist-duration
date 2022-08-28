export function isOnPlaylistVideo(): boolean {
    const re = /youtube\.com\/watch\?v=([\w]+)&list=([\w]+)/
    return re.test(location.href)
}
