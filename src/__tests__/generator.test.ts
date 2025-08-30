import { describe, it, expect } from 'vitest'
import { RulePackGenerator } from '../generator.js'
import { createRulePack } from '../utils.js'

describe('RulePackGenerator', () => {
    it('should generate simple text', () => {
        const pack = createRulePack('test')
            .addRule('greeting', 'Hello, {name}!')
            .addRule('name', 'World')
            .build()

        const generator = new RulePackGenerator([pack])
        const result = generator.generate('greeting')

        expect(result.text).toBe('Hello, World!')
    })

    it('should handle weighted rules', () => {
        const pack = createRulePack('test')
            .addRule('color', 'red', 100)
            .addRule('color', 'blue', 1)
            .build()

        const generator = new RulePackGenerator([pack])

        // With a specific seed, we should get consistent results
        const result1 = generator.generate('color', { seed: 12345 })
        const result2 = generator.generate('color', { seed: 12345 })

        expect(result1.text).toBe(result2.text)
    })

    it('should handle variables', () => {
        const pack = createRulePack('test')
            .addRule('greeting', 'Hello, {name}!')
            .setVariable('name', 'Alice')
            .build()

        const generator = new RulePackGenerator([pack])
        const result = generator.generate('greeting')

        expect(result.text).toBe('Hello, Alice!')
    })

    it('should override variables in generation options', () => {
        const pack = createRulePack('test')
            .addRule('greeting', 'Hello, {name}!')
            .setVariable('name', 'Alice')
            .build()

        const generator = new RulePackGenerator([pack])
        const result = generator.generate('greeting', {
            variables: { name: 'Bob' }
        })

        expect(result.text).toBe('Hello, Bob!')
    })

    it('should handle undefined symbols gracefully', () => {
        const pack = createRulePack('test')
            .addRule('greeting', 'Hello, {unknown}!')
            .build()

        const generator = new RulePackGenerator([pack])
        const result = generator.generate('greeting')

        expect(result.text).toBe('Hello, [UNDEFINED:unknown]!')
    })

    it('should allow undefined symbols when configured', () => {
        const pack = createRulePack('test')
            .addRule('greeting', 'Hello, {unknown}!')
            .build()

        const generator = new RulePackGenerator([pack])
        const result = generator.generate('greeting', { allowUndefined: true })

        expect(result.text).toBe('Hello, unknown!')
    })

    it('should prevent infinite recursion', () => {
        const pack = createRulePack('test')
            .addRule('recursive', '{recursive}')
            .build()

        const generator = new RulePackGenerator([pack])
        const result = generator.generate('recursive', { maxDepth: 3 })

        expect(result.text).toContain('[MAX_DEPTH:recursive]')
    })

    it('should return available symbols', () => {
        const pack = createRulePack('test')
            .addRule('greeting', 'Hello!')
            .addRule('farewell', 'Goodbye!')
            .build()

        const generator = new RulePackGenerator([pack])
        const symbols = generator.getAvailableSymbols()

        expect(symbols).toContain('greeting')
        expect(symbols).toContain('farewell')
    })
})
