import type { CartItem } from './PosRightSidebar';

interface PrintableReceiptProps {
    cart: CartItem[];
    subtotal: number;
    tax: number;
    discountType: 'percent' | 'flat' | null;
    discountValue: number;
    discountAmount: number;
    newTotal: number;
}

export default function PrintableReceipt({
    cart,
    subtotal,
    tax,
    discountType,
    discountValue,
    discountAmount,
    newTotal
}: PrintableReceiptProps) {
    return (
        <div id="printable-receipt" className="hidden print:block w-[80mm] max-w-full mx-auto bg-white text-black p-6 font-mono text-[12px] leading-tight">
            <div className="text-center mb-6">
                <h1 className="text-[20px] font-bold mb-1 items-center justify-center">PACKMAN POS</h1>
                <p>123 Street Name, City</p>
                <p>Tel: 123-456-7890</p>
            </div>

            <div className="flex justify-between mb-2 pb-2 border-b border-gray-400 border-dashed">
                <span>Order #1023</span>
                <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between mb-4">
                <span>Server: Sarah J.</span>
                <span>Table: 12</span>
            </div>

            <table className="w-full mb-4">
                <thead>
                    <tr className="border-b border-gray-400 border-dashed">
                        <th className="text-left font-normal py-1.5 w-1/2">Item</th>
                        <th className="text-center font-normal py-1.5">Qty</th>
                        <th className="text-right font-normal py-1.5">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => (
                        <tr key={item.id}>
                            <td className="py-1.5 pr-2">{item.name}</td>
                            <td className="py-1.5 text-center">{item.quantity}</td>
                            <td className="py-1.5 text-right">{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="border-t border-gray-400 border-dashed pt-3 space-y-1.5 mt-2">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>{tax.toFixed(2)}</span>
                </div>
                {discountValue > 0 && (
                    <div className="flex justify-between">
                        <span>Discount {discountType === 'percent' ? `(${discountValue}%)` : ''}</span>
                        <span>-{discountAmount.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between font-bold text-[14px] border-t border-gray-800 mt-2 pt-2">
                    <span>Total (INR)</span>
                    <span>{newTotal.toFixed(2)}</span>
                </div>
            </div>

            <div className="text-center mt-8 text-[11px] text-gray-500">
                <p>Thank you for your visit!</p>
                <p>Please come again.</p>
            </div>
        </div>
    );
}
