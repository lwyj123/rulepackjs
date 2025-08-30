# RulePackJS

A TypeScript library for story-grammar generation inspired by Rimworld's RulePack system. Generate procedural text, stories, and narratives using a flexible rule-based grammar system.

## Features

- 🎲 **Procedural Text Generation**: Create dynamic content using grammar rules
- 🎯 **Weighted Rules**: Control probability of different text variations
- 🔄 **Variable System**: Use variables and references within rules
- 🌱 **Seeded Random**: Reproducible generation with custom seeds
- 🏷️ **Tag System**: Organize and filter rules by categories
- 📦 **TypeScript Support**: Full type safety and IntelliSense
- 🧪 **Well Tested**: Comprehensive test coverage
- 🚀 **Modern ESM/CJS**: Works in both Node.js and browsers

## Installation

```bash
npm install rulepackjs
```

## Quick Start

```typescript
import { RulePackGenerator, createRulePack } from 'rulepackjs'

// Create a simple rule pack
const greetingPack = createRulePack('greetings', 'Greeting Generator')
  .addRule('greeting', 'Hello, {name}!')
  .addRule('greeting', 'Hi there, {name}!')
  .addRule('greeting', 'Greetings, {name}!')
  .addRule('name', 'World')
  .addRule('name', 'Friend')
  .addRule('name', 'Traveler')
  .build()

// Generate text
const generator = new RulePackGenerator([greetingPack])
const result = generator.generate('greeting')

console.log(result.text) // "Hello, Friend!" (example output)
```

## Advanced Usage

### Weighted Rules

Control the probability of different rule variations:

```typescript
const weatherPack = createRulePack('weather')
  .addRule('weather', 'sunny', 50)      // 50% chance
  .addRule('weather', 'cloudy', 30)     // 30% chance
  .addRule('weather', 'rainy', 15)      // 15% chance
  .addRule('weather', 'stormy', 5)      // 5% chance
  .build()
```

### Variables and Context

Use variables to maintain context across generation:

```typescript
const storyPack = createRulePack('story')
  .addRule('story', '{character} went to the {place} and {action}.')
  .addRule('character', 'brave knight')
  .addRule('character', 'wise wizard')
  .addRule('place', 'enchanted forest')
  .addRule('place', 'ancient castle')
  .addRule('action', 'found a treasure')
  .addRule('action', 'defeated a dragon')
  .setVariable('mood', 'heroic')
  .build()

const generator = new RulePackGenerator([storyPack])
const result = generator.generate('story', {
  variables: { character: 'young apprentice' }, // Override specific variables
  seed: 12345 // For reproducible results
})
```

### Tags and Filtering

Organize rules with tags for better control:

```typescript
const characterPack = createRulePack('characters')
  .addRule('name', 'Aragorn', 1, ['male', 'human', 'ranger'])
  .addRule('name', 'Legolas', 1, ['male', 'elf', 'archer'])
  .addRule('name', 'Gimli', 1, ['male', 'dwarf', 'warrior'])
  .addRule('name', 'Galadriel', 1, ['female', 'elf', 'sorceress'])
  .build()

// Filter rules by tags
import { filterRulesByTags } from 'rulepackjs'
const elfPack = filterRulesByTags(characterPack, ['elf'])
```

### Complex Story Generation

Here's a more complex example using the included story generation pack:

```typescript
import { RulePackGenerator, storyRulePack } from 'rulepackjs'

const generator = new RulePackGenerator([storyRulePack])

// Generate multiple unique stories
for (let i = 0; i < 3; i++) {
  const story = generator.generate('story', {
    seed: `story-${i}`,
    variables: {
      protagonist: i === 0 ? 'a young warrior' : 
                  i === 1 ? 'an old sage' : 'a cunning thief'
    }
  })
  
  console.log(`Story ${i + 1}:`)
  console.log(story.text)
  console.log('---')
}
```

## API Reference

### RulePackGenerator

The main class for generating text from rule packs.

#### Constructor
```typescript
new RulePackGenerator(rulePacks?: RulePack[])
```

#### Methods

- `generate(symbol: string, options?: GenerationOptions): GenerationResult`
- `loadRulePack(pack: RulePack): void`
- `loadRulePacks(packs: RulePack[]): void`
- `setVariable(key: string, value: string): void`
- `getAvailableSymbols(): string[]`
- `getRulesForSymbol(symbol: string): Rule[]`
- `clear(): void`

### RulePackBuilder

Utility class for building rule packs programmatically.

```typescript
const pack = createRulePack('id', 'name', 'description')
  .addRule(symbol, text, weight?, tags?)
  .addRules(symbol, texts[], weight?, tags?)
  .setVariable(key, value)
  .setVariables(object)
  .build()
```

### Utility Functions

- `loadRulePackFromJSON(json: string): RulePack`
- `saveRulePackToJSON(pack: RulePack): string`
- `mergeRulePacks(id: string, packs: RulePack[], name?: string): RulePack`
- `filterRulesByTags(pack: RulePack, tags: string[]): RulePack`
- `getAllTags(pack: RulePack): string[]`

## Rule Pack Format

Rule packs can be defined as JSON or TypeScript objects:

```typescript
interface RulePack {
  id: string
  name?: string
  description?: string
  rules: Rule[]
  variables?: Record<string, string>
}

interface Rule {
  symbol: string
  text: string
  weight?: number
  tags?: string[]
}
```

## Examples

The library includes several example rule packs:

- `storyRulePack`: Generates short narrative stories
- `nameRulePack`: Generates fantasy character names

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.

## Inspiration

This library is inspired by the RulePack system used in [Rimworld](https://rimworldwiki.com/wiki/Modding_Tutorials/Grammar) for generating dynamic flavor text and stories.