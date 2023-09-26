import { DurationTracker } from '@/utils/DurationTracker'
import { findDelayedElement } from '@/utils/findDelayedElement'
import { findDelayedElementAll } from './findDelayedElementAll'
import { isOnPlaylistVideo } from './isOnPlaylistVideo'
import { createDurationNode } from './createDurationNode'
import { durationNodeId } from '@/Constants'

export async function renderDurationOnPlaylistVideo() {
    if (!isOnPlaylistVideo()) {
        return
    }

    const playlistItems = await findDelayedElementAll('#content #container #items.playlist-items.ytd-playlist-panel-renderer > ytd-playlist-panel-video-renderer')
    console.info(DEFINE.NAME, 'renderDurationOnPlaylistVideo()', `videos:${playlistItems.length}`)

    const durationTracker = new DurationTracker()
    console.groupCollapsed(DEFINE.NAME, 'renderDurationOnPlaylistVideo()')

    for (const playlistItem of playlistItems) {
        const titleWrapper = await findDelayedElement('span#video-title', playlistItem)
        const title = titleWrapper.textContent?.trim()
        if (!title) {
            console.warn(DEFINE.NAME, 'Failed to parse video title', playlistItem)
            continue
        }

        const durationWrapper = await findDelayedElement('span.ytd-thumbnail-overlay-time-status-renderer', playlistItem)
        const duration = durationWrapper.textContent?.trim()
        if (!duration) {
            console.warn(DEFINE.NAME, 'Failed to parse video duration', playlistItem)
            continue
        }

        const durationInSec = durationTracker.addDuration(duration)
        console.info(`Parsed ${duration} as ${durationInSec} seconds`, `"${title}"`)
    }

    console.groupEnd()
    console.info(DEFINE.NAME, 'renderDurationOnPlaylistVideo()', `duration:${durationTracker.totalDuration} (${durationTracker.totalDurationSec} sec)`)

    const durationNode = document.getElementById(durationNodeId) ?? createDurationNode()
    durationNode.textContent = `Duration: ${durationTracker.totalDuration}`

    const headerContainer = await findDelayedElement('#content #container #header-description h3:first-child')
    headerContainer.after(durationNode)
}
