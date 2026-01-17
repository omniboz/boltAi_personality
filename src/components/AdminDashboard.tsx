import { useState, useEffect } from 'react';
import { ArrowLeft, Download, Trash2, Search, X, Users, CheckCircle, Clock, TrendingUp, Eye, FileText } from 'lucide-react';
import { supabaseDb } from '../lib/supabaseDb';
import { TestSession, TestResponse, Question } from '../lib/supabase';

interface AdminDashboardProps {
    onBack: () => void;
}

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
    const [sessions, setSessions] = useState<TestSession[]>([]);
    const [responses, setResponses] = useState<TestResponse[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSession, setSelectedSession] = useState<TestSession | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'in-progress'>('all');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const sessionData = await supabaseDb.getSessions();
        const responseData = await supabaseDb.getResponses();
        const { data: questionsData } = await supabaseDb.getQuestions();

        const sorted = sessionData.sort((a, b) =>
            new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
        );
        setSessions(sorted);
        setResponses(responseData);
        if (questionsData) {
            setQuestions(questionsData);
        }
    };

    const handleExport = async () => {
        const currentSessions = sessions;
        const currentResponses = responses;
        const headers = ['Name', 'Token', 'Date', 'Status', 'Source', 'Results', 'Description', 'Answers'];

        const csvRows = currentSessions.map(session => {
            const date = new Date(session.started_at).toLocaleString('my-MM');
            const status = session.completed_at ? 'Completed' : 'In Progress';
            const source = session.id.startsWith('local-') ? 'Offline' : 'Online';

            let resultsStr = '';
            let descriptionStr = '';

            if (session.results && Array.isArray(session.results)) {
                resultsStr = session.results.map((r: any) => `${r.category}: ${r.score}/${r.maxScore}`).join('; ');
                if (session.results.length > 0) {
                    descriptionStr = (session.results[0] as any).description || '';
                }
            }

            const sessionResponses = currentResponses.filter(r => r.session_id === session.id);
            const answersStr = sessionResponses
                .sort((a, b) => a.question_id.localeCompare(b.question_id))
                .map(r => `${r.question_id}: ${r.answer_value}`)
                .join('; ');

            const row = [
                `"${session.user_name || 'Unknown'}"`,
                `"${session.session_token}"`,
                `"${date}"`,
                `"${status}"`,
                `"${source}"`,
                `"${resultsStr}"`,
                `"${descriptionStr.replace(/"/g, '""')}"`,
                `"${answersStr}"`
            ];
            return row.join(',');
        });

        const csvContent = [headers.join(','), ...csvRows].join('\n');
        downloadCsv(csvContent, `personality-test-data-${Date.now()}.csv`);
    };

    const handleExportUser = (session: TestSession) => {
        const headers = ['Question ID', 'Question Text', 'Answer'];
        const sessionResponses = responses.filter(r => r.session_id === session.id);

        const rows = sessionResponses.map(r => {
            const question = questions.find(q => q.id === r.question_id);
            return [
                `"${r.question_id}"`,
                `"${question ? question.question_text.replace(/"/g, '""') : 'Unknown'}"`,
                `"${r.answer_value}"`
            ].join(',');
        });

        const summary = [
            `Name, "${session.user_name || 'Unknown'}"`,
            `Token, "${session.session_token}"`,
            `Date, "${new Date(session.started_at).toLocaleString()}"`,
            `Result, "${session.results && Array.isArray(session.results) ? session.results[0]?.category : ''}"`,
            ''
        ];

        const csvContent = [...summary, headers.join(','), ...rows].join('\n');
        downloadCsv(csvContent, `${session.user_name || 'user'}-${session.session_token}.csv`);
    };

    const downloadCsv = (content: string, filename: string) => {
        const blob = new Blob([`\uFEFF${content}`], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleDelete = () => {
        if (confirm('မှတ်တမ်းအားလုံးကို ဖျက်မည်မှာ သေချာပါသလား? (Offline Data များအားလုံး ပျက်သွားပါမည်)')) {
            localStorage.removeItem('offline_sessions');
            localStorage.removeItem('offline_responses');
            loadData();
            alert('Offline မှတ်တမ်းများအားလုံး ဖျက်ပြီးပါပြီ');
        }
    };

    const filteredSessions = sessions.filter(session => {
        const matchesSearch = session.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            session.session_token.includes(searchTerm);

        const matchesFilter = filterStatus === 'all' ||
            (filterStatus === 'completed' && session.completed_at) ||
            (filterStatus === 'in-progress' && !session.completed_at);

        return matchesSearch && matchesFilter;
    });

    // Calculate statistics
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.completed_at).length;
    const completionRate = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;
    const todaySessions = sessions.filter(s => {
        const today = new Date();
        const sessionDate = new Date(s.started_at);
        return sessionDate.toDateString() === today.toDateString();
    }).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onBack}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <ArrowLeft className="w-6 h-6 text-gray-600" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Admin Dashboard
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">အသုံးပြုသူများ စာရင်း</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                <Download className="w-4 h-4" />
                                <span className="hidden md:inline">Export All</span>
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">စုစုပေါင်း</p>
                                <p className="text-3xl font-bold text-gray-900">{totalSessions}</p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">ပြီးစီးပြီး</p>
                                <p className="text-3xl font-bold text-gray-900">{completedSessions}</p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">ပြီးစီးမှု %</p>
                                <p className="text-3xl font-bold text-gray-900">{completionRate}%</p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">ယနေ့</p>
                                <p className="text-3xl font-bold text-gray-900">{todaySessions}</p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
                                <Clock className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="အမည် ရှာရန်..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilterStatus('all')}
                                className={`px-4 py-3 rounded-xl transition-all ${filterStatus === 'all'
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                အားလုံး
                            </button>
                            <button
                                onClick={() => setFilterStatus('completed')}
                                className={`px-4 py-3 rounded-xl transition-all ${filterStatus === 'completed'
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                ပြီးစီး
                            </button>
                            <button
                                onClick={() => setFilterStatus('in-progress')}
                                className={`px-4 py-3 rounded-xl transition-all ${filterStatus === 'in-progress'
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                ဖြေဆိုဆဲ
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sessions Grid */}
                {filteredSessions.length === 0 ? (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-200/50 shadow-lg text-center">
                        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">မှတ်တမ်းမရှိသေးပါ</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSessions.map((session) => (
                            <div
                                key={session.id}
                                onClick={() => setSelectedSession(session)}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all cursor-pointer group hover:-translate-y-1"
                            >
                                {/* User Info */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            {(session.user_name || 'U')[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                {session.user_name || 'အမည်မသိ'}
                                            </h3>
                                            <p className="text-xs text-gray-500 font-mono">
                                                {session.session_token.substring(0, 8)}...
                                            </p>
                                        </div>
                                    </div>
                                    <Eye className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                                </div>

                                {/* Date and Status */}
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-sm text-gray-600">
                                        {new Date(session.started_at).toLocaleDateString('my-MM')}
                                    </p>
                                    <div className="flex gap-2">
                                        {session.id.startsWith('local-') ? (
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                                Offline
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                Online
                                            </span>
                                        )}
                                        {session.completed_at ? (
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                ပြီးဆုံး
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                                                ဖြေဆိုဆဲ
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Results Preview */}
                                {session.results && Array.isArray(session.results) && session.results.length > 0 && (
                                    <div className="border-t border-gray-100 pt-4">
                                        <p className="text-xs text-gray-500 mb-2">ရလဒ် အကျဉ်း</p>
                                        <div className="space-y-1">
                                            {session.results.slice(0, 2).map((r: any, i: number) => (
                                                <div key={i} className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-600">{r.category}</span>
                                                    <span className="font-medium text-gray-900">{r.score}/{r.maxScore}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedSession && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                                        {(selectedSession.user_name || 'U')[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {selectedSession.user_name || 'အမည်မသိ'}
                                        </h2>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {selectedSession.session_token} • {new Date(selectedSession.started_at).toLocaleString('my-MM')}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedSession(null)}
                                    className="p-2 hover:bg-white rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {/* Results Summary */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                                    ရလဒ် အကျဉ်းချုပ်
                                </h3>
                                {selectedSession.results && Array.isArray(selectedSession.results) ? (
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {selectedSession.results.map((r: any, i: number) => (
                                            <div key={i} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-bold text-gray-900">{r.category}</span>
                                                    <span className="text-sm font-medium bg-white px-3 py-1 rounded-full text-indigo-600">
                                                        {r.score}/{r.maxScore}
                                                    </span>
                                                </div>
                                                {i === 0 && r.description && (
                                                    <p className="text-sm text-gray-600 mt-2">{r.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">ရလဒ် မရှိသေးပါ</p>
                                )}
                            </div>

                            {/* Detailed Answers */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-indigo-600" />
                                    ဖြေဆိုခဲ့သော အဖြေများ
                                </h3>
                                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                                    <div className="max-h-96 overflow-y-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                                                <tr>
                                                    <th className="px-4 py-3 font-medium text-gray-700 w-16">စဉ်</th>
                                                    <th className="px-4 py-3 font-medium text-gray-700">မေးခွန်း</th>
                                                    <th className="px-4 py-3 font-medium text-gray-700 w-24 text-center">အဖြေ</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {responses
                                                    .filter(r => r.session_id === selectedSession.id)
                                                    .sort((a, b) => a.question_id.localeCompare(b.question_id))
                                                    .map((r, index) => {
                                                        const question = questions.find(q => q.id === r.question_id);
                                                        return (
                                                            <tr key={r.id} className="hover:bg-gray-50">
                                                                <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                                                                <td className="px-4 py-3 text-gray-900">
                                                                    {question ? question.question_text : r.question_id}
                                                                </td>
                                                                <td className="px-4 py-3 text-center">
                                                                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-medium ${r.answer_value >= 4 ? 'bg-green-100 text-green-800' :
                                                                            r.answer_value <= 2 ? 'bg-red-100 text-red-800' :
                                                                                'bg-gray-100 text-gray-800'
                                                                        }`}>
                                                                        {r.answer_value}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                            <button
                                onClick={() => handleExportUser(selectedSession)}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl"
                            >
                                <Download className="w-4 h-4" />
                                Export
                            </button>
                            <button
                                onClick={() => setSelectedSession(null)}
                                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
