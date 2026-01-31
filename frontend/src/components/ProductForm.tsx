import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../types';
import { X } from 'lucide-react';

interface ProductFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (product: Product) => void;
    initialData?: Product | null;
}

export const ProductForm = ({ isOpen, onClose, onSubmit, initialData }: ProductFormProps) => {
    const [formData, setFormData] = useState<Product>({
        name: '',
        description: '',
        price: 0,
        quantity: 0,
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ name: '', description: '', price: 0, quantity: 0 });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="glass-panel w-full max-w-md p-8 relative border-neon-green/50 shadow-neon-green/20"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-3xl font-black mb-6 text-center text-neon-green uppercase tracking-tighter">
                            {initialData ? 'Edit Drop' : 'New Drop'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-neon-blue uppercase mb-1">Item Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-black/50 border-2 border-white/10 rounded-xl p-3 text-white focus:border-neon-pink focus:outline-none transition-colors"
                                    placeholder="e.g. Cyber Deck"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neon-blue uppercase mb-1">Description</label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-black/50 border-2 border-white/10 rounded-xl p-3 text-white focus:border-neon-pink focus:outline-none transition-colors h-24"
                                    placeholder="What's the vibe?"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-neon-blue uppercase mb-1">Price</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                        className="w-full bg-black/50 border-2 border-white/10 rounded-xl p-3 text-white focus:border-neon-pink focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-neon-blue uppercase mb-1">Quantity</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                                        className="w-full bg-black/50 border-2 border-white/10 rounded-xl p-3 text-white focus:border-neon-pink focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-neon-green to-emerald-500 text-black font-black uppercase py-4 rounded-xl mt-6 hover:scale-[1.02] transform transition-transform shadow-lg shadow-neon-green/20"
                            >
                                {initialData ? 'Update Stash' : 'Submit New Product'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
