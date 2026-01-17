import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read environment variables or use defaults
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://odwukxwtawmygihhywdk.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_yR1bFN-p_qSOfWuvqsZQDA_ec1wBVml';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Read the questions.json file
const questionsPath = join(__dirname, '../questions.json');
const questionsData = JSON.parse(readFileSync(questionsPath, 'utf-8'));

// Read the localDb.ts file to extract personality types
const localDbPath = join(__dirname, '../src/lib/localDb.ts');
const localDbContent = readFileSync(localDbPath, 'utf-8');

// Extract MOCK_PERSONALITY_TYPES - find the array definition
const typesStartIndex = localDbContent.indexOf('export const MOCK_PERSONALITY_TYPES');
const typesEndIndex = localDbContent.indexOf('];', typesStartIndex) + 2;
const typesSection = localDbContent.substring(typesStartIndex, typesEndIndex);

// Parse personality types manually (simple extraction)
const personalityTypes = [];
const typeMatches = typesSection.matchAll(/\{\s*"id":\s*"([^"]+)",\s*"category":\s*"([^"]+)",\s*"name":\s*"([^"]+)",\s*"description":\s*"([^"]+)",\s*"min_score":\s*(\d+),\s*"max_score":\s*(\d+),\s*"created_at":\s*"([^"]+)"\s*\}/g);

for (const match of typeMatches) {
    personalityTypes.push({
        id: match[1],
        category: match[2],
        name: match[3],
        description: match[4],
        min_score: parseInt(match[5]),
        max_score: parseInt(match[6]),
        created_at: match[7]
    });
}

async function seedDatabase() {
    console.log('🌱 Starting database seeding...\n');

    // 1. Seed Questions
    console.log(`📝 Seeding ${questionsData.length} questions...`);

    // Clear existing questions first
    const { error: deleteQuestionsError } = await supabase
        .from('questions')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteQuestionsError && deleteQuestionsError.code !== 'PGRST116') {
        console.warn('⚠️  Warning clearing questions:', deleteQuestionsError.message);
    }

    // Insert questions in batches
    const batchSize = 100;
    for (let i = 0; i < questionsData.length; i += batchSize) {
        const batch = questionsData.slice(i, i + batchSize).map(q => ({
            id: q.id,
            question_text: q.question_text,
            category: q.category,
            created_at: q.created_at
        }));

        const { error } = await supabase
            .from('questions')
            .insert(batch);

        if (error) {
            console.error(`❌ Error inserting questions batch ${Math.floor(i / batchSize) + 1}:`, error.message);
        } else {
            console.log(`✅ Inserted questions ${i + 1} to ${Math.min(i + batchSize, questionsData.length)}`);
        }
    }

    // 2. Seed Personality Types
    console.log(`\n🎭 Seeding ${personalityTypes.length} personality types...`);

    // Clear existing personality types first
    const { error: deleteTypesError } = await supabase
        .from('personality_types')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteTypesError && deleteTypesError.code !== 'PGRST116') {
        console.warn('⚠️  Warning clearing personality types:', deleteTypesError.message);
    }

    // Insert personality types in batches
    const typeBatchSize = 50;
    for (let i = 0; i < personalityTypes.length; i += typeBatchSize) {
        const batch = personalityTypes.slice(i, i + typeBatchSize);

        const { error: typesError } = await supabase
            .from('personality_types')
            .insert(batch);

        if (typesError) {
            console.error(`❌ Error inserting personality types batch ${Math.floor(i / typeBatchSize) + 1}:`, typesError.message);
        } else {
            console.log(`✅ Inserted personality types ${i + 1} to ${Math.min(i + typeBatchSize, personalityTypes.length)}`);
        }
    }

    // 3. Verify the data
    console.log('\n🔍 Verifying seeded data...');

    const { count: questionCount } = await supabase
        .from('questions')
        .select('*', { count: 'exact', head: true });

    const { count: typeCount } = await supabase
        .from('personality_types')
        .select('*', { count: 'exact', head: true });

    console.log(`\n✨ Database seeding complete!`);
    console.log(`   Questions in database: ${questionCount}`);
    console.log(`   Personality types in database: ${typeCount}`);
}

seedDatabase()
    .then(() => {
        console.log('\n✅ Seeding completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Seeding failed:', error);
        process.exit(1);
    });
