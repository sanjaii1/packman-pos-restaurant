import { UtensilsCrossed } from 'lucide-react';

export default function LoginLeftPanel() {
    return (
        <div className="hidden lg:flex w-1/2 relative bg-gray-900 overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1934&auto=format&fit=crop"
                alt="Restaurant Background"
                className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>

            <div className="relative z-10 flex flex-col justify-between h-full p-12 w-full">
                <div className="flex items-center gap-3">
                    <UtensilsCrossed className="text-[#ef7f1a]" size={36} />
                    <span className="text-white text-2xl font-bold tracking-wide">Packman POS</span>
                </div>

                <div className="mb-8">
                    <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                        Empowering culinary<br />excellence.
                    </h1>
                    <p className="text-gray-300 text-lg max-w-md leading-relaxed">
                        Streamlined operations for high-volume service environments. Log in to start your shift.
                    </p>
                </div>
            </div>
        </div>
    );
}
