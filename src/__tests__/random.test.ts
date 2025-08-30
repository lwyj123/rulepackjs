import { describe, it, expect } from 'vitest'
import { SeededRandom } from '../random.js'

describe('SeededRandom', () => {
    it('should produce consistent results with same seed', () => {
        const rng1 = new SeededRandom(12345)
        const rng2 = new SeededRandom(12345)

        expect(rng1.random()).toBe(rng2.random())
        expect(rng1.random()).toBe(rng2.random())
    })

    it('should produce different results with different seeds', () => {
        const rng1 = new SeededRandom(12345)
        const rng2 = new SeededRandom(54321)

        expect(rng1.random()).not.toBe(rng2.random())
    })

    it('should handle string seeds', () => {
        const rng1 = new SeededRandom('test')
        const rng2 = new SeededRandom('test')

        expect(rng1.random()).toBe(rng2.random())
    })

    it('should generate random integers in range', () => {
        const rng = new SeededRandom(12345)

        for (let i = 0; i < 100; i++) {
            const value = rng.randomInt(1, 10)
            expect(value).toBeGreaterThanOrEqual(1)
            expect(value).toBeLessThan(10)
            expect(Number.isInteger(value)).toBe(true)
        }
    })

    it('should choose from arrays', () => {
        const rng = new SeededRandom(12345)
        const items = ['a', 'b', 'c']

        const choice = rng.choose(items)
        expect(items).toContain(choice)
    })

    it('should respect weights when choosing', () => {
        const rng = new SeededRandom(12345)
        const items = ['rare', 'common']
        const weights = [1, 100] // 'common' should be chosen much more often

        const results = new Map<string, number>()

        for (let i = 0; i < 1000; i++) {
            const choice = rng.choose(items, weights)
            results.set(choice, (results.get(choice) || 0) + 1)
        }

        const commonCount = results.get('common') || 0
        const rareCount = results.get('rare') || 0

        // 'common' should appear much more often than 'rare'
        expect(commonCount).toBeGreaterThan(rareCount * 10)
    })

    it('should throw error on empty array', () => {
        const rng = new SeededRandom()
        expect(() => rng.choose([])).toThrow('Cannot choose from empty array')
    })
})
