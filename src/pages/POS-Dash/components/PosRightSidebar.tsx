import { Trash2, Minus, Plus, IndianRupee, Printer, ChefHat, ArrowRight } from 'lucide-react';

export interface CartItem {
    id: number;
    name: string;
    desc: string;
    price: number;
    quantity: number;
    image: string;
}

interface PosRightSidebarProps {
    cart: CartItem[];
    updateQuantity: (id: number, delta: number) => void;
    subtotal: number;
    tax: number;
    total: number;
}

export default function PosRightSidebar({
    cart,
    updateQuantity,
    subtotal,
    tax,
    total
}: PosRightSidebarProps) {
    return (
        <aside className="w-[380px] bg-white border-l border-gray-100 flex flex-col z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.01)] flex-shrink-0">
            <div className="px-6 py-6 flex items-start justify-between border-b border-gray-50/50">
                <div>
                    <h2 className="text-[20px] font-extrabold text-gray-900 mb-1">Order #1023</h2>
                    <p className="text-[13px] text-gray-400 font-semibold">Table 12 &bull; 4 Guests</p>
                </div>
                <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors bg-gray-50 mt-0.5">
                    <Trash2 size={16} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 no-scrollbar">
                {cart.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 group">
                        <img src={item.image} alt={item.name} className="w-[64px] h-[64px] rounded-xl object-cover bg-gray-50 border border-gray-100/50 flex-shrink-0" />
                        <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex justify-between items-start mb-0.5 h-auto">
                                <h4 className="font-bold text-[14px] text-gray-900 leading-tight truncate pr-2">{item.name}</h4>
                                <span className="font-black text-[14px] text-gray-900 whitespace-nowrap flex items-center"><IndianRupee size={14} />{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            <p className="text-[12px] text-gray-400 font-medium mb-2.5 truncate">{item.desc}</p>

                            <div className="flex items-center gap-2.5 bg-white rounded-lg border border-gray-200 p-1 w-fit shadow-sm">
                                <button
                                    onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, -1); }}
                                    className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-50 text-gray-500 transition-colors"
                                >
                                    <Minus size={12} strokeWidth={3} />
                                </button>
                                <span className="w-4 text-center font-bold text-[13px] text-gray-900">{item.quantity}</span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, 1); }}
                                    className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-50 text-gray-500 transition-colors"
                                >
                                    <Plus size={12} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-[#fafafa] border-t border-gray-100 pt-5">
                <div className="space-y-2.5 mb-5">
                    <div className="flex justify-between text-[14px]">
                        <span className="text-gray-500 font-semibold">Subtotal</span>
                        <span className="font-bold text-gray-700 flex items-center"><IndianRupee size={14} />{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                        <span className="text-gray-500 font-semibold">Tax (8%)</span>
                        <span className="font-bold text-gray-700 flex items-center"><IndianRupee size={14} />{tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 border-dashed my-2 pt-3 flex justify-between items-center bg-transparent">
                        <span className="text-[18px] font-extrabold text-gray-900">Total</span>
                        <span className="text-[22px] font-black text-gray-900 flex items-center"><IndianRupee size={22} />{total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex gap-3 mb-3">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 px-3 bg-white border border-gray-200 hover:border-gray-300 text-gray-800 font-bold rounded-xl shadow-sm transition-all">
                        <Printer size={16} strokeWidth={2.5} />
                        <span className="text-[14px]">Print Bill</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 px-3 bg-white border border-gray-200 hover:border-gray-300 text-gray-800 font-bold rounded-xl shadow-sm transition-all">
                        <ChefHat size={16} strokeWidth={2.5} />
                        <span className="text-[14px]">Kitchen</span>
                    </button>
                </div>

                <button
                    className="w-full flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-3 rounded-xl shadow-[0_8px_20px_-6px_rgba(249,115,22,0.4)] transition-all active:scale-[0.98] mt-2 h-[48px]"
                    onClick={() => {
                        alert('Payment Processing...');
                    }}
                >
                    <span className="text-[15px]">Pay Now</span>
                    <ArrowRight size={18} strokeWidth={2.5} />
                </button>
            </div>
        </aside>
    );
}
