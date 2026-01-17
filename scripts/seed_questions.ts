import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Read environment variables or use defaults
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ojfzwmyfhfkgbtlfttuz.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_y_cXbzAFU8NR1iX_cvidaQ_aYXGGphW';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Read the localDb.ts file and extract questions and personality types
const localDbPath = path.join(__dirname, '../src/lib/localDb.ts');
const localDbContent = fs.readFileSync(localDbPath, 'utf-8');

// Extract MOCK_QUESTIONS array
const questionsMatch = localDbContent.match(/export const MOCK_QUESTIONS: Question\[\] = (\[[\s\S]*?\]);/);
const questionsJson = questionsMatch ? questionsMatch[1] : '[]';
const questions = eval(questionsJson);

// Extract MOCK_PERSONALITY_TYPES array
const typesMatch = localDbContent.match(/export const MOCK_PERSONALITY_TYPES: PersonalityType\[\] = (\[[\s\S]*?\]);/);
const typesJson = typesMatch ? typesMatch[1] : '[]';
const personalityTypes = eval(typesJson);

async function seedDatabase() {
    console.log('🌱 Starting database seeding...\n');

    // 1. Seed Questions
    console.log(`📝 Seeding ${questions.length} questions...`);

    // Clear existing questions first
    const { error: deleteQuestionsError } = await supabase
        .from('questions')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteQuestionsError) {
        console.warn('⚠️  Warning clearing questions:', deleteQuestionsError.message);
    }

    // Insert questions in batches
    const batchSize = 100;
    for (let i = 0; i < questions.length; i += batchSize) {
        const batch = questions.slice(i, i + batchSize).map((q: any) => ({
            id: q.id,
            question_text: q.question_text,
            category: q.category,
            created_at: q.created_at
        }));

        const { error } = await supabase
            .from('questions')
            .insert(batch);

        if (error) {
            console.error(`❌ Error inserting questions batch ${i / batchSize + 1}:`, error.message);
        } else {
            console.log(`✅ Inserted questions ${i + 1} to ${Math.min(i + batchSize, questions.length)}`);
        }
    }

    // 2. Seed Personality Types
    console.log(`\n🎭 Seeding ${personalityTypes.length} personality types...`);

    // Clear existing personality types first
    const { error: deleteTypesError } = await supabase
        .from('personality_types')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteTypesError) {
        console.warn('⚠️  Warning clearing personality types:', deleteTypesError.message);
    }

    // Insert personality types
    const typesToInsert = personalityTypes.map((pt: any) => ({
        id: pt.id,
        name: pt.name,
        description: pt.description,
        min_score: pt.min_score,
        max_score: pt.max_score,
        category: pt.category,
        created_at: pt.created_at
    }));

    const { error: typesError } = await supabase
        .from('personality_types')
        .insert(typesToInsert);

    if (typesError) {
        console.error('❌ Error inserting personality types:', typesError.message);
    } else {
        console.log(`✅ Inserted ${personalityTypes.length} personality types`);
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
