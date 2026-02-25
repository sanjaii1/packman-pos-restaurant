import { useState } from 'react';
import { Trash2, Minus, Plus, IndianRupee, Printer, ArrowRight, ChevronUp, Split, Percent } from 'lucide-react';
import PaymentModal from './PaymentModal';
import SplitBillModal from './SplitBillModal';
import DiscountModal from './DiscountModal';
import PrintableReceipt from './PrintableReceipt';

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
    clearCart: () => void;
    confirmClearCart: () => void;
    subtotal: number;
    tax: number;
    total: number;
}

export default function PosRightSidebar({
    cart,
    updateQuantity,
    clearCart,
    confirmClearCart,
    subtotal,
    tax
}: PosRightSidebarProps) {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
    const [isSplitBillOpen, setIsSplitBillOpen] = useState(false);
    const [isDiscountOpen, setIsDiscountOpen] = useState(false);
    const [discountType, setDiscountType] = useState<'percent' | 'flat' | null>(null);
    const [discountValue, setDiscountValue] = useState(0);

    const discountAmount = discountType === 'percent'
        ? subtotal * (discountValue / 100)
        : (discountType === 'flat' ? discountValue : 0);

    const newTotal = Math.max(0, subtotal - discountAmount + tax);

    return (
        <>
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #printable-receipt, #printable-receipt * {
                        visibility: visible;
                    }
                    #printable-receipt {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                }
            `}</style>
            <aside className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.06)] lg:relative lg:w-[380px] lg:border-t-0 lg:border-l lg:border-gray-100 lg:shadow-[-10px_0_30px_rgba(0,0,0,0.01)] lg:flex-shrink-0 lg:h-full lg:z-10 transition-all duration-300 ease-in-out transform ${cart.length === 0
                ? 'translate-y-[100%] lg:translate-y-0 lg:-mr-[380px] opacity-0 pointer-events-none'
                : 'translate-y-0 lg:mr-0 opacity-100 pointer-events-auto'
                }`}>

                {/* Desktop View */}
                <div className="hidden lg:flex flex-col h-full w-full">
                    <div className="px-6 py-6 flex items-start justify-between border-b border-gray-50/50">
                        <div>
                            <h2 className="text-[20px] font-extrabold text-gray-900 mb-1">Order #1023</h2>
                            <p className="text-[13px] text-gray-400 font-semibold">Table 12 &bull; 4 Guests</p>
                        </div>
                        <button
                            onClick={clearCart}
                            title="Clear Cart"
                            className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors bg-gray-50 mt-0.5"
                        >
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
                            {discountValue > 0 && (
                                <div className="flex justify-between text-[14px]">
                                    <span className="text-green-600 font-semibold">Discount {discountType === 'percent' ? `(${discountValue}%)` : ''}</span>
                                    <span className="font-bold text-green-600 flex items-center">- <IndianRupee size={14} />{discountAmount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="border-t border-gray-200 border-dashed my-2 pt-3 flex justify-between items-center bg-transparent">
                                <span className="text-[18px] font-extrabold text-gray-900">Total</span>
                                <span className="text-[22px] font-black text-gray-900 flex items-center"><IndianRupee size={22} />{newTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-3">
                            <button
                                onClick={() => window.print()}
                                disabled={cart.length === 0}
                                className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-2 bg-white border font-bold rounded-xl shadow-sm transition-all ${cart.length > 0
                                    ? 'border-gray-200 hover:border-gray-300 text-gray-800'
                                    : 'border-gray-100 text-gray-300 cursor-not-allowed'
                                    }`}
                            >
                                <Printer size={18} strokeWidth={2.5} />
                                <span className="text-[12px] whitespace-nowrap">Print Bill</span>
                            </button>
                            <button
                                onClick={() => setIsSplitBillOpen(true)}
                                disabled={cart.length === 0}
                                className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-2 bg-white border font-bold rounded-xl shadow-sm transition-all ${cart.length > 0
                                    ? 'border-gray-200 hover:border-gray-300 text-gray-800'
                                    : 'border-gray-100 text-gray-300 cursor-not-allowed'
                                    }`}
                            >
                                <Split size={18} strokeWidth={2.5} />
                                <span className="text-[12px] whitespace-nowrap">Split Bill</span>
                            </button>
                            <button
                                onClick={() => setIsDiscountOpen(true)}
                                disabled={cart.length === 0}
                                className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-2 bg-white border font-bold rounded-xl shadow-sm transition-all ${cart.length > 0
                                    ? 'border-gray-200 hover:border-gray-300 text-gray-800'
                                    : 'border-gray-100 text-gray-300 cursor-not-allowed'
                                    }`}
                            >
                                <Percent size={18} strokeWidth={2.5} />
                                <span className="text-[12px] whitespace-nowrap">Discount</span>
                            </button>
                        </div>

                        <button
                            disabled={cart.length === 0}
                            className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all h-[48px] mt-2 ${cart.length > 0
                                ? 'bg-[#f97316] hover:bg-[#ea580c] text-white shadow-[0_8px_20px_-6px_rgba(249,115,22,0.4)] active:scale-[0.98]'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                            onClick={() => {
                                setIsPaymentModalOpen(true);
                            }}
                        >
                            <span className="text-[15px]">Pay Now</span>
                            <ArrowRight size={18} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

                {/* Mobile Footer View */}
                <div className="lg:hidden flex flex-col bg-white">
                    {/* Expanded Cart View */}
                    <div className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out bg-[#fafafa] ${isMobileCartOpen ? 'max-h-[75vh] opacity-100 border-b border-gray-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-4 flex justify-between items-center border-b border-gray-100/80 bg-white">
                            <h2 className="text-[18px] font-extrabold text-gray-900">Your Order</h2>
                            <button
                                onClick={clearCart}
                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors bg-gray-50"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <div className="overflow-y-auto flex-1 max-h-[calc(75vh-65px)] p-4 space-y-4 no-scrollbar bg-white">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-start gap-3">
                                    <img src={item.image} alt={item.name} className="w-[56px] h-[56px] rounded-xl object-cover bg-gray-50 border border-gray-100/50 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-0.5">
                                            <h4 className="font-bold text-[14px] text-gray-900 leading-tight truncate pr-2">{item.name}</h4>
                                            <span className="font-black text-[13px] text-gray-900 whitespace-nowrap flex items-center"><IndianRupee size={12} />{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                        <p className="text-[12px] text-gray-400 font-medium mb-2 truncate">{item.desc}</p>
                                        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1 w-fit shadow-sm">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, -1); }}
                                                className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-gray-50 text-gray-500"
                                            >
                                                <Minus size={12} strokeWidth={3} />
                                            </button>
                                            <span className="w-4 text-center font-bold text-[12px] text-gray-900">{item.quantity}</span>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, 1); }}
                                                className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-gray-50 text-gray-500"
                                            >
                                                <Plus size={12} strokeWidth={3} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {cart.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-[13px]">
                                            <span className="text-gray-500 font-semibold">Subtotal</span>
                                            <span className="font-bold text-gray-700 flex items-center"><IndianRupee size={12} />{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-[13px]">
                                            <span className="text-gray-500 font-semibold">Tax (8%)</span>
                                            <span className="font-bold text-gray-700 flex items-center"><IndianRupee size={12} />{tax.toFixed(2)}</span>
                                        </div>
                                        {discountValue > 0 && (
                                            <div className="flex justify-between text-[13px]">
                                                <span className="text-green-600 font-semibold">Discount {discountType === 'percent' ? `(${discountValue}%)` : ''}</span>
                                                <span className="font-bold text-green-600 flex items-center">- <IndianRupee size={12} />{discountAmount.toFixed(2)}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => window.print()}
                                            disabled={cart.length === 0}
                                            className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-2 bg-white border font-bold rounded-xl shadow-sm transition-all ${cart.length > 0 ? 'border-gray-200 hover:border-gray-300 text-gray-800' : 'border-gray-100 text-gray-300 cursor-not-allowed'}`}
                                        >
                                            <Printer size={18} strokeWidth={2.5} />
                                            <span className="text-[12px] whitespace-nowrap">Print</span>
                                        </button>
                                        <button
                                            onClick={() => { setIsMobileCartOpen(false); setIsSplitBillOpen(true); }}
                                            disabled={cart.length === 0}
                                            className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-2 bg-white border font-bold rounded-xl shadow-sm transition-all ${cart.length > 0 ? 'border-gray-200 hover:border-gray-300 text-gray-800' : 'border-gray-100 text-gray-300 cursor-not-allowed'}`}
                                        >
                                            <Split size={18} strokeWidth={2.5} />
                                            <span className="text-[12px] whitespace-nowrap">Split</span>
                                        </button>
                                        <button
                                            onClick={() => { setIsMobileCartOpen(false); setIsDiscountOpen(true); }}
                                            disabled={cart.length === 0}
                                            className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-2 bg-white border font-bold rounded-xl shadow-sm transition-all ${cart.length > 0 ? 'border-gray-200 hover:border-gray-300 text-gray-800' : 'border-gray-100 text-gray-300 cursor-not-allowed'}`}
                                        >
                                            <Percent size={18} strokeWidth={2.5} />
                                            <span className="text-[12px] whitespace-nowrap">Discount</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex items-center justify-between px-4 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] relative z-10">
                        <div className="flex flex-col cursor-pointer bg-white/50 p-1 -m-1 rounded-lg" onClick={() => setIsMobileCartOpen(!isMobileCartOpen)}>
                            <span className="text-[13px] font-bold text-gray-500 mb-0.5">Total ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                            <div className="flex items-center gap-1.5 text-gray-900">
                                <span className="text-[20px] font-black flex items-center tracking-tight"><IndianRupee size={18} strokeWidth={2.5} />{newTotal.toFixed(2)}</span>
                                <ChevronUp size={16} strokeWidth={2.5} className={`text-gray-400 mt-0.5 transition-transform duration-300 ${isMobileCartOpen ? 'rotate-180' : ''}`} />
                            </div>
                        </div>
                        <button
                            disabled={cart.length === 0}
                            className={`flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-xl transition-all ${cart.length > 0
                                ? 'bg-[#f97316] hover:bg-[#ea580c] text-white shadow-[0_8px_20px_-6px_rgba(249,115,22,0.4)] active:scale-[0.98]'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                            onClick={() => setIsPaymentModalOpen(true)}
                        >
                            <span className="text-[15px]">Pay Now</span>
                            <ArrowRight size={18} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

            </aside>

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onSuccess={() => {
                    confirmClearCart();
                    setDiscountType(null);
                    setDiscountValue(0);
                    setIsPaymentModalOpen(false);
                }}
                total={newTotal}
            />

            <SplitBillModal
                isOpen={isSplitBillOpen}
                onClose={() => setIsSplitBillOpen(false)}
                onSuccess={() => {
                    confirmClearCart();
                    setDiscountType(null);
                    setDiscountValue(0);
                    setIsSplitBillOpen(false);
                }}
                total={newTotal}
            />

            <DiscountModal
                isOpen={isDiscountOpen}
                onClose={() => setIsDiscountOpen(false)}
                onApply={(type, val) => {
                    setDiscountType(type);
                    setDiscountValue(val);
                    setIsDiscountOpen(false);
                }}
                subtotal={subtotal}
                currentType={discountType}
                currentValue={discountValue}
            />

            <PrintableReceipt
                cart={cart}
                subtotal={subtotal}
                tax={tax}
                discountType={discountType}
                discountValue={discountValue}
                discountAmount={discountAmount}
                newTotal={newTotal}
            />
        </>
    );
}
