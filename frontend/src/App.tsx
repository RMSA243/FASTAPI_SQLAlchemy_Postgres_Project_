import { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from './api';
import type { Product } from './types';
import { ProductCard } from './components/ProductCard';
import { ProductForm } from './components/ProductForm';
import { Plus, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products', error);
      alert("Sorry, Failed to connect to backend. Is it running on port specified?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSubmit = async (product: Product) => {
    try {
      if (editingProduct && editingProduct.id) {
        await updateProduct(editingProduct.id, product);
      } else {
        await addProduct(product);
      }

      await fetchProducts();
      setIsFormOpen(false);
    } catch (error) {
      console.error('Operation failed', error);
      alert("Operation failed. Check backend logs. If adding new, does backend required something else?");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bro, are you sure you want to delete this item?')) {
      try {
        await deleteProduct(id);
        await fetchProducts();
      } catch (error) {
        console.error('Delete failed', error);
        alert("Delete failed.");
      }
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.id && p.id.toString().includes(searchTerm))
  );

  return (
    <div className="min-h-screen bg-dark-bg p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/10 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/10 blur-[100px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div>
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-neon-green via-neon-blue to-neon-pink tracking-tighter"
            >
              RMSA
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 mt-2 text-xl font-light tracking-widest uppercase"
            >
              Inventory Management V1.0
            </motion.p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative w-full md:w-64 group">
              <input
                type="text"
                placeholder="Search drops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-white focus:outline-none focus:border-neon-blue focus:shadow-neon-blue/50 transition-all placeholder-gray-500"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={fetchProducts}
                className="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors group"
              >
                <RefreshCcw className="group-hover:rotate-180 transition-transform duration-500" />
              </button>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-gradient-to-r from-neon-pink to-purple-600 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-neon-pink/30 hover:shadow-neon-pink/50 transform hover:scale-105 transition-all text-lg whitespace-nowrap"
              >
                <Plus strokeWidth={3} />
                Add new Product
              </button>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </motion.div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center text-gray-500 text-xl py-12">
                No products found, please add some to have an experience.
              </div>
            )}
          </motion.div>
        )}
      </div>

      <ProductForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingProduct}
      />
    </div>
  );
}

export default App;

