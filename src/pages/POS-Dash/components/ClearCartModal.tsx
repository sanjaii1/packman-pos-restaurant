import { Trash2 } from 'lucide-react';

interface ClearCartModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ClearCartModal({ isOpen, onClose, onConfirm }: ClearCartModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-gray-100 transform transition-all">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-5">
                        <Trash2 className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Clear Order</h3>
                    <p className="text-gray-500 mb-8 font-medium">
                        Are you sure you want to clear the entire order? This action cannot be undone.
                    </p>
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3.5 px-4 font-bold text-gray-700 bg-gray-100 rounded-2xl hover:bg-gray-200 hover:text-gray-900 transition-all active:scale-[0.98]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-3.5 px-4 font-bold text-white bg-red-500 rounded-2xl hover:bg-red-600 transition-all shadow-sm shadow-red-200 active:scale-[0.98]"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
