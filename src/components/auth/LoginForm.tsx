import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, IdCard, EyeOff, Eye, Delete, ArrowRight } from 'lucide-react';

export default function LoginForm() {
    const [employeeId, setEmployeeId] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [showPin, setShowPin] = useState(false);
    const [activeField, setActiveField] = useState<'employeeId' | 'pinCode'>('employeeId');
    const navigate = useNavigate();

    const handleLogin = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (employeeId && pinCode) {
            navigate('/pos');
        }
    };

    const handleNumberClick = (num: number) => {
        if (activeField === 'employeeId') {
            setEmployeeId(prev => prev + num.toString());
        } else {
            if (pinCode.length < 8) { 
                setPinCode(prev => prev + num.toString());
            }
        }
    };

    const handleClear = () => {
        if (activeField === 'employeeId') {
            setEmployeeId('');
        } else {
            setPinCode('');
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-3 lg:space-y-4">
            {/* Employee ID */}
            <div>
                <label className="block text-[11px] lg:text-xs font-semibold text-gray-700 mb-1">Employee ID</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <IdCard size={16} className="text-[#a87042]" />
                    </div>
                    <input
                        type="text"
                        className={`block w-full pl-10 pr-4 py-2 lg:py-2.5 bg-[#faf9f8] border rounded-lg text-base transition-colors outline-none
                            ${activeField === 'employeeId' ? 'border-[#ef7f1a] ring-2 ring-[#ef7f1a]/10' : 'border-gray-200 hover:border-gray-300 focus:border-[#ef7f1a]'}`}
                        placeholder="e.g. 4021"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        onFocus={() => setActiveField('employeeId')}
                    />
                </div>
            </div>

            {/* PIN Code */}
            <div>
                <label className="block text-[11px] lg:text-xs font-semibold text-gray-700 mb-1">PIN Code</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Lock size={16} className="text-[#a87042]" />
                    </div>
                    <input
                        type={showPin ? "text" : "password"}
                        className={`block w-full pl-10 pr-10 py-2 lg:py-2.5 bg-[#faf9f8] border rounded-lg text-base tracking-[0.2em] font-medium transition-colors outline-none
                            ${activeField === 'pinCode' ? 'border-[#ef7f1a] ring-2 ring-[#ef7f1a]/10' : 'border-gray-200 hover:border-gray-300 focus:border-[#ef7f1a]'}`}
                        placeholder="••••"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        onFocus={() => setActiveField('pinCode')}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                            type="button"
                            onClick={() => setShowPin(!showPin)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {showPin ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-2 mt-4 lg:mt-5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button
                        key={num}
                        type="button"
                        onClick={() => handleNumberClick(num)}
                        className="bg-[#faf9f8] hover:bg-gray-100 text-gray-900 font-bold text-base lg:text-lg py-2 lg:py-2.5 rounded-lg border border-gray-200 transition-all active:scale-95"
                    >
                        {num}
                    </button>
                ))}
                <button
                    type="button"
                    onClick={handleClear}
                    className="bg-[#fff5f5] hover:bg-[#ffebeb] text-red-600 font-bold text-[10px] lg:text-xs py-2 lg:py-2.5 rounded-lg flex items-center justify-center gap-1 border border-[#ffe1e1] transition-all active:scale-95 tracking-wide"
                >
                    <Delete size={14} /> CLEAR
                </button>
                <button
                    type="button"
                    onClick={() => handleNumberClick(0)}
                    className="bg-[#faf9f8] hover:bg-gray-100 text-gray-900 font-bold text-base lg:text-lg py-2 lg:py-2.5 rounded-lg border border-gray-200 transition-all active:scale-95"
                >
                    0
                </button>
                <button
                    type="button"
                    onClick={() => handleLogin()}
                    className="bg-[#ef7f1a] hover:bg-[#d97014] text-white font-bold text-[10px] lg:text-xs py-2 lg:py-2.5 rounded-lg flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95 tracking-wide"
                >
                    ENTER <ArrowRight size={14} />
                </button>
            </div>

            <button
                type="submit"
                className="w-full bg-[#ef7f1a] hover:bg-[#d97014] text-white font-bold text-sm lg:text-[15px] py-2.5 lg:py-3 rounded-lg mt-4 lg:mt-5 shadow-md shadow-orange-500/20 transition-all hover:shadow-orange-500/40 active:scale-[0.98]"
            >
                Log In
            </button>
        </form>
    );
}
