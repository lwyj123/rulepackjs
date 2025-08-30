import { RulePackGenerator, createRulePack, storyRulePack, nameRulePack } from '../src/index.js'

// Example 1: Simple greeting generator
console.log('=== Simple Greeting Example ===')
const greetingPack = createRulePack('greetings', 'Greeting Generator')
    .addRule('greeting', 'Hello, {name}!')
    .addRule('greeting', 'Hi there, {name}!')
    .addRule('greeting', 'Greetings, {name}!')
    .addRule('name', 'World')
    .addRule('name', 'Friend')
    .addRule('name', 'Traveler')
    .build()

const greetingGenerator = new RulePackGenerator([greetingPack])
for (let i = 0; i < 3; i++) {
    const result = greetingGenerator.generate('greeting')
    console.log(result.text)
}

// Example 2: Weather with weights
console.log('\n=== Weighted Weather Example ===')
const weatherPack = createRulePack('weather')
    .addRule('forecast', 'Today will be {weather}.')
    .addRule('weather', 'sunny', 50)
    .addRule('weather', 'cloudy', 30)
    .addRule('weather', 'rainy', 15)
    .addRule('weather', 'stormy', 5)
    .build()

const weatherGenerator = new RulePackGenerator([weatherPack])
for (let i = 0; i < 5; i++) {
    const result = weatherGenerator.generate('forecast', { seed: `weather-${i}` })
    console.log(result.text)
}

// Example 3: Character names
console.log('\n=== Fantasy Names Example ===')
const nameGenerator = new RulePackGenerator([nameRulePack])
for (let i = 0; i < 5; i++) {
    const result = nameGenerator.generate('full_name', { seed: `name-${i}` })
    console.log(result.text)
}

// Example 4: Story generation
console.log('\n=== Story Generation Example ===')
const storyGenerator = new RulePackGenerator([storyRulePack])
for (let i = 0; i < 3; i++) {
    const protagonist = i === 0 ? 'a young warrior' :
        i === 1 ? 'an old sage' : 'a cunning thief'

    const story = storyGenerator.generate('story', {
        seed: `story-${i}`,
        variables: { protagonist }
    })

    console.log(`\nStory ${i + 1}:`)
    console.log(story.text)
    console.log('---')
}

// Example 5: Custom complex pack
console.log('\n=== Quest Generator Example ===')
const questPack = createRulePack('quests', 'Quest Generator')
    .addRule('quest', 'A {quest_giver} needs you to {objective} in the {location}.')
    .addRule('quest_giver', 'village elder')
    .addRule('quest_giver', 'mysterious stranger')
    .addRule('quest_giver', 'local merchant')
    .addRule('objective', 'retrieve a stolen {item}')
    .addRule('objective', 'defeat the {monster}')
    .addRule('objective', 'deliver a {item}')
    .addRule('item', 'ancient artifact')
    .addRule('item', 'magical potion')
    .addRule('item', 'important letter')
    .addRule('monster', 'bandit leader')
    .addRule('monster', 'wild beast')
    .addRule('monster', 'corrupted spirit')
    .addRule('location', 'abandoned ruins')
    .addRule('location', 'dark forest')
    .addRule('location', 'mountain cave')
    .build()

const questGenerator = new RulePackGenerator([questPack])
for (let i = 0; i < 4; i++) {
    const result = questGenerator.generate('quest', { seed: `quest-${i}` })
    console.log(result.text)
}
