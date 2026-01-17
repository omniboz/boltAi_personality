import { Trophy, RotateCcw, Share2, Brain, Lightbulb, Heart, Target, Users, Zap, BookOpen, Shield, Compass } from 'lucide-react';

interface ResultItem {
  category: string;
  name: string;
  description: string;
  score: number;
  maxScore: number;
  mbtiType?: string;
  mbtiScores?: Record<string, number>;
  mbtiPercentages?: Record<string, number>;
  typeData?: any;
}

interface ResultsScreenProps {
  results: ResultItem[];
  onRestart: () => void;
  userName?: string;
}

// MBTI Type to Icon mapping
const typeIcons: Record<string, any> = {
  'INTJ': Brain,
  'INTP': Lightbulb,
  'ENTJ': Target,
  'ENTP': Zap,
  'INFJ': Heart,
  'INFP': BookOpen,
  'ENFJ': Users,
  'ENFP': Compass,
  'ISTJ': Shield,
  'ISFJ': Heart,
  'ESTJ': Target,
  'ESFJ': Users,
  'ISTP': Target,
  'ISFP': Compass,
  'ESTP': Zap,
  'ESFP': Users
};

// MBTI Type colors
const typeColors: Record<string, string> = {
  'INTJ': 'from-purple-500 to-indigo-600',
  'INTP': 'from-blue-500 to-cyan-600',
  'ENTJ': 'from-red-500 to-orange-600',
  'ENTP': 'from-orange-500 to-yellow-600',
  'INFJ': 'from-pink-500 to-rose-600',
  'INFP': 'from-purple-400 to-pink-500',
  'ENFJ': 'from-green-500 to-emerald-600',
  'ENFP': 'from-yellow-500 to-amber-600',
  'ISTJ': 'from-gray-600 to-slate-700',
  'ISFJ': 'from-teal-500 to-cyan-600',
  'ESTJ': 'from-red-600 to-rose-700',
  'ESFJ': 'from-green-400 to-teal-500',
  'ISTP': 'from-indigo-500 to-blue-600',
  'ISFP': 'from-pink-400 to-purple-500',
  'ESTP': 'from-orange-600 to-red-600',
  'ESFP': 'from-yellow-400 to-orange-500'
};

