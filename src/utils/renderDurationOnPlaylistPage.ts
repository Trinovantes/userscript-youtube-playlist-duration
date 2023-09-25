import { DurationTracker } from '@/utils/DurationTracker'
import { findDelayedElement, findDelayedElements } from '@/utils/findDelayedElement'
import { isOnPlaylistPage } from './isOnPlaylistPage'
import { createDurationNode } from './createDurationNode'
import { durationNodeId } from '@/Constants'

export async function renderDurationOnPlaylistPage() {
    if (!isOnPlaylistPage()) {
        return
    }

    const videoRows = await findDelayedElements('#contents.ytd-playlist-video-list-renderer > ytd-playlist-video-renderer')
    console.info(DEFINE.NAME, 'renderDurationOnPlaylistPage()', `videos:${videoRows.length}`)

    const durationTracker = new DurationTracker()
    console.groupCollapsed(DEFINE.NAME, 'renderDurationOnPlaylistPage()')

    for (const videoRow of videoRows) {
        const titleWrapper = await findDelayedElement('a#video-title', videoRow)
        const title = titleWrapper.textContent?.trim()
        if (!title) {
            console.warn(DEFINE.NAME, 'Failed to parse video title', videoRow)
            continue
        }

        const durationWrapper = await findDelayedElement('span.ytd-thumbnail-overlay-time-status-renderer', videoRow)
        const duration = durationWrapper.textContent?.trim()
        if (!duration) {
            console.warn(DEFINE.NAME, 'Failed to parse video duration', videoRow)
            continue
        }

        const durationInSec = durationTracker.addDuration(duration)
        console.info(`Parsed ${duration} as ${durationInSec} seconds`, `"${title}"`)
    }

    console.groupEnd()
    console.info(DEFINE.NAME, 'renderDurationOnPlaylistPage()', `duration:${durationTracker.totalDuration} (${durationTracker.totalDurationSec} sec)`)

    const durationNode = document.getElementById(durationNodeId) ?? createDurationNode()
    durationNode.textContent = `Duration: ${durationTracker.totalDuration}`

    const headerContainer = await findDelayedElement('ytd-page-manager ytd-playlist-header-renderer .metadata-wrapper .metadata-action-bar')
    headerContainer.before(durationNode)
}
