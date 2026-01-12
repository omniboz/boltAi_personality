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
    { value: 1, label: 'လုံးဝမတူညီပါ', color: 'bg-red-500 hover:bg-red-600' },
    { value: 2, label: 'မတူညီပါ', color: 'bg-orange-400 hover:bg-orange-500' },
    { value: 3, label: 'အလယ်အလတ်', color: 'bg-yellow-400 hover:bg-yellow-500' },
    { value: 4, label: 'တူညီပါတယ်', color: 'bg-lime-500 hover:bg-lime-600' },
    { value: 5, label: 'လုံးဝတူညီပါတယ်', color: 'bg-green-500 hover:bg-green-600' }
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

        <div className="space-y-3 mb-8">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedValue(option.value)}
              className={`w-full p-4 rounded-xl font-medium text-white transition-all duration-200 transform ${
                selectedValue === option.value
                  ? `${option.color} scale-105 shadow-lg ring-4 ring-opacity-50 ring-blue-300`
                  : `${option.color} opacity-90 hover:opacity-100 hover:scale-102 shadow-md`
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selectedValue === null}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
            selectedValue === null
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
