const toSecMultiplier = [
    1, // per sec
    60, // per minute
    60 * 60, // per hour
    60 * 60 * 24, // per day
]

export class DurationTracker {
    #totalTime: number // in sec

    constructor() {
        this.#totalTime = 0
    }

    addDuration(duration: string): number {
        const parts = duration.split(':').reverse()

        let durationInSec = 0
        for (let i = 0; i < parts.length; i++) {
            durationInSec += parseInt(parts[i]) * toSecMultiplier[i]
        }

        if (isNaN(durationInSec)) {
            throw new Error(`Failed to parse duration "${duration}"`)
        }

        this.#totalTime += durationInSec
        return durationInSec
    }

    get duration(): string {
        let durationInSec = this.#totalTime
        let duration = ''
        let idx = toSecMultiplier.length - 1

        while (durationInSec > 0) {
            const interval = durationInSec / toSecMultiplier[idx]

            durationInSec %= toSecMultiplier[idx]
            duration += `:${interval.toFixed(0).padStart(2, '0')}`
            idx -= 1
        }

        return duration.substring(1)
    }
}
