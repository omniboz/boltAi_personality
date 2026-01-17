import { useState } from 'react';
import { Question } from '../lib/supabase';

interface TestScreenProps {
  questions: Question[];
  onAnswer: (questionId: string, value: number) => void;
  onComplete: () => void;
  currentQuestionIndex: number;
}

export default function TestScreen({ questions, onAnswer, onComplete, currentQuestionIndex }: TestScreenProps) {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleNext = () => {
    if (selectedValue !== null) {
      onAnswer(currentQuestion.id, selectedValue);
      setSelectedValue(null);

      if (currentQuestionIndex === questions.length - 1) {
        onComplete();
      }
    }
  };

  const options = [
    { value: 1, label: 'လုံးဝမတူညီပါ', color: 'from-red-500 to-red-600' },
    { value: 2, label: 'မတူညီပါ', color: 'from-orange-400 to-orange-500' },
    { value: 3, label: 'အလယ်အလတ်', color: 'from-yellow-400 to-yellow-500' },
    { value: 4, label: 'တူညီပါတယ်', color: 'from-lime-500 to-lime-600' },
    { value: 5, label: 'လုံးဝတူညီပါတယ်', color: 'from-green-500 to-green-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-3xl w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              မေးခွန်း {currentQuestionIndex + 1} / {questions.length}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center leading-relaxed">
            {currentQuestion.question_text}
          </h2>
        </div>

        {/* Circle Options */}
        <div className="flex justify-center items-center gap-4 md:gap-6 mb-8">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedValue(option.value)}
              className="relative group"
              title={option.label}
            >
              <div className={`
                w-14 h-14 md:w-16 md:h-16 rounded-full 
                bg-gradient-to-br ${option.color}
                flex items-center justify-center
                transition-all duration-300
                ${selectedValue === option.value
                  ? 'scale-125 shadow-2xl ring-4 ring-blue-400 ring-opacity-50'
                  : 'scale-100 shadow-lg hover:scale-110 opacity-80 hover:opacity-100'
                }
              `}>
              </div>
              {/* Label below circle */}
              <div className={`
                absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                text-xs text-center whitespace-nowrap
                transition-opacity duration-200
                ${selectedValue === option.value ? 'opacity-100 font-semibold text-blue-600' : 'opacity-60 text-gray-600'}
              `}>
                {option.label}
              </div>
            </button>
          ))}
        </div>

        {/* Extra spacing for labels */}
        <div className="h-10"></div>

        <button
          onClick={handleNext}
          disabled={selectedValue === null}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${selectedValue === null
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            }`}
        >
          {currentQuestionIndex === questions.length - 1 ? 'ပြီးဆုံးမည်' : 'နောက်တစ်ခု'}
        </button>
      </div>
    </div>
  );
}
