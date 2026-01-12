import { Question, PersonalityType, TestSession, TestResponse } from './supabase';

// Mock Data
const MOCK_QUESTIONS: Question[] = [
  {
    "id": "o1",
    "category": "openness",
    "question_text": "ကျွန်ုပ်တွင် ကြွယ်ဝသော စိတ်ကူးစိတ်သန်းများ ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.152Z"
  },
  {
    "id": "o2",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် စိတ်ကူးယဉ်ကမ္ဘာထဲတွင် ဈာန်ဝင်နေလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o3",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် မဖြစ်နိုင်သော အရာများကို စိတ်ကူးယဉ်ရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o4",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ဇာတ်လမ်းဆင် ဖန်တီးရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o5",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် အလုပ်လုပ်နေရင်း အတွေးလွန်ပြီး ငေးမောနေမိတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o6",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ကလေးဘဝကတည်းက စိတ်ကူးယဉ် ကောင်းသူဖြစ်သည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o7",
    "category": "openness",
    "question_text": "ကျွန်ုပ်၏ အိပ်မက်များသည် အလွန်ထူးဆန်းပြီး ကွန့်မြူးတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o8",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် စိတ်ကူးယဉ်ရသည်ကို အချိန်ဖြုန်းသည်ဟု မထင်ပါ။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o9",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် လက်တွေ့ဘဝထက် စိတ်ကူးနယ်ပယ်ကို ပိုသဘောကျသည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o10",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ကိုယ်ပိုင် ဇာတ်ကောင်များ ဖန်တီးရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o11",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် လက်တွေ့ကျကျ တွေးခေါ်သည်ကိုသာ နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o12",
    "category": "openness",
    "question_text": "ကျွန်ုပ်၏ စိတ်ကူးဉာဏ်သည် သိပ်မကွန့်မြူးတတ်ပါ။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o13",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် စိတ်ကူးယဉ်ရသည်ကို ပျင်းရိသည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o14",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ဖြစ်နိုင်ခြေရှိသည်များကိုသာ အာရုံစိုက်သည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o15",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် စိတ်ကူးယဉ် ဇာတ်လမ်းများကို ဖတ်ရသည်ကို မကြိုက်ပါ။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o16",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် အနုပညာ ပြခန်းများသို့ သွားရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o17",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ဂီတ နားထောင်လျှင် ခံစားချက် နက်ရှိုင်းသွားတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o18",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ကဗျာများကို ဖတ်ရှု ခံစားရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o19",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် သဘာဝတရား၏ အလှကို ငေးမော ကြည့်ရှုနေတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o20",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် အက အလှများကို ကြည့်ရှုရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o21",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ပန်းချီကားတစ်ချပ်ကို ကြည့်ပြီး အကြာကြီး တွေးနေနိုင်စွမ်းရှိသည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o22",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် အနုပညာ လက်ရာဟောင်းများကို တန်ဖိုးထားသည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o23",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ကိုယ်တိုင် အနုပညာ ဖန်တီးရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o24",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ဒီဇိုင်းဆန်းသော အဆောက်အဦးများကို သဘောကျသည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o25",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ရုပ်ရှင်ကြည့်လျှင် ဇာတ်လမ်းထက် ရိုက်ချက်အလှကို ပိုသတိထားမိသည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o26",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ကဗျာရွတ်ရသည်ကို ငြီးငွေ့သည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o27",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ပန်းချီကားများကို နားမလည်ပါ။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o28",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် အနုပညာထက် စီးပွားရေးကို ပိုစိတ်ဝင်စားသည်။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o29",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ဂန္တဝင်ဂီတ (Classical Music) များကို နားမလည်ပါ။",
    "created_at": "2026-01-12T13:46:59.154Z"
  },
  {
    "id": "o30",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် အနုပညာပြပွဲများကို အချိန်ဖြုန်းသည်ဟု ထင်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o31",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ပြင်းထန်သော ခံစားချက်များကို ခံစားရလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o32",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ဝမ်းနည်းစရာ ဇာတ်လမ်းများ ကြည့်လျှင် အလွယ်တကူ ငိုမိသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o33",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် မိမိ၏ စိတ်ခံစားချက် အပြောင်းအလဲကို သတိထားမိသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o34",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါး၏ ခံစားချက်ကိုပါ ထပ်တူ ခံစားပေးနိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o35",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ပျော်ရွှင်စရာ ကြုံလာလျှင် အတိုင်းထက်အလွန် ပျော်ရွှင်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o36",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ဒေါသထွက်လျှင်လည်း ပြင်းပြင်းထန်ထန် ဖြစ်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o37",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ခံစားချက်များကို ဖွင့်ထုတ်ရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o38",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ပတ်ဝန်းကျင် အခြေအနေအပေါ် မူတည်ပြီး စိတ်လှုပ်ရှားလွယ်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o39",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် စိတ်လှုပ်ရှားဖွယ်ရာ အဖြစ်အပျက်များကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o40",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် မိမိစိတ်ကို အလိုလိုက်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o41",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ခံစားချက်များကို ထိန်းချုပ်ထားလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o42",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ခံစားချက် သိပ်မပြင်းထန်တတ်ပါ။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o43",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် လူအများရှေ့တွင် ခံစားချက်ပြရသည်ကို မကြိုက်ပါ။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o44",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် စိတ်ခံစားမှုထက် အကျိုးအကြောင်းကို ဦးစားပေးသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o45",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် အလွယ်တကူ စိတ်မလှုပ်ရှားတတ်ပါ။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o46",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် နေရာသစ်များသို့ ခရီးသွားရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o47",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် မစားဖူးသော အစားအစာများကို မြည်းစမ်းကြည့်ချင်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o48",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် အမြဲတမ်း ဝါသနာ (Hobby) အသစ်များကို ရှာဖွေနေတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o49",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် လုပ်ရိုးလုပ်စဉ် အလုပ်များကို ပြင်းထန်စွာ ငြီးငွေ့သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o50",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် အိမ်ပြန်လမ်းကို လမ်းကြောင်းအမျိုးမျိုး ပြောင်းပြန်ရသည်ကို ကြိုက်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o51",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် တစ်ခါမှ မရောက်ဖူးသော နေရာများတွင် ပျော်မွေ့သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o52",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ယဉ်ကျေးမှု မတူသော လူမျိုးများနှင့် တွေ့ဆုံရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o53",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် စွန့်စားရသော အားကစားနည်းများကို စမ်းသပ်လိုသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o54",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် အစီအစဉ်မရှိဘဲ ခရီးထွက်ရသည်ကို သဘောကျသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o55",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် နည်းပညာ အသစ်အဆန်းများကို စမ်းသုံးကြည့်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o56",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် လုပ်နေကျ ပုံစံအတိုင်း လုပ်ရသည်ကို ပိုနှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o57",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် အပြောင်းအလဲများကို မနှစ်သက်ပါ။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o58",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် မရောက်ဖူးသော နေရာများကို သွားရမည်ကို စိုးရိမ်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o59",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် စားနေကျ အစားအစာကိုသာ မှာယူလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o60",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ဘဝကို ပုံမှန်လေးပဲ ဖြတ်သန်းလိုသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o61",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ရှုပ်ထွေးသော ပြဿနာများကို အဖြေရှာရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o62",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ဒဿနဆိုင်ရာ ဆွေးနွေးမှုများကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o63",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် စကားလုံး ဝေါဟာရ အသစ်များကို လေ့လာရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o64",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် စိတ်ဝင်စားစရာ ခေါင်းစဉ်တစ်ခုတွေ့လျှင် နက်နက်နဲနဲ လိုက်ဖတ်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o65",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် စာအုပ်စာပေ ဖတ်ရှုခြင်းကို ဝါသနာပါသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o66",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် စကြဝဠာနှင့် သဘာဝတရားအကြောင်း တွေးခေါ်ရသည်ကို ကြိုက်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o67",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ဦးနှောက်သုံးရသော ပဟေဠိများကို ဖြေရှင်းရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o68",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် အကြောင်းအရာ တစ်ခု၏ \"ဘာကြောင့်\" ဆိုသည့် အဖြေကို ရှာလိုသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o69",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် နိုင်ငံရေးနှင့် လူမှုရေး သီအိုရီများကို စိတ်ဝင်စားသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o70",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ပညာတတ်များနှင့် စကားပြောရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o71",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် သီအိုရီများအကြောင်း ဆွေးနွေးရသည်ကို ပျင်းသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o72",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ခက်ခဲသော စာအုပ်များကို မဖတ်ချင်ပါ။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o73",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် စိတ္တဇ (Abstract) အတွေးအခေါ်များကို နားမလည်ပါ။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o74",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ဉာဏ်စမ်းမေးခွန်းများကို မဖြေချင်ပါ။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o75",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် အလုပ်နှင့် မဆိုင်သော ဗဟုသုတများကို မရှာဖွေလိုပါ။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o76",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ရှေးရိုးစွဲ အယူအဆများကို ပြန်လည် မေးခွန်းထုတ်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o77",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် မတူညီသော ဘာသာရေး အယူအဆများကို လေ့လာလိုသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o78",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် စည်းကမ်းဟောင်းများသည် ပြောင်းလဲသင့်သည်ဟု ယုံကြည်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o79",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် လူတိုင်းတွင် လွတ်လပ်စွာ တွေးခေါ်ပိုင်ခွင့်ရှိသည်ဟု ယုံကြည်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o80",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် သမားရိုးကျ မဟုတ်သော နေထိုင်မှုပုံစံများကို လက်ခံနိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o81",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ခေတ်နှင့် မညီတော့သော ဥပဒေများကို ပြင်ဆင်သင့်သည်ဟု ထင်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o82",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် အာဏာရှိသူများကို ဝေဖန်ရဲသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o83",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် မတူကွဲပြားမှုကို လက်ခံနိုင်စွမ်း မြင့်မားသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o84",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် အမှန်တရားသည် တစ်ခုတည်း မဟုတ်နိုင်ဟု ယူဆသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o85",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် လူမှုရေး အပြောင်းအလဲများကို လိုလားသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o86",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ဘိုးဘွားစဉ်ဆက် ထုံးစံများကို တန်ဖိုးထားသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o87",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ဘာသာရေး အဆုံးအမများကို တသွေမတိမ်း လိုက်နာသည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o88",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် အပြောင်းအလဲ မြန်လွန်းသော ခေတ်ကို မကြိုက်ပါ။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o89",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် ခေါင်းဆောင်များ၏ စကားကို နားထောင်သင့်သည်ဟု ထင်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "o90",
    "category": "openness",
    "question_text": "ကျွန်ုပ်သည် လူ့ကျင့်ဝတ် စည်းကမ်းများကို တင်းကျပ်သင့်သည်ဟု ထင်သည်။",
    "created_at": "2026-01-12T13:46:59.155Z"
  },
  {
    "id": "c1",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အလုပ်များကို ပြီးမြောက်အောင် လုပ်ဆောင်နိုင်စွမ်းရှိသည်ဟု ယုံကြည်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c2",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အခက်အခဲကြုံလာလျှင် ကိုင်တွယ်ဖြေရှင်းနိုင်သော နည်းလမ်းကို သိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c3",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ထင်မှတ်မထားသော ပြဿနာများကို အေးဆေးစွာ ဖြေရှင်းနိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c4",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် မိမိချမှတ်ထားသော ပန်းတိုင်များကို ရောက်အောင်သွားနိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c5",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ပေးအပ်သော တာဝန်များကို ကျေပွန်အောင် ထမ်းဆောင်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c6",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အခြားသူများထက် အလုပ်တွင် ပိုမို တွင်ကျယ်သည်ဟု ခံစားရသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c7",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ဆုံးဖြတ်ချက်များကို မှန်ကန်စွာ ချမှတ်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c8",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် နေ့စဉ်ဘဝ စိန်ခေါ်မှုများကို ရင်ဆိုင်ရန် အသင့်ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c9",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အကြောင်းအရာ တစ်ခုခုကို နားလည်သဘောပေါက်လွယ်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c10",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် မိမိ၏ အရည်အချင်းအပေါ် ယုံကြည်မှု အပြည့်ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c11",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အလုပ်တစ်ခု စလုပ်ရန် ဝန်လေးတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c12",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ကိုယ့်ကိုယ်ကို အရည်အချင်း မရှိဟု ခံစားရလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c13",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ဘဝတွင် အောင်မြင်မှုရရန် ခက်ခဲလိမ့်မည်ဟု ထင်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c14",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အရေးကြီးကိစ္စများကို കൈတွယ်ရန် မစွမ်းဆောင်နိုင်ဟု ထင်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c15",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ရှုပ်ထွေးသော အခြေအနေများတွင် ဦးနှောက်ခြောက်လွယ်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c16",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ပစ္စည်းများကို နေရာတကျ ပြန်ထားလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c17",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် သပ်ရပ်သော အလုပ်စားပွဲ/အခန်း ရှိမှ အလုပ်လုပ်ချင်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c18",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အစီအစဉ်ဇယား (Schedule) ဆွဲပြီးမှ အလုပ်လုပ်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c19",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အလုပ်စာရင်း (To-do list) များကို ရေးမှတ်ထားလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c20",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် စည်းကမ်းတကျ နေထိုင်ရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c21",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အသေးစိတ် အချက်အလက်များကို ဂရုပြုစစ်ဆေးလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c22",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အရာရာကို သူ့နေရာနှင့်သူ ရှိနေစေချင်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c23",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် သန့်ရှင်းသပ်ရပ်မှုကို အလွန် အလေးထားသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c24",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အလုပ်မစခင် လိုအပ်သော ပစ္စည်းများကို ကြိုတင် ပြင်ဆင်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c25",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ပရမ်းပတာ ရှုပ်ပွနေသော အခြေအနေကို မနှစ်သက်ပါ။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c26",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ပစ္စည်းများကို ဘယ်နားထားမိမှန်း မကြာခဏ မေ့တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c27",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်၏ အခန်းသည် အမြဲတမ်း ရှုပ်ပွနေတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c28",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အစီအစဉ်ဆွဲရသည်ကို အချိန်ဖြုန်းသည်ဟု ထင်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c29",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် စာရွက်စာတမ်းများကို စနစ်တကျ မသိမ်းဆည်းတတ်ပါ။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c30",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် လက်တန်း လုပ်ရသည်ကို ပိုကြိုက်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c31",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ပေးထားသော ကတိများကို မပျက်မကွက် တည်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c32",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ဥပဒေနှင့် စည်းမျဉ်းစည်းကမ်းများကို လိုက်နာသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c33",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အခြားသူများက အားကိုးရသူတစ်ဦး ဖြစ်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c34",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အမှန်တရားအတိုင်း ပြောဆိုလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c35",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် တာဝန်ယူမှု တာဝန်ခံမှု ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c36",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အလုပ်တွင် သတ်မှတ်ထားသော စည်းကမ်းများကို လေးစားသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c37",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါး၏ လျှို့ဝှက်ချက်များကို ထိန်းသိမ်းပေးသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c38",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ကျင့်ဝတ်သိက္ခာကို အလွန် တန်ဖိုးထားသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c39",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အဖွဲ့အစည်း၏ ပန်းတိုင်အတွက် မိမိဆန္ဒကို လျှော့ချနိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c40",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အလုပ်ခွင်သို့ အချိန်မှန် ရောက်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c41",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် တစ်ခါတစ်ရံ စည်းကမ်းများကို ဖောက်ဖျက်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c42",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ကတိပေးပြီးမှ ပျက်ကွက်မိတာမျိုး ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c43",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အလုပ်ကို ပြီးစလွယ် လုပ်မိတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c44",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အဆင်မပြေလျှင် တာဝန်ရှောင်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c45",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ကိုယ်ကျိုးအတွက် စည်းကမ်းအနည်းငယ် ချိုးဖောက်ခြင်းကို လက်ခံသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c46",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ရည်မှန်းချက်ကြီးသော ပန်းတိုင်များကို ချမှတ်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c47",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အလုပ်ကြိုးစားသူ (Workaholic) တစ်ယောက် ဖြစ်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c48",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အကောင်းဆုံး ဖြစ်ချင်သော ဆန္ဒရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c49",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ကိုယ့်ကိုယ်ကို အမြဲတမ်း တိုးတက်အောင် ကြိုးစားနေသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c50",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အောင်မြင်မှု ရရှိရန် အပြင်းအထန် ကြိုးစားသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c51",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အခြားသူများထက် ပိုမို ကြိုးစားလုပ်ကိုင်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c52",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် စိန်ခေါ်မှု အသစ်များကို လိုလားသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c53",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ရလဒ်ကောင်း ထွက်ပေါ်လာလျှင် ကျေနပ်ပီတိ ဖြစ်ရသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c54",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် မိမိနယ်ပယ်တွင် ကျွမ်းကျင်ပညာရှင် ဖြစ်လိုသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c55",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အားလပ်ချိန်များတွင်လည်း အကျိုးရှိအောင် နေလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c56",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် သက်တောင့်သက်သာ နေရသည်ကို ပိုနှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c57",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် လိုအပ်တာထက် ပိုမကြိုးစားချင်ပါ။",
    "created_at": "2026-01-12T13:46:59.156Z"
  },
  {
    "id": "c58",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ရည်မှန်းချက်ကြီးကြီးမားမား မရှိပါ။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c59",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အလုပ်များလွန်းလျှင် စိတ်ညစ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c60",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ပုံမှန် လစာရရုံ အလုပ်မျိုးကိုသာ နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c61",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အလုပ်တစ်ခုကို စလိုက်လျှင် မပြီးမချင်း လုပ်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c62",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ခက်ခဲသော အလုပ်များကိုလည်း ဇွဲမလျှော့ဘဲ လုပ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c63",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အလုပ်လုပ်နေစဉ် အာရုံပျံ့လွင့်ခြင်း မရှိပါ။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c64",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ချက်ချင်း ပျော်ရွှင်မှုထက် ရေရှည်အကျိုးကို ကြည့်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c65",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် မနက်အိပ်ရာ ထရန် ဝန်မလေးပါ။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c66",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ကျန်းမာရေးနှင့် ညီညွတ်အောင် နေထိုင်စားသောက်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c67",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ပျင်းရိခြင်းကို တွန်းလှန်နိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c68",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အရေးကြီးသော အလုပ်ရှိလျှင် ပျော်ပွဲရွှင်ပွဲများကို စွန့်လွှတ်နိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c69",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အလုပ်ပြီးမှ အနားယူလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c70",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် မိမိစိတ်ကို နိုင်နင်းစွာ ထိန်းချုပ်နိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c71",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အလုပ်များကို မနက်ဖြန်မှ လုပ်မည်ဟု ရွှေ့ဆိုင်းလေ့ရှိသည်။ (Procrastination)",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c72",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အလုပ်လုပ်နေစဉ် ဖုန်းကြည့်မိသည်က များသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c73",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ခက်ခဲလာလျှင် အလွယ်တကူ လက်လျှော့တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c74",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အစားအသောက် ဆင်ခြင်ရန် ခက်ခဲသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c75",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အလုပ်ကို အာရုံစိုက်ရန် ခက်ခဲသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c76",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ဆုံးဖြတ်ချက် မချခင် သေချာစွာ စဉ်းစားလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c77",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် စကားမပြောခင် တစ်ခါပြန် တွေးလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c78",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ဖြစ်လာနိုင်သော ဆိုးကျိုးများကို ကြိုတင် တွက်ဆသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c79",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အမှားမပါအောင် ဂရုတစိုက် လုပ်ကိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c80",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် စိတ်မြန်လက်မြန် လုပ်ဆောင်ခြင်းကို ရှောင်ကြဉ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c81",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အန္တရာယ်ကင်းသော နည်းလမ်းကို ရွေးချယ်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c82",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အစီအစဉ် မရှိဘဲ လုပ်ဆောင်ရသည်ကို စိုးရိမ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c83",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် မသေချာသော ကိစ္စများတွင် စောင့်ကြည့်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c84",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ပြဿနာ၏ ဇစ်မြစ်ကို သေချာ ရှာဖွေသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c85",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အရေးကြီးကိစ္စများတွင် အကြံဉာဏ် ယူလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c86",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် စိတ်လိုက်မာန်ပါ လုပ်မိတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c87",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ပြောပြီးမှ မှားမှန်းသိပြီး နောင်တရတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c88",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ဆုံးဖြတ်ချက်များကို လျင်မြန်စွာ (မစဉ်းစားဘဲ) ချတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c89",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် အသေးစိတ် လိုက်ကြည့်ရသည်ကို စိတ်မရှည်ပါ။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "c90",
    "category": "conscientiousness",
    "question_text": "ကျွန်ုပ်သည် ရလဒ်ကို မတွေးဘဲ လုပ်ချင်တာ လုပ်မိတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e1",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လူသစ်များနှင့် တွေ့ဆုံရလျှင် အလွယ်တကူ မိတ်ဖွဲ့နိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e2",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လူတိုင်းကို ပြုံးပြုံးရွှင်ရွှင် ဆက်ဆံလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e3",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါးအပေါ် ရင်းနှီးနွေးထွေးစွာ ဆက်ဆံတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e4",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လူများ၏ ဘဝအကြောင်းကို စိတ်ဝင်တစား မေးမြန်းလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e5",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် သူငယ်ချင်းမိတ်ဆွေများအတွက် အချိန်ပေးရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e6",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လူများကို သက်တောင့်သက်သာဖြစ်အောင် ပြုလုပ်ပေးနိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e7",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် မိမိ၏ လူမှုရေး အသိုင်းအဝိုင်းကို ချစ်ခင်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e8",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် တစ်ပါးသူနှင့် စကားစပြောရန် ဝန်မလေးပါ။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e9",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လူအများနှင့် အမြန်ဆုံး ရင်းနှီးသွားတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e10",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ဧည့်သည်များကို နွေးထွေးစွာ ကြိုဆိုတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e11",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် သူစိမ်းများနှင့် စကားပြောရန် ဝန်လေးသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e12",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လူအများနှင့် သိပ်မရောနှောတတ်ပါ။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e13",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အေးစက်စက် နေတတ်သည်ဟု အပြောခံရလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e14",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လူများကို ရှောင်ဖယ် နေတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e15",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ကိုယ့်ကိစ္စကိုယ်လုပ်ပြီး တစ်ယောက်တည်း နေလိုသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e16",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ပါတီပွဲများနှင့် လူစည်ကားသော နေရာများကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e17",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် တစ်ယောက်တည်း နေရသည်ကို မုန်းသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e18",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လူများသော ပွဲလမ်းသဘင်များတွင် ပျော်မွေ့သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e19",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် သူငယ်ချင်းများနှင့် မကြာခဏ တွေ့ဆုံလိုသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e20",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လူအုပ်ကြားထဲ ရောက်နေမှ အားအင်ပြည့်သည်ဟု ခံစားရသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e21",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အားလပ်ရက်များကို အပေါင်းအသင်းများနှင့် ကုန်ဆုံးလိုသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e22",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် စကားဝိုင်းများတွင် ပါဝင် ဆွေးနွေးရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e23",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လူရှင်းသော နေရာများထက် လူရှုပ်သော နေရာကို ပိုကြိုက်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e24",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အဖွဲ့လိုက် လှုပ်ရှားမှုများ (Group Activities) ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e25",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လူများနှင့် ထိတွေ့ဆက်ဆံရသော အလုပ်ကို ပိုသဘောကျသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e26",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လူစုလူဝေးကို ရှောင်ရှားလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e27",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ဆူညံသော နေရာများကို မုန်းသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e28",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အိမ်တွင် အေးအေးဆေးဆေး နေရသည်ကို ပိုနှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e29",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လူရှုပ်လျှင် စိတ်ကျဉ်းကျပ်လာသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e30",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် သီးသန့်နေရသော ဘဝမျိုးကို လိုလားသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e31",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ခေါင်းဆောင်နေရာမှ ဦးဆောင်ရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e32",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် မိမိ၏ ထင်မြင်ချက်ကို ပွင့်ပွင့်လင်းလင်း ပြောရဲသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e33",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အခြားသူများကို လွှမ်းမိုးနိုင်စွမ်း ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e34",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အုပ်စုလိုက် လုပ်ဆောင်ရာတွင် ဆုံးဖြတ်ချက် ချပေးလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e35",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လိုချင်တာကို ရအောင် ပြောဆိုနိုင်စွမ်း ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e36",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လူအများ၏ အာရုံစိုက်မှုကို ခံရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e37",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အစည်းအဝေးများတွင် တက်ကြွစွာ ပါဝင် ဆွေးနွေးသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e38",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါးကို စည်းရုံးပြောဆိုရသည်မှာ တော်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e39",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ဦးဆောင်သူ (Leader) တစ်ယောက် ဖြစ်လိုသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e40",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ကိုယ့်ကိုယ်ကို ယုံကြည်မှု အပြည့်ဖြင့် ပြောဆိုတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e41",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် နောက်လိုက် (Follower) လုပ်ရသည်ကို ပိုသဘောကျသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e42",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လူအများရှေ့တွင် စကားပြောရမှာ ကြောက်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e43",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ကိုယ့်သဘောထားကို ထုတ်မပြောဘဲ မျိုသိပ်ထားလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e44",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါး ဦးဆောင်မှုကို စောင့်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e45",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အာရုံစိုက်ခံရလျှင် နေရခက်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e46",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် နေ့စဉ်ဘဝတွင် အမြဲတမ်း တက်ကြွ လှုပ်ရှားနေသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e47",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အလုပ်များကို လျင်မြန်စွာ ပြီးစီးအောင် လုပ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e48",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အားလပ်ချိန် သိပ်မထားဘဲ အလုပ်တစ်ခုပြီးတစ်ခု လုပ်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e49",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် တစ်နေရာတည်းတွင် ကြာကြာ ငြိမ်မထိုင်နိုင်ပါ။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e50",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် စွမ်းအင်အပြည့် ရှိသည်ဟု အမြဲ ခံစားရသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e51",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အလုပ်များများ လုပ်ရမှ ကျေနပ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e52",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လှုပ်ရှားမှုများသော အားကစားများကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e53",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အလုပ်ခွင်တွင် အသံကျယ်ကျယ်၊ လှုပ်ရှားမှုမြန်မြန် ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e54",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အချိန်တိုအတွင်း အလုပ်များစွာကို ပြီးမြောက်နိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e55",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ဘဝကို အရှိန်အဟုန်ဖြင့် ဖြတ်သန်းလိုသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e56",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ဖြည်းဖြည်းနှင့် မှန်မှန် သွားလိုသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e57",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လှုပ်ရှားမှု များလွန်းလျှင် မောပန်းလွယ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e58",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အားလပ်ချိန်တွင် ဘာမှမလုပ်ဘဲ နားနေချင်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e59",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အေးအေးဆေးဆေး (Relaxed) နေတတ်သူ ဖြစ်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e60",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အလျင်စလို လုပ်ရသည်ကို မကြိုက်ပါ။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e61",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် စိတ်လှုပ်ရှားဖွယ်ရာ အတွေ့အကြုံများကို ရှာဖွေသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e62",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် စွန့်စားရသော ခရီးစဉ်များကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e63",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ဆူညံသော ဂီတနှင့် ပျော်ပွဲရွှင်ပွဲများကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e64",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် စွန့်စားခန်းပါသော အားကစားနည်းများကို စမ်းသပ်လိုသည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e65",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အန္တရာယ်များသော်လည်း ရင်ခုန်စရာကောင်းလျှင် လုပ်ကြည့်ချင်သည်။",
    "created_at": "2026-01-12T13:46:59.157Z"
  },
  {
    "id": "e66",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် စည်းကမ်းဘောင်များကို ကျော်ဖောက်ရသည်မှာ စိတ်လှုပ်ရှားစရာဟု ထင်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e67",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အံ့သြဖွယ်ရာ (Surprises) များကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e68",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ရိုင်းရိုင်းစိုင်းစိုင်း ဟာသများကို သဘောကျတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e69",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ပျင်းရိငြီးငွေ့ဖွယ် အခြေအနေကို သည်းမခံနိုင်ပါ။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e70",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အက်ရှင် (Action) ဆန်ဆန် နေထိုင်ရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e71",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် လုံခြုံစိတ်ချရသော အရာကိုသာ ရွေးချယ်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e72",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အသံကျယ်ကျယ်လောင်လောင်များကို မုန်းသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e73",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ရင်ခုန်စရာများထက် အေးချမ်းမှုကို လိုလားသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e74",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် စွန့်စားရသည့် အလုပ်များကို ရှောင်ကြဉ်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e75",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် သာမန်ရိုးရှင်းသော ဘဝကိုသာ နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e76",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ဘဝကို ပျော်ရွှင်စွာ ဖြတ်သန်းလိုသူ ဖြစ်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e77",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အလွယ်တကူ ရယ်မောတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e78",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အရာရာကို အကောင်းမြင်စိတ်ဖြင့် ကြည့်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e79",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ပျော်စရာ ဟာသများကို ပြောပြလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e80",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အနာဂတ်အတွက် စိတ်လှုပ်ရှား တက်ကြွနေသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e81",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် မိမိ၏ ပျော်ရွှင်မှုကို အခြားသူများအား ကူးစက်စေနိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e82",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ကိုယ့်ကိုယ်ကို ပျော်ရွှင်သူတစ်ယောက်ဟု သတ်မှတ်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e83",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် သေးငယ်သော အောင်မြင်မှုလေးများကိုလည်း ကျင်းပလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e84",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ရယ်စရာ ဇာတ်ကားများကို ကြိုက်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e85",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်၏ မျက်နှာသည် အမြဲ ပြုံးရွှင်နေတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e86",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် သိပ်ပြီး ရယ်မောလေ့ မရှိပါ။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e87",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အရာရာကို လေးနက်စွာ (Serious) တွေးလွန်းသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e88",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် အကောင်းမြင်စိတ် နည်းပါးသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e89",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် ပျော်ရွှင်စရာ ကိစ္စများတွင်လည်း သိပ်စိတ်မပါတတ်ပါ။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "e90",
    "category": "extroversion",
    "question_text": "ကျွန်ုပ်သည် စိတ်ဓာတ်ကျလွယ်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a1",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လူတိုင်းအပေါ် ယုံကြည်မှုထားလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a2",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လူသားအားလုံးသည် အခြေခံအားဖြင့် စိတ်ရင်းကောင်းကြသည်ဟု ယုံကြည်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a3",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါး၏ စကားကို အလွယ်တကူ ယုံကြည်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a4",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လူများကို သံသယ မျက်လုံးဖြင့် ကြည့်လေ့မရှိပါ။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a5",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါး၏ ရည်ရွယ်ချက်ကောင်းကို မြင်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a6",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လူတိုင်းသည် ရိုးသားကြသည်ဟု ယူဆသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a7",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် မိတ်ဆွေများအပေါ် အပြည့်အဝ ယုံကြည်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a8",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လူတစ်ယောက်ကို စတွေ့ကတည်းက ယုံကြည်မှု ပေးထားလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a9",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ခွင့်လွှတ်ပြီး မေ့ပျောက်လွယ်သော သဘောထားရှိသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a10",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လူများကို ဒုတိယအကြိမ် အခွင့်အရေး (Second chance) ပေးလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a11",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါးကို သတိထား ဆက်ဆံလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a12",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လူတွေက ကိုယ်ကျိုးအတွက် ကျွန်ုပ်ကို အသုံးချလိမ့်မည်ဟု ထင်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a13",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ဘယ်သူ့ကိုမှ လွယ်လွယ် မယုံတတ်ပါ။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a14",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လူတို့၏ နောက်ကွယ်မှ ရည်ရွယ်ချက်များကို သံသယဝင်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a15",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လူအများနှင့် ဆက်ဆံရာတွင် ခံစစ်အနေအထားဖြင့် နေလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a16",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ဟန်ဆောင်လေ့မရှိဘဲ ပွင့်လင်းရိုးသားသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a17",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လိုချင်တာရဖို့အရေး သူတစ်ပါးကို မြှောက်ပင့်မပြောတတ်ပါ။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a18",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လှည့်စားခြင်း၊ လိမ်ညာခြင်းကို ရွံရှာသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a19",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် စိတ်ထဲရှိသည့်အတိုင်း ပြောဆိုလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a20",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ဉာဏ်နီဉာဏ်နက် သုံးရသည်ကို မနှစ်သက်ပါ။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a21",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် စည်းကမ်းဖောက်ဖျက်ရမှာ ကြောက်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a22",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါးကို အမြတ်ထုတ်လိုစိတ် မရှိပါ။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a23",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ရိုးသားမှုသည် အကောင်းဆုံး မူဝါဒဖြစ်သည်ဟု ယုံကြည်သည်။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a24",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် မိမိအကျိုးအတွက် သူတစ်ပါးကို မထိခိုက်စေလိုပါ။",
    "created_at": "2026-01-12T13:46:59.158Z"
  },
  {
    "id": "a25",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ရှင်းလင်းပြတ်သားစွာ ပြောဆိုဆက်ဆံတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a26",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လိုအပ်လျှင် အမှန်တရားကို ဖုံးကွယ်ထားတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a27",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လူအလိုက် လိုသလို ပုံစံပြောင်း ဆက်ဆံတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a28",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ကိုယ့်အပြစ်ကို ဖုံးကွယ်ရန် ဆင်ခြေပေးတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a29",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် တစ်ခါတစ်ရံ ပါးနပ်စွာ လိမ်ညာတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a30",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လှည့်ကွက်သုံးခြင်းသည် ဉာဏ်ကောင်းခြင်းဟု ထင်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a31",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါးကို ကူညီရသည်ကို ဝန်မလေးပါ။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a32",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လူတွေကို ပျော်ရွှင်စေချင်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a33",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် အကူအညီ လိုအပ်နေသူများကို တွေ့လျှင် လျစ်လျူမရှုနိုင်ပါ။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a34",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ပရဟိတ လုပ်ငန်းများကို စိတ်ဝင်စားသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a35",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါးအတွက် မိမိအချိန်ကို ပေးလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a36",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် မိတ်ဆွေများ ဒုက္ခရောက်နေလျှင် ငွေကြေး/လုပ်အား ကူညီတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a37",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါး အဆင်ပြေဖို့အတွက် ကိုယ့်ကိုကိုယ် နှိမ့်ချဆက်ဆံတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a38",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လမ်းမသိသူများကို လမ်းညွှန်ပေးရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a39",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ပေးကမ်းစွန့်ကြဲရသည်ကို ဝန်မလေးပါ။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a40",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ရက်ရောသော သဘောထား ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a41",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် သူများကိစ္စတွင် ဝင်မပါချင်ပါ။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a42",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ကိုယ့်ပြဿနာနှင့်ကိုယ်သာ ရှုပ်နေတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a43",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် သူတောင်းစားများကို ပိုက်ဆံမပေးလိုပါ။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a44",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လူတွေက သူတို့ပြဿနာကို သူတို့ဘာသာ ရှင်းသင့်သည်ဟု ထင်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a45",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် အချိန်ကုန်မည့် ကိစ္စများကို ရှောင်ဖယ်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a46",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် စကားများ ရန်ဖြစ်ရသည်ကို မုန်းသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a47",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် အခြားသူများနှင့် ပဋိပက္ခ မဖြစ်အောင် နေသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a48",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် အနိုင်ယူလိုစိတ် (Competitiveness) နည်းပါးသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a49",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် အများသဘောတူ ဆုံးဖြတ်ချက်ကို လိုက်နာသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a50",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ပြဿနာဖြစ်လျှင် အရင်ဆုံး တောင်းပန်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a51",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် သည်းခံခွင့်လွှတ်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a52",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါးကို ဝေဖန်တိုက်ခိုက်ရသည်ကို မကြိုက်ပါ။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a53",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် အများနှင့် သဟဇာတဖြစ်အောင် နေတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a54",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ဒေါသထွက်နေသူများကို ပြန်ချော့လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a55",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ရန်သူမရှိဘဲ မိတ်ဆွေသာ ရှိလိုသူဖြစ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a56",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် မကျေနပ်လျှင် ချက်ချင်း ပြန်ပြောတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a57",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လူတစ်ဖက်သားကို စော်ကားပြောဆိုမိတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a58",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ကိုယ်မှန်တယ်ထင်ရင် ဘယ်တော့မှ အလျှော့မပေးပါ။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a59",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ခေါင်းမာသည်ဟု အပြောခံရလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a60",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လက်တုံ့ပြန်ရသည်ကို ဝန်မလေးပါ။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a61",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် မိမိကိုယ်ကို အထင်ကြီးလေ့ မရှိပါ။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a62",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ချီးကျူးခံရလျှင် နေရခက်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a63",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် မိမိအောင်မြင်မှုများကို ကြွားဝါလေ့ မရှိပါ။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a64",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် သာမန်လူတစ်ယောက်လိုသာ နေထိုင်လိုသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a65",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် မိမိထက် တော်သူများကို လေးစားအားကျသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a66",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် နာမည်ကြီး လူသိများချင်စိတ် မရှိပါ။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a67",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် မိမိ၏ အားနည်းချက်များကို ဝန်ခံရဲသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a68",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ဆရာကြီးလုပ်ရသည်ကို မကြိုက်ပါ။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a69",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လူတိုင်းအပေါ် တန်းတူညီမျှ ဆက်ဆံသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a70",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ရိုးရိုးကုတ်ကုတ် နေတတ်သူ ဖြစ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a71",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် အခြားသူများထက် ပိုတော်သည်ဟု ခံစားရသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a72",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ကိုယ့်အကြောင်း ပြောရသည်ကို နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a73",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် အထင်ကြီးခံရတာကို ကြိုက်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a74",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လူအများ၏ အာရုံစိုက်မှုကို လိုလားသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a75",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လူအထင်သေးခံရမှာကို အလွန်စိုးရိမ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a76",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါး၏ ခံစားချက်ကို ကိုယ်ချင်းစာ နားလည်ပေးနိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a77",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ဝမ်းနည်းနေသူများကို မြင်လျှင် စိတ်မကောင်းဖြစ်ရသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a78",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် သက်ကြီးရွယ်အိုများနှင့် ကလေးများကို ကြင်နာသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a79",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် တိရစ္ဆာန်လေးများကို ချစ်ခင်ကြင်နာသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a80",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် သနားတတ်သော နှလုံးသား ပိုင်ရှင်ဖြစ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a81",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် နိုင်ငံရေး သို့မဟုတ် လူမှုရေး ဒုက္ခသည်များကို စာနာသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a82",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါး နာကျင်နေတာကို မကြည့်ရက်ပါ။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a83",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် မျက်ရည်လွယ်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a84",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လူသားဆန်မှုကို တန်ဖိုးထားသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a85",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ခက်ထန်ကြမ်းတမ်းသော လုပ်ရပ်များကို မုန်းသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a86",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် လူတွေ ငိုနေတာကို မြင်ရင် စိတ်ရှုပ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a87",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ခံစားချက်မရှိသူ (Cold-blooded) ဟု အပြောခံရဖူးသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a88",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် တရားဥပဒေအရ အပြစ်ပေးခြင်းကိုသာ လိုလားသည် (သနားညှာတာမှု မလိုဟုထင်သည်)။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a89",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါးကိစ္စတွင် စိတ်မဝင်စားပါ။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "a90",
    "category": "agreeableness",
    "question_text": "ကျွန်ုပ်သည် ဆုံးဖြတ်ချက်ချရာတွင် သံယောဇဉ်ကို ပဓာနမထားပါ။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "e1",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အကြောင်းပြချက်မရှိဘဲ စိုးရိမ်ပူပန်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "e2",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် တစ်ခုခု လွဲချော်သွားမည်ကို အမြဲ ကြောက်ရွံ့နေသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "e3",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အနာဂတ်အတွက် တွေးပြီး စိတ်ပူလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "e4",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စိတ်လှုပ်ရှားလျှင် လက်တုန်/ရင်တုန် ဖြစ်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "e5",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ဘေးအန္တရာယ် တစ်ခုခု ဖြစ်တော့မည်ဟု ခံစားရလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "e6",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စိတ်ကို လျှော့ချ (Relax) ရန် ခက်ခဲသည်။",
    "created_at": "2026-01-12T13:46:59.159Z"
  },
  {
    "id": "e7",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အိပ်ရာဝင်လျှင် အတွေးပေါင်းစုံ ဝင်လာပြီး အိပ်မပျော်ဖြစ်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e8",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် သေးငယ်သော ပြဿနာလေးများကို ပုံကြီးချဲ့ တွေးမိတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e9",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ကြောက်စိတ် ဝင်လွယ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e10",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စိတ်ထဲတွင် ဂဏှာမငြိမ် ဖြစ်နေတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e11",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အများအားဖြင့် စိတ်လက်ပေါ့ပါးစွာ နေတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e12",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အလွယ်တကူ ကြောက်လန့်လေ့ မရှိပါ။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e13",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ပြဿနာများကို အေးဆေးစွာ ဖြေရှင်းနိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e14",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် မဖြစ်သေးသော ကိစ္စများအတွက် ကြိုပြီး စိတ်မပူပါ။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e15",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စိတ်တည်ငြိမ်သူ (Calm person) ဖြစ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e16",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အလွယ်တကူ ဒေါသထွက်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e17",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် တစ်ဖက်သားက ကိုယ့်ကို လာထိပါက ပေါက်ကွဲလွယ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e18",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စိတ်တိုလျှင် ထိန်းချုပ်ရန် ခက်ခဲသည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e19",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် လူများကို မကြာခဏ စိတ်ပျက်မိသည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e20",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် တစ်ခါတစ်ရံ ပစ္စည်းများကို ရိုက်ခွဲချင်စိတ် ပေါက်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e21",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါးအပေါ် မကျေနပ်ချက် (Grudge) ထားလေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e22",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အသေးအဖွဲ ကိစ္စလေးများဖြင့် စိတ်ဆိုးတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e23",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စိတ်ဆိုးလျှင် ကြမ်းတမ်းသော စကားများ ပြောမိတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e24",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် လူတွေ ကျွန်ုပ်ကို ဆက်ဆံပုံအပေါ် မကျေနပ် ဖြစ်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e25",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် သည်းခံနိုင်စွမ်း နည်းပါးသည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e26",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ဒေါသထွက်ခဲသောသူ ဖြစ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e27",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် လူများကို ခွင့်လွှတ်လွယ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e28",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စိတ်ဆိုးစရာ ကြုံလာလျှင် ရယ်မောပြီး နေလိုက်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e29",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ဒေါသထွက်လျှင်လည်း ချက်ချင်း ပြန်ပျောက်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e30",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် လူအများက သဘောကောင်းသူဟု သတ်မှတ်ကြသည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e31",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် မကြာခဏ ဝမ်းနည်းအားငယ်စိတ် ဖြစ်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e32",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ဘဝသည် မျှော်လင့်ချက် မရှိဟု ခံစားရသည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e33",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အထီးကျန်ဆန်သည်ဟု ခံစားရသည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e34",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် တစ်ခါတစ်ရံ အကြောင်းအရင်းမရှိဘဲ ငိုချင်စိတ်ပေါက်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e35",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ကိုယ့်ကိုယ်ကို တန်ဖိုးမရှိဟု ထင်မိသည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e36",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အတိတ်က အမှားများကို တွေးပြီး နောင်တရနေတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e37",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် နေ့စဉ်ဘဝတွင် ပျော်ရွှင်မှု ရှာမတွေ့တော့သလို ခံစားရသည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e38",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အရာရာကို လက်လျှော့လိုက်ချင်စိတ် ပေါက်ဖူးသည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e39",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် မိမိကိုယ်ကို အပြစ်တင်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e40",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စွမ်းအင်ကုန်ခမ်းပြီး နွမ်းနယ်နေတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e41",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ဘဝကို ကျေနပ်နှစ်သက်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e42",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ကိုယ့်ကိုယ်ကို ယုံကြည်မှုရှိသည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e43",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အမြဲတမ်း တက်ကြွ လန်းဆန်းနေသည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e44",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အခက်အခဲများကို အကောင်းဘက်က မြင်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e45",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ကိုယ့်ကိုယ်ကို ချစ်မြတ်နိုးသည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e46",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် လူအများကြားတွင် ရှက်ရွံ့တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e47",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် သူစိမ်းများနှင့် တွေ့လျှင် ဘာပြောရမှန်းမသိ ဖြစ်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e48",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် လူတွေက ကျွန်ုပ်ကို ဝေဖန်နေကြသည်ဟု ခံစားရသည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e49",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အမှားတစ်ခု လုပ်မိလျှင် အကြာကြီး ရှက်နေတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e50",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် လူအများ၏ အာရုံစိုက်မှုကို ခံရလျှင် နေရခက်သည်။",
    "created_at": "2026-01-12T13:46:59.160Z"
  },
  {
    "id": "e51",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ကိုယ့်ရုပ်ရည်/အဝတ်အစားနှင့် ပတ်သက်ပြီး ယုံကြည်မှု မရှိပါ။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e52",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စကားပြောလျှင် အထစ်ထစ် အငေါ့ငေါ့ ဖြစ်သွားတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e53",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် လူတောမတိုး ဖြစ်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e54",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါးထက် နိမ့်ကျသည်ဟု ခံစားရသည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e55",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အားနာတတ်လွန်းသောကြောင့် ငြင်းဆန်ရန် ခက်ခဲသည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e56",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် လူအများကြားတွင် ယုံကြည်မှုရှိရှိ နေနိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e57",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် သူတစ်ပါး၏ အမြင်ကို ဂရုမစိုက်ပါ။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e58",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် လူမှုရေးပွဲလမ်းသဘင်များတွင် သက်တောင့်သက်သာ ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e59",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ကိုယ့်ကိုယ်ကို ယုံကြည်မှု အပြည့်ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e60",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အမှားလုပ်မိလည်း ရယ်စရာအဖြစ် သဘောထားနိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e61",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် တစ်ခါတစ်ရံ စိတ်အလိုကို မထိန်းနိုင်ဘဲ လွှတ်ပေးလိုက်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e62",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စားချင်တာစား၊ ဝယ်ချင်တာ ဝယ်မိတတ်သည်။ (Binge eating/spending)",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e63",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စိတ်မြန်လက်မြန် ဆုံးဖြတ်မိပြီးမှ နောင်တရတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e64",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် မကောင်းမှန်းသိသော်လည်း ဖြတ်ရခက်သော အကျင့်များ ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e65",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စကားပြောလျှင် မစဉ်းစားဘဲ ပြောမိတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e66",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စိတ်ပါလာလျှင် အလုပ်ကို ပစ်ထားပြီး ပျော်ပါးမိတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e67",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် သည်းခံနိုင်စွမ်း နည်းပါးပြီး ချက်ချင်း လိုချင်တတ်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e68",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စိတ်ဆိုးလျှင် ပေါက်ကွဲလွယ်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e69",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အာရုံစူးစိုက်မှု လျော့နည်းပြီး စိတ်အပြောင်းအလဲ မြန်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e70",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် သတိပေးချက်များကို လစ်လျူရှုမိတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e71",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စိတ်ကို နိုင်နင်းစွာ ထိန်းချုပ်နိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e72",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် သွေးဆောင်မှု (Temptations) များကို တွန်းလှန်နိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e73",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ရေရှည်အကျိုးအတွက် သည်းခံနိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e74",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အမှားမလုပ်မိအောင် သတိထား နေထိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e75",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စည်းကမ်းတကျ နေထိုင်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e76",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ဖိအားများလာပါက တောင့်ခံနိုင်စွမ်း နည်းသည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e77",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ပြဿနာကြီးကြီးမားမား ကြုံလျှင် စိတ်ဓာတ်ပြိုလဲလွယ်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e78",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အလုပ်များလွန်းလျှင် ဘာလုပ်ရမှန်းမသိ ဖြစ်သွားတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e79",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အရေးပေါ် အခြေအနေတွင် ထိတ်လန့်သွားတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e80",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အခက်အခဲကြုံလျှင် သူတစ်ပါးကို မှီခိုချင်စိတ် ပေါက်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e81",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စိတ်ဖိစီးမှုကြောင့် ကျန်းမာရေး ထိခိုက်လေ့ရှိသည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e82",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ပြဿနာများကို ရင်ဆိုင်ရမည့်အစား ရှောင်ပြေးချင်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e83",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စိတ်ဓာတ်ခိုင်မာမှု အားနည်းသည်ဟု ခံစားရသည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e84",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ဆုံးဖြတ်ချက်ချရမည့် အချိန်တွင် တွေဝေနေတတ်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e85",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အပြောင်းအလဲ ဂယက်များကို မခံနိုင်ပါ။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e86",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အရေးပေါ် အခြေအနေတွင် တည်ငြိမ်စွာ ဦးဆောင်နိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e87",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ဖိအားအောက်တွင် အလုပ်ကို ကောင်းစွာ လုပ်နိုင်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e88",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် ပြဿနာများကို စိန်ခေါ်မှုအဖြစ် သဘောထားသည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e89",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် စိတ်ဓာတ်ကြံ့ခိုင်သူ ဖြစ်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "e90",
    "category": "emotional_stability",
    "question_text": "ကျွန်ုပ်သည် အခက်အခဲကြုံလေ ပိုသန်မာလေ ဖြစ်သည်။",
    "created_at": "2026-01-12T13:46:59.161Z"
  }
];