export default function ResultsScreen({ results, onRestart, userName }: ResultsScreenProps) {
  const result = results[0];

  if (!result || !result.mbtiType || !result.mbtiPercentages) {
    return <div>Error loading results</div>;
  }

  const { mbtiType, mbtiPercentages, typeData } = result;

  // Get icon and color for this type
  const TypeIcon = typeIcons[mbtiType] || Brain;
  const typeColor = typeColors[mbtiType] || 'from-purple-500 to-indigo-600';

  // Split MBTI type into letters
  const [e_i, s_n, t_f, j_p] = mbtiType.split('');

  // Axis labels in Myanmar
  const axisLabels = {
    'EI': 'စွမ်းအင်ရယူပုံ',
    'SN': 'သတင်းအချက်အလက်',
    'TF': 'ဆုံးဖြတ်ချက်',
    'JP': 'ဖွဲ့စည်းမှု'
  };

  const letterLabels: Record<string, string> = {
    'E': 'Extrovert (လူမှုဆက်ဆံရေး)',
    'I': 'Introvert (အတွင်းစိတ်)',
    'S': 'Sensing (လက်တွေ့)',
    'N': 'Intuition (အယူအဆ)',
    'T': 'Thinking (ယုတ္တိ)',
    'F': 'Feeling (ခံစားချက်)',
    'J': 'Judging (အစီအစဉ်)',
    'P': 'Perceiving (လိုက်လျောညီထွေ)'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-amber-900 p-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="bg-purple-900/40 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-12 mb-6 border border-amber-400/20">

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-full p-6 mb-4 shadow-2xl">
              <Trophy className="w-16 h-16 text-purple-900" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-300 via-amber-200 to-amber-100 bg-clip-text text-transparent mb-3 py-2" style={{ lineHeight: '1.4' }}>
              {userName ? `${userName} ၏ ရလဒ်` : 'သင့်ရဲ့ရလဒ်'}
            </h1>

            <p className="text-lg text-amber-100/90 py-1" style={{ lineHeight: '1.6' }}>
              ကိုယ်ရည်ကိုယ်သွေး စစ်ဆေးမှု ပြီးဆုံးပါပြီ
            </p>
          </div>

          {/* MBTI Type Card */}
          <div className="bg-purple-800/30 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-6 border border-amber-400/20">
            <div className="flex flex-col md:flex-row items-center gap-6">

              {/* Type Icon */}
              <div className="flex-shrink-0">
                <div className={`w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br ${typeColor} flex items-center justify-center shadow-xl border-4 border-amber-400/30`}>
                  <TypeIcon className="w-20 h-20 md:w-24 md:h-24 text-white" />
                </div>
              </div>

              {/* Type Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="mb-4">
                  <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent mb-2">
                    {mbtiType}
                  </div>
                  <div className="text-2xl md:text-3xl font-semibold text-amber-200 py-1" style={{ lineHeight: '1.5' }}>
                    {result.name}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="bg-purple-800/30 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-6 border border-amber-400/20">
            <h3 className="text-2xl font-bold text-amber-200 mb-4 py-1" style={{ lineHeight: '1.5' }}>
              အသေးစိတ် ရှင်းလင်းချက်
            </h3>
            <div className="space-y-4 text-amber-100/90" style={{ lineHeight: '1.8' }}>
              <p className="text-lg">
                {result.description}
              </p>

              {typeData?.strengths_mm && (
                <div className="mt-6">
                  <h4 className="text-xl font-semibold text-amber-300 mb-3 py-1" style={{ lineHeight: '1.5' }}>
                    🌟 အားသာချက်များ
                  </h4>
                  <p className="text-base leading-relaxed">
                    {typeData.strengths_mm}
                  </p>
                </div>
              )}

              {typeData?.weaknesses_mm && (
                <div className="mt-6">
                  <h4 className="text-xl font-semibold text-amber-300 mb-3 py-1" style={{ lineHeight: '1.5' }}>
                    ⚠️ အားနည်းချက်များ
                  </h4>
                  <p className="text-base leading-relaxed">
                    {typeData.weaknesses_mm}
                  </p>
                </div>
              )}

              {typeData?.careers_mm && (
                <div className="mt-6">
                  <h4 className="text-xl font-semibold text-amber-300 mb-3 py-1" style={{ lineHeight: '1.5' }}>
                    💼 သင့်လျော်သော အလုပ်အကိုင်များ
                  </h4>
                  <p className="text-base leading-relaxed">
                    {typeData.careers_mm}
                  </p>
                </div>
              )}

              {typeData?.famous_people && (
                <div className="mt-6">
                  <h4 className="text-xl font-semibold text-amber-300 mb-3 py-1" style={{ lineHeight: '1.5' }}>
                    👥 နာမည်ကြီး ပုဂ္ဂိုလ်များ
                  </h4>
                  <p className="text-base leading-relaxed">
                    {typeData.famous_people}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* MBTI Percentages */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-amber-200 mb-4 py-1 text-center" style={{ lineHeight: '1.5' }}>
              သင့်ရဲ့ ကိုယ်ရည်ကိုယ်သွေး အချိုးအစား
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* EI Axis */}
              <div className="bg-purple-800/30 backdrop-blur-md rounded-xl p-5 border border-amber-400/20">
                <h4 className="text-lg font-semibold text-amber-200 mb-3 py-1" style={{ lineHeight: '1.5' }}>
                  {axisLabels['EI']}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-amber-100/90 text-base">{letterLabels[e_i]}</span>
                    <span className="text-amber-300 font-bold text-lg">{mbtiPercentages[e_i]}%</span>
                  </div>
                  <div className="w-full bg-purple-900/50 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${mbtiPercentages[e_i]}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* SN Axis */}
              <div className="bg-purple-800/30 backdrop-blur-md rounded-xl p-5 border border-amber-400/20">
                <h4 className="text-lg font-semibold text-amber-200 mb-3 py-1" style={{ lineHeight: '1.5' }}>
                  {axisLabels['SN']}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-amber-100/90 text-base">{letterLabels[s_n]}</span>
                    <span className="text-amber-300 font-bold text-lg">{mbtiPercentages[s_n]}%</span>
                  </div>
                  <div className="w-full bg-purple-900/50 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${mbtiPercentages[s_n]}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* TF Axis */}
              <div className="bg-purple-800/30 backdrop-blur-md rounded-xl p-5 border border-amber-400/20">
                <h4 className="text-lg font-semibold text-amber-200 mb-3 py-1" style={{ lineHeight: '1.5' }}>
                  {axisLabels['TF']}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-amber-100/90 text-base">{letterLabels[t_f]}</span>
                    <span className="text-amber-300 font-bold text-lg">{mbtiPercentages[t_f]}%</span>
                  </div>
                  <div className="w-full bg-purple-900/50 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${mbtiPercentages[t_f]}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* JP Axis */}
              <div className="bg-purple-800/30 backdrop-blur-md rounded-xl p-5 border border-amber-400/20">
                <h4 className="text-lg font-semibold text-amber-200 mb-3 py-1" style={{ lineHeight: '1.5' }}>
                  {axisLabels['JP']}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-amber-100/90 text-base">{letterLabels[j_p]}</span>
                    <span className="text-amber-300 font-bold text-lg">{mbtiPercentages[j_p]}%</span>
                  </div>
                  <div className="w-full bg-purple-900/50 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${mbtiPercentages[j_p]}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRestart}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-purple-900 font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              style={{ lineHeight: '1.5' }}
            >
              <RotateCcw className="w-5 h-5" />
              ပြန်စမ်းကြည့်မည်
            </button>

            <button
              onClick={() => {
                const date = new Date().toLocaleDateString('my-MM', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });

                let textContent = `MBTI ကိုယ်ရည်ကိုယ်သွေး စစ်ဆေးမှု ရလဒ်\n`;
                if (userName) {
                  textContent += `အမည်: ${userName}\n`;
                }
                textContent += `ရက်စွဲ: ${date}\n`;
                textContent += `${'='.repeat(60)}\n\n`;

                textContent += `MBTI Type: ${mbtiType}\n`;
                textContent += `အမျိုးအစား: ${result.name}\n\n`;

                textContent += `အသေးစိတ် ရှင်းလင်းချက်:\n${result.description}\n\n`;

                textContent += `Percentages:\n`;
                textContent += `- ${letterLabels[e_i]}: ${mbtiPercentages[e_i]}%\n`;
                textContent += `- ${letterLabels[s_n]}: ${mbtiPercentages[s_n]}%\n`;
                textContent += `- ${letterLabels[t_f]}: ${mbtiPercentages[t_f]}%\n`;
                textContent += `- ${letterLabels[j_p]}: ${mbtiPercentages[j_p]}%\n\n`;

                if (typeData?.strengths_mm) {
                  textContent += `အားသာချက်များ:\n${typeData.strengths_mm}\n\n`;
                }

                if (typeData?.weaknesses_mm) {
                  textContent += `အားနည်းချက်များ:\n${typeData.weaknesses_mm}\n\n`;
                }

                if (typeData?.careers_mm) {
                  textContent += `သင့်လျော်သော အလုပ်များ:\n${typeData.careers_mm}\n\n`;
                }

                if (typeData?.famous_people) {
                  textContent += `နာမည်ကြီး ပုဂ္ဂိုလ်များ:\n${typeData.famous_people}\n\n`;
                }

                textContent += `${'='.repeat(60)}\n`;
                textContent += `ကျေးဇူးတင်ပါတယ်!`;

                const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `mbti-result-${mbtiType}-${Date.now()}.txt`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }}
              className="flex items-center justify-center gap-2 bg-purple-800/50 hover:bg-purple-800/70 text-amber-200 font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-amber-400/30"
              style={{ lineHeight: '1.5' }}
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
