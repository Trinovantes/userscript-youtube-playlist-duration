import { DurationTracker } from '@/utils/DurationTracker'
import { findDelayedElement } from '@/utils/findDelayedElement'
import { isOnPlaylistVideo } from './isOnPlaylistVideo'

export async function renderDurationOnPlaylistVideo() {
    if (!isOnPlaylistVideo()) {
        return
    }

    const playlistItems = await findDelayedElement('#content #container #items.playlist-items.ytd-playlist-panel-renderer > ytd-playlist-panel-video-renderer')
    console.info(DEFINE.NAME, 'renderDurationOnPlaylistVideo()', `videos:${playlistItems.length}`)

    const durationNodeId = `${DEFINE.NAME}-duration`
    const durationNode = document.getElementById(durationNodeId) ?? $(`<span style="display:block;" id="${durationNodeId}"></span>`)
    $(durationNode).text('Duration: (?)')

    const headerContainer = await findDelayedElement('#content #container #header-description h3:first-child')
    headerContainer.append(durationNode)

    const durationTracker = new DurationTracker()
    for (const playlistItem of playlistItems) {
        const titleWrapper = await findDelayedElement('span#video-title', playlistItem)
        if (titleWrapper.length !== 1) {
            console.warn('Invalid titleWrapper', titleWrapper)
            continue
        }

        const durationWrapper = await findDelayedElement('span.ytd-thumbnail-overlay-time-status-renderer', playlistItem)
        if (durationWrapper.length !== 1) {
            console.warn('Invalid durationWrapper', durationWrapper)
            continue
        }

        const title = titleWrapper.text().trim()
        const duration = durationWrapper.text().trim()
        const durationInSec = durationTracker.addDuration(duration)
        console.debug(DEFINE.NAME, `"${title}": Parsed ${duration} as ${durationInSec} seconds`)
    }

    console.info(DEFINE.NAME, 'renderDurationOnPlaylistVideo()', `duration:${durationTracker.duration}`)
    $(durationNode).text(`Duration: ${durationTracker.duration}`)
}
