import { useState, useEffect } from 'react';
import { ArrowLeft, Download, Trash2, Search, X } from 'lucide-react';
import { supabaseDb } from '../lib/supabaseDb';
import { TestSession, TestResponse } from '../lib/supabase';
import questionsData from '../../questions.json';

interface AdminDashboardProps {
    onBack: () => void;
}

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
    const [sessions, setSessions] = useState<TestSession[]>([]);
    const [responses, setResponses] = useState<TestResponse[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSession, setSelectedSession] = useState<TestSession | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const sessionData = await supabaseDb.getSessions();
        const responseData = await supabaseDb.getResponses();

        // Sort by date desc
        const sorted = sessionData.sort((a, b) =>
            new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
        );
        setSessions(sorted);
        setResponses(responseData);
    };

    const handleExport = async () => {
        // Reuse existing logic but ensure we have latest data
        const currentSessions = sessions;
        const currentResponses = responses;

        // Define CSV headers
        const headers = ['Name', 'Token', 'Date', 'Status', 'Source', 'Results', 'Description', 'Answers'];

        // Convert data to CSV rows
        const csvRows = currentSessions.map(session => {
            const date = new Date(session.started_at).toLocaleString('my-MM');
            const status = session.completed_at ? 'Completed' : 'In Progress';
            const source = session.id.startsWith('local-') ? 'Offline' : 'Online';

            // Format results
            let resultsStr = '';
            let descriptionStr = '';

            if (session.results && Array.isArray(session.results)) {
                resultsStr = session.results.map((r: any) => `${r.category}: ${r.score}/${r.maxScore}`).join('; ');
                if (session.results.length > 0) {
                    descriptionStr = (session.results[0] as any).description || '';
                }
            }

            // Format answers
            const sessionResponses = currentResponses.filter(r => r.session_id === session.id);
            const answersStr = sessionResponses
                .sort((a, b) => a.question_id.localeCompare(b.question_id))
                .map(r => `${r.question_id}: ${r.answer_value}`)
                .join('; ');

            // Escape quotes and handle commas in data
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
            const question = questionsData.find((q: any) => q.id === r.question_id);
            return [
                `"${r.question_id}"`,
                `"${question ? question.question_text.replace(/"/g, '""') : 'Unknown'}"`,
                `"${r.answer_value}"`
            ].join(',');
        });

        // Add summary at the top
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
                            <span className="hidden md:inline">Export All</span>
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
                                    <th className="px-6 py-4 font-semibold text-gray-700">သိမ်းဆည်းမှု</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">အခြေအနေ</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">ရလဒ်အကျဉ်း</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredSessions.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            မှတ်တမ်းမရှိသေးပါ
                                        </td>
                                    </tr>
                                ) : (
                                    filteredSessions.map((session) => (
                                        <tr
                                            key={session.id}
                                            className="hover:bg-gray-50 transition-colors cursor-pointer"
                                            onClick={() => setSelectedSession(session)}
                                        >
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
                                                {session.id.startsWith('local-') ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        Offline
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        Online
                                                    </span>
                                                )}
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

            {/* Detail Modal */}
            {selectedSession && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {selectedSession.user_name || 'အမည်မသိ'}
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    {selectedSession.session_token} • {new Date(selectedSession.started_at).toLocaleString('my-MM')}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedSession(null)}
                                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {/* Results Summary */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4">ရလဒ် အကျဉ်းချုပ်</h3>
                                {selectedSession.results && Array.isArray(selectedSession.results) ? (
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {selectedSession.results.map((r: any, i: number) => (
                                            <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-bold text-gray-900">{r.category}</span>
                                                    <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
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
                                <h3 className="text-lg font-semibold mb-4">ဖြေဆိုခဲ့သော အဖြေများ</h3>
                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-50 border-b border-gray-200">
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
                                                    const question = questionsData.find((q: any) => q.id === r.question_id);
                                                    return (
                                                        <tr key={r.id} className="hover:bg-gray-50">
                                                            <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                                                            <td className="px-4 py-3 text-gray-900">
                                                                {question ? question.question_text : r.question_id}
                                                            </td>
                                                            <td className="px-4 py-3 text-center font-medium">
                                                                <span className={`inline-block w-8 h-8 leading-8 rounded-full ${r.answer_value >= 4 ? 'bg-green-100 text-green-800' :
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

                        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                            <button
                                onClick={() => handleExportUser(selectedSession)}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                Export This User
                            </button>
                            <button
                                onClick={() => setSelectedSession(null)}
                                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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
