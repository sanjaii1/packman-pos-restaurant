import { Search, SlidersHorizontal, IndianRupee } from 'lucide-react';
import { PRODUCTS } from '../../../data/posData';

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
    return (
        <main className="flex-1 flex flex-col min-w-0 bg-[#f8f9fa]">
            <header className="px-8 py-8 flex items-start justify-between border-b border-gray-100/50 bg-[#f8f9fa]/80 backdrop-blur-md sticky top-0 z-10 hidden md:flex">
                <div className="pt-2">
                    <h1 className="text-[32px] font-extrabold text-gray-900 tracking-tight leading-none mb-2">{activeCategory === 'all' ? 'All Items' : activeCatData?.name}</h1>
                    <p className="text-[15px] text-[#b08968] font-semibold">Discover {filteredProducts.length} delicious dishes</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative w-[320px]">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search menu..."
                            className="w-full pl-11 pr-4 py-3.5 bg-white border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] text-[15px] placeholder:text-gray-400 transition-all font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="h-[52px] w-[52px] bg-white rounded-2xl flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] transition-colors">
                        <SlidersHorizontal size={22} />
                    </button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8 pt-6 no-scrollbar">
                <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
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
