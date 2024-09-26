import { DurationTracker } from '../utils/DurationTracker.ts'
import { findDelayedElement } from '../utils/findDelayedElement.ts'
import { findDelayedElementAll } from './findDelayedElementAll.ts'
import { isOnPlaylistPage } from './isOnPlaylistPage.ts'
import { createDurationNode } from './createDurationNode.ts'
import { durationNodeId } from '../Constants.ts'

export async function renderDurationOnPlaylistPage() {
    if (!isOnPlaylistPage()) {
        return
    }

    const videoRows = await findDelayedElementAll('#contents.ytd-playlist-video-list-renderer > ytd-playlist-video-renderer')
    console.info(__NAME__, 'renderDurationOnPlaylistPage()', `videos:${videoRows.length}`)

    const durationTracker = new DurationTracker()
    console.groupCollapsed(__NAME__, 'renderDurationOnPlaylistPage()')

    for (const videoRow of videoRows) {
        const titleWrapper = await findDelayedElement('a#video-title', videoRow)
        const title = titleWrapper.textContent?.trim()
        if (!title) {
            console.warn(__NAME__, 'Failed to parse video title', videoRow)
            continue
        }

        const durationWrapper = await findDelayedElement('span.ytd-thumbnail-overlay-time-status-renderer', videoRow)
        const duration = durationWrapper.textContent?.trim()
        if (!duration) {
            console.warn(__NAME__, 'Failed to parse video duration', videoRow)
            continue
        }

        const durationInSec = durationTracker.addDuration(duration)
        console.info(`Parsed ${duration} as ${durationInSec} seconds`, `"${title}"`)
    }

    console.groupEnd()
    console.info(__NAME__, 'renderDurationOnPlaylistPage()', `duration:${durationTracker.totalDuration} (${durationTracker.totalDurationSec} sec)`)

    const durationNode = document.getElementById(durationNodeId) ?? createDurationNode()
    durationNode.textContent = `Duration: ${durationTracker.totalDuration}`

    const headerContainer = await findDelayedElement('ytd-page-manager ytd-playlist-header-renderer .metadata-wrapper .metadata-action-bar')
    headerContainer.before(durationNode)
}
