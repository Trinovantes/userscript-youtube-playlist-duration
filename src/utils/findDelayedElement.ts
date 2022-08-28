import { MAX_UI_WAIT_ATTEMPTS, UI_WAIT_TIME } from '@/Constants'
import { sleep } from './sleep'

export async function findDelayedElement(selector: string, parent?: HTMLElement | JQuery<HTMLElement>): Promise<JQuery<HTMLElement>> {
    let target: JQuery<HTMLElement> | null = null

    for (let attempts = 0; attempts < MAX_UI_WAIT_ATTEMPTS; attempts++) {
        if (parent) {
            target = $(parent).find(selector)
        } else {
            target = $(selector)
        }

        if (target.length) {
            console.debug(DEFINE.NAME, 'findDelayedElement()', `Found "${selector}"`, target)
            break
        }

        // Exponential back off
        const delay = UI_WAIT_TIME * Math.pow(2, attempts)
        console.debug(DEFINE.NAME, `Waiting ${delay}ms`)
        await sleep(delay)
    }

    if (!target || target.length === 0) {
        throw new Error(`findDelayedElement() failed to find "${selector}"`)
    }

    return target
}
