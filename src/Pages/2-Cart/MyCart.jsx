import React from 'react';
import { useCart } from '../../context/CartContext';
import { FaTrashAlt, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleRemove = (productId) => {
    removeFromCart(productId);
    toast.success('🗑️ تم حذف المنتج من السلة');
  };

  const handleUpdateQuantity = (productId, quantity) => {
    updateQuantity(productId, quantity);
    toast.success('✔️ تم تحديث الكمية');
  };

  if (cart.length === 0) {
    return (
      <div className="text-center text-xl text-gray-500 mt-24">
        🛒 Cart Is Empty
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">🛍️ Cart Content</h1>
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {cart.map((product) => (
          <div
            key={product.id}
            className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4 space-y-4 md:space-y-0"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-24 h-24 object-contain rounded-md"
            />

            <div className="flex-1 md:mx-4 min-w-0">
              <h2 className="font-semibold text-gray-900 text-base break-words">{product.title}</h2>
              <p className="text-gray-500 text-sm mt-1 line-clamp-2 break-words">{product.description}</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleUpdateQuantity(product.id, product.quantity - 1)}
                className="text-gray-700 hover:text-gray-900"
              >
                <FaMinusCircle size={20} />
              </button>
              <span className="text-lg">{product.quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}
                className="text-gray-700 hover:text-gray-900"
              >
                <FaPlusCircle size={20} />
              </button>
              <button
                onClick={() => handleRemove(product.id)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                <FaTrashAlt size={18} />
              </button>
            </div>

            <div className="text-md font-semibold text-gray-800 mt-2 md:mt-0 whitespace-nowrap">
              ${(product.price * product.quantity).toFixed(2)}
            </div>
          </div>
        ))}

        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <button
            onClick={clearCart}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            🧹Remove Items
          </button>
          <div className="text-lg font-semibold text-gray-800">
            💰 Total Price : $
            {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CartPage;
