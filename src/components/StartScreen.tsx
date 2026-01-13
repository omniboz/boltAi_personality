import { useState } from 'react';
import { Brain, User } from 'lucide-react';


interface StartScreenProps {
  onStart: (name: string) => void;
  onAdminLogin: () => void;
}

export default function StartScreen({ onStart, onAdminLogin }: StartScreenProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleStart = () => {
    if (!name.trim()) {
      setError('ကျေးဇူးပြု၍ နာမည်ထည့်သွင်းပါ');
      return;
    }
    onStart(name);
  };

  const handleExportClick = () => {
    setShowPasswordModal(true);
    setPassword('');
    setPasswordError('');
  };

  const verifyPasswordAndLogin = () => {
    if (password === 'admin123') {
      onAdminLogin();
      setShowPasswordModal(false);
    } else {
      setPasswordError('စကားဝှက်မှားယွင်းနေပါသည်');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 relative">
      <button
        onClick={handleExportClick}
        className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-gray-600 hover:text-blue-600"
        title="Admin Access"
      >
        <User className="w-6 h-6" />
      </button>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Admin Access</h3>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && verifyPasswordAndLogin()}
              autoFocus
            />
            {passwordError && <p className="text-red-600 text-sm mb-4">{passwordError}</p>}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={verifyPasswordAndLogin}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

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

          <div className="w-full max-w-md mb-8">
            <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700 mb-2">
              သင့်နာမည်
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                className={`block w-full pl-10 pr-3 py-3 border ${error ? 'border-red-300 ring-red-200' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  } rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-colors`}
                placeholder="သင့်နာမည် ရိုက်ထည့်ပါ"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              />
            </div>
            {error && <p className="mt-2 text-sm text-red-600 text-left">{error}</p>}
          </div>

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
            onClick={handleStart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full md:w-auto"
          >
            စတင်မည်
          </button>
        </div>
      </div>
    </div>
  );
}
