import type { Rule, RulePack, GenerationOptions, GenerationResult } from './types.js'
import { SeededRandom } from './random.js'

/**
 * Main class for generating text using RulePack grammar system
 */
export class RulePackGenerator {
    private rulesBySymbol: Map<string, Rule[]> = new Map()
    private variables: Map<string, string> = new Map()
    private random: SeededRandom

    constructor(rulePacks: RulePack[] = []) {
        this.random = new SeededRandom()
        this.loadRulePacks(rulePacks)
    }

    /**
     * Load one or more rule packs into the generator
     */
    loadRulePacks(rulePacks: RulePack[]): void {
        for (const pack of rulePacks) {
            this.loadRulePack(pack)
        }
    }

    /**
     * Load a single rule pack
     */
    loadRulePack(pack: RulePack): void {
        // Load default variables
        if (pack.variables) {
            for (const [key, value] of Object.entries(pack.variables)) {
                this.variables.set(key, value)
            }
        }

        // Group rules by symbol
        for (const rule of pack.rules) {
            const existing = this.rulesBySymbol.get(rule.symbol) || []
            existing.push(rule)
            this.rulesBySymbol.set(rule.symbol, existing)
        }
    }

    /**
     * Generate text starting from a root symbol
     */
    generate(rootSymbol: string, options: GenerationOptions = {}): GenerationResult {
        const {
            maxDepth = 10,
            seed,
            variables = {},
            allowUndefined = false,
        } = options

        // Set seed if provided
        if (seed !== undefined) {
            this.random.seed(seed)
        }

        // Merge custom variables with defaults
        const mergedVariables = new Map(this.variables)
        for (const [key, value] of Object.entries(variables)) {
            mergedVariables.set(key, value)
        }

        const result = this.generateRecursive(
            rootSymbol,
            mergedVariables,
            0,
            maxDepth,
            allowUndefined
        )

        return {
            text: result.trim(),
            variables: Object.fromEntries(mergedVariables),
            depth: 0, // This would need to be tracked in a more complex implementation
        }
    }

    /**
     * Recursive text generation
     */
    private generateRecursive(
        symbol: string,
        variables: Map<string, string>,
        depth: number,
        maxDepth: number,
        allowUndefined: boolean
    ): string {
        if (depth >= maxDepth) {
            return `[MAX_DEPTH:${symbol}]`
        }

        // Check if it's a variable reference
        if (variables.has(symbol)) {
            return variables.get(symbol)!
        }

        // Get rules for this symbol
        const rules = this.rulesBySymbol.get(symbol)
        if (!rules || rules.length === 0) {
            if (allowUndefined) {
                return symbol
            }
            return `[UNDEFINED:${symbol}]`
        }

        // Choose a random rule based on weights
        const weights = rules.map(rule => rule.weight || 1)
        const selectedRule = this.random.choose(rules, weights)

        // Process the rule text
        return this.processText(selectedRule.text, variables, depth + 1, maxDepth, allowUndefined)
    }

    /**
     * Process text template, replacing symbols and variables
     */
    private processText(
        text: string,
        variables: Map<string, string>,
        depth: number,
        maxDepth: number,
        allowUndefined: boolean
    ): string {
        // Replace {symbol} patterns
        return text.replace(/\{([^}]+)\}/g, (match, symbolName) => {
            return this.generateRecursive(symbolName, variables, depth, maxDepth, allowUndefined)
        })
    }

    /**
     * Set a variable value
     */
    setVariable(key: string, value: string): void {
        this.variables.set(key, value)
    }

    /**
     * Get all available symbols
     */
    getAvailableSymbols(): string[] {
        return Array.from(this.rulesBySymbol.keys())
    }

    /**
     * Get rules for a specific symbol
     */
    getRulesForSymbol(symbol: string): Rule[] {
        return this.rulesBySymbol.get(symbol) || []
    }

    /**
     * Clear all loaded rules and variables
     */
    clear(): void {
        this.rulesBySymbol.clear()
        this.variables.clear()
    }
}
