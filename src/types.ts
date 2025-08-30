/**
 * Represents a single rule within a RulePack
 */
export interface Rule {
    /** The symbol/key this rule defines */
    symbol: string
    /** The text template with possible variable references */
    text: string
    /** Weight for random selection (higher = more likely) */
    weight?: number
    /** Tags for categorization and filtering */
    tags?: string[]
}

/**
 * Configuration options for rule generation
 */
export interface GenerationOptions {
    /** Maximum recursion depth to prevent infinite loops */
    maxDepth?: number
    /** Random seed for reproducible generation */
    seed?: string | number
    /** Custom variable values to override defaults */
    variables?: Record<string, string>
    /** Whether to allow undefined symbols (returns the symbol name) */
    allowUndefined?: boolean
}

/**
 * A collection of rules that can generate text based on grammar patterns
 */
export interface RulePack {
    /** Unique identifier for this rule pack */
    id: string
    /** Human-readable name */
    name?: string
    /** Description of what this rule pack generates */
    description?: string
    /** Array of rules in this pack */
    rules: Rule[]
    /** Default variables for this rule pack */
    variables?: Record<string, string>
}

/**
 * Result of text generation
 */
export interface GenerationResult {
    /** The generated text */
    text: string
    /** Variables used during generation */
    variables: Record<string, string>
    /** Recursion depth reached */
    depth: number
}

/**
 * Random number generator interface for deterministic results
 */
export interface RandomGenerator {
    /** Generate a random number between 0 and 1 */
    random(): number
    /** Seed the generator */
    seed(value: string | number): void
}
