const toSecMultiplier = [
    1, // per sec
    60, // per minute
    60 * 60, // per hour
    60 * 60 * 24, // per day
]

export class DurationTracker {
    private _totalDuration: number // in sec

    constructor() {
        this._totalDuration = 0
    }

    addDuration(duration: string): number {
        const parts = duration.split(':').reverse()

        let durationInSec = 0
        for (let i = 0; i < parts.length; i++) {
            const interval = parseInt(parts[i])
            if (isNaN(interval)) {
                console.warn(`Failed to parse interval "${parts[i]}"`)
                continue
            }

            durationInSec += interval * toSecMultiplier[i]
        }

        if (isNaN(durationInSec)) {
            throw new Error(`Failed to parse duration "${duration}"`)
        }

        this._totalDuration += durationInSec
        return durationInSec
    }

    get totalDuration(): string {
        let durationStr = ''
        let durationInSec = this._totalDuration

        for (let i = toSecMultiplier.length - 1; i >= 0; i--) {
            const interval = Math.floor(durationInSec / toSecMultiplier[i])
            if (interval > 0 || durationStr.length > 0) {
                durationStr += `:${interval.toFixed(0).padStart(2, '0')}`
            }

            durationInSec %= toSecMultiplier[i]
        }

        return durationStr.substring(1)
    }

    get totalDurationSec(): number {
        return this._totalDuration
    }
}
