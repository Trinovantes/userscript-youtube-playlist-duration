import { DurationTracker } from '../utils/DurationTracker.ts'
import { findDelayedElement } from '../utils/findDelayedElement.ts'
import { findDelayedElementAll } from './findDelayedElementAll.ts'
import { isOnPlaylistVideo } from './isOnPlaylistVideo.ts'
import { createDurationNode } from './createDurationNode.ts'
import { durationNodeId } from '../Constants.ts'

export async function renderDurationOnPlaylistVideo() {
    if (!isOnPlaylistVideo()) {
        return
    }

    const playlistItems = await findDelayedElementAll('#content #container #items.playlist-items.ytd-playlist-panel-renderer > ytd-playlist-panel-video-renderer')
    console.info(__NAME__, 'renderDurationOnPlaylistVideo()', `videos:${playlistItems.length}`)

    const durationTracker = new DurationTracker()
    console.groupCollapsed(__NAME__, 'renderDurationOnPlaylistVideo()')

    for (const playlistItem of playlistItems) {
        const titleWrapper = await findDelayedElement('span#video-title', playlistItem)
        const title = titleWrapper.textContent?.trim()
        if (!title) {
            console.warn(__NAME__, 'Failed to parse video title', playlistItem)
            continue
        }

        const durationWrapper = await findDelayedElement('span.ytd-thumbnail-overlay-time-status-renderer', playlistItem)
        const duration = durationWrapper.textContent?.trim()
        if (!duration) {
            console.warn(__NAME__, 'Failed to parse video duration', playlistItem)
            continue
        }

        const durationInSec = durationTracker.addDuration(duration)
        console.info(`Parsed ${duration} as ${durationInSec} seconds`, `"${title}"`)
    }

    console.groupEnd()
    console.info(__NAME__, 'renderDurationOnPlaylistVideo()', `duration:${durationTracker.totalDuration} (${durationTracker.totalDurationSec} sec)`)

    const durationNode = document.getElementById(durationNodeId) ?? createDurationNode()
    durationNode.textContent = `Duration: ${durationTracker.totalDuration}`

    const headerContainer = await findDelayedElement('#content #container #header-description h3:first-child')
    headerContainer.after(durationNode)
}
