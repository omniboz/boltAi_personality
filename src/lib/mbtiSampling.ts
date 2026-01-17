// Stratified Random Sampling for MBTI Questions

import { Question } from './supabase';

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Select stratified random questions for MBTI test
 * Ensures balanced coverage of all 4 MBTI axes
 * 
 * @param allQuestions All available questions from database
 * @returns 50 questions (12 EI, 13 SN, 12 TF, 13 JP) in random order
 */
export function selectStratifiedQuestions(allQuestions: Question[]): Question[] {
    // Define questions per axis
    const questionsPerAxis = {
        'EI': 12,
        'SN': 13,
        'TF': 12,
        'JP': 13
    };

    const selectedQuestions: Question[] = [];

    // Select questions for each axis
    for (const [axis, count] of Object.entries(questionsPerAxis)) {
        // Filter questions for this axis
        const axisQuestions = allQuestions.filter(
            q => q.mbti_axis === axis && q.is_active !== false
        );

        if (axisQuestions.length < count) {
            console.warn(`Not enough questions for axis ${axis}. Need ${count}, have ${axisQuestions.length}`);
            // Take all available questions for this axis
            selectedQuestions.push(...axisQuestions);
        } else {
            // Randomly select required number of questions
            const shuffled = shuffleArray(axisQuestions);
            selectedQuestions.push(...shuffled.slice(0, count));
        }
    }

    // Shuffle final array to mix axes
    return shuffleArray(selectedQuestions);
}

/**
 * Validate that questions are properly distributed across MBTI axes
 * @param questions Questions to validate
 * @returns Validation result with counts per axis
 */
export function validateQuestionDistribution(questions: Question[]): {
    valid: boolean;
    distribution: Record<string, number>;
    total: number;
} {
    const distribution: Record<string, number> = {
        'EI': 0,
        'SN': 0,
        'TF': 0,
        'JP': 0
    };

    questions.forEach(q => {
        if (q.mbti_axis && distribution.hasOwnProperty(q.mbti_axis)) {
            distribution[q.mbti_axis]++;
        }
    });

    const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);
    const valid = total === 50 &&
        distribution['EI'] >= 10 &&
        distribution['SN'] >= 10 &&
        distribution['TF'] >= 10 &&
        distribution['JP'] >= 10;

    return { valid, distribution, total };
}

/**
 * Get questions count by axis from database
 * Useful for checking if we have enough questions
 */
export function getQuestionsCountByAxis(allQuestions: Question[]): Record<string, number> {
    const counts: Record<string, number> = {
        'EI': 0,
        'SN': 0,
        'TF': 0,
        'JP': 0,
        'uncategorized': 0
    };

    allQuestions.forEach(q => {
        if (q.mbti_axis && counts.hasOwnProperty(q.mbti_axis)) {
            counts[q.mbti_axis]++;
        } else {
            counts['uncategorized']++;
        }
    });

    return counts;
}
