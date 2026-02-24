import {
    Menu,
    Hamburger,
    Pizza,
    Carrot,
    IceCream,
    Coffee
} from 'lucide-react';

export const CATEGORIES = [
    { id: 'all', name: 'All', icon: Menu },
    { id: 'burger', name: 'Burger', icon: Hamburger },
    { id: 'pizza', name: 'Pizza', icon: Pizza },
    { id: 'salad', name: 'Salad', icon: Carrot },
    { id: 'dessert', name: 'Desserts', icon: IceCream },
    { id: 'drinks', name: 'Drinks', icon: Coffee },
];

export const PRODUCTS = [
    { id: 1, name: 'Double Cheese Burger', price: 250.00, desc: 'Juicy beef, double cheese', category: 'burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' },
    { id: 2, name: 'Pepperoni Pizza', price: 450.00, desc: 'Classic pepperoni, mozzarella', category: 'pizza', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80' },
    { id: 3, name: 'Caesar Salad', price: 180.00, desc: 'Romaine, croutons, parmesan', category: 'salad', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&q=80' },
    { id: 4, name: 'Chocolate Ice Cream', price: 120.00, desc: 'Rich chocolate, waffle cone', category: 'dessert', image: 'https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?w=400&q=80' },
    { id: 5, name: 'Iced Latte', price: 150.00, desc: 'Espresso, milk, ice', category: 'drinks', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80' },
    { id: 6, name: 'Veggie Burger', price: 190.00, desc: 'Plant-based patty, fresh veggies', category: 'burger', image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&q=80' },
    { id: 7, name: 'Margherita Pizza', price: 350.00, desc: 'San Marzano tomato, mozzarella', category: 'pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80' },
    { id: 8, name: 'Fruit Salad', price: 140.00, desc: 'Fresh seasonal fruits', category: 'salad', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80' },
    { id: 9, name: 'Classic Chicken Burger', price: 220.00, desc: 'Crispy chicken, mayo, lettuce', category: 'burger', image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80' },
    { id: 10, name: 'Spicy BBQ Burger', price: 280.00, desc: 'Beef, jalapenos, BBQ sauce', category: 'burger', image: 'https://images.unsplash.com/photo-1594212202875-86ac1c6b12a3?w=400&q=80' },
    { id: 11, name: 'BBQ Chicken Pizza', price: 490.00, desc: 'Grilled chicken, red onions', category: 'pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80' },
    { id: 12, name: 'Hawaiian Pizza', price: 420.00, desc: 'Ham, pineapple, mozzarella', category: 'pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80' },
    { id: 13, name: 'Greek Salad', price: 200.00, desc: 'Feta, olives, tomatoes, cucumber', category: 'salad', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80' },
    { id: 14, name: 'Cobb Salad', price: 230.00, desc: 'Chicken, bacon, egg, avocado', category: 'salad', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' },
    { id: 15, name: 'Strawberry Cheesecake', price: 180.00, desc: 'New York style, strawberry compote', category: 'dessert', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80' },
    { id: 16, name: 'Tiramisu', price: 220.00, desc: 'Espresso soaked ladyfingers, mascarpone', category: 'dessert', image: 'https://images.unsplash.com/photo-1571115177098-24de81156fe5?w=400&q=80' },
    { id: 17, name: 'Fresh Orange Juice', price: 100.00, desc: 'Freshly squeezed oranges', category: 'drinks', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80' },
    { id: 18, name: 'Fresh Lemonade', price: 80.00, desc: 'Lemon, mint, ice', category: 'drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80' },
];
