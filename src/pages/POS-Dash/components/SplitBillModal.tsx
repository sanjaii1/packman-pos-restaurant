import { useState, useEffect } from 'react';
import { X, IndianRupee, CreditCard, Banknote, QrCode, Plus, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';

interface SplitBillModalProps {
    isOpen: boolean;
    onClose: () => void;
    total: number;
    onSuccess: () => void;
}

type PaymentMethod = 'cash' | 'card' | 'qr';

interface SplitPayment {
    id: number;
    method: PaymentMethod;
    amount: string;
}

export default function SplitBillModal({ isOpen, onClose, total, onSuccess }: SplitBillModalProps) {
    const [splits, setSplits] = useState<SplitPayment[]>([]);
    const [step, setStep] = useState<'split' | 'processing' | 'success'>('split');

    useEffect(() => {
        if (isOpen) {
            setSplits([{ id: Date.now(), method: 'cash', amount: total.toFixed(2) }]);
            setStep('split');
        }
    }, [isOpen, total]);

    if (!isOpen) return null;

    const currentTotal = splits.reduce((sum, split) => sum + (parseFloat(split.amount) || 0), 0);
    const balance = total - currentTotal;
    const isBalanced = Math.abs(balance) < 0.01;

    const addSplit = () => {
        const remaining = total - currentTotal;
        setSplits([...splits, {
            id: Date.now(),
            method: 'card',
            amount: remaining > 0 ? remaining.toFixed(2) : '0.00'
        }]);
    };

    const updateSplitAmount = (id: number, val: string) => {
        setSplits(splits.map(s => s.id === id ? { ...s, amount: val } : s));
    };

    const updateSplitMethod = (id: number, method: PaymentMethod) => {
        setSplits(splits.map(s => s.id === id ? { ...s, method } : s));
    };

    const removeSplit = (id: number) => {
        if (splits.length > 1) {
            setSplits(splits.filter(s => s.id !== id));
        }
    };

    const getMethodIcon = (method: PaymentMethod) => {
        switch (method) {
            case 'cash': return <Banknote size={18} />;
            case 'card': return <CreditCard size={18} />;
            case 'qr': return <QrCode size={18} />;
        }
    };

    const handleConfirm = () => {
        if (isBalanced) {
            setStep('processing');
            setTimeout(() => {
                setStep('success');
            }, 1500);
        }
    };

    const handleCloseSuccess = () => {
        onSuccess();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[20px] w-full max-w-[420px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {step === 'split' && (
                    <>
                        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h2 className="text-[18px] font-extrabold text-gray-900 tracking-tight">Split Bill</h2>
                                <p className="text-[12px] text-gray-500 font-medium mt-0.5">Combine multiple payment methods</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors shadow-sm"
                            >
                                <X size={18} strokeWidth={2.5} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-5">
                            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center justify-between shadow-sm">
                                <span className="font-bold text-gray-500 text-[14px]">Total Amount</span>
                                <span className="text-[24px] font-black text-gray-900 flex items-center -tracking-wide">
                                    <IndianRupee size={20} strokeWidth={3} className="mr-1" />
                                    {total.toFixed(2)}
                                </span>
                            </div>

                            <div className="space-y-2.5">
                                {splits.map((split) => (
                                    <div key={split.id} className="flex gap-2.5 items-center bg-white border border-gray-200 p-2.5 rounded-2xl shadow-sm transition-all focus-within:ring-2 focus-within:ring-[#ea580c]/20 focus-within:border-[#ea580c]/50">
                                        <div className="flex bg-gray-100/80 rounded-xl p-1 gap-1 flex-shrink-0">
                                            {(['cash', 'card', 'qr'] as PaymentMethod[]).map(method => (
                                                <button
                                                    key={method}
                                                    onClick={() => updateSplitMethod(split.id, method)}
                                                    className={`p-1.5 rounded-lg flex items-center justify-center transition-all ${split.method === method
                                                        ? 'bg-white shadow-sm text-gray-900 border border-gray-200'
                                                        : 'text-gray-500 hover:text-gray-700 hover:bg-white/50 border border-transparent'
                                                        }`}
                                                    title={method.charAt(0).toUpperCase() + method.slice(1)}
                                                >
                                                    {getMethodIcon(method)}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex-1 relative flex items-center">
                                            <div className="absolute left-2.5 text-gray-400">
                                                <IndianRupee size={14} strokeWidth={2.5} />
                                            </div>
                                            <input
                                                type="number"
                                                value={split.amount}
                                                onChange={(e) => updateSplitAmount(split.id, e.target.value)}
                                                className="w-full bg-transparent border-none pl-7 pr-2 py-1.5 text-[16px] font-bold text-gray-900 focus:outline-none placeholder:text-gray-300"
                                                placeholder="0.00"
                                                step="0.01"
                                            />
                                        </div>
                                        {splits.length > 1 && (
                                            <button
                                                onClick={() => removeSplit(split.id)}
                                                className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={addSplit}
                                disabled={balance <= 0.01}
                                className={`w-full py-3 border-2 border-dashed rounded-xl font-bold flex items-center justify-center gap-2 text-[14px] transition-all ${balance > 0.01
                                    ? 'border-gray-300 text-gray-500 hover:border-[#ea580c] hover:text-[#ea580c] hover:bg-[#fff1e7]/50'
                                    : 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50'
                                    }`}
                            >
                                <Plus size={16} strokeWidth={2.5} />
                                Add Payment Method
                            </button>

                            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 shadow-sm relative overflow-hidden">
                                <div className={`absolute top-0 left-0 w-1 h-full ${isBalanced ? 'bg-green-500' : balance > 0 ? 'bg-[#ea580c]' : 'bg-red-500'
                                    }`} />
                                <div className="flex justify-between items-center pl-2">
                                    <span className="font-semibold text-gray-600 text-[13px]">Balance Remaining</span>
                                    <span className={`text-[18px] font-bold flex items-center ${isBalanced ? 'text-green-600' : balance > 0 ? 'text-[#ea580c]' : 'text-red-500'
                                        }`}>
                                        <IndianRupee size={16} strokeWidth={2.5} className="mr-0.5" />
                                        {Math.abs(balance).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 border-t border-gray-100 bg-white">
                            <button
                                onClick={handleConfirm}
                                disabled={!isBalanced}
                                className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all h-[48px] text-[15px] shadow-sm ${isBalanced
                                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-[0_8px_20px_-6px_rgba(22,163,74,0.4)] hover:-translate-y-0.5'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                    }`}
                            >
                                {isBalanced ? <CheckCircle2 size={18} strokeWidth={2.5} /> : null}
                                {isBalanced ? 'Confirm Payment' : 'Balance Must Be Zero'}
                            </button>
                        </div>
                    </>
                )}

                {step === 'processing' && (
                    <div className="flex flex-col items-center justify-center py-10 animate-in fade-in duration-300">
                        <div className="w-16 h-16 border-4 border-gray-100 border-t-[#ea580c] rounded-full animate-spin mb-5"></div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Processing Payment...</h3>
                        <p className="text-sm text-gray-500 font-medium">Please wait while we confirm.</p>
                    </div>
                )}

                {step === 'success' && (
                    <div className="flex flex-col items-center text-center p-6 animate-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-5 relative">
                            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2">Payment Successful!</h3>
                        <p className="text-sm text-gray-500 mb-6 font-medium">
                            Split payment of <IndianRupee size={12} className="inline -mt-0.5" />{total.toFixed(2)} received.
                        </p>

                        <button
                            onClick={handleCloseSuccess}
                            className="w-full py-3 px-4 font-bold text-white bg-green-500 rounded-2xl hover:bg-green-600 transition-all shadow-lg shadow-green-200 active:scale-[0.98] flex items-center justify-center gap-2 text-[15px]"
                        >
                            Done & Print Receipt
                            <ArrowRight size={18} strokeWidth={3} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
