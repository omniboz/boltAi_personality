import { useState, useEffect } from 'react';
import { Question, PersonalityType } from './lib/supabase';
import { localDb } from './lib/localDb';
import StartScreen from './components/StartScreen';
import TestScreen from './components/TestScreen';
import ResultsScreen from './components/ResultsScreen';
import { Loader2 } from 'lucide-react';

type Screen = 'start' | 'test' | 'results' | 'loading';

interface Answer {
  questionId: string;
  value: number;
  category: string;
}

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [personalityTypes, setPersonalityTypes] = useState<PersonalityType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [sessionToken, setSessionToken] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [results, setResults] = useState<Array<{
    category: string;
    name: string;
    description: string;
    score: number;
    maxScore: number;
  }>>([]);

  useEffect(() => {
    loadPersonalityTypes();
  }, []);

  const loadPersonalityTypes = async () => {
    const { data } = await localDb.getPersonalityTypes();

    if (data) {
      setPersonalityTypes(data);
    }
  };

  const generateSessionToken = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const handleStart = async () => {
    setScreen('loading');

    const { data: allQuestions } = await localDb.getQuestions();

    if (allQuestions && allQuestions.length > 0) {
      // Duplicate questions to reach 50 if needed, or just use what we have
      let pool = [...allQuestions];
      while (pool.length < 50) {
        pool = [...pool, ...allQuestions];
      }

      const shuffled = pool.sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 50);

      const token = generateSessionToken();
      setSessionToken(token);

      const { data: session, error } = await localDb.createSession(token);

      if (session && !error) {
        setSessionId(session.id);
        setQuestions(selected);
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setScreen('test');
      }
    }
  };

  const handleAnswer = async (questionId: string, value: number) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const newAnswer: Answer = {
      questionId,
      value,
      category: question.category
    };

    setAnswers(prev => [...prev, newAnswer]);

    await localDb.saveResponse(sessionId, questionId, value);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleComplete = async () => {
    setScreen('loading');

    const categoryScores: Record<string, number> = {};
    const categoryCounts: Record<string, number> = {};

    answers.forEach(answer => {
      if (!categoryScores[answer.category]) {
        categoryScores[answer.category] = 0;
        categoryCounts[answer.category] = 0;
      }
      categoryScores[answer.category] += answer.value;
      categoryCounts[answer.category] += 1;
    });

    const resultItems = Object.keys(categoryScores).map(category => {
      const score = categoryScores[category];
      const maxScore = categoryCounts[category] * 5;

      const matchingType = personalityTypes
        .filter(pt => pt.category === category)
        .find(pt => score >= pt.min_score && score <= pt.max_score);

      return {
        category,
        name: matchingType?.name || 'အမျိုးအစားသတ်မှတ်မရပါ',
        description: matchingType?.description || '',
        score,
        maxScore
      };
    });

    setResults(resultItems);

    await localDb.updateSession(sessionId, {
      completed_at: new Date().toISOString(),
      results: resultItems as any
    });

    setScreen('results');
  };

  const handleRestart = () => {
    setScreen('start');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSessionToken('');
    setSessionId('');
    setResults([]);
  };

  if (screen === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-700">စောင့်ဆိုင်းပေးပါ...</p>
        </div>
      </div>
    );
  }

  if (screen === 'start') {
    return <StartScreen onStart={handleStart} />;
  }

  if (screen === 'test') {
    return (
      <TestScreen
        questions={questions}
        onAnswer={handleAnswer}
        onComplete={handleComplete}
        currentQuestionIndex={currentQuestionIndex}
      />
    );
  }

  if (screen === 'results') {
    return <ResultsScreen results={results} onRestart={handleRestart} />;
  }

  return null;
}

export default App;
