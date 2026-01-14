import { useState, useEffect } from 'react';
import { Question, PersonalityType } from './lib/supabase';
import { supabaseDb } from './lib/supabaseDb';
import StartScreen from './components/StartScreen';
import TestScreen from './components/TestScreen';
import ResultsScreen from './components/ResultsScreen';
import AdminDashboard from './components/AdminDashboard';
import { Loader2 } from 'lucide-react';

type Screen = 'start' | 'test' | 'results' | 'loading' | 'admin';

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
  const [sessionId, setSessionId] = useState('');
  const [userName, setUserName] = useState('');

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
    const { data } = await supabaseDb.getPersonalityTypes();

    if (data) {
      setPersonalityTypes(data);
    }
  };

  const generateSessionToken = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const handleStart = async (name: string) => {
    setScreen('loading');
    setUserName(name);


    const { data: allQuestions } = await supabaseDb.getQuestions();

    if (allQuestions && allQuestions.length > 0) {
      // Duplicate questions to reach 50 if needed, or just use what we have
      let pool = [...allQuestions];
      while (pool.length < 50) {
        pool = [...pool, ...allQuestions];
      }

      const shuffled = pool.sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 50);

      const token = generateSessionToken();

      try {
        const { data: session, error } = await supabaseDb.createSession(token, name);
        if (session && !error) {
          setSessionId(session.id);
        } else {
          console.warn('Offline mode: Could not create session on server');
          setSessionId(`offline-${Date.now()}`);
        }
      } catch (e) {
        console.warn('Offline mode: Error creating session', e);
        setSessionId(`offline-${Date.now()}`);
      }

      setQuestions(selected);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setScreen('test');
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

    // Fire and forget save response
    supabaseDb.saveResponse(sessionId, questionId, value).catch(err => {
      console.warn('Offline mode: Could not save response', err);
    });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleComplete = async () => {
    // Rapid completion check (less than 30 seconds for 50 questions is impossible if reading)
    // User said "one click finish 50", implying very fast or automated.
    // Let's set a reasonable threshold. 50 questions * 2 seconds = 100 seconds.
    // Let's be generous and say 60 seconds.
    /*
    const duration = Date.now() - startTime;
    if (duration < 60000) {
      alert('မေးခွန်းများကို သေချာဖတ်ပြီး ဖြေဆိုပေးပါ။ (Too fast)');
      handleRestart();
      return;
    }

    // Variance check (all answers are the same)
    if (answers.length > 0) {
      const firstValue = answers[0].value;
      const allSame = answers.every(a => a.value === firstValue);
      if (allSame) {
        alert('မေးခွန်းများကို သေချာဖတ်ပြီး ဖြေဆိုပေးပါ။ (All answers same)');
        handleRestart();
        return;
      }
    }
    */

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

    supabaseDb.updateSession(sessionId, {
      completed_at: new Date().toISOString(),
      results: resultItems as any
    }).catch(err => {
      console.warn('Offline mode: Could not update session', err);
    });

    setScreen('results');
  };

  const handleRestart = () => {
    setScreen('start');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSessionId('');
    setResults([]);
    setUserName('');

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
    return <StartScreen onStart={handleStart} onAdminLogin={() => setScreen('admin')} />;
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
    return <ResultsScreen results={results} onRestart={handleRestart} userName={userName} />;
  }

  if (screen === 'admin') {
    return <AdminDashboard onBack={() => setScreen('start')} />;
  }

  return null;
}

export default App;
