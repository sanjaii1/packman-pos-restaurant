import { useState, useEffect } from 'react';
import { X, Percent, IndianRupee, Tag, CheckCircle2 } from 'lucide-react';

interface DiscountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (type: 'percent' | 'flat', value: number) => void;
    subtotal: number;
    currentType: 'percent' | 'flat' | null;
    currentValue: number;
}

export default function DiscountModal({ isOpen, onClose, onApply, subtotal, currentType, currentValue }: DiscountModalProps) {
    const [type, setType] = useState<'percent' | 'flat'>('percent');
    const [value, setValue] = useState('');

    useEffect(() => {
        if (isOpen) {
            setType(currentType || 'percent');
            setValue(currentValue ? currentValue.toString() : '');
        }
    }, [isOpen, currentType, currentValue]);

    if (!isOpen) return null;

    const parsedValue = parseFloat(value) || 0;
    const discountAmount = type === 'percent'
        ? subtotal * (parsedValue / 100)
        : parsedValue;

    const newTotal = Math.max(0, subtotal - discountAmount);

    const isInvalid = type === 'percent' ? parsedValue > 100 : parsedValue > subtotal;

    const handleApply = () => {
        if (isInvalid) return;
        onApply(type, parsedValue);
    };

    const handleClear = () => {
        onApply('percent', 0);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[20px] w-full max-w-sm shadow-2xl overflow-hidden flex flex-col">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div className="flex flex-col">
                        <h2 className="text-[18px] font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                            <Tag size={18} className="text-[#ea580c]" /> Add Discount
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors shadow-sm"
                    >
                        <X size={18} strokeWidth={2.5} />
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    <div className="flex bg-gray-100/80 p-1 rounded-xl border border-gray-100">
                        <button
                            onClick={() => { setType('percent'); setValue(''); }}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-bold transition-all ${type === 'percent'
                                ? 'bg-white shadow-sm text-gray-900 border border-gray-200'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <Percent size={14} strokeWidth={2.5} />
                            Percentage
                        </button>
                        <button
                            onClick={() => { setType('flat'); setValue(''); }}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-bold transition-all ${type === 'flat'
                                ? 'bg-white shadow-sm text-gray-900 border border-gray-200'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <IndianRupee size={14} strokeWidth={2.5} />
                            Flat Amount
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            {type === 'percent' ? <Percent size={18} strokeWidth={2.5} /> : <IndianRupee size={18} strokeWidth={2.5} />}
                        </div>
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className={`w-full bg-white border-2 rounded-xl pl-10 pr-4 py-3 text-[20px] font-bold focus:outline-none transition-all ${isInvalid
                                ? 'border-red-300 text-red-500 focus:border-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]'
                                : 'border-gray-200 text-gray-900 focus:border-[#ea580c] shadow-[0_4px_12px_rgba(0,0,0,0.02)] focus:shadow-[0_0_0_4px_rgba(234,88,12,0.1)]'
                                }`}
                            placeholder="0"
                            min="0"
                            max={type === 'percent' ? "100" : subtotal.toString()}
                            step={type === 'percent' ? "1" : "0.01"}
                        />
                    </div>
                    {isInvalid && (
                        <p className="text-red-500 text-[12px] font-bold -mt-2">
                            {type === 'percent' ? 'Discount cannot exceed 100%' : 'Discount cannot exceed total'}
                        </p>
                    )}

                    <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100 flex items-center justify-between shadow-sm">
                        <span className="font-semibold text-gray-500 text-[13px]">Updated Subtotal</span>
                        <div className="flex flex-col items-end">
                            <span className="text-[12px] text-gray-400 line-through"><IndianRupee size={10} className="inline mr-0.5" />{subtotal.toFixed(2)}</span>
                            <span className="text-[20px] font-black text-green-600 flex items-center -tracking-wide">
                                <IndianRupee size={16} strokeWidth={3} className="mr-0.5" />
                                {newTotal.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-5 border-t border-gray-100 bg-white flex gap-2">
                    <button
                        onClick={handleClear}
                        className="flex-1 py-3 text-[14px] bg-white border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 transition-colors"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleApply}
                        disabled={isInvalid || (parsedValue === 0 && currentValue === 0)}
                        className={`flex-[2] flex items-center justify-center gap-2 font-bold py-3 text-[14px] rounded-xl transition-all shadow-sm ${isInvalid || (parsedValue === 0 && currentValue === 0)
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-transparent'
                            : 'bg-gray-900 hover:bg-black text-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4)] hover:-translate-y-0.5'
                            }`}
                    >
                        <CheckCircle2 size={16} strokeWidth={2.5} />
                        Apply Discount
                    </button>
                </div>
            </div>
        </div>
    );
}
