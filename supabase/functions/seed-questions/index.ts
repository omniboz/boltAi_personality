import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const categories = ['extroversion', 'agreeableness', 'conscientiousness', 'emotional_stability', 'openness'];

const questionTemplates = {
  extroversion: [
    'ပါတီတွေမှာ စွမ်းအင်ရပါတယ်',
    'လူအများနဲ့ ပေါင်းသင်းရတာ နှစ်သက်ပါတယ်',
    'စကားများတဲ့သူ ဖြစ်ပါတယ်',
    'လူစုလူဝေးကြီးမှာ သက်သာပါတယ်',
    'ပြောင်ကန်ပြောင်ကန် ပြောဆိုတတ်ပါတယ်',
    'အာရုံစိုက်မှု ခံယူချင်ပါတယ်',
    'လူအသစ်တွေနဲ့ မိတ်ဆက်ရတာ လွယ်ပါတယ်',
    'အဖွဲ့လိုက် လုပ်ရတာ ကြိုက်ပါတယ်',
    'တစ်ယောက်တည်း နေရတာ ပျင်းပါတယ်',
    'လူတွေကြားမှာ ဦးဆောင်ချင်ပါတယ်'
  ],
  agreeableness: [
    'သူတစ်ပါးကို ကူညီရတာ ကြိုက်ပါတယ်',
    'စာနာတတ်တဲ့သူ ဖြစ်ပါတယ်',
    'သူတပါးရဲ့ ခံစားချက်ကို နားလည်ပါတယ်',
    'ငြင်းခုံမှု ရှောင်ကြဉ်ပါတယ်',
    'ယုံကြည်စိတ်ချရတဲ့သူ ဖြစ်ပါတယ်',
    'ခွင့်လွှတ်တတ်ပါတယ်',
    'သူတပါးကို လေးစားပါတယ်',
    'ပူးပေါင်းဆောင်ရွက်ရတာ ကောင်းပါတယ်',
    'နူးညံ့ကြင်နာတတ်ပါတယ်',
    'သူတပါး အကျိုးကို စဉ်းစားပါတယ်'
  ],
  conscientiousness: [
    'အချိန်တိက်တိက် လုပ်ပါတယ်',
    'စနစ်တကျ စီစဉ်ပါတယ်',
    'တာဝန်ယူတတ်ပါတယ်',
    'အသေးစိတ် ဂရုစိုက်ပါတယ်',
    'ရည်မှန်းချက်ကို အမြဲရှိပါတယ်',
    'စည်းကမ်းလိုက်နာပါတယ်',
    'အစီအစဉ်အတိုင်း လုပ်ဆောင်ပါတယ်',
    'မြင့်မားတဲ့ စံချိန်စံညွှန်း ရှိပါတယ်',
    'လုပ်ငန်းများကို ကြိုတင်ပြင်ဆင်ပါတယ်',
    'ပစ္စည်းများကို စနစ်တကျ စီစဉ်ပါတယ်'
  ],
  emotional_stability: [
    'စိတ်ငြိမ်သက်တဲ့သူ ဖြစ်ပါတယ်',
    'စိတ်ဖိစီးမှု ကောင်းကောင်း ရင်ဆိုင်ပါတယ်',
    'စိတ်ခံစားမှု တည်ငြိမ်ပါတယ်',
    'စိတ်ပူစရာမရှိပါဘူး',
    'အခြေအနေ ဆိုးတွေမှာ အေးဆေးပါတယ်',
    'စိုးရိမ်မှု နည်းပါတယ်',
    'စိတ်ရှည်တတ်ပါတယ်',
    'အပြုသဘော ရှိပါတယ်',
    'စိတ်ဓာတ်ကျတာ ရှားပါတယ်',
    'မျက်နှာမလိုပါဘူး'
  ],
  openness: [
    'အသစ်အဆန်းကို ကြိုက်ပါတယ်',
    'ဖန်တီးမှုရှိတဲ့သူ ဖြစ်ပါတယ်',
    'စိတ်ကူးစိတ်သန်းများပါတယ်',
    'အနုပညာ နှစ်သက်ပါတယ်',
    'အတွေ့အကြုံ အသစ်တွေ ရှာဖွေပါတယ်',
    'နက်နဲတဲ့ အကြောင်းအရာတွေ စဉ်းစားပါတယ်',
    'ရိုးရာနည်းကို စိန်ခေါ်ပါတယ်',
    'ကဗျာ စာပေ ကြိုက်ပါတယ်',
    'ထူးခြားတာတွေကို လက်ခံပါတယ်',
    'လူ့ဘဝရဲ့ အဓိပ္ပာယ် စဉ်းစားပါတယ်'
  ]
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: existingQuestions } = await supabase
      .from('questions')
      .select('id')
      .limit(1);

    if (existingQuestions && existingQuestions.length > 0) {
      return new Response(
        JSON.stringify({ message: 'Questions already seeded' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const questions = [];
    const questionsPerCategory = 200;

    for (const category of categories) {
      const templates = questionTemplates[category as keyof typeof questionTemplates];
      
      for (let i = 0; i < questionsPerCategory; i++) {
        const baseTemplate = templates[i % templates.length];
        const variation = i < templates.length ? '' : ` (ပုံစံ ${Math.floor(i / templates.length) + 1})`;
        
        questions.push({
          question_text: baseTemplate + variation,
          category: category
        });
      }
    }

    const { error: questionsError } = await supabase
      .from('questions')
      .insert(questions);

    if (questionsError) throw questionsError;

    const personalityTypes = [
      {
        name: 'အလွန်ပြင်ပလူ့ဆက်ဆံရေးကောင်းသူ',
        description: 'လူတွေနဲ့ ပေါင်းသင်းရတာ အရမ်းကြိုက်ပြီး စွမ်းအင်အပြည့် ရှိသူ',
        min_score: 200, max_score: 250, category: 'extroversion'
      },
      {
        name: 'ပြင်ပလူ့ဆက်ဆံရေးကောင်းသူ',
        description: 'လူတွေနဲ့ ပေါင်းသင်းရတာ ကြိုက်တဲ့သူ',
        min_score: 150, max_score: 199, category: 'extroversion'
      },
      {
        name: 'အလယ်အလတ် လူမှုဆက်ဆံရေး',
        description: 'တစ်ခါတစ်ရံ လူတွေနဲ့ ပေါင်းသင်းတာ ကြိုက်တယ်၊ တစ်ခါတစ်ရံ တစ်ယောက်တည်း နေတာ ကြိုက်တယ်',
        min_score: 100, max_score: 149, category: 'extroversion'
      },
      {
        name: 'စိတ်အေးဆေးသူ',
        description: 'တစ်ယောက်တည်း နေရတာ ပိုကြိုက်တဲ့သူ',
        min_score: 50, max_score: 99, category: 'extroversion'
      },
      {
        name: 'အလွန် စိတ်အေးဆေးသူ',
        description: 'တစ်ယောက်တည်း နေရတာကို အရမ်းကြိုက်တဲ့သူ',
        min_score: 0, max_score: 49, category: 'extroversion'
      },
      {
        name: 'အလွန် သဘောကောင်းသူ',
        description: 'သူတပါးကို အလွန် ကူညီတတ်ပြီး နားလည်တတ်သူ',
        min_score: 200, max_score: 250, category: 'agreeableness'
      },
      {
        name: 'သဘောကောင်းသူ',
        description: 'သူတပါးကို ကူညီတတ်တဲ့သူ',
        min_score: 150, max_score: 199, category: 'agreeableness'
      },
      {
        name: 'အလယ်အလတ် သဘောထား',
        description: 'လိုအပ်သလို ကူညီပေးတတ်တဲ့သူ',
        min_score: 100, max_score: 149, category: 'agreeableness'
      },
      {
        name: 'အလွန် တာဝန်သိတတ်သူ',
        description: 'အရမ်း စနစ်တကျ စီစဉ်တတ်ပြီး တာဝန်ယူတတ်သူ',
        min_score: 200, max_score: 250, category: 'conscientiousness'
      },
      {
        name: 'တာဝန်သိတတ်သူ',
        description: 'စနစ်တကျ စီစဉ်တတ်တဲ့သူ',
        min_score: 150, max_score: 199, category: 'conscientiousness'
      },
      {
        name: 'အလယ်အလတ် စီစဉ်တတ်သူ',
        description: 'လိုအပ်သလို စီစဉ်တတ်တဲ့သူ',
        min_score: 100, max_score: 149, category: 'conscientiousness'
      },
      {
        name: 'အလွန် စိတ်တည်ငြိမ်သူ',
        description: 'အရမ်း စိတ်ငြိမ်သက်ပြီး စိတ်ဖိစီးမှု ကောင်းကောင်း ရင်ဆိုင်တတ်သူ',
        min_score: 200, max_score: 250, category: 'emotional_stability'
      },
      {
        name: 'စိတ်တည်ငြိမ်သူ',
        description: 'စိတ်ငြိမ်သက်တတ်တဲ့သူ',
        min_score: 150, max_score: 199, category: 'emotional_stability'
      },
      {
        name: 'အလယ်အလတ် စိတ်ခံစားမှု',
        description: 'တစ်ခါတစ်ရံ စိတ်ဖိစီးတတ်၊ တစ်ခါတစ်ရံ စိတ်ငြိမ်တတ်သူ',
        min_score: 100, max_score: 149, category: 'emotional_stability'
      },
      {
        name: 'အလွန် ပွင့်လင်းသူ',
        description: 'အသစ်အဆန်းကို အရမ်းကြိုက်ပြီး ဖန်တီးမှုရှိသူ',
        min_score: 200, max_score: 250, category: 'openness'
      },
      {
        name: 'ပွင့်လင်းသူ',
        description: 'အသစ်အဆန်းကို ကြိုက်တဲ့သူ',
        min_score: 150, max_score: 199, category: 'openness'
      },
      {
        name: 'အလယ်အလတ် ပွင့်လင်းမှု',
        description: 'တစ်ခါတစ်ရံ အသစ်တွေ ကြိုက်၊ တစ်ခါတစ်ရံ ရိုးရာနည်း ကြိုက်တဲ့သူ',
        min_score: 100, max_score: 149, category: 'openness'
      }
    ];

    const { error: typesError } = await supabase
      .from('personality_types')
      .insert(personalityTypes);

    if (typesError) throw typesError;

    return new Response(
      JSON.stringify({ 
        message: 'Successfully seeded database',
        questionsCount: questions.length,
        personalityTypesCount: personalityTypes.length
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});