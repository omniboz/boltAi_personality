import { Brain } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full">
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-600 rounded-full p-6 mb-6">
            <Brain className="w-16 h-16 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ကိုယ်ရည်ကိုယ်သွေး စစ်ဆေးမှု
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            သင့်ရဲ့ကိုယ်ရည်ကိုယ်သွေးကို စစ်ဆေးပါမယ်။ မေးခွန်း ၅၀ ခု ကို ဖြေဆိုရမှာဖြစ်ပြီး
            အချိန် ၁၀ မိနစ်ခန့် ကြာမြင့်နိုင်ပါတယ်။
          </p>

          <div className="bg-blue-50 rounded-2xl p-6 mb-8 w-full">
            <h3 className="font-semibold text-gray-900 mb-3 text-left">လမ်းညွှန်ချက်များ:</h3>
            <ul className="text-left text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                <span>မေးခွန်းတစ်ခုချင်းစီကို သေချာစွာဖတ်ပြီး ဖြေဆိုပါ</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                <span>သင့်အမှန်တကယ်ခံစားချက်အတိုင်း ဖြေဆိုပါ</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                <span>မေးခွန်းများကို ကျော်သွားလို့မရပါ</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                <span>သင့်ရဲ့ပထမဆုံး ခံစားချက်ကို ယုံကြည်ပါ</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onStart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            စတင်မည်
          </button>
        </div>
      </div>
    </div>
  );
}
