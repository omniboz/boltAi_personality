// Personality type to character image mapping
// The uploaded image has 16 characters in 2 rows (8 per row)
// Characters are numbered left to right, top to bottom (1-16)

export const PERSONALITY_TYPE_IMAGES: Record<string, number> = {
    // Extroversion types
    'pt1': 5,  // High Extroversion - King/Leader character
    'pt2': 7,  // Moderate Extroversion - Scholar character  
    'pt3': 9,  // Low Extroversion - Thinker character

    // Agreeableness types
    'pt4': 1,  // High Agreeableness - Gentle/Kind character
    'pt5': 2,  // Moderate Agreeableness - Balanced character
    'pt6': 14, // Low Agreeableness - Strong character

    // Conscientiousness types
    'pt7': 3,  // High Conscientiousness - Organized character
    'pt8': 4,  // Moderate Conscientiousness - Flexible character
    'pt9': 15, // Low Conscientiousness - Free-spirited character

    // Neuroticism types
    'pt10': 6,  // High Neuroticism - Sensitive character
    'pt11': 10, // Moderate Neuroticism - Calm character
    'pt12': 11, // Low Neuroticism - Stable character

    // Openness types
    'pt13': 8,  // High Openness - Creative character
    'pt14': 12, // Moderate Openness - Practical character
    'pt15': 13, // Low Openness - Traditional character
    'pt16': 16, // Additional type
};

// Get character position for cropping the image
// Image has 8 characters per row, 2 rows total
export function getCharacterPosition(characterNumber: number): { row: number; col: number } {
    const row = Math.floor((characterNumber - 1) / 8);
    const col = (characterNumber - 1) % 8;
    return { row, col };
}

// Get CSS background position for displaying character
export function getCharacterBackgroundPosition(characterNumber: number): string {
    const { row, col } = getCharacterPosition(characterNumber);
    const percentX = (col / 7) * 100; // 7 gaps between 8 characters
    const percentY = (row / 1) * 100; // 1 gap between 2 rows
    return `${percentX}% ${percentY}%`;
}

// Get character number from personality type ID
export function getCharacterForPersonalityType(typeId: string): number {
    return PERSONALITY_TYPE_IMAGES[typeId] || 1; // Default to first character
}
