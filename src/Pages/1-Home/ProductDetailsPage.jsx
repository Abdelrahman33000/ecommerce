import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useUser();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('❌ حدث خطأ أثناء تحميل تفاصيل المنتج');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      toast.warning('⚠️ يجب عليك تسجيل الدخول أولاً');
      navigate('/login');
      return;
    }

    if (!product) {
      toast.error('⚠️ لا يمكن إضافة منتج غير موجود');
      return;
    }

    addToCart(product);
    toast.success('✅ تم إضافة المنتج إلى السلة');
  };

  if (loading) {
    return <div className="text-center mt-24 text-xl text-gray-600">⏳ جاري تحميل التفاصيل...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-24 text-xl text-red-500">
        {error}
        <br />
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => window.location.reload()}
        >
          🔄 إعادة المحاولة
        </button>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center mt-24 text-xl text-gray-500">لم يتم العثور على المنتج</div>;
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-8 mt-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-lg shadow-lg">
        <motion.img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-auto object-contain rounded-lg"
          whileHover={{ scale: 1.05 }}
        />
        <div className="flex-1 flex flex-col ">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
            <p className="text-gray-600 mt-4 text-base">{product.description}</p>
            <p className="mt-4 text-green-600 font-bold text-xl">${product.price}</p>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition shadow-sm"
              aria-label="أضف المنتج إلى السلة"
            >
              🛒 أضف إلى السلة
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="w-full sm:w-auto px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold rounded-md transition"
            >
              الانتقال إلى السلة
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailsPage;
