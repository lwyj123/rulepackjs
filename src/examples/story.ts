import type { RulePack } from '../types.js'

/**
 * Example story generation rule pack similar to Rimworld's system
 */
export const storyRulePack: RulePack = {
    id: 'story-example',
    name: 'Story Generator',
    description: 'Generates short narrative stories',
    variables: {
        protagonist: 'the traveler',
        antagonist: 'the shadow',
    },
    rules: [
        // Main story structure
        {
            symbol: 'story',
            text: '{opening} {conflict} {resolution}',
            weight: 1,
        },

        // Story openings
        {
            symbol: 'opening',
            text: 'Once upon a time, {protagonist} {journey_start}.',
            weight: 2,
        },
        {
            symbol: 'opening',
            text: 'In a {place} far away, {protagonist} {activity}.',
            weight: 1,
        },
        {
            symbol: 'opening',
            text: '{protagonist} had always {dream}, but {obstacle}.',
            weight: 1,
        },

        // Journey starts
        {
            symbol: 'journey_start',
            text: 'set out on a great adventure',
            weight: 1,
        },
        {
            symbol: 'journey_start',
            text: 'left their home village',
            weight: 1,
        },
        {
            symbol: 'journey_start',
            text: 'began searching for the ancient artifact',
            weight: 1,
        },

        // Places
        {
            symbol: 'place',
            text: 'kingdom',
            weight: 1,
        },
        {
            symbol: 'place',
            text: 'mystical forest',
            weight: 1,
        },
        {
            symbol: 'place',
            text: 'mountain village',
            weight: 1,
        },

        // Activities
        {
            symbol: 'activity',
            text: 'lived peacefully',
            weight: 1,
        },
        {
            symbol: 'activity',
            text: 'studied ancient magic',
            weight: 1,
        },
        {
            symbol: 'activity',
            text: 'worked as a merchant',
            weight: 1,
        },

        // Dreams
        {
            symbol: 'dream',
            text: 'dreamed of glory',
            weight: 1,
        },
        {
            symbol: 'dream',
            text: 'wanted to see the world',
            weight: 1,
        },
        {
            symbol: 'dream',
            text: 'sought knowledge',
            weight: 1,
        },

        // Obstacles
        {
            symbol: 'obstacle',
            text: 'fate had other plans',
            weight: 1,
        },
        {
            symbol: 'obstacle',
            text: 'danger lurked nearby',
            weight: 1,
        },
        {
            symbol: 'obstacle',
            text: 'a curse bound them to their homeland',
            weight: 1,
        },

        // Conflicts
        {
            symbol: 'conflict',
            text: 'Suddenly, {antagonist} appeared and {threat}.',
            weight: 2,
        },
        {
            symbol: 'conflict',
            text: 'A great {danger} threatened the land.',
            weight: 1,
        },
        {
            symbol: 'conflict',
            text: 'A mysterious {stranger} brought {news}.',
            weight: 1,
        },

        // Threats
        {
            symbol: 'threat',
            text: 'challenged them to a duel',
            weight: 1,
        },
        {
            symbol: 'threat',
            text: 'stole their most precious possession',
            weight: 1,
        },
        {
            symbol: 'threat',
            text: 'blocked their path forward',
            weight: 1,
        },

        // Dangers
        {
            symbol: 'danger',
            text: 'dragon',
            weight: 1,
        },
        {
            symbol: 'danger',
            text: 'plague',
            weight: 1,
        },
        {
            symbol: 'danger',
            text: 'army of darkness',
            weight: 1,
        },

        // Strangers
        {
            symbol: 'stranger',
            text: 'wizard',
            weight: 1,
        },
        {
            symbol: 'stranger',
            text: 'messenger',
            weight: 1,
        },
        {
            symbol: 'stranger',
            text: 'old friend',
            weight: 1,
        },

        // News
        {
            symbol: 'news',
            text: 'terrible news',
            weight: 1,
        },
        {
            symbol: 'news',
            text: 'a urgent quest',
            weight: 1,
        },
        {
            symbol: 'news',
            text: 'a mysterious map',
            weight: 1,
        },

        // Resolutions
        {
            symbol: 'resolution',
            text: 'Through {method}, {protagonist} {victory} and {ending}.',
            weight: 2,
        },
        {
            symbol: 'resolution',
            text: 'Despite great hardship, {protagonist} {learned} and {ending}.',
            weight: 1,
        },

        // Methods
        {
            symbol: 'method',
            text: 'courage and determination',
            weight: 1,
        },
        {
            symbol: 'method',
            text: 'clever thinking',
            weight: 1,
        },
        {
            symbol: 'method',
            text: 'unexpected allies',
            weight: 1,
        },

        // Victories
        {
            symbol: 'victory',
            text: 'defeated the evil',
            weight: 1,
        },
        {
            symbol: 'victory',
            text: 'saved the kingdom',
            weight: 1,
        },
        {
            symbol: 'victory',
            text: 'found what they were seeking',
            weight: 1,
        },

        // Learnings
        {
            symbol: 'learned',
            text: 'learned valuable lessons',
            weight: 1,
        },
        {
            symbol: 'learned',
            text: 'discovered inner strength',
            weight: 1,
        },
        {
            symbol: 'learned',
            text: 'found true friendship',
            weight: 1,
        },

        // Endings
        {
            symbol: 'ending',
            text: 'lived happily ever after',
            weight: 1,
        },
        {
            symbol: 'ending',
            text: 'became a legend',
            weight: 1,
        },
        {
            symbol: 'ending',
            text: 'returned home wiser',
            weight: 1,
        },
    ],
}
