import { HelpCircle, Settings } from 'lucide-react';
import LoginForm from '../../../components/auth/LoginForm';

export default function LoginRightPanel() {
    return (
        <div className="w-full lg:w-1/2 flex flex-col relative max-h-screen overflow-y-auto">
            <div className="flex-1 flex flex-col justify-center items-center p-4 lg:p-6">
                <div className="w-full max-w-[22rem] lg:max-w-md">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 lg:mb-2">Staff Login</h2>
                    <p className="text-[#a87042] mb-4 lg:mb-5 text-xs lg:text-sm">Enter your ID and PIN to access the terminal.</p>
                    <LoginForm />
                    <div className="flex justify-between items-center mt-4 lg:mt-5 text-[10px] lg:text-xs text-[#a87042] font-medium">
                        <button className="flex items-center gap-1.5 hover:text-gray-800 transition-colors">
                            <HelpCircle size={14} /> Forgot PIN?
                        </button>
                        <button className="flex items-center gap-1.5 hover:text-gray-800 transition-colors">
                            <Settings size={14} /> System Settings
                        </button>
                    </div>
                </div>
            </div>
            <div className="py-2 lg:py-3 border-t border-gray-100 text-center text-[10px] lg:text-xs text-[#a87042] font-medium bg-white w-full mt-auto">
                v4.2.0 • Terminal #14 • Connected
            </div>
        </div>
    );
}

