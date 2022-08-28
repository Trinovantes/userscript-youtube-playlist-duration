import { DurationTracker } from '@/utils/DurationTracker'
import { findDelayedElement } from '@/utils/findDelayedElement'
import { isOnPlaylistPage } from './isOnPlaylistPage'

export async function renderDurationOnPlaylistPage() {
    if (!isOnPlaylistPage()) {
        return
    }

    const videoRows = await findDelayedElement('#contents.ytd-playlist-video-list-renderer > ytd-playlist-video-renderer')
    console.info(DEFINE.NAME, 'renderDurationOnPlaylistPage', `videos:${videoRows.length}`)

    const durationNodeId = `${DEFINE.NAME}-duration`
    const durationNode = document.getElementById(durationNodeId) ?? $(`<span style="display:block;" id="${durationNodeId}"></span>`)
    $(durationNode).text('Duration: (?)')

    const headerContainer = await findDelayedElement('ytd-playlist-sidebar-renderer h1#title')
    headerContainer.append(durationNode)

    const durationTracker = new DurationTracker()
    for (const videoRow of videoRows) {
        const durationWrapper = await findDelayedElement('span.ytd-thumbnail-overlay-time-status-renderer', videoRow)
        const duration = durationWrapper.text().trim()

        const titleWrapper = await findDelayedElement('a#video-title', videoRow)
        const title = titleWrapper.text().trim()

        const durationInSec = durationTracker.addDuration(duration)
        console.debug(DEFINE.NAME, `"${title}": Parsed ${duration} as ${durationInSec} seconds`)
    }

    console.info(DEFINE.NAME, 'renderDurationOnPlaylistPage', `duration:${durationTracker.duration}`)
    $(durationNode).text(`Duration: ${durationTracker.duration}`)
}
