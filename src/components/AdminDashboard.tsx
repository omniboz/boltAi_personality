import { useState, useEffect } from 'react';
import { ArrowLeft, Download, Trash2, Search } from 'lucide-react';
import { supabaseDb } from '../lib/supabaseDb';
import { TestSession } from '../lib/supabase';

interface AdminDashboardProps {
    onBack: () => void;
}

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
    const [sessions, setSessions] = useState<TestSession[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await supabaseDb.getSessions();
        // Sort by date desc
        const sorted = data.sort((a, b) =>
            new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
        );
        setSessions(sorted);
    };

    const handleExport = async () => {
        const sessions = await supabaseDb.getSessions();
        const responses = await supabaseDb.getResponses();

        const data = {
            sessions,
            responses,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `personality-test-data-${Date.now()}.json`;
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

    const filteredSessions = sessions.filter(session =>
        session.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.session_token.includes(searchTerm)
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6 text-gray-600" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">အသုံးပြုသူများ စာရင်း</h1>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="အမည် ရှာရန်..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            <span className="hidden md:inline">Export</span>
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-700">အမည်</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">နေ့စွဲ</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">အခြေအနေ</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">ရလဒ်အကျဉ်း</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredSessions.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                            မှတ်တမ်းမရှိသေးပါ
                                        </td>
                                    </tr>
                                ) : (
                                    filteredSessions.map((session) => (
                                        <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">
                                                    {session.user_name || 'အမည်မသိ'}
                                                </div>
                                                <div className="text-xs text-gray-500 font-mono mt-1">
                                                    {session.session_token}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {new Date(session.started_at).toLocaleString('my-MM')}
                                            </td>
                                            <td className="px-6 py-4">
                                                {session.completed_at ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        ပြီးဆုံး
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                        ဖြေဆိုဆဲ
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {session.results && Array.isArray(session.results) ? (
                                                    <div className="text-sm text-gray-600">
                                                        {/* Show top result or summary */}
                                                        {session.results.slice(0, 2).map((r: any, i: number) => (
                                                            <div key={i} className="mb-1">
                                                                <span className="font-medium">{r.category}:</span> {r.score}/{r.maxScore}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
