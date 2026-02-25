import { Search, SlidersHorizontal, IndianRupee, Check, Bell, ChevronDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../../../data/posData';
import { useState, useRef, useEffect } from 'react';

const SERVERS = [
    { id: 1, name: 'Sarah J.', role: 'Server', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
    { id: 2, name: 'Michael T.', role: 'Server', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
    { id: 3, name: 'Emma W.', role: 'Server', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
];

const TABLES = ['T-01', 'T-02', 'T-03', 'T-04', 'T-05', 'T-06', 'T-07', 'T-08', 'T-09', 'T-10', 'T-11', 'T-12'];

interface CategoryData {
    id: string;
    name: string;
    icon: any;
}

interface PosMainContentProps {
    activeCategory: string;
    setActiveCategory: (id: string) => void;
    activeCatData: CategoryData | undefined;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredProducts: typeof PRODUCTS;
    addToCart: (product: typeof PRODUCTS[0]) => void;
}

export default function PosMainContent({
    activeCategory,
    setActiveCategory,
    activeCatData,
    searchQuery,
    setSearchQuery,
    filteredProducts,
    addToCart
}: PosMainContentProps) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState('default');
    const [isServerDropdownOpen, setIsServerDropdownOpen] = useState(false);
    const [isTableDropdownOpen, setIsTableDropdownOpen] = useState(false);
    const [selectedServer, setSelectedServer] = useState(SERVERS[0]);
    const [selectedTable, setSelectedTable] = useState('Table 12');
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const sortOptions = [
        { id: 'default', label: 'Recommended' },
        { id: 'price-asc', label: 'Price: Low to High' },
        { id: 'price-desc', label: 'Price: High to Low' },
        { id: 'name-asc', label: 'Name: A to Z' },
        { id: 'name-desc', label: 'Name: Z to A' },
    ];

    const displayProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            case 'name-asc': return a.name.localeCompare(b.name);
            case 'name-desc': return b.name.localeCompare(a.name);
            default: return 0;
        }
    });

    return (
        <main className="flex-1 flex flex-col min-w-0 bg-[#f8f9fa] h-full relative">
            <header className="px-6 py-4 items-center justify-between border-b border-gray-100/50 bg-[#f8f9fa]/80 backdrop-blur-md sticky top-0 z-10 hidden md:flex">
                <div>
                    <h1 className="text-[24px] font-extrabold text-gray-900 tracking-tight leading-none mb-1">{activeCategory === 'all' ? 'All Items' : activeCatData?.name}</h1>
                    <p className="text-[13px] text-[#b08968] font-semibold">Discover {filteredProducts.length} delicious dishes</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative w-[280px]">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search menu..."
                            className="w-full pl-9 pr-4 py-2.5 bg-white border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] text-[14px] placeholder:text-gray-400 transition-all font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="relative" ref={filterRef}>
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`h-[44px] w-[44px] rounded-xl flex items-center justify-center transition-colors shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] ${isFilterOpen ? 'bg-gray-100 text-gray-900 border border-gray-200' : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent'}`}
                        >
                            <SlidersHorizontal size={18} />
                        </button>

                        {isFilterOpen && (
                            <div className="absolute right-0 top-[52px] w-[200px] bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                    <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Sort by</p>
                                </div>
                                {sortOptions.map(option => (
                                    <button
                                        key={option.id}
                                        onClick={() => { setSortBy(option.id); setIsFilterOpen(false); }}
                                        className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#f97316] flex items-center justify-between transition-colors"
                                    >
                                        {option.label}
                                        {sortBy === option.id && <Check size={14} className="text-[#f97316]" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile Header */}
            <header className="md:hidden px-4 pt-4 pb-2 bg-white rounded-b-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] z-10 sticky top-0 flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <div className="relative z-30">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => { setIsServerDropdownOpen(!isServerDropdownOpen); setIsTableDropdownOpen(false); }}
                                className="flex-shrink-0 relative group outline-none"
                            >
                                <img src={selectedServer.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover shadow-sm bg-gray-50 border border-gray-100 group-hover:border-gray-300 transition-colors" />
                            </button>
                            <div className="flex-1 min-w-0">
                                <button
                                    onClick={() => { setIsServerDropdownOpen(!isServerDropdownOpen); setIsTableDropdownOpen(false); }}
                                    className="flex items-center gap-1 group w-full max-w-[150px] outline-none"
                                >
                                    <h3 className="font-bold text-[15px] text-gray-900 leading-tight truncate group-hover:text-[#ea580c] transition-colors">{selectedServer.name}</h3>
                                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${isServerDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <div className="flex items-center text-[12px] mt-0.5">
                                    <button
                                        onClick={() => { setIsTableDropdownOpen(!isTableDropdownOpen); setIsServerDropdownOpen(false); }}
                                        className="flex items-center gap-1 text-[#ea580c] font-bold hover:bg-[#fff1e7] pr-1 py-0.5 rounded-md transition-colors -my-0.5 outline-none tracking-wide"
                                    >
                                        {selectedTable}
                                        <ChevronDown size={12} className={`transition-transform ${isTableDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Server Dropdown */}
                        {isServerDropdownOpen && (
                            <div className="absolute top-full left-0 w-[220px] mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20">
                                {SERVERS.map((server) => (
                                    <button
                                        key={server.id}
                                        onClick={() => {
                                            setSelectedServer(server);
                                            setIsServerDropdownOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors outline-none ${selectedServer.id === server.id ? 'bg-[#fff1e7]' : ''
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

                        {/* Table Dropdown */}
                        {isTableDropdownOpen && (
                            <div className="absolute top-full left-0 w-[240px] mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20 max-h-48 overflow-y-auto">
                                <div className="grid grid-cols-3 gap-1 p-2">
                                    {TABLES.map((table) => (
                                        <button
                                            key={table}
                                            onClick={() => {
                                                setSelectedTable(`Table ${table.slice(2)}`);
                                                setIsTableDropdownOpen(false);
                                            }}
                                            className={`py-2 px-1 text-sm font-semibold rounded-lg transition-colors outline-none ${selectedTable === `Table ${table.slice(2)}`
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
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 relative">
                        <Bell size={18} className="text-gray-600" />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                </div>

                <div className="mb-4">
                    <h1 className="text-[22px] font-extrabold text-gray-900 tracking-tight mb-1">{activeCategory === 'all' ? 'All Items' : activeCatData?.name}</h1>
                    <p className="text-[13px] text-[#b08968] font-medium">Discover {filteredProducts.length} delicious dishes</p>
                </div>

                <div className="flex items-center gap-3 mb-4">
                    <div className="relative flex-1 bg-[#f8f9fa] rounded-xl flex items-center p-1 border border-transparent focus-within:border-[#f97316]/30 focus-within:ring-2 focus-within:ring-[#f97316]/20 transition-all">
                        <div className="pl-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search menu..."
                            className="w-full pl-2 pr-4 py-2.5 bg-transparent border-0 focus:outline-none text-[14px] placeholder:text-gray-400 font-medium text-gray-900"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="h-[44px] w-[44px] bg-[#fff1e7] text-[#ea580c] rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 transition-transform active:scale-95"
                    >
                        <SlidersHorizontal size={18} strokeWidth={2.5} />
                    </button>
                </div>

                <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
                    {CATEGORIES.map(cat => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all border ${isActive ? 'bg-[#f97316] border-[#f97316] text-white font-bold shadow-[0_4px_12px_-4px_rgba(249,115,22,0.4)]' : 'bg-white border-gray-100 text-gray-600 font-semibold shadow-sm hover:bg-gray-50'}`}
                            >
                                <cat.icon size={16} className={isActive ? "text-white" : "text-gray-400"} />
                                <span className="text-[13.5px]">{cat.name}</span>
                            </button>
                        )
                    })}
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-4 md:pt-6 no-scrollbar pb-[100px] lg:pb-8">
                <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
                    {displayProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => addToCart(product)}
                            className="bg-white rounded-[18px] p-2 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group flex flex-col border border-gray-50 hover:-translate-y-1"
                        >
                            <div className="aspect-[4/3] rounded-[18px] overflow-hidden mb-5 relative bg-gray-50">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-full shadow-sm text-[10px] font-black text-gray-900 tracking-tight flex items-center gap-0.5">
                                    <IndianRupee size={10} />{product.price.toFixed(2)}
                                </div>
                            </div>
                            <div className="px-1 flex-1 flex flex-col">
                                <h3 className="font-bold text-[14px] text-gray-900 leading-tight mb-1.5">{product.name}</h3>
                                <p className="text-[13px] text-gray-400 font-medium leading-relaxed truncate">{product.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
