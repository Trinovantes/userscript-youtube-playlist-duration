import { TITLE } from './Constants'
import { renderDurationOnPlaylistPage } from './services/ytb/renderDurationOnPlaylistPage'
import { renderDurationOnPlaylistVideo } from './services/ytb/renderDurationOnPlaylistVideo'

function run() {
    Promise.all([
        renderDurationOnPlaylistPage(),
        renderDurationOnPlaylistVideo(),
    ]).catch((err) => {
        console.warn(DEFINE.NAME, err)
    })
}

console.info(TITLE)
window.addEventListener('yt-navigate-finish', run)
