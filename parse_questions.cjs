const fs = require('fs');

const content = fs.readFileSync('Openness.txt', 'utf8');
const lines = content.split('\n');

const questions = [];
let currentCategory = '';

const categoryMap = {
    'Openness': 'openness',
    'Conscientiousness': 'conscientiousness',
    'Extraversion': 'extroversion',
    'Agreeableness': 'agreeableness',
    'Neuroticism': 'emotional_stability'
};

lines.forEach(line => {
    line = line.trim();
    if (!line) return;

    // Check for main category headers
    for (const [key, value] of Object.entries(categoryMap)) {
        if (line.startsWith(key)) {
            currentCategory = value;
            return;
        }
    }

    // Match questions: "1. Question text" or "11. (Negative) Question text"
    const match = line.match(/^(\d+)\.\s+(.*)/);
    if (match && currentCategory) {
        const id = currentCategory[0] + match[1]; // e.g., o1, c1
        let text = match[2];

        // Clean up "(Negative)" marker if present, but keep the text
        // Ideally we would handle reverse scoring, but for now we just store the text
        // text = text.replace('(Negative)', '').trim(); 

        questions.push({
            id: id,
            category: currentCategory,
            question_text: text,
            created_at: new Date().toISOString()
        });
    }
});

console.log(JSON.stringify(questions, null, 2));
