import { Trophy, RotateCcw, Share2 } from 'lucide-react';

interface ResultItem {
  category: string;
  name: string;
  description: string;
  score: number;
  maxScore: number;
}

interface ResultsScreenProps {
  results: ResultItem[];
  onRestart: () => void;
}

export default function ResultsScreen({ results, onRestart }: ResultsScreenProps) {
  const categoryLabels: Record<string, string> = {
    extroversion: 'လူမှုဆက်ဆံရေး',
    agreeableness: 'သဘောကောင်းမှု',
    conscientiousness: 'တာဝန်သိတတ်မှု',
    emotional_stability: 'စိတ်ခံစားမှုတည်ငြိမ်မှု',
    openness: 'ပွင့်လင်းမှု'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-6">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="bg-yellow-400 rounded-full p-6 mb-4">
              <Trophy className="w-16 h-16 text-white" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              သင့်ရဲ့ရလဒ်များ
            </h1>

            <p className="text-lg text-gray-600">
              ကိုယ်ရည်ကိုယ်သွေး စစ်ဆေးမှု ပြီးဆုံးပါပြီ
            </p>
          </div>

          <div className="space-y-6">
            {results.map((result, index) => {
              const percentage = (result.score / result.maxScore) * 100;

              return (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                  <div className="mb-4">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {categoryLabels[result.category] || result.category}
                      </h3>
                      <span className="text-sm font-semibold text-blue-600">
                        {result.score} / {result.maxScore}
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-2">
                      {result.name}
                    </span>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {result.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRestart}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <RotateCcw className="w-5 h-5" />
              ပြန်စမ်းကြည့်မည်
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'ကိုယ်ရည်ကိုယ်သွေး စစ်ဆေးမှု',
                    text: 'ကျွန်တော်/မ ကိုယ်ရည်ကိုယ်သွေး စစ်ဆေးမှု လုပ်ပြီးပါပြီ။ သင်လည်း စမ်းကြည့်ပါ!',
                  });
                }
              }}
              className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Share2 className="w-5 h-5" />
              မျှဝေမည်
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
