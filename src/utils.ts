import type { RulePack, Rule } from './types.js'

/**
 * Utility functions for creating and manipulating rule packs
 */
export class RulePackBuilder {
    private pack: RulePack

    constructor(id: string, name?: string, description?: string) {
        this.pack = {
            id,
            ...(name && { name }),
            ...(description && { description }),
            rules: [],
            variables: {},
        }
    }

    /**
     * Add a rule to the pack
     */
    addRule(symbol: string, text: string, weight?: number, tags?: string[]): this {
        const rule: Rule = { symbol, text }
        if (weight !== undefined) rule.weight = weight
        if (tags !== undefined) rule.tags = tags

        this.pack.rules.push(rule)
        return this
    }

    /**
     * Add multiple rules for the same symbol
     */
    addRules(symbol: string, texts: string[], weight?: number, tags?: string[]): this {
        for (const text of texts) {
            this.addRule(symbol, text, weight, tags)
        }
        return this
    }

    /**
     * Set a variable
     */
    setVariable(key: string, value: string): this {
        if (!this.pack.variables) {
            this.pack.variables = {}
        }
        this.pack.variables[key] = value
        return this
    }

    /**
     * Set multiple variables
     */
    setVariables(variables: Record<string, string>): this {
        if (!this.pack.variables) {
            this.pack.variables = {}
        }
        Object.assign(this.pack.variables, variables)
        return this
    }

    /**
     * Build and return the rule pack
     */
    build(): RulePack {
        return { ...this.pack }
    }
}

/**
 * Create a new rule pack builder
 */
export function createRulePack(id: string, name?: string, description?: string): RulePackBuilder {
    return new RulePackBuilder(id, name, description)
}

/**
 * Load rule pack from JSON
 */
export function loadRulePackFromJSON(json: string): RulePack {
    const data = JSON.parse(json)

    if (!data.id || !Array.isArray(data.rules)) {
        throw new Error('Invalid rule pack format: missing id or rules array')
    }

    return data as RulePack
}

/**
 * Save rule pack to JSON
 */
export function saveRulePackToJSON(pack: RulePack): string {
    return JSON.stringify(pack, null, 2)
}

/**
 * Merge multiple rule packs into one
 */
export function mergeRulePacks(id: string, packs: RulePack[], name?: string): RulePack {
    const merged: RulePack = {
        id,
        name: name || `Merged: ${packs.map(p => p.name || p.id).join(', ')}`,
        rules: [],
        variables: {},
    }

    for (const pack of packs) {
        merged.rules.push(...pack.rules)
        if (pack.variables) {
            Object.assign(merged.variables!, pack.variables)
        }
    }

    return merged
}

/**
 * Filter rules by tags
 */
export function filterRulesByTags(pack: RulePack, tags: string[]): RulePack {
    const filtered = { ...pack }
    filtered.rules = pack.rules.filter(rule =>
        rule.tags && rule.tags.some(tag => tags.includes(tag))
    )
    return filtered
}

/**
 * Get all unique tags from a rule pack
 */
export function getAllTags(pack: RulePack): string[] {
    const tags = new Set<string>()
    for (const rule of pack.rules) {
        if (rule.tags) {
            for (const tag of rule.tags) {
                tags.add(tag)
            }
        }
    }
    return Array.from(tags).sort()
}
