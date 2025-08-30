import type { RandomGenerator } from './types.js'

/**
 * Simple Linear Congruential Generator for deterministic random numbers
 */
export class SeededRandom implements RandomGenerator {
    private state: number = 1

    constructor(seed: string | number = Date.now()) {
        this.seed(seed)
    }

    seed(value: string | number): void {
        if (typeof value === 'string') {
            // Convert string to number using a simple hash
            this.state = 0
            for (let i = 0; i < value.length; i++) {
                this.state = (this.state * 31 + value.charCodeAt(i)) % 2147483647
            }
        } else {
            this.state = Math.abs(value) % 2147483647
        }

        if (this.state <= 0) {
            this.state += 2147483646
        }
    }

    random(): number {
        // Linear Congruential Generator
        this.state = (this.state * 16807) % 2147483647
        return (this.state - 1) / 2147483646
    }

    /**
     * Generate random integer between min (inclusive) and max (exclusive)
     */
    randomInt(min: number, max: number): number {
        return Math.floor(this.random() * (max - min)) + min
    }

    /**
     * Choose random element from array with optional weights
     */
    choose<T>(items: T[], weights?: number[]): T {
        if (items.length === 0) {
            throw new Error('Cannot choose from empty array')
        }

        if (!weights || weights.length !== items.length) {
            return items[this.randomInt(0, items.length)]!
        }

        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
        let random = this.random() * totalWeight

        for (let i = 0; i < items.length; i++) {
            random -= weights[i]!
            if (random <= 0) {
                return items[i]!
            }
        }

        return items[items.length - 1]!
    }
}