const MOCK_PERSONALITY_TYPES: PersonalityType[] = [
  {
    "id": "pt1",
    "category": "extroversion",
    "name": "Extrovert",
    "description": "သင်သည် လူမှုဆက်ဆံရေး ကောင်းမွန်ပြီး အပေါင်းအသင်းများကြားတွင် ပျော်ရွှင်တတ်သူဖြစ်သည်။",
    "min_score": 35,
    "max_score": 50,
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "pt2",
    "category": "extroversion",
    "name": "Ambivert",
    "description": "သင်သည် လူမှုဆက်ဆံရေးနှင့် တစ်ကိုယ်တည်းနေထိုင်မှုကြားတွင် မျှတစွာ နေထိုင်တတ်သူဖြစ်သည်။",
    "min_score": 25,
    "max_score": 34,
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "pt3",
    "category": "extroversion",
    "name": "Introvert",
    "description": "သင်သည် တစ်ကိုယ်တည်း နေထိုင်ရခြင်းကို ပိုမိုနှစ်သက်ပြီး တိတ်ဆိတ်ငြိမ်သက်မှုကို မြတ်နိုးသူဖြစ်သည်။",
    "min_score": 10,
    "max_score": 24,
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "pt4",
    "category": "agreeableness",
    "name": "High Agreeableness",
    "description": "သင်သည် သူတစ်ပါးအပေါ် စာနာနားလည်မှုရှိပြီး ကူညီတတ်သူဖြစ်သည်။",
    "min_score": 35,
    "max_score": 50,
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "pt5",
    "category": "agreeableness",
    "name": "Moderate Agreeableness",
    "description": "သင်သည် သူတစ်ပါးနှင့် သင့်မြတ်အောင် နေတတ်သော်လည်း လိုအပ်လျှင် ပြတ်သားတတ်သည်။",
    "min_score": 25,
    "max_score": 34,
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "pt6",
    "category": "agreeableness",
    "name": "Low Agreeableness",
    "description": "သင်သည် ကိုယ့်ကိုယ်ကို ပိုမိုဦးစားပေးတတ်ပြီး သူတစ်ပါး၏ ခံစားချက်ကို သိပ်ဂရုမစိုက်တတ်ပါ။",
    "min_score": 10,
    "max_score": 24,
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "pt7",
    "category": "conscientiousness",
    "name": "High Conscientiousness",
    "description": "သင်သည် စည်းကမ်းရှိပြီး တာဝန်ယူမှု တာဝန်ခံမှု မြင့်မားသူဖြစ်သည်။",
    "min_score": 35,
    "max_score": 50,
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "pt8",
    "category": "conscientiousness",
    "name": "Moderate Conscientiousness",
    "description": "သင်သည် အလုပ်များကို ပြီးမြောက်အောင် လုပ်ဆောင်နိုင်သော်လည်း တစ်ခါတစ်ရံ ပေါ့ပေါ့ပါးပါး နေတတ်သည်။",
    "min_score": 25,
    "max_score": 34,
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "pt9",
    "category": "conscientiousness",
    "name": "Low Conscientiousness",
    "description": "သင်သည် စည်းကမ်းမဲ့ နေထိုင်တတ်ပြီး အလုပ်များကို အချိန်ဆွဲလေ့ရှိသည်။",
    "min_score": 10,
    "max_score": 24,
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "pt10",
    "category": "emotional_stability",
    "name": "High Stability",
    "description": "သင်သည် စိတ်တည်ငြိမ်ပြီး ဖိအားများကို ကောင်းစွာ ကိုင်တွယ်ဖြေရှင်းနိုင်သည်။",
    "min_score": 35,
    "max_score": 50,
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "pt11",
    "category": "emotional_stability",
    "name": "Moderate Stability",
    "description": "သင်သည် ယေဘုယျအားဖြင့် စိတ်တည်ငြိမ်သော်လည်း ကြီးမားသော ဖိအားများနှင့် ကြုံလျှင် စိတ်လှုပ်ရှားတတ်သည်။",
    "min_score": 25,
    "max_score": 34,
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "pt12",
    "category": "emotional_stability",
    "name": "Low Stability",
    "description": "သင်သည် စိတ်ခံစားမှု ပြင်းထန်ပြီး အလွယ်တကူ စိတ်ထိခိုက် လွယ်တတ်သည်။",
    "min_score": 10,
    "max_score": 24,
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "pt13",
    "category": "openness",
    "name": "High Openness",
    "description": "သင်သည် အသစ်အဆန်းများကို စူးစမ်းလေ့လာလိုစိတ်ရှိပြီး ဖန်တီးနိုင်စွမ်း မြင့်မားသည်။",
    "min_score": 35,
    "max_score": 50,
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "pt14",
    "category": "openness",
    "name": "Moderate Openness",
    "description": "သင်သည် လက်တွေ့ကျကျ နေထိုင်တတ်သော်လည်း အပြောင်းအလဲအချို့ကို လက်ခံနိုင်သည်။",
    "min_score": 25,
    "max_score": 34,
    "created_at": "2026-01-12T13:46:59.161Z"
  },
  {
    "id": "pt15",
    "category": "openness",
    "name": "Low Openness",
    "description": "သင်သည် ရိုးရာဓလေ့များကိုသာ မြတ်နိုးပြီး အပြောင်းအလဲများကို မနှစ်သက်ပါ။",
    "min_score": 10,
    "max_score": 24,
    "created_at": "2026-01-12T13:46:59.161Z"
  }
];

