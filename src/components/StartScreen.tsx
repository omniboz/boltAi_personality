import { useState } from 'react';
import { User, CheckCircle, Clock, Target, Sparkles } from 'lucide-react';
import brainIcon from '../assets/brain-icon.png';

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
    <div className="h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-amber-900 relative overflow-hidden flex items-center justify-center">
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-amber-400 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-96 h-96 bg-pink-400 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Admin Button */}
      <button
        onClick={handleExportClick}
        className="absolute top-6 right-6 p-3 bg-amber-500/30 backdrop-blur-md hover:bg-amber-500/40 rounded-full transition-all text-amber-100 hover:scale-110 shadow-lg z-10 border border-amber-400/30"
        title="Admin Access"
      >
        <User className="w-6 h-6" />
      </button>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-900 to-amber-900 rounded-3xl p-8 w-full max-w-md shadow-2xl transform transition-all border border-amber-400/30">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent mb-6">
              Admin Access
            </h3>
            <input
              type="password"
              className="w-full px-4 py-3 bg-purple-800/50 border-2 border-amber-400/30 text-amber-100 placeholder-amber-300/50 rounded-xl mb-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:outline-none transition-all"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && verifyPasswordAndLogin()}
              autoFocus
            />
            {passwordError && <p className="text-red-300 text-sm mb-4">{passwordError}</p>}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-6 py-2.5 text-amber-200 hover:bg-purple-800/50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={verifyPasswordAndLogin}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-purple-900 font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 shadow-lg hover:shadow-xl transition-all"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative w-full max-w-5xl px-4">
        <div className="bg-purple-900/40 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 md:p-8 border border-amber-400/20">
          <div className="flex flex-col items-center text-center">
            {/* Custom Brain Icon */}
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-purple-400 rounded-full blur-2xl opacity-60 animate-pulse"></div>
              <div className="relative">
                <img
                  src={brainIcon}
                  alt="Brain Icon"
                  className="w-24 h-24 md:w-32 md:h-32 drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Title - Single Line */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-300 via-amber-200 to-amber-100 bg-clip-text text-transparent mb-3 drop-shadow-lg whitespace-nowrap py-2" style={{ lineHeight: '1.4' }}>
              ကိုယ်ရည်ကိုယ်သွေး စစ်ဆေးမှု
            </h1>

            <p className="text-base md:text-lg text-amber-100/90 mb-6 leading-relaxed max-w-2xl drop-shadow">
              သင့်ရဲ့ကိုယ်ရည်ကိုယ်သွေးကို စစ်ဆေးပါမယ်။ မေးခွန်း ၅၀ ခု • အချိန် ၁၀ မိနစ်ခန့်
            </p>

            {/* Name Input */}
            <div className="w-full max-w-md mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-amber-300" />
                </div>
                <input
                  type="text"
                  id="name"
                  className={`block w-full pl-12 pr-4 py-3 bg-purple-800/40 backdrop-blur-md border-2 ${error ? 'border-red-400' : 'border-amber-400/30'
                    } text-amber-100 placeholder-amber-300/60 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all`}
                  placeholder="သင့်နာမည် ရိုက်ထည့်ပါ"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError('');
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                  autoFocus
                />
              </div>
              {error && <p className="mt-2 text-sm text-red-300 text-left drop-shadow">{error}</p>}
            </div>

            {/* Instructions Grid - Compact */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 w-full max-w-4xl">
              <div className="bg-purple-800/30 backdrop-blur-md rounded-xl p-3 border border-amber-400/20 hover:bg-purple-800/40 transition-all">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-amber-500/30 rounded-lg p-2">
                    <CheckCircle className="w-5 h-5 text-amber-200" />
                  </div>
                  <p className="text-xs text-amber-100/90 font-medium">သေချာစွာ ဖတ်ပါ</p>
                </div>
              </div>

              <div className="bg-purple-800/30 backdrop-blur-md rounded-xl p-3 border border-amber-400/20 hover:bg-purple-800/40 transition-all">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-amber-500/30 rounded-lg p-2">
                    <Sparkles className="w-5 h-5 text-amber-200" />
                  </div>
                  <p className="text-xs text-amber-100/90 font-medium">ရိုးသားစွာ ဖြေပါ</p>
                </div>
              </div>

              <div className="bg-purple-800/30 backdrop-blur-md rounded-xl p-3 border border-amber-400/20 hover:bg-purple-800/40 transition-all">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-amber-500/30 rounded-lg p-2">
                    <Target className="w-5 h-5 text-amber-200" />
                  </div>
                  <p className="text-xs text-amber-100/90 font-medium">ကျော်မသွားပါနဲ့</p>
                </div>
              </div>

              <div className="bg-purple-800/30 backdrop-blur-md rounded-xl p-3 border border-amber-400/20 hover:bg-purple-800/40 transition-all">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-amber-500/30 rounded-lg p-2">
                    <Clock className="w-5 h-5 text-amber-200" />
                  </div>
                  <p className="text-xs text-amber-100/90 font-medium">ပထမဆုံး ခံစားချက်</p>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStart}
              disabled={!name.trim()}
              className={`
                px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl
                ${name.trim()
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-purple-900 hover:from-amber-400 hover:to-amber-500 hover:scale-105 hover:shadow-3xl cursor-pointer'
                  : 'bg-purple-800/30 text-amber-300/50 cursor-not-allowed border border-amber-400/20'
                }
              `}
            >
              စတင်မည်
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
