import { motion } from 'framer-motion';
import type { Product } from '../types';
import { Trash2, Edit2 } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

export const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="glass-panel p-6 relative overflow-hidden group shadow-neon-pink/20 hover:shadow-neon-pink transition-all duration-300 border-neon-pink/30 hover:border-neon-pink"
        >
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button
                    onClick={() => onEdit(product)}
                    className="p-2 bg-neon-blue text-black rounded-full hover:bg-white transition-colors"
                >
                    <Edit2 size={16} />
                </button>
                <button
                    onClick={() => product.id && onDelete(product.id)}
                    className="p-2 bg-neon-pink text-white rounded-full hover:bg-red-500 transition-colors"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-blue truncate">
                {product.name}
            </h3>

            <p className="text-gray-300 text-sm mb-4 line-clamp-2 h-10">
                {product.description}
            </p>

            <div className="flex justify-between items-end">
                <div className="flex flex-col">
                    <span className="text-xs text-neon-green uppercase tracking-widest">Price</span>
                    <span className="text-3xl font-black font-mono">${product.price}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500 uppercase tracking-widest">Qty</span>
                    <span className="text-xl font-bold">{product.quantity}</span>
                </div>
            </div>

            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-neon-pink/20 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-blue/20 blur-3xl rounded-full pointer-events-none" />
        </motion.div>
    );
};
