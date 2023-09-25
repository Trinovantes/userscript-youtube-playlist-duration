export function isOnPlaylistPage(): boolean {
    const re = /youtube\.com\/playlist\?list=([\w]+)/
    return re.test(location.href)
}
