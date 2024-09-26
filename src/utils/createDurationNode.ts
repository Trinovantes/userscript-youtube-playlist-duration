import { durationNodeId } from '../Constants.ts'

export function createDurationNode() {
    const node = document.createElement('strong')
    node.setAttribute('style', 'display:block; font-size: 1.2rem;')
    node.setAttribute('id', durationNodeId)
    return node
}
