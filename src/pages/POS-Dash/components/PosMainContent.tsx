import { Search, SlidersHorizontal, IndianRupee, Check } from 'lucide-react';
import { PRODUCTS } from '../../../data/posData';
import { useState, useRef, useEffect } from 'react';

interface CategoryData {
    id: string;
    name: string;
    icon: any;
}

interface PosMainContentProps {
    activeCategory: string;
    activeCatData: CategoryData | undefined;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredProducts: typeof PRODUCTS;
    addToCart: (product: typeof PRODUCTS[0]) => void;
}

export default function PosMainContent({
    activeCategory,
    activeCatData,
    searchQuery,
    setSearchQuery,
    filteredProducts,
    addToCart
}: PosMainContentProps) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState('default');
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
        <main className="flex-1 flex flex-col min-w-0 bg-[#f8f9fa]">
            <header className="px-6 py-4 flex items-center justify-between border-b border-gray-100/50 bg-[#f8f9fa]/80 backdrop-blur-md sticky top-0 z-10 hidden md:flex">
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

            <div className="flex-1 overflow-y-auto p-8 pt-6 no-scrollbar">
                <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
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
