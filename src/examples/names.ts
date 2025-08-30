import type { RulePack } from '../types.js'

/**
 * Name generation rule pack
 */
export const nameRulePack: RulePack = {
    id: 'names',
    name: 'Fantasy Name Generator',
    description: 'Generates fantasy character names',
    rules: [
        // Full names
        {
            symbol: 'full_name',
            text: '{first_name} {last_name}',
            weight: 2,
        },
        {
            symbol: 'full_name',
            text: '{first_name} the {epithet}',
            weight: 1,
        },
        {
            symbol: 'full_name',
            text: '{first_name} of {place_name}',
            weight: 1,
        },

        // First names
        {
            symbol: 'first_name',
            text: 'Aeliana',
            weight: 1,
            tags: ['female', 'elvish'],
        },
        {
            symbol: 'first_name',
            text: 'Thormund',
            weight: 1,
            tags: ['male', 'dwarven'],
        },
        {
            symbol: 'first_name',
            text: 'Lyra',
            weight: 1,
            tags: ['female', 'human'],
        },
        {
            symbol: 'first_name',
            text: 'Gareth',
            weight: 1,
            tags: ['male', 'human'],
        },
        {
            symbol: 'first_name',
            text: 'Zephyr',
            weight: 1,
            tags: ['neutral', 'mystical'],
        },
        {
            symbol: 'first_name',
            text: 'Seraphina',
            weight: 1,
            tags: ['female', 'angelic'],
        },

        // Last names
        {
            symbol: 'last_name',
            text: 'Brightblade',
            weight: 1,
            tags: ['heroic'],
        },
        {
            symbol: 'last_name',
            text: 'Stormwind',
            weight: 1,
            tags: ['noble'],
        },
        {
            symbol: 'last_name',
            text: 'Shadowmere',
            weight: 1,
            tags: ['mysterious'],
        },
        {
            symbol: 'last_name',
            text: 'Ironforge',
            weight: 1,
            tags: ['dwarven'],
        },
        {
            symbol: 'last_name',
            text: 'Moonwhisper',
            weight: 1,
            tags: ['elvish'],
        },

        // Epithets
        {
            symbol: 'epithet',
            text: 'Bold',
            weight: 1,
        },
        {
            symbol: 'epithet',
            text: 'Wise',
            weight: 1,
        },
        {
            symbol: 'epithet',
            text: 'Swift',
            weight: 1,
        },
        {
            symbol: 'epithet',
            text: 'Brave',
            weight: 1,
        },
        {
            symbol: 'epithet',
            text: 'Silent',
            weight: 1,
        },

        // Place names
        {
            symbol: 'place_name',
            text: 'Rivendell',
            weight: 1,
        },
        {
            symbol: 'place_name',
            text: 'Dragonspire',
            weight: 1,
        },
        {
            symbol: 'place_name',
            text: 'Silverdale',
            weight: 1,
        },
        {
            symbol: 'place_name',
            text: 'Ravenshollow',
            weight: 1,
        },
    ],
}
