import { useState, useEffect } from 'react';
import { IndianRupee, CheckCircle2, CreditCard, Banknote, QrCode, ArrowRight } from 'lucide-react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    total: number;
}

type PaymentStep = 'select' | 'processing' | 'success';
type PaymentMethod = 'cash' | 'card' | 'upi' | null;

export default function PaymentModal({ isOpen, onClose, onSuccess, total }: PaymentModalProps) {
    const [step, setStep] = useState<PaymentStep>('select');
    const [method, setMethod] = useState<PaymentMethod>(null);

    // Reset state when opened
    useEffect(() => {
        if (isOpen) {
            setStep('select');
            setMethod(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handlePayment = (selectedMethod: PaymentMethod) => {
        setMethod(selectedMethod);
        setStep('processing');

        // Mock processing delay
        setTimeout(() => {
            setStep('success');
        }, 1500);
    };

    const handleCloseSuccess = () => {
        onSuccess();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-gray-100 transform transition-all relative overflow-hidden">

                {step === 'select' && (
                    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Select Payment</h3>
                            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                                &times;
                            </button>
                        </div>

                        <div className="bg-orange-50 w-full rounded-2xl p-5 mb-6 border border-orange-100 flex flex-col items-center">
                            <span className="text-sm font-bold text-orange-600/80 mb-1">Total Amount Due</span>
                            <div className="text-4xl font-black text-orange-600 flex items-center justify-center">
                                <IndianRupee size={32} className="mr-1" strokeWidth={3} />
                                {total.toFixed(2)}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => handlePayment('upi')}
                                className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 hover:border-[#f97316] hover:bg-orange-50/50 transition-all group active:scale-[0.98]"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-[#f97316] group-hover:bg-[#f97316] group-hover:text-white transition-colors">
                                        <QrCode size={24} />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-gray-900">UPI / QR Code</div>
                                        <div className="text-xs text-gray-500 font-medium">Google Pay, PhonePe, Paytm</div>
                                    </div>
                                </div>
                                <ArrowRight className="text-gray-300 group-hover:text-[#f97316] transition-colors" size={20} />
                            </button>

                            <button
                                onClick={() => handlePayment('cash')}
                                className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 hover:border-green-500 hover:bg-green-50/50 transition-all group active:scale-[0.98]"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                        <Banknote size={24} />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-gray-900">Cash</div>
                                        <div className="text-xs text-gray-500 font-medium">Pay at counter</div>
                                    </div>
                                </div>
                                <ArrowRight className="text-gray-300 group-hover:text-green-500 transition-colors" size={20} />
                            </button>

                            <button
                                onClick={() => handlePayment('card')}
                                className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50/50 transition-all group active:scale-[0.98]"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                        <CreditCard size={24} />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-gray-900">Card</div>
                                        <div className="text-xs text-gray-500 font-medium">Credit / Debit Card via POS</div>
                                    </div>
                                </div>
                                <ArrowRight className="text-gray-300 group-hover:text-blue-500 transition-colors" size={20} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 'processing' && (
                    <div className="flex flex-col items-center justify-center py-10 animate-in fade-in duration-300">
                        <div className="w-20 h-20 border-4 border-gray-100 border-t-[#f97316] rounded-full animate-spin mb-6"></div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Payment...</h3>
                        <p className="text-gray-500 font-medium">Please wait while we confirm the transaction.</p>
                    </div>
                )}

                {step === 'success' && (
                    <div className="flex flex-col items-center text-center py-6 animate-in zoom-in-95 duration-500">
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 relative">
                            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
                            <CheckCircle2 className="w-12 h-12 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">Payment Successful!</h3>
                        <p className="text-gray-500 mb-8 font-medium">
                            <span className="capitalize">{method}</span> payment of <IndianRupee size={12} className="inline -mt-0.5" />{total.toFixed(2)} received.
                        </p>

                        <button
                            onClick={handleCloseSuccess}
                            className="w-full py-4 px-4 font-bold text-white bg-green-500 rounded-2xl hover:bg-green-600 transition-all shadow-lg shadow-green-200 active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
                        >
                            Done & Print Receipt
                            <ArrowRight size={20} strokeWidth={3} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
