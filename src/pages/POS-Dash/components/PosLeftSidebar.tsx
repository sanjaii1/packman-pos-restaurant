import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../../data/posData';

interface PosLeftSidebarProps {
    activeCategory: string;
    setActiveCategory: (id: string) => void;
}

export default function PosLeftSidebar({ activeCategory, setActiveCategory }: PosLeftSidebarProps) {
    const navigate = useNavigate();

    return (
        <aside className="w-[280px] bg-white border-r border-gray-100 hidden md:flex flex-col z-10 flex-shrink-0">
            {/* User Profile Info */}
            <div className="p-8 pb-4 flex items-center gap-4">
                <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover shadow-sm bg-gray-100 p-0.5 border border-gray-100"
                />
                <div>
                    <h3 className="font-bold text-[16px] leading-tight text-gray-900">Sarah J.</h3>
                    <p className="text-[13px] text-gray-400 font-medium">Server &bull; T-12</p>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="px-6 py-6 flex flex-col gap-2 flex-1">
                <h4 className="text-[12px] font-bold text-gray-400 tracking-widest uppercase mb-3 pl-2">Menu</h4>
                {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 ${isActive
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

            {/* Logout Button */}
            <div className="p-6">
                <button
                    onClick={() => navigate('/login')}
                    className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold rounded-2xl transition-colors border border-gray-100"
                >
                    <LogOut size={18} className="text-gray-600" />
                    <span className="text-[15px]">Log Out</span>
                </button>
            </div>
        </aside>
    );
}
