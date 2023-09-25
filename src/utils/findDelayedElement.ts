import { MAX_UI_WAIT_ATTEMPTS, UI_WAIT_TIME } from '@/Constants'
import { sleep } from './sleep'

export async function findDelayedElement(selector: string, parent?: Element): Promise<Element> {
    let target: Element | null = null

    for (let attempts = 0; attempts < MAX_UI_WAIT_ATTEMPTS; attempts++) {
        if (parent) {
            target = parent.querySelector(selector)
        } else {
            target = document.querySelector(selector)
        }

        if (target) {
            console.debug(DEFINE.NAME, 'findDelayedElement()', `Found "${selector}"`, target)
            break
        }

        // Exponential back off
        const delay = UI_WAIT_TIME * Math.pow(2, attempts)
        console.debug(DEFINE.NAME, 'findDelayedElement()', `Waiting ${delay}ms`)
        await sleep(delay)
    }

    if (!target) {
        throw new Error(`findDelayedElement() failed to find "${selector}"`)
    }

    return target
}

export async function findDelayedElements(selector: string, parent?: Element): Promise<NodeListOf<Element>> {
    let target: NodeListOf<Element> | null = null

    for (let attempts = 0; attempts < MAX_UI_WAIT_ATTEMPTS; attempts++) {
        if (parent) {
            target = parent.querySelectorAll(selector)
        } else {
            target = document.querySelectorAll(selector)
        }

        if (target.length > 0) {
            console.debug(DEFINE.NAME, 'findDelayedElements()', `Found "${selector}"`, target)
            break
        }

        // Exponential back off
        const delay = UI_WAIT_TIME * Math.pow(2, attempts)
        console.debug(DEFINE.NAME, 'findDelayedElements()', `Waiting ${delay}ms`)
        await sleep(delay)
    }

    if (!target) {
        throw new Error(`findDelayedElements() failed to find "${selector}"`)
    }

    return target
}
