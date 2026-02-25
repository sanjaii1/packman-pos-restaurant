import { useState } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, SERVERS, TABLES } from '../../../data/posData';

interface PosLeftSidebarProps {
    activeCategory: string;
    setActiveCategory: (id: string) => void;
}

export default function PosLeftSidebar({ activeCategory, setActiveCategory }: PosLeftSidebarProps) {
    const navigate = useNavigate();
    const [isServerDropdownOpen, setIsServerDropdownOpen] = useState(false);
    const [isTableDropdownOpen, setIsTableDropdownOpen] = useState(false);
    const [selectedServer, setSelectedServer] = useState(SERVERS[0]);
    const [selectedTable, setSelectedTable] = useState('T-12');

    return (
        <aside className="w-[280px] bg-white border-r border-gray-100 hidden md:flex flex-col z-10 flex-shrink-0">

            <div className="relative p-8 pb-4">
                <div className="flex items-center gap-4 w-full text-left p-2 -m-2">
                    <button
                        onClick={() => { setIsServerDropdownOpen(!isServerDropdownOpen); setIsTableDropdownOpen(false); }}
                        className="flex-shrink-0 relative group outline-none"
                    >
                        <img
                            src={selectedServer.avatar}
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover shadow-sm bg-gray-100 p-0.5 border border-gray-100 group-hover:border-gray-300 transition-colors"
                        />
                    </button>
                    <div className="flex-1 min-w-0">
                        <button
                            onClick={() => { setIsServerDropdownOpen(!isServerDropdownOpen); setIsTableDropdownOpen(false); }}
                            className="flex items-center gap-2 group w-full outline-none cursor-pointer"
                        >
                            <h3 className="font-bold text-[16px] leading-tight text-gray-900 truncate group-hover:text-[#ea580c] transition-colors">{selectedServer.name}</h3>
                            <ChevronDown size={14} className={`text-gray-400 transition-transform ${isServerDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <div className="flex items-center text-[13px] mt-0.5">
                            <span className="text-gray-400 font-medium">{selectedServer.role} &bull;</span>
                            <button
                                onClick={() => { setIsTableDropdownOpen(!isTableDropdownOpen); setIsServerDropdownOpen(false); }}
                                className="ml-1 flex items-center gap-1 text-[#ea580c] font-bold hover:bg-[#fff1e7] px-1.5 py-0.5 rounded-md transition-colors -my-0.5 outline-none cursor-pointer"
                            >
                                {selectedTable}
                                <ChevronDown size={12} className={`transition-transform ${isTableDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {isServerDropdownOpen && (
                    <div className="absolute top-full left-8 right-8 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20">
                        {SERVERS.map((server) => (
                            <button
                                key={server.id}
                                onClick={() => {
                                    setSelectedServer(server);
                                    setIsServerDropdownOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors outline-none cursor-pointer ${selectedServer.id === server.id ? 'bg-[#fff1e7]' : ''
                                    }`}
                            >
                                <img
                                    src={server.avatar}
                                    alt={server.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="text-left flex-1">
                                    <p className={`text-sm font-semibold ${selectedServer.id === server.id ? 'text-[#ea580c]' : 'text-gray-900'}`}>
                                        {server.name}
                                    </p>
                                    <p className="text-xs text-gray-500">{server.role}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {isTableDropdownOpen && (
                    <div className="absolute top-full left-8 right-8 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20 max-h-48 overflow-y-auto">
                        <div className="grid grid-cols-3 gap-1 p-2">
                            {TABLES.map((table) => (
                                <button
                                    key={table}
                                    onClick={() => {
                                        setSelectedTable(table);
                                        setIsTableDropdownOpen(false);
                                    }}
                                    className={`py-2 px-1 text-sm font-semibold rounded-lg transition-colors outline-none cursor-pointer ${selectedTable === table
                                        ? 'bg-[#ea580c] text-white'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {table}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="px-6 py-6 flex flex-col gap-2 flex-1">
                <h4 className="text-[12px] font-bold text-gray-400 tracking-widest uppercase mb-3 pl-2">Menu</h4>
                {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 cursor-pointer ${isActive
                                ? 'bg-[#fff1e7] text-[#ea580c] font-bold'
                                : 'text-gray-500 hover:bg-gray-50 font-medium hover:text-gray-700'
                                }`}
                        >
                            <cat.icon size={20} className={isActive ? "text-[#ea580c]" : "text-gray-400"} />
                            <span className="text-[15px]">{cat.name}</span>
                        </button>
                    );
                })}
            </div>

            <div className="p-6">
                <button
                    onClick={() => navigate('/login')}
                    className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold rounded-2xl transition-colors border border-gray-100 cursor-pointer"
                >
                    <LogOut size={18} className="text-gray-600" />
                    <span className="text-[15px]">Log Out</span>
                </button>
            </div>
        </aside>
    );
}