// Local Database Implementation
class LocalDatabase {
  private getSessions(): TestSession[] {
    const sessions = localStorage.getItem('test_sessions');
    return sessions ? JSON.parse(sessions) : [];
  }

  private saveSessions(sessions: TestSession[]) {
    localStorage.setItem('test_sessions', JSON.stringify(sessions));
  }

  private getResponses(): TestResponse[] {
    const responses = localStorage.getItem('test_responses');
    return responses ? JSON.parse(responses) : [];
  }

  private saveResponses(responses: TestResponse[]) {
    localStorage.setItem('test_responses', JSON.stringify(responses));
  }

  async getPersonalityTypes() {
    return { data: MOCK_PERSONALITY_TYPES, error: null };
  }

  async getQuestions() {
    return { data: MOCK_QUESTIONS, error: null };
  }

  async createSession(token: string) {
    const sessions = this.getSessions();
    const newSession: TestSession = {
      id: Math.random().toString(36).substr(2, 9),
      session_token: token,
      started_at: new Date().toISOString()
    };
    sessions.push(newSession);
    this.saveSessions(sessions);
    return { data: newSession, error: null };
  }

  async saveResponse(sessionId: string, questionId: string, value: number) {
    const responses = this.getResponses();
    const newResponse: TestResponse = {
      id: Math.random().toString(36).substr(2, 9),
      session_id: sessionId,
      question_id: questionId,
      answer_value: value,
      created_at: new Date().toISOString()
    };
    responses.push(newResponse);
    this.saveResponses(responses);
    return { data: newResponse, error: null };
  }

  async updateSession(sessionId: string, updates: Partial<TestSession>) {
    const sessions = this.getSessions();
    const index = sessions.findIndex(s => s.id === sessionId);
    if (index !== -1) {
      sessions[index] = { ...sessions[index], ...updates };
      this.saveSessions(sessions);
      return { data: sessions[index], error: null };
    }
    return { data: null, error: 'Session not found' };
  }
}

export const localDb = new LocalDatabase();
