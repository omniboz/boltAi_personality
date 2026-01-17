// MBTI Scoring and Type Calculation

export interface MBTIScores {
    EI: number;  // Extrovert (positive) vs Introvert (negative)
    SN: number;  // Sensing (positive) vs Intuition (negative)
    TF: number;  // Thinking (positive) vs Feeling (negative)
    JP: number;  // Judging (positive) vs Perceiving (negative)
}

export interface MBTIPercentages {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
}

export interface MBTIResult {
    type: string;  // e.g., "INTJ"
    scores: MBTIScores;
    percentages: MBTIPercentages;
}

/**
 * Calculate MBTI scores from test responses
 * @param responses User's test responses
 * @param questions All questions with MBTI axis and direction
 * @returns MBTI scores for each axis
 */
export function calculateMBTIScores(
    responses: Array<{ question_id: string; answer_value: number }>,
    questions: Array<{ id: string; mbti_axis: string; mbti_direction: string }>
): MBTIScores {
    const scores: MBTIScores = { EI: 0, SN: 0, TF: 0, JP: 0 };

    responses.forEach(response => {
        const question = questions.find(q => q.id === response.question_id);
        if (!question || !question.mbti_axis) return;

        const axis = question.mbti_axis as keyof MBTIScores;
        const answerValue = response.answer_value; // 1-5 scale

        // Convert 1-5 scale to -2 to +2 scale
        // 1 = -2 (strongly disagree)
        // 2 = -1 (disagree)
        // 3 = 0 (neutral)
        // 4 = +1 (agree)
        // 5 = +2 (strongly agree)
        const normalizedValue = answerValue - 3;

        // Apply direction
        if (question.mbti_direction === 'positive') {
            // Agreement increases first letter (E, S, T, J)
            scores[axis] += normalizedValue;
        } else {
            // Agreement increases second letter (I, N, F, P)
            scores[axis] -= normalizedValue;
        }
    });

    return scores;
}

/**
 * Determine MBTI type from scores
 * @param scores MBTI scores
 * @returns 4-letter MBTI type code
 */
export function determineMBTIType(scores: MBTIScores): string {
    let type = '';

    // For each axis, positive score = first letter, negative = second letter
    // If score is 0, default to first letter (can be changed to second if preferred)
    type += scores.EI >= 0 ? 'E' : 'I';
    type += scores.SN >= 0 ? 'S' : 'N';
    type += scores.TF >= 0 ? 'T' : 'F';
    type += scores.JP >= 0 ? 'J' : 'P';

    return type;
}

/**
 * Calculate percentages for each MBTI dimension
 * @param scores MBTI scores
 * @param questionsPerAxis Number of questions per axis (default 12-13)
 * @returns Percentages for each letter
 */
export function calculateMBTIPercentages(
    scores: MBTIScores,
    questionsPerAxis: { EI: number; SN: number; TF: number; JP: number } = {
        EI: 12,
        SN: 13,
        TF: 12,
        JP: 13
    }
): MBTIPercentages {
    const percentages: MBTIPercentages = {
        E: 0,
        I: 0,
        S: 0,
        N: 0,
        T: 0,
        F: 0,
        J: 0,
        P: 0
    };

    // Calculate for each axis
    const axes: Array<{ axis: keyof MBTIScores; positive: keyof MBTIPercentages; negative: keyof MBTIPercentages }> = [
        { axis: 'EI', positive: 'E', negative: 'I' },
        { axis: 'SN', positive: 'S', negative: 'N' },
        { axis: 'TF', positive: 'T', negative: 'F' },
        { axis: 'JP', positive: 'J', negative: 'P' }
    ];

    axes.forEach(({ axis, positive, negative }) => {
        const score = scores[axis];
        const maxScore = questionsPerAxis[axis] * 2; // Each question can contribute -2 to +2

        // Calculate percentage for positive letter
        // Score range: -maxScore to +maxScore
        // Percentage: (score + maxScore) / (maxScore * 2) * 100
        const positivePercentage = Math.round(((score + maxScore) / (maxScore * 2)) * 100);
        const negativePercentage = 100 - positivePercentage;

        percentages[positive] = positivePercentage;
        percentages[negative] = negativePercentage;
    });

    return percentages;
}

/**
 * Complete MBTI calculation from responses
 * @param responses User's test responses
 * @param questions All questions
 * @returns Complete MBTI result with type, scores, and percentages
 */
export function calculateMBTIResult(
    responses: Array<{ question_id: string; answer_value: number }>,
    questions: Array<{ id: string; mbti_axis: string; mbti_direction: string }>
): MBTIResult {
    const scores = calculateMBTIScores(responses, questions);
    const type = determineMBTIType(scores);
    const percentages = calculateMBTIPercentages(scores);

    return {
        type,
        scores,
        percentages
    };
}

/**
 * Format MBTI percentages for display
 * @param percentages MBTI percentages
 * @param type MBTI type
 * @returns Formatted string for display
 */
export function formatMBTIPercentages(percentages: MBTIPercentages, type: string): string {
    const [e_i, s_n, t_f, j_p] = type.split('');

    const parts = [
        `${e_i}:${percentages[e_i as keyof MBTIPercentages]}%`,
        `${s_n}:${percentages[s_n as keyof MBTIPercentages]}%`,
        `${t_f}:${percentages[t_f as keyof MBTIPercentages]}%`,
        `${j_p}:${percentages[j_p as keyof MBTIPercentages]}%`
    ];

    return parts.join(', ');
}
