import { renderDurationOnPlaylistPage } from './utils/renderDurationOnPlaylistPage.ts'
import { renderDurationOnPlaylistVideo } from './utils/renderDurationOnPlaylistVideo.ts'

function run() {
    Promise.all([
        renderDurationOnPlaylistPage(),
        renderDurationOnPlaylistVideo(),
    ]).catch((err: unknown) => {
        console.warn(__NAME__, err)
    })
}

window.addEventListener('yt-navigate-finish', run)
