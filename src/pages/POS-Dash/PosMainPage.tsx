import { useState } from 'react';
import { CATEGORIES, PRODUCTS } from '../../data/posData';
import PosLeftSidebar from './components/PosLeftSidebar';
import PosMainContent from './components/PosMainContent';
import PosRightSidebar, { type CartItem } from './components/PosRightSidebar';
import ClearCartModal from './components/ClearCartModal';

export default function PosMainPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);

    const activeCatData = CATEGORIES.find(c => c.id === activeCategory);

    const filteredProducts = PRODUCTS.filter((product) => {
        const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const addToCart = (product: typeof PRODUCTS[0]) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { id: product.id, name: product.name, desc: product.desc, price: product.price, quantity: 1, image: product.image }];
        });
    };

    const updateQuantity = (id: number, delta: number) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + delta };
                }
                return item;
            }).filter(item => item.quantity > 0)
        );
    };

    const clearCart = () => {
        if (cart.length === 0) return;
        setIsClearCartModalOpen(true);
    };

    const confirmClearCart = () => {
        setCart([]);
        setIsClearCartModalOpen(false);
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    return (
        <div className="flex h-screen bg-[#f8f9fa] overflow-hidden font-sans text-gray-800">
            <PosLeftSidebar
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />

            <PosMainContent
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                activeCatData={activeCatData}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredProducts={filteredProducts}
                addToCart={addToCart}
            />

            <PosRightSidebar
                cart={cart}
                updateQuantity={updateQuantity}
                clearCart={clearCart}
                confirmClearCart={confirmClearCart}
                subtotal={subtotal}
                tax={tax}
                total={total}
            />

            <ClearCartModal
                isOpen={isClearCartModalOpen}
                onClose={() => setIsClearCartModalOpen(false)}
                onConfirm={confirmClearCart}
            />
        </div>
    );
}

