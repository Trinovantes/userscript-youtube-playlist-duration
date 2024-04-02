import { renderDurationOnPlaylistPage } from './utils/renderDurationOnPlaylistPage'
import { renderDurationOnPlaylistVideo } from './utils/renderDurationOnPlaylistVideo'

function run() {
    Promise.all([
        renderDurationOnPlaylistPage(),
        renderDurationOnPlaylistVideo(),
    ]).catch((err: unknown) => {
        console.warn(DEFINE.NAME, err)
    })
}

window.addEventListener('yt-navigate-finish', run)
